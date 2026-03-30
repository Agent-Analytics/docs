---
title: Plugin、Skill、MCP、CLI 与 API
description: Agent Analytics 通过 plugin、skill、MCP、CLI 和原始 HTTP 暴露同一套分析界面。请选择最适合你的代理现有运行环境的原生路径。
---

Agent Analytics 通过五种真实访问路径暴露同一套分析界面：

- `Plugin` 适用于 Claude Code，当你想把 MCP 连接和分析 workflow 层打包成一次安装
- `Skill` 适用于已经支持 skills 且能执行命令的代理环境
- `MCP` 适用于原生聊天或原生编辑器工具调用
- `CLI` 适用于 shell 导向的代理工作流
- `API` 适用于直接控制 HTTP

产品模型不会因为入口不同而变化。项目、分析读取和实验操作都保持一致；变化的只是最自然的入口方式。

## 按环境推荐的路径

| 环境 | 推荐路径 | 原因 |
| --- | --- | --- |
| Claude Code | Plugin 优先 | 最短的托管接入路径，同时拿到 MCP 连接和 Agent Analytics workflow guidance |
| Claude Desktop / Cowork | Hosted MCP | 最适合 connector 风格聊天工具的原生 tool call |
| Cursor | Skill + CLI 优先 | 当代理已经能执行命令时，通常比 MCP 开销更低 |
| OpenAI Codex | Skill 优先 | 保持 agent-native workflow，不强依赖 MCP |
| OpenClaw | Skill 优先 | 在聊天里跑定时分析 workflow 的最干净路径 |
| Custom runtime 或内部代理 | API | 最适合自己掌控重试、解析和编排的场景 |

## 何时使用哪一种路径

### Plugin

当环境是 Claude Code，并且你想通过一次安装同时获得下面两样东西时，优先使用 plugin：

- 托管 MCP 连接
- Agent Analytics 专用 workflow 层

当 marketplace 路径可用时，这是最干净的默认方案。

### Skill

当你的代理已经支持 skills，并且能在同一环境里执行命令时，使用 skill。

Skill 通常最适合以下情况：

- 你想给常见分析任务加上一层引导式 workflow
- 你的代理已经有终端访问能力
- 你想留在代理自己的原生闭环里，而不是切换到 tool-call 更重的 MCP 流程

### MCP

当你的代理已经运行在支持 connectors 或 MCP servers 的工具中时，使用 MCP。

MCP 通常最适合以下情况：

- 你希望安装过程在聊天里显得更原生
- 你想使用工具调用，而不是 shell 命令
- 你不想手动拼 auth header 或请求 payload
- 你想快速获得项目或账户级摘要，并通过结构化工具结果返回

权衡：

- MCP 往往比 skill + CLI 流程带来更高的延迟和 token 开销，因为模型需要管理更多工具调用往返和工具结果 payload。

### CLI

当你的代理已经具备终端访问能力并且擅长执行命令时，使用 CLI。

CLI 通常最适合以下情况：

- 你的代理本来就运行在 shell-first 环境中
- 你希望得到稳定、可预测的命令输出
- 你更喜欢组合命令，而不是集成工具
- 你在像 Cursor 这样的编辑器代理里，希望获得比 MCP 更低的开销
- 你想使用像 `login` 和 `logout` 这样的本地 auth 辅助命令

### API

当你希望完全控制请求、重试策略和响应解析时，使用 API。

API 通常最适合以下情况：

- 你在自己的代码中集成
- 你需要精确的 HTTP 级行为
- 你正在直接调试 auth 或 payload 结构

## CLI 到 API 的映射

大多数 CLI 工作流都直接映射到某个 HTTP 端点。主要例外是像 `logout` 这种本地 auth 便利命令，它只修改本地 CLI 状态：

| CLI Command | API Endpoint |
| --- | --- |
| `npx @agent-analytics/cli stats my-site` | `GET /stats?project=my-site` |
| `npx @agent-analytics/cli all-sites --period 7d` | `GET /account/all-sites?period=7d` |
| `npx @agent-analytics/cli bot-traffic my-site --period 7d` | `GET /bot-traffic?project=my-site&period=7d` |
| `npx @agent-analytics/cli bot-traffic --all --period 7d` | `GET /account/bot-traffic?period=7d` |
| `npx @agent-analytics/cli events my-site` | `GET /events?project=my-site` |
| `npx @agent-analytics/cli query my-site --metrics event_count` | `POST /query` |
| `npx @agent-analytics/cli funnel my-site --steps "page_view,signup,purchase"` | `POST /funnel` |
| `npx @agent-analytics/cli retention my-site --period week --cohorts 8` | `GET /retention?project=my-site&period=week&cohorts=8` |
| `npx @agent-analytics/cli experiments list my-site` | `GET /experiments?project=my-site` |
| `npx @agent-analytics/cli experiments create my-site --name signup_cta --variants control,new_cta --goal signup` | `POST /experiments` |
| `npx @agent-analytics/cli experiments get exp_abc123` | `GET /experiments/{id}` |
| `npx @agent-analytics/cli projects` | `GET /projects` |
| `npx @agent-analytics/cli logout` | None. 仅本地命令，会清除已保存的 CLI auth，不会调用 API。 |

`logout` 会清除 CLI 保存在磁盘上的 API key，但不会在服务器上吊销它。如果你曾在 shell 中导出 `AGENT_ANALYTICS_API_KEY`，CLI 仍会继续使用这个环境变量进行认证，直到你把它取消掉。

## 快速经验法则

- 在 Claude Code 中，若 marketplace 路径可用，优先选择 `plugin`。
- 在 Cursor 或 Codex 这类能跑 shell 的环境中，优先选择 `skill + CLI`。
- 当代理已经生活在 connector 风格的聊天环境里，并且你希望使用原生 tool calls 时，选择 `MCP`。
- 当你需要完全控制、自定义集成或底层调试时，选择 `API`。

## 相关内容

- [安装总览](/zh/installation/)
- [Authentication](/zh/reference/authentication/)
- [Bot Traffic](/zh/reference/bot-traffic/)
- [API Reference](/zh/api/)
