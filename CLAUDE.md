# tao-hpu.github.io（个人站）

作者个人站。Next.js App Router，静态导出到 `out/`。内容直接写在页面组件里，没有单独的数据层：
`app/research/page.tsx`（论文与学术服务）、`app/opensource/page.tsx`（开源项目）、
`app/articles/page.tsx`、`app/building/page.tsx`。

## 关联站点：fim-ai-www（公司站）

`/Users/TaoTao/Workspace/fim-ai-www` 是 fim.ai 官网，内容在 `lib/data/research.ts` 和
`lib/data/products.ts`。它和本站共享论文、外链、学术服务、开源项目这几类内容，**没有自动同步**。
在本仓库改这类内容时，提示用户是否同步过去。

同步前先判断「本真业务」，内容只落到与站点定位相符的一侧，不为同步而同步：

- 本站是作者站，个人布道和跨领域作品（如 ielts-whitepaper 这类非 AI 主线的开放课程）留在这里就好，不必进 fim.ai。
- 纯公司业务内容（产品页、招聘、部署案例）不必同步到本站。
- 判断不了归属时问用户，不要默认双放。
