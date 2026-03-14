---
title: Bot Traffic
description: 查看哪些自动化调用命中了你的跟踪器、多少事件被过滤，以及这些流量来自哪些 actor。
---

Bot Traffic 展示的是那些到达 Agent Analytics 但被排除在正常分析之外的自动化请求。

当你想回答以下问题时，可以使用它：

- ChatGPT 或其他代理是否真的访问了这个站点？
- 搜索爬虫或预览机器人是否触发了跟踪器？
- 有多少分析事件因为来自自动化流量而被丢弃？

## 重要范围说明

这个功能的范围刻意比 CDN 或反向代理日志更窄。

- 它**不是**像 Cloudflare 那样的完整站点流量可见性。
- 它只包含到达 `POST /track` 或 `POST /track/batch` 的自动化请求。
- 它保存的是按天聚合数据，而不是原始请求日志。
- 它**不会**保存 IP。
- 它**不会**把 bot 命中加入正常事件分析、sessions 或计费中。

## 返回内容

项目级和账户级视图会返回：

- `automated_requests`：收到的被过滤跟踪请求数量
- `dropped_events`：这些请求中被丢弃的分析事件数量
- `categories`：像 `ai_agent`、`search_crawler`、`social_preview`、`monitoring_perf` 这样的分类桶
- `actors`：像 `ChatGPT-User`、`Googlebot`、`ClaudeBot`、`curl` 这样的标准化来源
- `time_series`：按所选时间范围零填充的日级汇总

## 访问方式

### CLI

```bash
npx @agent-analytics/cli bot-traffic my-site --period 7d --limit 5
npx @agent-analytics/cli bot-traffic --all --period 7d --limit 10
```

### MCP

请使用：

- `bot_traffic_overview`：查看单个项目
- `all_sites_bot_traffic`：查看账户范围

### API

```bash
curl "https://api.agentanalytics.sh/bot-traffic?project=my-site&period=7d&limit=5" \
  -H "X-API-Key: aak_..."
```

```bash
curl "https://api.agentanalytics.sh/account/bot-traffic?period=7d&limit=10" \
  -H "X-API-Key: aak_..."
```

## 项目范围与账户范围

当你想查看单个站点的主要 actors 和分类拆分时，请使用项目范围。

当你想查看以下内容时，请使用账户范围：

- 所有活跃项目上的自动化过滤流量总量
- 哪些项目正在看到这些流量
- 一个轻量级的全站概览，而不是逐项目细节

已删除项目不会计入账户级排行和总量。

## 可用性

Bot traffic overview 在托管 free 和 pro 两个套餐上都可通过 API、CLI 和 MCP 使用。

## 相关内容

- [Tracker.js](/zh/reference/tracker-js/)
- [CLI vs MCP vs API](/zh/reference/cli-mcp-api/)
- [Rate Limits](/zh/reference/rate-limits/)
- [API Reference](/zh/api/)
