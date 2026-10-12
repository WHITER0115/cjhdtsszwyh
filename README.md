# CJHDTSSZWYH · 崔家黑洞吞噬孙子委员会 官网

一个纯静态单页展示网站（HTML + CSS + JS，零依赖、零构建）。
黑洞 / 混沌主题，含二十五席终焉体全员名录、创始四君、职务体系、事业部、混沌联动技与荒诞经营范围，并自带站内搜索。

```
cjhdtsszwyh/
├── index.html        # 主页面（所有内容都在这里）
├── assets/
│   ├── style.css     # 样式（黑洞主题 / 玻璃拟态 / 响应式）
│   └── script.js     # 交互（导航高亮 / 移动菜单 / 名录搜索 / 返回顶部）
├── robots.txt        # 搜索引擎抓取规则
├── sitemap.xml       # 站点地图（收录用）
├── 404.html          # 黑洞吞噬页（页面不存在时显示）
└── README.md         # 本说明
```

---

## 一、在自己电脑上本地预览（最简单）

不需要联网、不需要安装任何东西，任选一种：

**方式 A：Python（系统自带）**
```bash
cd cjhdtsszwyh
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

**方式 B：Node**
```bash
cd cjhdtsszwyh
npx serve
```

**方式 C：直接双击**
双击 `index.html` 用浏览器打开也能看（搜索等功能正常，仅个别浏览器对本地文件的字体加载略有差异）。

> 本地预览只有你自己能看到，别人搜不到。要让别人也能搜到，请看第二节「部署到公网」。

---

## 二、部署到公网，让别人也能访问（免费）

本网站是纯静态文件，可一键发布到免费静态托管平台。下面三种任选其一，
**重点：把站点名 / 仓库名设为 `cjhdtsszwyh`，部署后网址就会包含这个名字。**

### 方案 1：Netlify（最推荐，最快）
1. 打开 https://app.netlify.com/drop ，把整个 `cjhdtsszwyh` 文件夹拖进去。
2. 部署完成后，进入 Site settings → Site information → Change site name，填 `cjhdtsszwyh`。
3. 得到网址：**https://cjhdtsszwyh.netlify.app** ，发给别人即可访问。

### 方案 2：Vercel
1. 注册 https://vercel.com ，New Project → 上传 / 导入 `cjhdtsszwyh` 文件夹。
2. 项目名填 `cjhdtsszwyh`。
3. 得到网址：**https://cjhdtsszwyh.vercel.app** 。

### 方案 3：GitHub Pages
1. 在 GitHub 新建仓库，仓库名填 `cjhdtsszwyh` 。
2. 把本目录全部文件上传到仓库的 `main` 分支。
3. 仓库 Settings → Pages → Branch 选 `main` → Save。
4. 得到网址：**https://你的用户名.github.io/cjhdtsszwyh/** 。

---

## 三、让搜索引擎能「搜到」你（SEO 收录）

部署成功后，别人用百度 / Google 搜索 `CJHDTSSZWYH` 或 `崔家黑洞吞噬孙子委员会` 才能找到你。

1. **更新网址占位符**（部署后务必做）：
   - 编辑 `index.html` 里的 `<link rel="canonical" href="...">` 和 JSON-LD 里的 `"url"` ，把 `https://cjhdtsszwyh.netlify.app/` 改成你真实的网址。
   - 编辑 `sitemap.xml` 里的 `<loc>` ，同样改成真实网址。
   - 编辑 `robots.txt` 里的 `Sitemap:` 行，改成真实 sitemap 网址。
2. **主动提交收录**：
   - 百度：https://ziyuan.baidu.com/site/ → 添加站点 → 提交 sitemap.xml
   - Google：https://search.google.com/search-console → 添加资源 → 提交 sitemap.xml
3. **多分享链接**：把网址发到社交平台、论坛、朋友圈，外链越多，搜索排名越高。
4. **可选：买专属域名**（约 ¥50–80/年，如阿里云 / 腾讯云 / GoDaddy），例如 `cjhdtsszwyh.com` ，
   在购买平台拿到 DNS 后，到 Netlify / Vercel / GitHub Pages 的 Domain 设置里绑定即可。

> 提示：搜索引擎收录通常需要几天到几周，提交后耐心等待，并保持页面可正常访问。

---

## 四、想自己改内容？

- **改文字**：直接编辑 `index.html`（成员名称、事业部、经营范围等都是明文）。
- **改配色 / 字体**：编辑 `assets/style.css` 顶部 `:root` 里的变量（`--gold` 金色、`--purple` 紫、`--red` 红等）。
- **改交互**：编辑 `assets/script.js` 。
- 改完重新部署（拖拽上传 / 重新 push）即可生效。

---

© 奇点大爆炸 — 宇宙热寂 · 崔家黑洞吞噬孙子委员会 保留一切终焉体权利

---

## 中英文切换功能
导航栏右侧有「EN / 中」按钮：
- 默认中文，点一下整站（导航、章节、17 位成员终焉体全称、事业部、联动技、经营范围、页脚）即时切换为英文全译版；
- 再次点击切回中文；选择会记在浏览器里，下次打开自动沿用。
- 成员姓名、终焉体全称均为完整意译英文（如「熵增煎饼之神」→ God of Entropic Jianbing）。
- 名录搜索也支持中英文：英文模式下输入拼音/英文关键词（如 Guo Haoran、rust）也能筛选。
