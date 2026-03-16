---
title: Claude Desktop / Cowork
description: 在 Claude Desktop 或 Cowork 中连接托管 MCP 服务器，并直接在聊天里验证分析工具。
---

<div class="aa-agent-badge aa-agent-badge--plain">
  <img src="/logos/claude-code-logo.png" alt="" />
  <span>Claude Desktop / Cowork</span>
</div>

Claude Desktop 和 Cowork 都适合托管 MCP 流程。请使用 connector 界面，而不是在提示词里手动管理 API 密钥。

## 前置条件

- 一个 [app.agentanalytics.sh](https://app.agentanalytics.sh) 上的 Agent Analytics 账号
- 可以访问 Claude Desktop 或 Cowork
- 使用与你 Agent Analytics 账户匹配的 GitHub 或 Google 登录

## 推荐：添加托管 connector

1. 打开 **Settings**
2. 打开 **Connectors**
3. 选择 **Add**
4. 选择 **Custom**
5. 输入：

```text
https://mcp.agentanalytics.sh/mcp
```

系统会要求你使用 GitHub 或 Google 登录。请使用拥有 Agent Analytics 项目的同一身份。

## 验证安装

向 Claude 询问：

- `List my projects`
- `Show me a 7 day overview for my-site`
- `Where do users drop off between signup and purchase?`

这是最适合对话式分析的托管路径，因为 MCP 服务器能够在支持的环境中返回结构化工具结果和更丰富的 UI。

如果你还没有创建第一个真实项目，请继续阅读 [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)。

## 手动说明

- Claude Desktop 和 Cowork 使用的托管 MCP 服务器 URL 是相同的。
- connector 登录成功后，不需要再手动传递 `X-API-Key`。

## 故障排查

- 如果认证成功但没有出现项目，请确认当前登录账号与你的 Agent Analytics 仪表盘账户一致。
- 如果自定义 connector URL 被拒绝，请重新输入精确的 MCP 端点：`https://mcp.agentanalytics.sh/mcp`
- 如果你需要更底层的调试，请转到 [API reference](/zh/api/) 并使用直接 HTTP 调用测试同样的流程。

## 相关内容

- [快速开始](/zh/getting-started/)
- [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)
- [Claude Code](/zh/installation/claude-code/)
- [Cursor](/zh/installation/cursor/)
- [API Reference](/zh/api/)
