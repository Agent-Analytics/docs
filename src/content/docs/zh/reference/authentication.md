---
title: 认证
description: 在接入代理或跟踪器之前，先理解 agent session、API key 和 project token 的区别。
---

Agent Analytics 使用三种不同的凭证。它们承担不同职责，不能互换。

## 代理会话 (`aas_*`)

代理会话用于：

- 官方 CLI 通过浏览器审批登录
- 通过托管审批流程完成认证的 plugin 和 skill 流程
- 需要让代理在审批后继续持有连接的 agent-native 设置

在正常产品流程里，你通常不会手动粘贴这个令牌。托管审批流程会为代理或 CLI 创建它，并保存在本地供后续使用。

## 管理活动中的代理会话

如果你之后想查看或撤销代理持有的登录，请打开 [app.agentanalytics.sh](https://app.agentanalytics.sh)，进入 `Account Settings` → `Agent Sessions`。

这个页面会显示当前活动的托管代理会话，例如：

- CLI 登录
- macOS Live 应用连接
- Paperclip 连接
- MCP 或其他托管 agent-session 客户端

当你想在服务器端撤销某一个会话时，就在这里点击 `Disconnect`。

## API 密钥 (`aak_*`)

API 密钥用于：

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

## 项目令牌 (`aat_*`)

项目令牌用于：

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

## CLI 的认证辅助命令

如果你使用官方 CLI，它提供了三个方便的 auth 命令：

- `npx --yes @agent-analytics/cli@0.5.20 login`：启动浏览器审批，并保存本地 CLI session。
- `npx --yes @agent-analytics/cli@0.5.20 login --detached`：为无界面或 issue/thread 风格的运行环境启动同样的流程，此时代理会把审批链接发给你，也可能要求你回贴 finish code。
- `npx --yes @agent-analytics/cli@0.5.20 upgrade-link --detached`：当 free 账户遇到付费分析任务时，生成给真人确认付款的交接链接。
- `npx --yes @agent-analytics/cli@0.5.20 logout`：清除本地保存的 CLI auth。

`logout` 只会清除 CLI 本地状态。如果你还想撤销服务器端保存的托管 session，请到 Web 应用里的 `Agent Sessions` 区域断开对应连接。

Scoped agent sessions 不能生成或轮换原始账户 API key。兼容性 API key 请在 dashboard 中管理。

如果你在 shell 环境里设置了 `AGENT_ANALYTICS_API_KEY`，那么即使执行了 `logout`，CLI 仍会继续使用这个环境变量，直到你主动取消它。

## 相关内容

- [快速开始](/zh/getting-started/)
- [CLI、MCP 与 API](/zh/reference/cli-mcp-api/)
- [错误格式](/zh/reference/error-format/)
- [API 参考](/zh/api/)
