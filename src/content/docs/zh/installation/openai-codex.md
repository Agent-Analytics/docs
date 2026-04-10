---
title: OpenAI Codex
description: 为 OpenAI Codex 安装 Agent Analytics skill，使用浏览器审批作为正常路径，并把项目设置留在同一条代理工作流里。
---

<div class="aa-agent-badge aa-agent-badge--inverse">
  <img src="/logos/openai-white.png" alt="" />
  <span>OpenAI Codex</span>
</div>

对于 OpenAI Codex，目前最干净的路径是使用 Agent Skills 安装。这样整个工作流保持 agent-native，也不需要 MCP connector 流程。

## 前置条件

- Codex 所使用的环境中可用 `npx`
- 可以访问你想连接到 Agent Analytics 的 Google 或 GitHub 身份，以便在 Codex 打开浏览器审批时登录

## 推荐：安装 Agent Analytics skill

```bash
npx skills add Agent-Analytics/agent-analytics-skill@agent-analytics
```

然后告诉 Codex：

```text
Set up Agent Analytics for this project. Install it here if needed. Open the browser for me or give me a login link, then wait. I will sign in with Google or GitHub, approve it, and paste back any finish code if you need it. Then create the project, add tracking and key events, and verify the first event.
```

这个 skill 会教会 Codex 如何配置跟踪、查询分析、检查项目健康状况以及运行实验，全部都在同一轮对话中完成。浏览器审批会在设置过程中创建或连接账户，所以你不需要先准备 API key。

## 验证安装

向 Codex 询问：

- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `Create an experiment for the signup CTA on my-site`

如果你还没有创建第一个真实项目，请继续阅读 [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)。

## 故障排查

- 如果 skill 卡在审批步骤，请完成浏览器登录；如果 Codex 要求 finish code，就把它回贴给 Codex。
- 如果你明确选择了高级/手动 API-key 路径，请确认 `AGENT_ANALYTICS_API_KEY` 存在于代理实际运行的环境中。
- 如果 `npx` 不可用，请先安装所需的 Node.js 运行时，或者临时改走直接 API 路线。
- 如果你需要端点级调试，请使用 [API reference](/zh/api/) 并用 `curl` 进行测试。

## 相关内容

- [快速开始](/zh/getting-started/)
- [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)
- [CLI](/zh/reference/cli/)
- [Claude Code](/zh/installation/claude-code/)
- [Authentication](/zh/reference/authentication/)
- [API Reference](/zh/api/)
