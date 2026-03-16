---
title: Tracker.js
description: 用一个 script 标签把 Agent Analytics 加到任意网站，然后开启声明式事件、consent、性能跟踪以及其他浏览器端能力。
---

`tracker.js` 是 Agent Analytics 的浏览器端部分。适合用于页面浏览、自定义事件以及客户端实验，而无需引入一个很重的 SDK。

API 参考现在把 `GET /tracker.js` 仅视为脚本端点。安装和功能指南放在这里。

## 基础代码片段

在 `</body>` 前加入：

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."></script>
```

必填属性：

- `data-project`：你的项目名称
- `data-token`：公开项目令牌（`aat_*`）

跟踪器会自动收集页面 URL、pathname、referrer、浏览器、操作系统、设备、语言、时区、UTM 参数、session 次数以及 first-touch attribution。不需要 cookies。

到达跟踪器的自动化流量会从你的正常分析中被过滤掉。如果你想单独检查这些自动请求，请使用 [Bot Traffic](/zh/reference/bot-traffic/)。

如果你的代理能修改代码，可以直接让它帮你添加代码片段。如果不能，请在 [快速开始](/zh/getting-started/#3-创建你的第一个项目) 中创建项目，再手动粘贴返回的代码片段。

## 常见选项

| Attribute | 作用 |
| --- | --- |
| `data-link-domains="example.com"` | 在同级域名或子域之间关联匿名身份 |
| `data-do-not-track="true"` | 遵循浏览器的 Do Not Track 信号 |
| `data-heartbeat="15"` | 在标签页可见时测量页面活跃时长 |
| `data-track-outgoing="true"` | 将外链点击记录为 `outgoing_link` |
| `data-track-clicks="true"` | 将 `<a>` 和 `<button>` 点击记录为 `$click` |
| `data-track-errors="true"` | 捕获未处理的 JS 错误和 promise rejection，并记录为 `$error` |
| `data-track-performance="true"` | 为 `page_view` 添加 Navigation Timing 指标 |
| `data-track-vitals="true"` | 为 `page_view` 添加 Core Web Vitals |
| `data-track-downloads="true"` | 将下载链接点击记录为 `$download` |
| `data-track-forms="true"` | 将表单提交记录为 `$form_submit` |
| `data-track-404="true"` | 将 404 页面记录为 `$404` |
| `data-track-scroll-depth="true"` | 为 `page_view` 添加最大滚动深度 |
| `data-require-consent="true"` | 在获得 consent 前先缓冲事件 |

示例：

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."
        data-track-outgoing="true"
        data-track-performance="true"
        data-track-vitals="true"
        data-track-errors="true"
        data-track-scroll-depth="true"
        data-heartbeat="15"></script>
```

## 声明式事件

对于简单点击跟踪，通常不需要写自定义 JavaScript。你可以直接在 HTML 中加入 `data-aa-event`：

```html
<button data-aa-event="signup" data-aa-event-plan="pro">
  Sign up for Pro
</button>
```

这会发送一个 `signup` 事件，并带上 `{ plan: "pro" }`。

这通常也是代理最容易处理的方式。它们可以给现有标记加属性，而不用去接 `onclick` handler 或修改应用代码。

## 曝光跟踪

如果你想知道某个区块是否真的被看到：

```html
<section data-aa-impression="pricing_table"
         data-aa-impression-plan="pro">
  ...
</section>
```

当元素进入可见区域时，跟踪器会发送一个 `$impression` 事件。

## `window.aa` API

当事件依赖运行时状态时，请使用 JavaScript API：

```js
window.aa?.track('checkout_started', { plan: 'pro' });
window.aa?.identify('user_123');
window.aa?.set({ plan: 'pro', team: 'acme' });
```

常用方法：

- `aa.track(event, properties)`：发送自定义事件
- `aa.page(name)`：手动发送 page view
- `aa.identify(id)`：把匿名行为关联到已知用户 ID
- `aa.set(properties)`：为后续事件附加全局属性
- `aa.experiment(name, variants)`：在客户端确定性分配实验版本
- `aa.grantConsent()` / `aa.revokeConsent()`：管理 consent 模式

## 常见配方

### 跨域身份关联

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."
        data-link-domains="example.com,app.example.com,docs.example.com"></script>
```

### 隐私与 consent

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."
        data-do-not-track="true"
        data-require-consent="true"></script>
```

```js
window.aa?.grantConsent();
window.aa?.revokeConsent();
```

### 实验

```html
<h1 data-aa-experiment="hero_text"
    data-aa-variant-b="Try it free today!">
  Start your free trial
</h1>
```

如果你想查看完整的提示词优先工作流，包括如何通过代理创建、接入、QA 和读取实验结果，请使用 [AI 代理实验跟踪](/zh/guides/ai-agent-experiment-tracking/)。

### 本地开发

在 localhost 上，跟踪器会切换到开发模式，并把活动记录到浏览器控制台，而不是发送到生产环境。这样本地测试就不会污染真实分析数据。

## 相关内容

- [快速开始](/zh/getting-started/)
- [AI 代理实验跟踪](/zh/guides/ai-agent-experiment-tracking/)
- [Bot Traffic](/zh/reference/bot-traffic/)
- [Authentication](/zh/reference/authentication/)
- [API Reference](/zh/api/)
