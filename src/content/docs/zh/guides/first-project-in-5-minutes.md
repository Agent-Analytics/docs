---
title: 5 分钟完成第一个项目
description: 从已经接入好的代理出发，完成一个真正上线的 Agent Analytics 项目，放好 tracker、验证第一个 page view，并问出一个真实的分析问题。
---

当你的代理安装已经完成、现在只想尽快跑通第一次成功闭环时，就用这篇指南。

如果你还需要先连接代理，请先回到[安装中心](/zh/installation/)或简短版的[快速开始](/zh/getting-started/)。

## 1. 先确认代理安装已经可用

向你的代理发出：

```text
列出我的 Agent Analytics 项目，并确认你可以访问我的账户。
```

如果代理还看不到你的账户，就先停在这里，完成正确的[安装路径](/zh/installation/)。

## 2. 创建第一个项目并拿到 tracker 代码片段

向你的代理发出：

```text
创建一个名为 my-site.com 的项目，并把跟踪代码片段给我。
```

这一步你只需要得到两种结果之一：

- 代理创建项目并把 tracker 代码片段返回给你手动粘贴
- 代理创建项目并且可以自己把代码片段放进网站

## 3. 选择适合你当前环境的路径

### 代理可以改代码

如果代理可以修改你的网站代码，就让它执行：

```text
创建一个名为 my-site.com 的项目，把 Agent Analytics 跟踪代码片段加到网站里，并准确告诉我你改了哪个文件。
```

然后再问：

```text
告诉我你把代码片段放在了哪里，并确认它会在我首先要跟踪的页面上加载。
```

如果你的网站使用 Astro，请让代理给 tracker 的 `<script>` 标签加上 `is:inline`。

### 手动粘贴

如果代理不能修改网站，就让它执行：

```text
创建一个名为 my-site.com 的项目，并给我需要粘贴在 </body> 前的完整 tracker 代码片段。
```

把返回的代码片段粘贴进网站，必要时部署，然后继续下一步。

如果你的网站使用 Astro，请在发布前给 tracker 的 `<script>` 标签加上 `is:inline`。

## 4. 打开真实页面并验证第一个 `page_view`

先在浏览器里打开你网站上的一个被跟踪页面，然后向代理发出：

```text
检查 my-site.com 今天是否已经收到了第一个 page_view，并告诉我你看到了哪个页面。
```

如果你还想再确认一次，可以继续问：

```text
验证 my-site.com 的 tracker 已经生效，并确认第一个 page_view 已经到达。
```

如果你需要手动做一次 sanity check，也可以打开 [app.agentanalytics.sh](https://app.agentanalytics.sh) 确认项目已经存在，而且代码片段和代理使用的一致。

## 5. 问一个真实的分析问题

当第一个 `page_view` 已经进来后，问一个简单问题：

```text
my-site.com 今天表现怎么样？
```

也可以换成：

- `今天 my-site.com 的热门页面是什么？`
- `给我看看今天 my-site.com 的 bot traffic。`

这里的目标很简单：证明你的代理可以创建项目、接入跟踪、看到实时数据，并回答一个真实问题，而不需要你手写 HTTP 请求。

## 下一步

- 使用[快速开始](/zh/getting-started/)查看整个配置流程的简短概览。
- 如果代理安装还没完全弄好，回到[安装](/zh/installation/)。
- 使用 [Tracker.js](/zh/reference/tracker-js/) 了解声明式事件、SPA 跟踪、consent、点击、错误和其他浏览器端选项。
- 当第一个真实项目已经跑通、你想让代理帮你上线和读取浏览器侧 A/B 测试时，继续看 [AI 代理实验跟踪](/zh/guides/ai-agent-experiment-tracking/)。
- 只有在你需要原始端点细节时，才去看 [API Reference](/zh/api/)。
