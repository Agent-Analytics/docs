---
title: 快速开始
description: 创建项目，在代理中安装 Agent Analytics，并验证第一次查询。
---

这是从零到可用 Agent Analytics 配置的最短路径。

## 1. 获取你的 API 密钥

在 [app.agentanalytics.sh](https://app.agentanalytics.sh) 注册，然后在仪表盘中生成 API 密钥。

- API 密钥（`aak_*`）用于读取分析数据、管理项目，以及配置 agent skill。
- 项目令牌（`aat_*`）用于放进你网站上的跟踪代码片段。

## 2. 选择并完成一条安装路径

前往 [安装中心](/zh/installation/)，完成你实际使用环境对应的配置：

- [Claude Code](/zh/installation/claude-code/)
- [Claude Desktop / Cowork](/zh/installation/claude-desktop-cowork/)
- [Cursor](/zh/installation/cursor/)
- [OpenClaw](/zh/installation/openclaw/)
- [OpenAI Codex](/zh/installation/openai-codex/)

如果这些都不适合你，也可以直接使用 [API 参考](/zh/api/) 进行集成。

## 3. 创建你的第一个项目

连接好代理之后，让它帮你创建第一个项目：

- `Create a project called my-site.com`
- `Create a project called my-site.com and give me the tracking snippet`

如果你的代理有权写入网站代码，也可以直接让它：

- `Set up analytics for my-site.com`

你的代理应该会创建项目，然后：

- 把跟踪代码片段返回给你手动粘贴，或者
- 如果它能修改网站代码，就直接帮你安装跟踪器

## 4. 如果需要，手动添加跟踪器

如果代理已经把跟踪器加到网站里了，可以跳过这一步。

如果它只是创建了项目并返回代码片段，请在 `</body>` 前加入下面这段脚本：

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."></script>
```

页面浏览会自动跟踪。后续你可以通过 `data-aa-event` 属性或 `window.aa.track()` 添加自定义事件。

如果你的网站使用 Astro，请给这段 tracker 标签加上 `is:inline`。

如果你需要声明式事件、跨域身份、consent、滚动深度、vitals 或错误跟踪等高级选项，请使用 [Tracker.js 指南](/zh/reference/tracker-js/)。
如果你的应用是 SPA，请查看 [SPA 与虚拟页面跟踪](/zh/guides/spa-and-virtual-page-tracking/)，了解 Agent Analytics 会自动跟踪哪些跳转，以及什么时候应该手动发送虚拟 `page_view`。
如果你想在完成配置后让代理帮你启动第一个浏览器侧 A/B 测试，请继续阅读 [AI 代理实验跟踪](/zh/guides/ai-agent-experiment-tracking/)。

## 5. 验证闭环

当安装已生效、跟踪器也开始工作后，向你的代理发起这些查询之一：

- `List my projects`
- `How is my-site doing this week?`
- `What are the top pages for my-site this week?`
- `Show bot traffic for my-site this week`

如果配置正确，代理应该能直接回答，而不需要你手写 HTTP 请求。

## 下一步

- 使用 [安装](/zh/installation/) 获取针对不同代理的最快接入路径。
- 当你的应用在客户端切换页面，并且你希望在不重复计数的前提下保持准确页面跟踪时，使用 [SPA 与虚拟页面跟踪](/zh/guides/spa-and-virtual-page-tracking/)。
- 当你想让代理替你启动并读取浏览器侧实验时，使用 [AI 代理实验跟踪](/zh/guides/ai-agent-experiment-tracking/)。
- 使用 [Tracker.js](/zh/reference/tracker-js/) 查看浏览器端跟踪选项。
- 使用 [Bot Traffic](/zh/reference/bot-traffic/) 检查从正常分析中被过滤掉的自动化流量。
- 使用 [Authentication](/zh/reference/authentication/) 理解读令牌与写令牌的区别。
- 使用 [API Reference](/zh/api/) 查看端点级细节。
