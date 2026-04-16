---
title: CLI
description: 把 Agent Analytics CLI 用作已文档化 HTTP API 的官方 shell-first 包装层，包含 agent-session 登录和常见分析命令。
---

Agent Analytics CLI 是已文档化 HTTP API 的官方 shell-first 包装层。当你的代理已经具备终端访问能力，并且你希望获得可预测的命令输出、同时避免 MCP 工具调用式流程的额外开销时，就应该使用它。

已发布的包名是 `@agent-analytics/cli`。如果你想一次性直接运行，请通过 `npx` 并固定版本：

<!--email_off-->
```bash
npx @agent-analytics/cli@0.5.15 --help
```
<!--/email_off-->

源码仓库：[Agent-Analytics/agent-analytics-cli](https://github.com/Agent-Analytics/agent-analytics-cli)

在本页后续内容里，`agent-analytics` 指的都是来自同一包、同一版本的 CLI 可执行文件。

## 何时使用 CLI

在以下情况下优先选择 CLI：

- 你的代理本来就运行在 shell-first 环境中
- 你想要的是托管 API 之上的轻量包装层，而不是 connector 流程
- 你更喜欢命令组合和脚本化，而不是工具调用往返
- 你希望使用 `login`、`logout`、`whoami` 这类本地 auth 辅助命令

如果你还在不同接入路径之间做选择，而不是专门寻找 CLI 用法，请先看 [Plugin、Skill、MCP 与 API](/zh/reference/cli-mcp-api/)。

## 免登录 demo

如果你想让 AI agent 在连接真实账号前先试用真实 CLI/API workflow，可以使用公开 seeded demo：

<!--email_off-->
```bash
npx @agent-analytics/cli@0.5.15 demo
npx @agent-analytics/cli@0.5.15 --demo projects
npx @agent-analytics/cli@0.5.15 --demo stats agentanalytics-demo --days 7
npx @agent-analytics/cli@0.5.15 --demo paths agentanalytics-demo --goal signup --since 30d
npx @agent-analytics/cli@0.5.15 --demo funnel agentanalytics-demo --steps "page_view,signup_started,signup"
npx @agent-analytics/cli@0.5.15 --demo experiments list agentanalytics-demo
```
<!--/email_off-->

可以直接给 agent 的提示：

- "Run the Agent Analytics demo and tell me which page is leaking signups."
- "Use the demo data to find the highest-friction signup path."
- "Check the demo experiment and tell me whether there is a likely winner."

`--demo` 会从 `POST /demo/session` 获取一个短期只读 `aas_*` session，然后对托管的 `agentanalytics-demo` 项目运行正常读取命令。它不会暴露原始 `aak_*` API key，不会读写你保存的 CLI config，并会在本地拦截写入命令。

## 登录与本地配置

CLI 现在是 agent-session-first：

- 默认方式：`agent-analytics login` 会打开浏览器审批，并使用本地 loopback 回调
- 分离式交接：`agent-analytics login --detached` 会打印审批链接并退出，方便 issue/thread 或远程运行环境用 finish code 继续
- 可选轮询：`agent-analytics login --detached --wait` 会保持进程运行，适合可以等待浏览器审批的本地 shell
- 高级/手动方式：`agent-analytics login --token aak_...`

不要把粘贴长期 API key 作为主要 onboarding 路径。浏览器审批才是标准托管流程。

CLI 会把本地配置保存到 `$XDG_CONFIG_HOME/agent-analytics/config.json`，如果该变量不存在，则回退到 `~/.config/agent-analytics/config.json`。

环境变量覆盖仍然优先，因此只要 `AGENT_ANALYTICS_API_KEY` 还在环境中，CLI 就会继续优先使用它。

## 常用命令

```bash
agent-analytics projects
agent-analytics whoami
agent-analytics create my-site --domain https://mysite.com
agent-analytics stats my-site --days 7
agent-analytics insights my-site --period 7d
agent-analytics events my-site --days 7 --limit 20
agent-analytics breakdown my-site --property path --event page_view --days 7 --limit 10
agent-analytics funnel my-site --steps "page_view,signup,purchase"
agent-analytics retention my-site --period week --cohorts 8
agent-analytics experiments list my-site
agent-analytics logout
```

主要命令族包括：

- 账户与认证：`login`、`logout`、`whoami`、`revoke-key`
- 项目设置：`create`、`projects`
- 报表分析：`stats`、`insights`、`breakdown`、`pages`、`sessions-dist`、`events`、`sessions`、`query`
- 实时监控：`live`
- 结构发现：`properties`、`properties-received`
- 分析工作流：`funnel`、`retention`、`experiments`
- 产品反馈：`feedback`

## 项目管理

`projects` 会打印每个项目的名称、ID、project token 和允许的 origins。`project`、`update`、`delete` 可以接收精确项目名或项目 ID。

使用 `update` 可以直接在 CLI 中修改允许的 origins。做本地浏览器 QA 时，保留生产 origin，并添加临时本地 origin：

```bash
agent-analytics update stylio --origins 'https://stylio.app,http://lvh.me:3101'
```

## CLI 到 API 的映射

大多数 CLI 工作流都直接映射到某个 HTTP 端点。主要例外是像 `logout` 这样的本地 auth 便利命令，它只会修改本地 CLI 状态。

| CLI Command | API Endpoint |
| --- | --- |
| `agent-analytics stats my-site` | `GET /stats?project=my-site` |
| `agent-analytics all-sites --period 7d` | `GET /account/all-sites?period=7d` |
| `agent-analytics bot-traffic my-site --period 7d` | `GET /bot-traffic?project=my-site&period=7d` |
| `agent-analytics bot-traffic --all --period 7d` | `GET /account/bot-traffic?period=7d` |
| `agent-analytics events my-site` | `GET /events?project=my-site` |
| `agent-analytics query my-site --metrics event_count` | `POST /query` |
| `agent-analytics query my-site --metrics event_count --count-mode raw` | `POST /query` |
| `agent-analytics funnel my-site --steps "page_view,signup,purchase"` | `POST /funnel` |
| `agent-analytics retention my-site --period week --cohorts 8` | `GET /retention?project=my-site&period=week&cohorts=8` |
| `agent-analytics experiments list my-site` | `GET /experiments?project=my-site` |
| `agent-analytics experiments create my-site --name signup_cta --variants control,new_cta --goal signup` | `POST /experiments` |
| `agent-analytics experiments get exp_abc123` | `GET /experiments/{id}` |
| `agent-analytics projects` | `GET /projects` |
| `agent-analytics project my-site` | 解析名称或 ID 后调用 `GET /projects/{id}` |
| `agent-analytics update my-site --origins https://mysite.com` | 解析名称或 ID 后调用 `PATCH /projects/{id}` |
| `agent-analytics delete my-site` | 解析名称或 ID 后调用 `DELETE /projects/{id}` |
| `agent-analytics logout` | None. 仅本地命令，会清除已保存的 CLI auth，不会调用 API。 |

`logout` 只会清除 CLI 保存在本地磁盘上的认证状态，不会在服务器端吊销凭据。

## Query 注意事项

- 标准语法是 `agent-analytics query <project> ...`，不要使用 `--project`。
- `/events` 仍然保持原始且不丢失；`/query` 在 `event_count` 上默认使用 `session_then_user`。
- 当你关心的是摄取量或重复写入排查，而不是更安全的激活计数时，请使用 `--count-mode raw`。
- 内建查询字段只有 `event`、`user_id`、`date`、`country`、`session_id` 和 `timestamp`。
- `referrer`、`utm_source`、`path`、`browser`、`hostname` 这类非内建字段必须写成 `properties.<key>`。
- `group_by` 只支持内建字段：`event`、`date`、`user_id`、`session_id`、`country`。
- 如果你需要调试底层 payload 或过滤条件，请转到 [API Reference](/zh/api/)，不要把过于复杂的 shell JSON 强塞进 CLI。

## 相关内容

- [Plugin、Skill、MCP 与 API](/zh/reference/cli-mcp-api/)
- [Authentication](/zh/reference/authentication/)
- [Rate Limits](/zh/reference/rate-limits/)
- [API Reference](/zh/api/)
