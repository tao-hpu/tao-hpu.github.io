import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import ts from 'typescript'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = await fs.readFile(path.join(root, 'app/articles/registry.ts'), 'utf8')
const tree = ts.createSourceFile('registry.ts', source, ts.ScriptTarget.Latest, true)
const notes = []
function visit(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText(tree) === 'articles') {
    for (const entry of node.initializer.elements) {
      const fields = Object.fromEntries(entry.properties
        .filter(ts.isPropertyAssignment)
        .map(field => [field.name.getText(tree), field.initializer]))
      if (fields.cover) notes.push({ slug: fields.slug.text, title: fields.title.text })
    }
  }
  ts.forEachChild(node, visit)
}
visit(tree)

const escapeXml = text => text.replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
})[c])
function linesFor(title) {
  const lines = ['']
  for (const word of title.split(/\s+/)) {
    const last = lines.length - 1
    if (lines[last] && `${lines[last]} ${word}`.length > 22) lines.push(word)
    else lines[last] += `${lines[last] ? ' ' : ''}${word}`
  }
  return lines
}

await fs.mkdir(path.join(root, 'public/images/articles'), { recursive: true })
for (const { slug, title } of notes) {
  const lines = linesFor(title)
  if (lines.length > 6) throw new Error(`Share title needs a smaller layout: ${slug}`)
  const mask = await sharp(path.join(root, `public/images/articles/${slug}-etch.webp`))
    .resize(560, 560, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toBuffer()
  const drawing = await sharp({ create: {
    width: 560, height: 560, channels: 4,
    background: { r: 196, g: 209, b: 205, alpha: 1 },
  } }).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer()
  const text = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <text x="56" y="72" fill="#afc4cc" font-family="sans-serif" font-size="22">Tao An / Research notes</text>
    ${lines.map((line, i) => `<text x="56" y="${158 + i * 56}" fill="#eef6f4" font-family="Georgia, serif" font-size="42">${escapeXml(line)}</text>`).join('')}
  </svg>`
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#10283b' } })
    .composite([{ input: Buffer.from(text) }, { input: drawing, left: 620, top: 35 }])
    .jpeg({ quality: 90 })
    .toFile(path.join(root, `public/images/articles/${slug}-etch-og.jpg`))
}
console.log(`Generated ${notes.length} share images from individual etched illustrations.`)
