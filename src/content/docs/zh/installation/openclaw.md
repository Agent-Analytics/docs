---
title: OpenClaw
description: 通过 ClawHub 在 OpenClaw 中安装 Agent Analytics skill，一次性暴露 API 密钥，并直接在聊天中使用官方 CLI。
---

对于 OpenClaw，最干净的路径是通过 ClawHub 安装托管 skill。它能保持 agent-native 的体验，并且非常适合 CLI 导向的工作流。

有一个关键点：`npx` 只是启动器。这个 skill 实际使用的是 Agent Analytics 官方 CLI，而 CLI 又封装了文档中同一套公开 HTTP API。

## 前置条件

- 一个 [app.agentanalytics.sh](https://app.agentanalytics.sh) 上的 Agent Analytics 账号
- 一个有效的 Agent Analytics API 密钥，并保存为 `AGENT_ANALYTICS_API_KEY`
- 你希望安装 skill 的 OpenClaw 环境访问权限

## 推荐：从 ClawHub 安装

告诉 OpenClaw：

> Install the Agent Analytics skill from ClawHub. My API key is available in `AGENT_ANALYTICS_API_KEY`. Use the official Agent Analytics CLI.

托管 listing 在这里：

- [Agent Analytics on ClawHub](https://clawhub.ai/dannyshmueli/agent-analytics)

安装后，OpenClaw 就可以在同一轮对话中创建项目、生成跟踪代码片段、查询统计、查看 funnels 并管理实验。

公共文档仍然很重要，因为它明确说明了 CLI 实际封装的内容：

- [CLI vs MCP vs API](/zh/reference/cli-mcp-api/)
- [API Reference](/zh/api/)

如果安全审查问起 `npx` 命令究竟做了什么，这就是正确解释。

## 验证安装

向 OpenClaw 询问：

- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `Send me a daily analytics summary every morning`

如果你还没有创建第一个真实项目，请继续阅读 [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)。

## 故障排查

- 如果 ClawHub 因为 `npx` 标记了这个 skill，请把审查方引导到 [CLI vs MCP vs API](/zh/reference/cli-mcp-api/) 和 [API Reference](/zh/api/)。CLI 就是这些已文档化端点之上的官方封装。
- 如果 skill 安装成功但无法查询数据，请确认 `AGENT_ANALYTICS_API_KEY` 位于 OpenClaw 的运行环境中，而不是直接粘贴在聊天里。
- 如果 OpenClaw 能创建项目但不能读取分析数据，请确认该密钥属于你预期的 Agent Analytics 账户。
- 如果你需要端点级调试，请先用 [API reference](/zh/api/) 搭配 `curl` 测试，再回到 skill 工作流。

## 相关内容

- [快速开始](/zh/getting-started/)
- [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)
- [Claude Code](/zh/installation/claude-code/)
- [OpenAI Codex](/zh/installation/openai-codex/)
- [API Reference](/zh/api/)
