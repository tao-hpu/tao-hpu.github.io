'use client'

import { useEffect, useState } from 'react'

export default function Footer() {
  const [year, setYear] = useState(2026)
  useEffect(() => setYear(new Date().getFullYear()), [])

  return (
    <footer className="footer-dark">
      <div className="footer-container">
        <div className="footer-logo">T\A</div>

        <div className="footer-column">
          <h4>Research</h4>
          <a href="https://scholar.google.com/citations?user=HBIPWm4AAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a>
          <a href="https://www.semanticscholar.org/author/Tao-An/2402727637" target="_blank" rel="noopener noreferrer">Semantic Scholar</a>
          <a href="https://arxiv.org/a/0009-0006-2933-0320.html" target="_blank" rel="noopener noreferrer">arXiv</a>
          <a href="https://orcid.org/0009-0006-2933-0320" target="_blank" rel="noopener noreferrer">ORCID</a>
          <a href="https://openreview.net/profile?id=~Tao_An3" target="_blank" rel="noopener noreferrer">OpenReview</a>
          <a href="https://huggingface.co/tao-hpu" target="_blank" rel="noopener noreferrer">Hugging Face</a>
        </div>

        <div className="footer-column">
          <h4>Connect</h4>
          <a href="https://x.com/tao_an_hpu" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
          <a href="https://www.linkedin.com/in/tao-hpu" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/tao-hpu" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="http://youtube.com/@tao-hpu" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://space.bilibili.com/29563269" target="_blank" rel="noopener noreferrer">Bilibili</a>
        </div>

        <div className="footer-column">
          <h4>Work &amp; Writing</h4>
          <a href="https://github.com/fim-ai/fim-one" target="_blank" rel="noopener noreferrer">FIM One</a>
          <a href="https://fim-tech.feishu.cn/wiki/space/7524906799680929795" target="_blank" rel="noopener noreferrer">AI Handbook (中文)</a>
          <a href="https://tao-hpu.medium.com/" target="_blank" rel="noopener noreferrer">Medium</a>
          <a href="/Tao-An-Resume.pdf" target="_blank" rel="noopener noreferrer">Résumé / CV (PDF)</a>
          <a href="mailto:tan1@my.hpu.edu">Email</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <a href="https://github.com/tao-hpu/tao-hpu.github.io" target="_blank" rel="noopener noreferrer">Source</a>
          <span className="footer-dot">·</span>
          <a href="https://github.com/tao-hpu/tao-hpu.github.io/fork" target="_blank" rel="noopener noreferrer">Fork</a>
        </div>
        <div className="footer-bottom-right">
          <span>&copy; <span id="year">{year}</span> Tao An</span>
          <span className="footer-dot">·</span>
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>
        </div>
      </div>
    </footer>
  )
}
