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

如果你的代理能修改代码，可以直接让它帮你添加代码片段。如果不能，请使用 [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/) 来创建项目、拿到代码片段并验证第一个 page view。

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
<button data-aa-event="signup_cta_clicked" data-aa-event-plan="pro">
  Sign up for Pro
</button>
```

这会发送一个 `signup_cta_clicked` 事件，并带上 `{ plan: "pro" }`。

这通常也是代理最容易处理的方式。它们可以给现有标记加属性，而不用去接 `onclick` handler 或修改应用代码。

请把 `signup` 保留给账户真正创建完成的那个稳定时刻。如果按钮只是启动流程，请使用 `signup_started` 或 `signup_cta_clicked` 这样的中间事件，而不要把这次点击本身当成完成注册。

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

## 有账户体系的应用：`signup`、`login` 和 `identify`

对于有登录体系的应用，认证成功后的浏览器侧推荐写法是：

```js
window.aa?.identify(account.id);
window.aa?.set({ plan: account.plan, team: account.team });
```

请在认证成功后立刻调用 `aa.identify(account.id)`，并且要早于 `aa.set(...)` 或任何其他登录后浏览器事件。这样当前浏览器中的匿名行为才能被提升到与你服务端一致的规范用户 ID 上。

推荐的事件边界：

- `signup` 只发送一次，并且发生在账户真正创建时。最佳位置通常是服务端的账户创建路径。
- `login` 发生在已有账户完成认证时。这里也更适合放在服务端的认证回调或会话创建路径里。
- 对于账户创建之前的前置 UI 步骤，请使用 `signup_started`、`signup_cta_clicked` 或 `checkout_started` 这样的客户端事件。

这样分层之后，漏斗会更真实，浏览器事件和服务端认证事件也会落到同一个 `user_id` 上。

## SPA 路由与虚拟页面

当浏览器 URL 通过 `history.pushState()`、`history.replaceState()`、`popstate` 或 `hashchange` 发生变化时，Agent Analytics 会自动记录 `page_view`。这覆盖了大多数客户端路由器，包括基于 hash 的 SPA。

如果 UI 发生变化，但 path、query string 和 hash 都没有变化，跟踪器不会去猜测是不是出现了一个新页面。这种情况下，需要你手动发送 `page_view`。

推荐实现顺序：

1. 真实 URL 变化
2. Hash 路由
3. 手动虚拟 `page_view`

当当前浏览器 URL 已经和你要标记的页面一致时，可以使用 `aa.page(name)`。它会发送一个带有 `page` 属性的 `page_view`，但 `path` 和 `url` 仍然来自当前浏览器地址。

对于真正没有 URL 变化的虚拟页面，请手动发送 `page_view`，并自行覆盖路由字段：

```js
window.aa?.track('page_view', {
  page: 'Checkout Step 2',
  path: '/checkout/step-2',
  url: `${location.origin}/checkout/step-2`
});
```

不要把手动页面跟踪和 Agent Analytics 已经能自动跟踪的路由跳转叠加在同一次变化上，否则会重复计数。

如果你想用提示词驱动的方式来决定该用路由跟踪还是虚拟页面跟踪，请查看 [SPA 与虚拟页面跟踪](/zh/guides/spa-and-virtual-page-tracking/)。

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
- [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)
- [SPA 与虚拟页面跟踪](/zh/guides/spa-and-virtual-page-tracking/)
- [AI 代理实验跟踪](/zh/guides/ai-agent-experiment-tracking/)
- [Bot Traffic](/zh/reference/bot-traffic/)
- [Authentication](/zh/reference/authentication/)
- [API Reference](/zh/api/)
