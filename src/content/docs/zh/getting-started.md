---
title: 快速开始
description: 创建项目，在代理中安装 Agent Analytics，并验证第一次查询。
---

这是从零到可用 Agent Analytics 配置的最短路径。

主路径现在是 agent-first：先把 Agent Analytics 安装到你已经在用的代理里，让代理为你打开浏览器或给你一个登录链接，然后再让代理创建项目并接入跟踪。

如果你的代理已经安装好了，而且你想要一条最明确的创建项目、放入代码片段并验证第一个 page view 的完整引导，请使用 [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)。

## 1. 选择并完成一条安装路径

前往 [安装中心](/zh/installation/)，完成你实际使用环境对应的配置：

- [Claude Code](/zh/installation/claude-code/)
- [Claude Desktop / Cowork](/zh/installation/claude-desktop-cowork/)
- [Cursor](/zh/installation/cursor/)
- [OpenClaw](/zh/installation/openclaw/)
- [OpenAI Codex](/zh/installation/openai-codex/)

如果这些都不适合你，也可以直接使用 [API 参考](/zh/api/) 进行集成。

## 2. 在项目目录里打开你的代理

从你真正想跟踪的代码库或站点开始。

然后把下面这类请求交给代理：

- `Set up Agent Analytics for this project. Install it here if needed. Open the browser for me or send me the login link, then wait. I will sign in with Google or GitHub, approve it, and paste back any finish code if you need it. Then create the project, add tracking, and verify the first event.`

当浏览器审批页打开时，就用 Google 或 GitHub 登录并批准，然后让代理继续。这个审批会创建或连接你的账户，并把代理所需的 session 交给它。

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

## 高级 fallback：API 密钥

如果你需要为自己的运行时直接走 HTTP，也仍然可以在 [app.agentanalytics.sh](https://app.agentanalytics.sh) 里生成 API 密钥。这是高级/手动路径。CLI、MCP 和代理 onboarding 应该优先使用浏览器审批和 agent session。

## 下一步

- 使用 [安装](/zh/installation/) 获取针对不同代理的最快接入路径。
- 当你想要从代理已安装一直走到第一个真实项目上线的完整激活引导时，使用 [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)。
- 当你的应用在客户端切换页面，并且你希望在不重复计数的前提下保持准确页面跟踪时，使用 [SPA 与虚拟页面跟踪](/zh/guides/spa-and-virtual-page-tracking/)。
- 当你想让代理替你启动并读取浏览器侧实验时，使用 [AI 代理实验跟踪](/zh/guides/ai-agent-experiment-tracking/)。
- 使用 [Tracker.js](/zh/reference/tracker-js/) 查看浏览器端跟踪选项。
- 使用 [Bot Traffic](/zh/reference/bot-traffic/) 检查从正常分析中被过滤掉的自动化流量。
- 使用 [Authentication](/zh/reference/authentication/) 理解读令牌与写令牌的区别。
- 使用 [API Reference](/zh/api/) 查看端点级细节。
