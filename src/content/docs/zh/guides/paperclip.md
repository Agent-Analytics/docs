---
title: 为你的 Paperclip 公司设置 Agent Analytics
description: 先让用户创建一个 CEO 任务，在需要登录批准时查看被阻塞的任务，最后查询实时项目数据。
---

[📎Paperclip](https://paperclip.ing/) 是一个面向零人类公司的开源编排系统。现在，在 📎Paperclip 里接入 Agent Analytics 的标准路径是：

1. 让用户为 CEO 创建一个任务
2. 在需要登录批准时查看被阻塞的任务
3. 让分析师回答第一个真实的流量或注册问题

如果你希望由代理从头到尾接住这次被阻塞的登录交接，请使用 `Connect as agent`。只有在你自己需要直接访问账户时，才使用 `Connect as human`，而不是因为配置流程发生了变化。

对于常规的 Paperclip 配置，请把浏览器批准和 finish code 交接保留为默认路径。原始 API key 只作为自定义运行时的高级 fallback。

如果你想先了解为什么要这么做，请先读 [If You Use Paperclip, You Need End-User Analytics](https://blog.agentanalytics.sh/blog/paperclip-companies-need-agent-readable-analytics/)。

如果工程师已经有访问权限，而你现在只需要跑通激活闭环，请直接继续看[5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)。

## 第 1 步：创建一个 CEO 任务

对大多数 Paperclip 公司来说，配置应该从一个明确的 CEO 任务开始。

任务标题：

```text
Hire an analyst to use AgentAnalytics
```

任务描述：

```text
Hire an analyst; we will use Agent Analytics to measure users' activity throughout our company. Install this skill: agent-analytics/agent-analytics-skill. Have the engineer create a new project on AA for our company and set up tracking on the landing page.
The analyst you hire will monitor our numbers using the AA skill and also prepare a growth plan.
```

![在 Paperclip 中为招聘分析师并设置 Agent Analytics 创建 CEO 任务](/paperclip-ceo-issue-creation.png)

## 第 2 步：查看被阻塞的任务并批准登录

在某个时间点，正在工作的代理会返回说这个任务被卡住了，因为它需要你帮忙完成登录批准。

这时请这样做：

1. 打开代理贴在 Paperclip 任务里的登录批准链接
2. 用 Google 或 GitHub 登录
3. 从浏览器中复制 finish code
4. 把这个 finish code 粘贴回被阻塞的 Paperclip 任务里

![Agent Analytics finish code 交接界面](/finishcode.jpg)

这样就能让正在执行配置的代理继续完成：

- 完成登录
- 创建项目
- 添加跟踪
- 验证第一个事件

如果你的 Paperclip 公司想保留一个共享安装原语，公司的 skill key 仍然是：

```text
agent-analytics/agent-analytics-skill/agent-analytics
```

但那只是实现细节，不是主要产品叙事。真正重要的路径仍然是：创建一个 CEO 任务，让它在真实项目里驱动配置，然后开始提真实的分析问题。

## 实际上的批准流程是什么样

在 Paperclip 里，这条分离式登录流程应该是这样：

1. 正在执行配置的代理启动 Agent Analytics 登录，并回复一个批准 URL
2. 你在浏览器里打开这个 URL
3. 你用 Google 或 GitHub 登录
4. 浏览器显示一个 finish code
5. 你把这个 finish code 粘贴回 Paperclip issue 线程
6. 正在执行配置的代理用这个代码完成登录并继续往下做

这里最重要的产品规则很简单：用户在浏览器中批准身份，但最终持有会话并继续配置工作的，是那个正在执行任务的代理。

如果你之后想查看或撤销这个归属于 Paperclip 的会话，请打开 [app.agentanalytics.sh](https://app.agentanalytics.sh)，进入 `Account Settings`，然后使用 `Agent Sessions` 区域。这个页面现在会显示活跃的 Paperclip、CLI、macOS Live 以及类似的托管代理登录。

## 第 3 步：让分析师回答真实问题

一旦工程师把项目接入上线，就让分析师回答真实问题：

- `给我看这个项目的流量、热门页面、最近事件、注册、购买和功能使用情况。`
- `为这个项目设置一个 A/B 实验，并帮助我决定下一步该改什么。`

成功条件不只是登录成功。真正的成功条件是：

- 配置代理可以通过浏览器批准和 finish code 交接完成认证
- 创建项目
- 验证第一条实时事件
- 分析师可以在同一个 issue 流程里回答一个真实的分析问题

## Paperclip 公司的最快上线顺序

如果你想用最短路径拿到第一批价值，请按这个顺序来：

1. 创建 CEO 任务
2. 让这个任务在同一条委派路径里同时覆盖分析师和工程师
3. 当正在工作的代理需要批准时，查看被阻塞的任务
4. 登录并回复 finish code
5. 让正在工作的代理创建第一个项目并验证第一条事件
6. 让分析师回答一个真实的流量或注册问题
7. 之后再扩展到实验和周期性的分析工作

## 高级/手动 fallback

如果你之后在自定义运行时里需要直接进行 HTTP 访问，仍然可以从 [app.agentanalytics.sh](https://app.agentanalytics.sh) 生成原始 API key。请把它当作高级/手动 fallback。

对于正常的 Paperclip 配置路径，优先使用浏览器批准加 finish code 交接。

## 什么时候该看别的页面

- 如果你想看整个产品最短的总览，请看[快速开始](/zh/getting-started/)。
- 如果你需要 Paperclip 公司流之外、按环境划分的原始安装页面，请看[安装中心](/zh/installation/)。
- 如果工程师已经有访问权限，而你想看最直接的从安装到上线的过程，请看[5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)。
- 如果你需要浏览器侧细节，比如 SPA 跟踪、声明式事件、同意管理、错误或 web vitals，请看 [Tracker.js](/zh/reference/tracker-js/)。
- 如果你的团队正在决定该用哪种访问方式，请看 [CLI vs MCP vs API](/zh/reference/cli-mcp-api/)。

## 相关内容

- [If You Use Paperclip, You Need End-User Analytics](https://blog.agentanalytics.sh/blog/paperclip-companies-need-agent-readable-analytics/)
- [快速开始](/zh/getting-started/)
- [5 分钟完成第一个项目](/zh/guides/first-project-in-5-minutes/)
- [Tracker.js](/zh/reference/tracker-js/)
- [CLI vs MCP vs API](/zh/reference/cli-mcp-api/)
- [API 参考](/zh/api/)
