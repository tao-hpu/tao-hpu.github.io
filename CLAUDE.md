# tao-hpu.github.io（个人站）

作者个人站。Next.js App Router，静态导出到 `out/`。内容直接写在页面组件里，没有单独的数据层：
`app/research/page.tsx`（论文与学术服务）、`app/opensource/page.tsx`（开源项目）、
`app/articles/page.tsx`、`app/building/page.tsx`。

## 发论文占坑流程（用户给我一份 PDF 时触发）

**用户直接给 PDF = 一个明确信号**：这篇 arXiv 没位置（on hold 或政策卡住），也没投
OpenReview 等第三方平台。个人站是它当下唯一的发布地，目的是**占坑、锚定优先权**。
不要问"要不要先投 arXiv"，那条路已经排除了。

按顺序做完五步，不要只做前两步：

1. **先铸 Zenodo DOI**，这是整个流程的地基。token 在 `.env` 的 `ZENODO_TOKEN`
   （已 gitignore，只走环境变量，绝不写进任何入库文件）。
   自托管 PDF 自证不了时间，第三方时间戳才是占坑的实质。
   API 四步：POST 建 draft（带元数据）→ PUT 传文件到 bucket → GET 回读核对 →
   POST publish。**publish 不可逆，回读核对那一步不能跳，也要先给用户过目。**
2. **不在站内托管 PDF。** `public/papers/` 已废弃，别再往里放文件。Zenodo 落地页就是
   全站唯一的 PDF 入口，站内留副本等于两套真相，出新版必然漂移。
   注意 Zenodo 的**文件直链是钉死在某一版的**（concept recid 取文件返回 404，
   实测只有 version recid 能直连），所以任何地方都只链 DOI，不链文件。
3. **文章**：`app/articles/registry.ts` 加条目（`slug`/`title`/`description`/`date`/`tags`，
   有配套论文时补 `relatedPaper` / `paperDoi`），
   新建 `app/articles/<slug>/page.mdx` 写 companion note。
   同步更新 `public/feed.xml` 与 `public/sitemap.xml`。
4. **`app/research/publications.ts` 加 publication 条目**（不要直接堆进 page.tsx），即使没投任何地方。
   - `status` / badges **只写真实状态**。没投就写 `preprint` / `Preprint`，不要编
     `Under Review`，不要挂一个并不存在的 venue。双盲在审的另有匿名期规则，见 memory。
   - links 给 PDF、DOI、`Interactive note`（指向第 3 步的文章）。
   - **BibTeX 用 DOI，不要用站点 URL 当 `howpublished`**。仓库改名或换域名会让所有
     引用失效，DOI 不会。
5. **判断是否同步 fim-ai-www**：只有属于 FIM 本真业务的才同步，个人布道文和跨领域作品
   留在个人站。同步不是翻译镜像，规则见下方共享文件，中文导读有字数与"证据强度"硬要求。

### DOI 摆在哪：论文的 DOI 不属于 note

Zenodo 铸的 DOI 是**论文**的身份，companion note 只是导读，两者不能混。

- **research 页**：DOI 就是那条 publication 的身份。`publication-simple-links` 里加 DOI
  链接，BibTeX 用 `doi` + `publisher = {Zenodo}` 字段。
- **article 页**：由 `registry.ts` 的 `paperDoi` 字段驱动，`ArticleLayout` 的 Citation
  区块自动显示一句"要引研究就引论文"加 DOI 链接。**`articleBibtex()` 不碰**，note 自身
  的 `howpublished` 继续用站点 URL，因为网页确实就是这篇 note 的正身。
- **不要给 article 页发 `citation_doi` meta 标签**。那个标签的语义是"本页就是该 DOI 的
  文献"，会让 Google Scholar 把 note 和论文合并成一条记录，note 的正文被当成论文全文
  索引。想让 note 被收录靠已有的 `citation_title` / `citation_author` 那组就够了。

### 版本控制

`paperDoi` **永远填 concept DOI，不填 version DOI**。concept DOI 恒定且解析到最新版，
所以 PDF 更新时站上的 DOI 一个字都不用改。优先权证据是 v1 的 version DOI 和它的日期，
永久留在 Zenodo 记录的 Versions 列表里，不需要在站上展示。

出新版只有两步：Zenodo 点 New version 传新 PDF 发布 → registry 里填 `updated`。
**站上不碰任何 PDF 文件**，所以代码里没有一处需要跟着版本改，DOI 自动指向最新版。

标题和链接一律指向 `https://doi.org/<concept DOI>`，不要出现 `zenodo.org/records/<id>/files/...`
这种直链，它绑定单一版本，出新版就指向旧稿。

**后续回填**：将来 arXiv 放出来或 venue 录用了，回来更新 research 页的 badge 和 BibTeX，
但 **concept DOI 不换**，它设计上就是跨版本恒定的引用目标。

## 关联站点：fim-ai-www（公司站）

两站的内容分工与同步规则是共享的，见下方导入（两个仓库指向同一份，改一处两边生效）：

@~/.claude/shared/fim-taohpu-sync.md
