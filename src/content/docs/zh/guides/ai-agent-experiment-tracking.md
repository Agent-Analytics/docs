---
title: AI 代理实验跟踪
description: 通过 AI 代理运行网站和应用的 A/B 测试，使用以提示词为主的实验创建、声明式变体、QA 和结果分析流程。
---

当你希望通过指挥 AI 代理替你完成工作，在真实网站或应用上运行浏览器侧 A/B 测试时，请使用这份指南。

这份指南关注的是页面元素，比如标题、CTA、定价文案和注册流程。它不适用于 prompt eval、模型对比，或代理内部工作流测试。

## 开始前先确认

- 你的网站已经安装了 `tracker.js`。
- 项目已经存在于 Agent Analytics 中。
- 你使用的是付费方案，因为实验功能不在免费层开放。
- 你已经确定了一个业务目标事件，比如 `signup`、`checkout` 或其他真实转化事件。

如果你还没完成初始配置，请先看 [快速开始](/zh/getting-started/)。

## 1. 先确定一个目标和一个要测试的 UI 元素

先从一个很小的改动开始。第一次实验最适合测试一个 CTA、一条标题或一条定价信息，并且只绑定一个业务事件。

可直接复制的提示词：

```text
我想在 my-site 上做一个 A/B 测试。请帮我选一个页面元素进行测试，并选一个能代表真实业务结果的目标事件。把范围限制在一个 CTA 或一条标题上。
```

除非页面浏览本身就是产品结果，否则尽量不要把 `page_view` 作为目标。大多数情况下，`signup`、`checkout` 或核心激活事件会更合适。

## 2. 让代理检查或补上目标事件

在创建实验之前，先确认目标事件已经被跟踪，并且命名与网站现有约定一致。

可直接复制的提示词：

```text
给这个 CTA 加上 signup 跟踪事件，并保持事件命名与现有站点命名一致。如果已经有对应事件，就复用它，不要新造一个名字。
```

如果事件很简单，代理通常应该优先使用声明式标记，而不是再写额外的 JavaScript。

## 3. 让代理创建实验

目标事件准备好后，让代理用一个清晰的名字和简单的变体来创建实验。

可直接复制的提示词：

```text
为 my-site 上的 signup CTA 创建一个实验，变体使用 control 和 new_cta，并把 signup 作为目标事件。
```

如果你想看这一步背后的精确请求和响应结构，请直接查看 [Experiments API 参考](/zh/api/#tag/experiments)。

实验名称建议使用 `snake_case`，并且要便于后续解释。`signup_cta` 会比 `homepage_test` 这种模糊名称更好。

## 4. 让代理用声明式方式接入变体

对于大多数网站，声明式变体是最干净的路径。原始 HTML 作为 control，变体内容放在 `data-aa-variant-*` 属性里。

可直接复制的提示词：

```text
把这个 hero 标题接到 signup_cta 实验里，使用声明式 tracker.js 属性来实现。保留现有文本作为 control，并把新变体写进 markup。
```

示例结果：

```html
<h1 data-aa-experiment="signup_cta"
    data-aa-variant-new_cta="Start free today">
  Start your free trial
</h1>
```

只有在 UI 过于动态、不适合声明式 HTML 时，才使用 `window.aa?.experiment()`。更底层的机制请查看 [Tracker.js](/zh/reference/tracker-js/)。

## 5. 让代理 QA 两个变体

在相信数据之前，先确认两个变体都能真正渲染出来，而且目标事件仍然会正确触发。

可直接复制的提示词：

```text
告诉我怎样在本地强制显示每个变体，以便我 QA 两个版本，然后确认 signup 事件在每个版本里都能正确触发。
```

强制变体 URL 通常长这样：

- `?aa_variant_signup_cta=control`
- `?aa_variant_signup_cta=new_cta`

你的代理应该使用这些 URL 来检查两个版本，而不是等待哈希分配命中。

## 6. 让代理读取结果并建议赢家

当实验开始获得流量后，让代理检查是否已经有足够数据，以及当前建议是什么。

可直接复制的提示词：

```text
检查 signup_cta 的结果，并告诉我现在是否已经有足够数据来选出赢家。如果有，请建议继续运行、暂停，还是直接完成实验并选定赢家。
```

如果你要查看读取结果、暂停、恢复、完成或删除实验对应的底层 HTTP 端点，请使用 [Experiments API 参考](/zh/api/#tag/experiments)。

决策应建立在业务目标事件上，而不是原始流量上。某个变体曝光更多，并不代表它一定更好，关键是它是否提升了 `signup` 或 `checkout`。

## 常见错误

- 一次同时测试太多元素，导致结果难以解释。
- 用 `page_view` 作为目标，而不是转化事件。
- 在目标事件还没真正埋好之前就先创建实验。
- 上线前没有先 QA 强制变体。
- 把布局、文案和报价改动都塞进同一个实验，而不是做一个更聚焦的改动。
- 明明已经知道赢家了，却还让实验继续跑着。

## 相关内容

- [指南](/zh/guides/)
- [快速开始](/zh/getting-started/)
- [Tracker.js](/zh/reference/tracker-js/)
- [CLI vs MCP vs API](/zh/reference/cli-mcp-api/)
- [Experiments API](/zh/api/#tag/experiments)
- [API 参考](/zh/api/)
