---
title: Authentication
description: 在接入代理或跟踪器之前，先理解 agent session、API key 和 project token 的区别。
---

Agent Analytics 使用三种不同的凭证。它们承担不同职责，不能互换。

## Agent session (`aas_*`)

agent session 用于：

- 官方 CLI 通过浏览器审批登录
- 通过托管审批流程完成认证的 plugin 和 skill 流程
- 需要让代理在审批后继续持有连接的 agent-native 设置

在正常产品流程里，你通常不会手动粘贴这个令牌。托管审批流程会为代理或 CLI 创建它，并保存在本地供后续使用。

## API key (`aak_*`)

API key 用于：

- 读取分析数据
- 创建或列出项目
- 账户级端点
- 从脚本、工具和代理中直接访问 API

可以通过 `X-API-Key` 头或 `?key=` 查询参数传递。

```bash
curl "https://api.agentanalytics.sh/stats?project=my-site&since=7d" \
  -H "X-API-Key: aak_..."
```

请把它当作密钥信息处理。

## Project token (`aat_*`)

Project token 用于：

- `POST /track`
- `POST /track/batch`
- 嵌入在网站中的浏览器 tracker 代码片段

这个 token 设计上就是公开的。它用于标识事件接收时对应的项目，因此本来就会出现在 HTML 中。

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."></script>
```

## 常见错误

不要把 API key 放进客户端 tracker 中。tracker 只使用公开的 project token。

## CLI 的 auth 辅助命令

如果你使用官方 CLI，它提供了三个方便的 auth 命令：

- `npx @agent-analytics/cli login`：启动浏览器审批，并保存本地 CLI session。
- `npx @agent-analytics/cli login --detached`：为无界面或 issue/thread 风格的运行环境启动同样的流程，此时代理会把审批链接发给你，也可能要求你回贴 finish code。
- `npx @agent-analytics/cli login --token aak_...`：把 API key 保存在本地，作为高级/手动 fallback。
- `npx @agent-analytics/cli logout`：清除本地保存的 CLI auth。

如果你是通过 `--token` 登录的，`logout` 不会在服务器端吊销 API key。当你想让旧 key 失效并签发新 key 时，请使用 `revoke-key`。

如果你在 shell 环境里设置了 `AGENT_ANALYTICS_API_KEY`，那么即使执行了 `logout`，CLI 仍会继续使用这个环境变量，直到你主动取消它。

## 相关内容

- [快速开始](/zh/getting-started/)
- [CLI vs MCP vs API](/zh/reference/cli-mcp-api/)
- [Error Format](/zh/reference/error-format/)
- [API Reference](/zh/api/)
