---
title: SPA 与虚拟页面跟踪
description: 在 Agent Analytics 中跟踪 single-page app，同时避免重复计数。能用 URL 驱动路由时优先用路由，只有在必要时才手动发送虚拟 page view。
---

当你的网站或应用会在浏览器里切换页面，但不会触发完整页面刷新，而且你希望页面跟踪保持准确时，请使用这份指南。

这份指南适用于 React、Vue、Svelte、Next.js 客户端跳转、hash 路由、onboarding 流程，以及其他会在客户端切换界面的 UI。

## 开始前先确认

- 你的网站已经安装了 `tracker.js`。
- 项目已经存在于 Agent Analytics 中。
- 你知道应用在导航时是否会改变浏览器 URL，或者你准备先让代理帮你确认这一点。

如果你还没完成初始配置，请先看 [快速开始](/zh/getting-started/)。

## 1. 能用真实 URL 变化时，优先用它

当浏览器 URL 通过 `pushState`、`replaceState`、`popstate` 或 `hashchange` 变化时，Agent Analytics 会自动记录 `page_view`。

这意味着最干净的接入方式仍然是真实的客户端路由变化。如果 path、query string 或 hash 会随着新页面一起变化，Agent Analytics 就能直接跟上，而不需要额外手动埋点。

可直接复制的提示词：

```text
Inspect this app's client-side routing and tell me whether it uses real path changes, hash routing, or no URL changes at all. Prefer URL-driven routing and do not add manual page tracking if Agent Analytics already auto-detects the transition.
```

如果你的路由器已经为每个页面更新 URL，通常就不需要再额外添加任何东西。

## 2. Hash 路由也是支持的

像 `/#/settings` 或 `/#pricing` 这种基于 hash 的 SPA 也支持。Agent Analytics 会监听 `hashchange`，所以如果你想保留 URL 驱动的导航、又不想整页刷新，hash 路由是一个可行的 fallback。

可直接复制的提示词：

```text
Verify whether this app uses hash routing. If it does, keep the tracking URL-driven and confirm that Agent Analytics can rely on hash changes instead of extra manual page calls.
```

如果每次页面切换都会改变 hash，Agent Analytics 就应该把这些切换计为独立的 page view。

## 3. 只有在没有 URL 变化时，才添加手动虚拟页面跟踪

有些 UI 会切换页面，但浏览器 URL 完全不变。这在向导流程、标签式应用、嵌入式仪表盘和基于 modal 的流程里都很常见。

这种情况下，Agent Analytics 不会自动识别出新页面。你需要手动发送 `page_view`。

这里不要只写 `aa.page(name)`。`aa.page(name)` 只会补一个 `page` 标签，但 `path` 和 `url` 仍然来自当前浏览器地址。如果 URL 根本没变，报表里仍然会显示旧路径。

请使用 `track('page_view', ...)` 并手动覆盖路由字段：

```js
window.aa?.track('page_view', {
  page: 'Checkout Step 2',
  path: '/checkout/step-2',
  url: `${location.origin}/checkout/step-2`
});
```

框架无关示例：

```js
function trackCheckoutStep(step) {
  window.aa?.track('page_view', {
    page: `Checkout Step ${step}`,
    path: `/checkout/step-${step}`,
    url: `${location.origin}/checkout/step-${step}`
  });
}
```

可直接复制的提示词：

```text
Add manual virtual page tracking only for screen changes that do not update the browser URL. Use `window.aa?.track('page_view', { page, path, url })` and do not add tracking to routes that Agent Analytics already auto-tracks.
```

## 4. React 中处理无 URL 变化页面状态的例子

只有当页面切换时没有真实的 path、query 或 hash 变化，才使用这种模式。如果 React Router 已经更新了 URL，就让 Agent Analytics 自动跟踪。

```jsx
import { useEffect } from 'react';

function CheckoutFlow({ activeStep }) {
  useEffect(() => {
    if (!activeStep) return;

    window.aa?.track('page_view', {
      page: `Checkout Step ${activeStep}`,
      path: `/checkout/step-${activeStep}`,
      url: `${window.location.origin}/checkout/step-${activeStep}`
    });
  }, [activeStep]);

  return <div>{/* checkout UI */}</div>;
}
```

## 5. 在浏览器里 QA，并检查是否重复计数

在 localhost 上，Agent Analytics 不会发送生产数据，而是把跟踪调用打印到浏览器控制台。这样你就可以逐步点击 SPA 导航，确认每一次你想记录的页面切换都只产生一个 page view。

可直接复制的提示词：

```text
Open the app, click through the SPA navigation, and verify that each intended screen produces one `page_view`. Flag any transitions that send both an automatic page view and a manual one.
```

如果某一次切换出现重复 page view，请去掉那些本来就已经通过 URL 变化被自动跟踪的手动埋点。

## 常见错误

- 在 URL 根本不变的页面切换里直接使用 `aa.page(name)`。
- 对同一次切换同时发送路由驱动的自动 page view 和手动 page view。
- 手动发送虚拟 `page_view` 时忘记覆盖 `path` 和 `url`。

## 相关内容

- [指南](/zh/guides/)
- [快速开始](/zh/getting-started/)
- [Tracker.js](/zh/reference/tracker-js/)
- [AI 代理实验跟踪](/zh/guides/ai-agent-experiment-tracking/)
