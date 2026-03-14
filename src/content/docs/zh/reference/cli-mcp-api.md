---
title: CLI、MCP 与 API
description: Agent Analytics 可以通过 MCP、CLI 或原始 HTTP 使用。请选择最适合你的代理现有运行环境的接口。
---

Agent Analytics 有三种真正的访问方式：

- `MCP`：适合原生聊天或原生编辑器工具调用
- `CLI`：适合 shell 导向的代理工作流
- `API`：适合直接控制 HTTP

CLI 是建立在同一套公开 HTTP API 之上的便捷封装。如果你的环境对临时执行包比较严格，或者安全扫描器不喜欢 `npx`，那就直接使用 API 文档，底层工作流不会变化。

最佳选择取决于你的代理已经具备什么能力。

## 何时使用哪一种

### MCP

当你的代理已经运行在支持 connectors 或 MCP servers 的工具中时，使用 MCP，例如 Claude Desktop、Cowork、Cursor 或 Claude Code 插件流程。

MCP 通常最适合以下情况：

- 你希望安装过程在聊天里显得更原生
- 你想使用工具调用，而不是 shell 命令
- 你不想手动拼 auth header 或请求 payload
- 你想快速获得项目或账户级摘要，例如 `analytics_overview`、`bot_traffic_overview` 或 `all_sites_bot_traffic`

权衡：

- MCP 往往比 skill + CLI 流程带来更高的延迟和 token 开销，因为模型需要管理更多的工具调用往返和工具结果 payload。

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
| `npx @agent-analytics/cli query --project my-site --metrics event_count` | `POST /query` |
| `npx @agent-analytics/cli funnel my-site --steps "page_view,signup,purchase"` | `POST /funnel` |
| `npx @agent-analytics/cli retention my-site --period week --cohorts 8` | `GET /retention?project=my-site&period=week&cohorts=8` |
| `npx @agent-analytics/cli experiments list my-site` | `GET /experiments?project=my-site` |
| `npx @agent-analytics/cli experiments create my-site --name signup_cta --variants control,new_cta --goal signup` | `POST /experiments` |
| `npx @agent-analytics/cli experiments get exp_abc123` | `GET /experiments/{id}` |
| `npx @agent-analytics/cli projects` | `GET /projects` |
| `npx @agent-analytics/cli logout` | None. 仅本地命令，会清除已保存的 CLI auth，不会调用 API。 |

`logout` 会清除 CLI 保存在磁盘上的 API key，但不会在服务器上吊销它。如果你曾在 shell 中导出 `AGENT_ANALYTICS_API_KEY`，CLI 仍会继续使用这个环境变量进行认证，直到你把它取消掉。

## 快速经验法则

- 在 Cursor 这类可执行 shell 命令的环境中，优先选择 `CLI`。
- 当你明确希望使用 connector 风格工具调用，或者没有良好的 shell 路径时，选择 `MCP`。
- 当你需要完全控制或更底层的调试时，选择 `API`。

## 相关内容

- [Bot Traffic](/zh/reference/bot-traffic/)
- [安装总览](/zh/installation/)
- [Authentication](/zh/reference/authentication/)
- [API Reference](/zh/api/)
