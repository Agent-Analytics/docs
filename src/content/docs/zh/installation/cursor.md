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

- 一个 [app.agentanalytics.sh](https://app.agentanalytics.sh) 上的 Agent Analytics 账号
- 已安装 Cursor
- Cursor 所使用的环境中可用 `npx`
- 有效的 Agent Analytics API 密钥，并以 `AGENT_ANALYTICS_API_KEY` 提供

## 推荐：安装 agent skill

```bash
npx skills add Agent-Analytics/agent-analytics-mcp
export AGENT_ANALYTICS_API_KEY=aak_...
```

这样 Cursor 会在同一环境中同时获得 Agent Analytics 的工作流层和面向 CLI 的执行方式。当你想获得比 MCP 更低延迟、更低 token 开销的体验时，这通常是最好的折中。

## 验证安装

向 Cursor 询问：

- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `What are the top pages for my-site this week?`

如果你还没有创建第一个真实项目，请先回到 [快速开始](/zh/getting-started/#3-创建你的第一个项目) 完成它。

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

## 更底层的替代：直接调用 API

如果你想绕过 skill 和 MCP，也可以直接调用托管 API：

```bash
curl "https://api.agentanalytics.sh/stats?project=my-site&since=7d" \
  -H "X-API-Key: aak_..."
```

这种更底层的路径适合排查 auth 问题，但日常在 Cursor 中仍然推荐使用 skill + CLI。

## 故障排查

- 如果 skill 安装成功但查询失败，请确认 `AGENT_ANALYTICS_API_KEY` 存在于 Cursor 实际运行的环境中。
- 如果你选择了 MCP 路径，请确认 `mcp.json` 内容是有效 JSON。
- 添加自定义 MCP 服务器后，如果工具面板仍显示旧状态，请重启 Cursor。
- 如果 Cursor 能看到 MCP 服务器但看不到你的项目，请确认托管登录已使用正确账户完成。

## 相关内容

- [快速开始](/zh/getting-started/)
- [CLI vs MCP vs API](/zh/reference/cli-mcp-api/)
- [Claude Desktop / Cowork](/zh/installation/claude-desktop-cowork/)
- [OpenAI Codex](/zh/installation/openai-codex/)
- [API Reference](/zh/api/)
