---
title: OpenClaw
description: 通过 ClawHub 在 OpenClaw 中安装 Agent Analytics skill，把浏览器审批和 finish code 作为正常登录路径，并把 workflow 留在聊天里。
---

对于 OpenClaw，最干净的路径是通过 ClawHub 安装托管 skill。它能保持 agent-native 的体验，并且非常适合 CLI 导向的工作流。

有一个关键点：`npx` 只是启动器。这个 skill 实际使用的是 Agent Analytics 官方 CLI，而 CLI 又封装了文档中同一套公开 HTTP API。

## 前置条件

- 你希望安装 skill 的 OpenClaw 环境访问权限
- 同一个 runtime 里有 `npx`
- 可以访问你想连接到 Agent Analytics 的 Google 或 GitHub 身份，以便在 OpenClaw 发来审批链接时登录

## 推荐：从 ClawHub 安装

告诉 OpenClaw：

> Install the Agent Analytics skill from ClawHub. Use the official Agent Analytics CLI. Send me the login link and wait. I will sign in with Google or GitHub, approve it, and paste back the finish code if you need it.

托管 listing 在这里：

- [Agent Analytics on ClawHub](https://clawhub.ai/dannyshmueli/agent-analytics)

安装后，OpenClaw 就可以在同一轮对话中创建项目、生成跟踪代码片段、查询统计、查看 funnels 并管理实验。

如果 OpenClaw 在登录这一步被卡住并要求你提供 finish code，浏览器页面应该大致长这样：

![Agent Analytics finish-code handoff screen](/finishcode.jpg)

## 持久 auth 存储

在 OpenClaw 和类似托管 runtime 中，不要依赖默认 home config 路径保存 Agent Analytics auth。登录前请使用 OpenClaw 管理的持久 workspace 路径：

```bash
export AGENT_ANALYTICS_CONFIG_DIR="$PWD/.openclaw/agent-analytics"
npx --yes @agent-analytics/cli@0.5.20 login --detached
npx --yes @agent-analytics/cli@0.5.20 auth status
```

同一任务里的每个 Agent Analytics CLI 命令都要保留这个设置。如果不能确定 shell 环境变量会持续存在，请给每条命令加前缀：

```bash
AGENT_ANALYTICS_CONFIG_DIR="$PWD/.openclaw/agent-analytics" npx --yes @agent-analytics/cli@0.5.20 projects
```

一次性调试时，也可以在命令前后传 `--config-dir "$PWD/.openclaw/agent-analytics"`。登录前确保 `.openclaw/` 已加入 gitignore，永远不要提交 `.openclaw/agent-analytics/config.json`。

公共文档仍然很重要，因为它明确说明了 CLI 实际封装的内容：

- [CLI vs MCP vs API](/zh/reference/cli-mcp-api/)
- [API Reference](/zh/api/)

如果安全审查问起 `npx` 命令究竟做了什么，这就是正确解释。

## 验证安装

向 OpenClaw 询问：

- `List my Agent Analytics projects`
- `Set up Agent Analytics for this project. Install it here if needed. Send me the login link and wait. I will sign in with Google or GitHub, approve it, and paste back the finish code if you need it. Then create the project, add tracking and key events, and verify the first event.`
- `How is my-site doing this week?`
- `Create a recurring 8:00 AM analytics job. Every morning, query Agent Analytics for the latest 24 hours across my projects and send me a short brief with anomalies, winners, drop-offs, and one recommended action.`

如果你还没有创建第一个真实项目，请继续阅读 [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)。

## 故障排查

- 如果 ClawHub 因为 `npx` 标记了这个 skill，请把审查方引导到 [CLI vs MCP vs API](/zh/reference/cli-mcp-api/) 和 [API Reference](/zh/api/)。CLI 就是这些已文档化端点之上的官方封装。
- 如果 OpenClaw 发出了审批链接但没有继续，请把 finish code 回贴到同一个线程里。
- 如果之前登录可用、后来又提示 "Not logged in"，请运行 `auth status` 并确认 `AGENT_ANALYTICS_CONFIG_DIR` 指向持久的 `.openclaw/agent-analytics` 路径。
- 如果 skill 安装成功但登录后仍然无法查询数据，请确认浏览器审批使用的是你预期的 Agent Analytics 账户。
- 如果你明确选择高级/手动 API key 路径，请确认 `AGENT_ANALYTICS_API_KEY` 位于 OpenClaw 的运行环境中，而不是直接粘贴在聊天里。
- 如果你需要端点级调试，请先用 [API reference](/zh/api/) 搭配 `curl` 测试，再回到 skill 工作流。

## 相关内容

- [快速开始](/zh/getting-started/)
- [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)
- [Claude Code](/zh/installation/claude-code/)
- [OpenAI Codex](/zh/installation/openai-codex/)
- [API Reference](/zh/api/)
