---
title: Cursor
description: 在 Cursor 中安装 Agent Analytics skill，并优先使用 CLI 风格的工作流。只有在你确实需要 connector 风格工具调用时才使用 MCP。
---

<div class="aa-agent-badge aa-agent-badge--plain">
  <img src="/logos/cursor-final.png" alt="" />
  <span>Cursor</span>
</div>

在 Cursor 中，推荐先使用 Agent Analytics skill 加 CLI 风格工作流。实践中，这通常比 MCP 更快、更省 token，也更容易控制日常使用体验。

## 前置条件

- 已安装 Cursor
- Cursor 所使用的环境中可用 `npx`
- 可以访问你想连接到 Agent Analytics 的 Google 或 GitHub 身份，以便在 Cursor 打开浏览器审批时登录

## 推荐：安装 agent skill

```bash
npx skills add Agent-Analytics/agent-analytics-skill
```

然后告诉 Cursor：

```text
Set up Agent Analytics for this project. Install it here if needed. Open the browser for me or give me a login link, then wait. I will sign in with Google or GitHub, approve it, and paste back any finish code if you need it. Then create the project, add tracking and key events, and verify the first event.
```

这样 Cursor 会在同一环境中同时获得 Agent Analytics 的工作流层和面向 CLI 的执行方式。当你想获得比 MCP 更低延迟、更低 token 开销的体验时，这通常是最好的折中。浏览器审批会在设置过程中创建或连接账户，所以你不需要先准备 API key。

## 验证安装

向 Cursor 询问：

- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `What are the top pages for my-site this week?`

如果你还没有创建第一个真实项目，请继续阅读 [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)。

## 替代方案：添加自定义 MCP 服务器

只有当你明确希望使用 connector 风格的工具调用，而不是 skill + CLI 执行时，才在 Cursor 里启用 MCP。

1. 打开 Command Palette
2. 搜索 `MCP`
3. 选择 **Cursor Settings > Tools & MCP**
4. 点击 **Add Custom MCP**
5. 将以下内容加入你的 `mcp.json`：

```json
{
  "mcpServers": {
    "agent-analytics": {
      "url": "https://mcp.agentanalytics.sh/mcp"
    }
  }
}
```

保存文件后，如果工具列表没有自动刷新，请重新加载 Cursor。MCP 可以工作，但通常会比 skill 路径带来更高的延迟和 token 开销。

## 回退方案：直接使用 CLI

如果你不想要 skill 这一层，那么在降到原始 HTTP 之前，应该先回退到官方 CLI：

```bash
npx @agent-analytics/cli@0.5.14 login
npx @agent-analytics/cli@0.5.14 projects
npx @agent-analytics/cli@0.5.14 stats my-site --days 7
```

这样 Cursor 仍然停留在同一条 shell-first 路径上，不需要切换到手写 auth header 和原始请求 payload。关于登录行为、命令覆盖范围以及 CLI 到 API 的映射，请看独立的 [CLI 页面](/zh/reference/cli/)。

## 故障排查

- 如果 skill 卡在审批步骤，请完成浏览器登录；如果 Cursor 要求 finish code，就把它回贴给 Cursor。
- 如果你明确选择了高级/手动 API-key 路径，请确认 `AGENT_ANALYTICS_API_KEY` 存在于 Cursor 实际运行的环境中。
- 如果你选择了 MCP 路径，请确认 `mcp.json` 内容是有效 JSON。
- 添加自定义 MCP 服务器后，如果工具面板仍显示旧状态，请重启 Cursor。
- 如果 Cursor 能看到 MCP 服务器但看不到你的项目，请确认托管登录已使用正确账户完成。

## 相关内容

- [快速开始](/zh/getting-started/)
- [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)
- [CLI](/zh/reference/cli/)
- [CLI vs MCP vs API](/zh/reference/cli-mcp-api/)
- [Claude Desktop / Cowork](/zh/installation/claude-desktop-cowork/)
- [OpenAI Codex](/zh/installation/openai-codex/)
- [API Reference](/zh/api/)
