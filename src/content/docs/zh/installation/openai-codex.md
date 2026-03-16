---
title: OpenAI Codex
description: 为 OpenAI Codex 安装 Agent Analytics skill，一次设置 API 密钥，然后使用直接查询或引导式工作流。
---

<div class="aa-agent-badge aa-agent-badge--inverse">
  <img src="/logos/openai-white.png" alt="" />
  <span>OpenAI Codex</span>
</div>

对于 OpenAI Codex，目前最干净的路径是使用 Agent Skills 安装。这样整个工作流保持 agent-native，也不需要 MCP connector 流程。

## 前置条件

- 一个 [app.agentanalytics.sh](https://app.agentanalytics.sh) 上的 Agent Analytics 账号
- 一个有效的 Agent Analytics API 密钥
- Codex 所使用的环境中可用 `npx`

## 推荐：安装 Agent Analytics skill

```bash
npx skills add Agent-Analytics/agent-analytics-mcp
```

然后把 API 密钥暴露给代理环境：

```bash
export AGENT_ANALYTICS_API_KEY=aak_...
```

这个 skill 会教会 Codex 如何配置跟踪、查询分析、检查项目健康状况以及运行实验，全部都在同一轮对话中完成。

## 验证安装

向 Codex 询问：

- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `Create an experiment for the signup CTA on my-site`

如果你还没有创建第一个真实项目，请继续阅读 [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)。

## 故障排查

- 如果 skill 安装成功但查询失败，请确认 `AGENT_ANALYTICS_API_KEY` 存在于代理实际运行的环境中。
- 如果 `npx` 不可用，请先安装所需的 Node.js 运行时，或者临时改走直接 API 路线。
- 如果你需要端点级调试，请使用 [API reference](/zh/api/) 并用 `curl` 进行测试。

## 相关内容

- [快速开始](/zh/getting-started/)
- [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)
- [Claude Code](/zh/installation/claude-code/)
- [Authentication](/zh/reference/authentication/)
- [API Reference](/zh/api/)
