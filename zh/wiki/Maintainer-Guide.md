# 维护指南：在 macOS 的 VS Code 中管理网站与 Wiki

## 两种资源分别维护

网站源码与线上 GitHub Wiki 使用不同 Git 仓库。网站提交不会自动更新 Wiki 页面。

| 资源 | Git 地址 |
| --- | --- |
| 网站 | `https://github.com/gauss1777/icgoa_2026_ai_for_archaea_workshop.git` |
| 线上 GitHub Wiki | `https://github.com/gauss1777/icgoa_2026_ai_for_archaea_workshop.wiki.git` |

本目录是**仓库内的中文 Wiki 文档**，保存在网站仓库的 `zh/wiki/`；上表中的独立 Wiki 仓库指线上英文 GitHub Wiki，不能把两者混为一谈。

## 在 macOS 的 VS Code 中更新网站

1. 使用 **File > Open Folder（文件 > 打开文件夹）**打开网站仓库。
2. 没有相互冲突的本地修改时，先拉取最新内容。
3. 编辑需要修改的 HTML、CSS、JavaScript 或 Markdown。英文页面在仓库根目录，中文页面和文档在 `zh/`。
4. 本地预览，并检查修改页面在桌面和手机宽度下的表现。
5. 查看 **Source Control（源代码管理）**，只暂存本次有意修改的文件，提交简短、客观的说明。
6. 推送，或使用 **Sync Changes（同步更改）**。
7. 检查仓库 **Actions** 中的部署结果，再查看线上页面。

新建本地副本时：

```sh
git clone https://github.com/gauss1777/icgoa_2026_ai_for_archaea_workshop.git
cd icgoa_2026_ai_for_archaea_workshop
python3 -m http.server 8000 --bind 127.0.0.1
```

已安装 Python 3 时，打开 `http://127.0.0.1:8000/zh/` 查看中文页面，或打开根地址查看英文页面。按 `Ctrl+C` 停止服务器。

## 更新线上 Wiki

最简单的方式是打开 GitHub 的 **Wiki > Edit > Save page**。

已存在初始 Wiki 页面后，可使用独立 Git 仓库：

```sh
git clone https://github.com/gauss1777/icgoa_2026_ai_for_archaea_workshop.wiki.git
cd icgoa_2026_ai_for_archaea_workshop.wiki
git pull --ff-only
```

在另一个 VS Code 窗口打开该文件夹，编辑 Markdown、检查更改，再通过源代码管理提交并推送。需要认证时使用正常 GitHub 登录流程；不要把令牌写进 Markdown 或远程地址。

线上 Wiki 的 `Home.md` 是首页，`_Sidebar.md` 和 `_Footer.md` 提供共享导航。其他 Markdown 文件名对应 Wiki 页名。修改标题时，保持页面地址稳定。

中文文档的 `Home.md`、`_Sidebar.md` 和 `_Footer.md` 目前只是网站仓库中的 Markdown 文件，不会自动成为线上 Wiki 的共享导航。

## 发布前核查

检查链接、来源标识符、版本、实际阅读范围和科学结论边界。更改说明使用平实、客观的措辞。凭据、个人信息和未发表数据应保存在公开仓库外。

两个浏览器演示保持模拟教学性质。更新阅读卡片时，不能悄悄将其改称模型输出或已获实验验证的结果。

更新原文阅读资料时，保留研究截止日期，并区分本轮新检查的段落与较早笔记。

## 部署与编辑问题

推送失败时，保留本地修改，解决认证或网络问题后再重试。不要覆盖他人的工作。遇到合并冲突时，检查两个版本，不要直接丢弃改动。

Pages 部署与 Wiki 发布相互独立，更新后应分别检查两个目标。

[GitHub Wiki 官方文档](https://docs.github.com/en/communities/documenting-your-project-with-wikis/adding-or-editing-wiki-pages) | [中文 Wiki 首页](Home.md)
