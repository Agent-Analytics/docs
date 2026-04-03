---
title: Claude Code
description: 优先通过托管插件在 Claude Code 中安装 Agent Analytics，然后再退回到 skill 或原始 MCP 方案。
---

<div class="aa-agent-badge aa-agent-badge--plain">
  <img src="/logos/claude-code-logo.png" alt="" />
  <span>Claude Code</span>
</div>

优先走插件路径。它会一次性为 Claude Code 提供 MCP 服务器连接和分析工作流层。

## 前置条件

- 本地已安装 Claude Code
- 可以访问你想连接到 Agent Analytics 的 Google 或 GitHub 身份，以便在 Claude Code 打开浏览器审批时登录

## 推荐：安装插件

```bash
/plugin marketplace add Agent-Analytics/agent-analytics-plugin
/plugin install agent-analytics
```

这是 Claude Code 最短的托管接入路径，因为它把 MCP 连接和使用指导打包在了一起。

## 验证安装

向 Claude Code 询问：

- `Set up Agent Analytics for this project. Install it here if needed. Open the browser for me or give me a login link, then wait. I will sign in with Google or GitHub, approve it, and paste back any finish code if you need it. Then create the project, add tracking and key events, and verify the first event.`
- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `What are the top pages for my-site this week?`

如果插件工作正常，Claude Code 应该能直接访问你的账户，而不需要你手写 HTTP 请求。

如果你还没有创建第一个真实项目，请继续阅读 [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)。

## 备选方案：安装 Claude Code skill

如果你不想使用完整插件，先走 skill 路径，再考虑原始 MCP：

```bash
npx skills add Agent-Analytics/agent-analytics-skill@agent-analytics
```

这个路径会让 Claude Code 学会如何配置跟踪、查询分析和运行实验。默认情况下，它使用浏览器审批和 agent session。只有在高级/手动 fallback 中才需要原始 API key。

## 更底层的备选：只接入 MCP 服务器

如果你只想使用 MCP 服务器，而不需要插件或 skill 层：

```bash
claude mcp add agent-analytics --transport http https://mcp.agentanalytics.sh/mcp
```

请使用 `--transport http`。托管 MCP 服务器并未配置为旧版 SSE transport。

## 故障排查

- 确认 Claude Code 使用浏览器审批连接的是你想接入 Agent Analytics 的 GitHub 或 Google 账户。
- 如果 plugin 或 skill 停在审批步骤，请完成浏览器登录，然后让 Claude Code 继续。
- 如果你明确选择了高级/手动 API-key 路径，请确认环境中暴露了 `AGENT_ANALYTICS_API_KEY`。
- 如果 MCP 命令失败，请检查你是否使用了 `--transport http`。

## 相关内容

- [快速开始](/zh/getting-started/)
- [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)
- [Claude Desktop / Cowork](/zh/installation/claude-desktop-cowork/)
- [Authentication](/zh/reference/authentication/)
- [API Reference](/zh/api/)
