import { SITE_EMAIL, SITE_TAGLINE } from '@/lib/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-dark">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">T\A</div>
          <p className="footer-tagline">{SITE_TAGLINE}</p>
          <p className="footer-copyright">&copy; {year} Tao An</p>
        </div>

        <div className="footer-column">
          <h4>Research</h4>
          <a href="https://scholar.google.com/citations?user=HBIPWm4AAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a>
          <a href="https://www.semanticscholar.org/author/Tao-An/2402727637" target="_blank" rel="noopener noreferrer">Semantic Scholar</a>
          <a href="https://arxiv.org/a/0009-0006-2933-0320.html" target="_blank" rel="noopener noreferrer">arXiv</a>
          <a href="https://orcid.org/0009-0006-2933-0320" target="_blank" rel="noopener noreferrer">ORCID</a>
          <a href="https://dblp.org/pid/10/2015-1" target="_blank" rel="noopener noreferrer">DBLP</a>
          <a href="https://openreview.net/profile?id=~Tao_An3" target="_blank" rel="noopener noreferrer">OpenReview</a>
          <a href="https://huggingface.co/tao-hpu" target="_blank" rel="noopener noreferrer">Hugging Face</a>
        </div>

        <div className="footer-column">
          <h4>Connect</h4>
          <a href="https://x.com/tao_an_hpu" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
          <a href="https://www.linkedin.com/in/tao-hpu" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/tao-hpu" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.youtube.com/@tao-hpu" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href={`mailto:${SITE_EMAIL}`}>Email</a>
        </div>

        <div className="footer-column">
          <h4>Work &amp; Writing</h4>
          <a href="https://github.com/fim-ai/fim-one" target="_blank" rel="noopener noreferrer">FIM One</a>
          <a href="https://tao-hpu.medium.com/" target="_blank" rel="noopener noreferrer">Medium</a>
        </div>

        <div className="footer-column">
          <h4>中文资源</h4>
          <a href="https://aha.fim.ai" target="_blank" rel="noopener noreferrer">Aha. 论文导读</a>
          <a href="https://fim-tech.feishu.cn/wiki/space/7524906799680929795" target="_blank" rel="noopener noreferrer">AI 手册</a>
          <a href="https://space.bilibili.com/29563269" target="_blank" rel="noopener noreferrer">Bilibili</a>
          <a href="https://l2a.fim.ai" target="_blank" rel="noopener noreferrer">线性代数 → 注意力</a>
        </div>
      </div>

      <div className="footer-land" aria-hidden="true" />
    </footer>
  )
}
