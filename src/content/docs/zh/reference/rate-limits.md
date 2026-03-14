---
title: Rate Limits
description: 托管版 Agent Analytics 采用账户级 API 限制和事件量限制，并会随套餐不同而变化。
---

## 标准限制

| Tier | Requests / minute | Event limit | Data retention |
| --- | --- | --- | --- |
| Free | 10 | 100,000 / month | 90 days |
| Pro | 1,000 | Unlimited | 365 days |

托管 free 账户还包括：

- 最多 2 个项目
- 每月 500 次代理/API 读取动作
- 可使用 MCP 的 `list_projects`、`create_project`、`all_sites_overview`、`analytics_overview`、`bot_traffic_overview` 和 `all_sites_bot_traffic`

Bot traffic overview 在托管 free 和 pro 两个套餐上都可通过 API、CLI 和 MCP 使用。

付费套餐会开放完整的 API、CLI 和 MCP 能力。免费账户在 query、funnels、retention、experiments 以及更丰富的分析端点上会收到 `PRO_REQUIRED`。

## 流式限制

| Limit | Value |
| --- | --- |
| Concurrent SSE streams | 10 per account |
| `/live` rate | Standard API rate limit |
| Inactivity timeout | 30 minutes |
| Ring buffer | 5 minutes / 10,000 events |

## 触达限制后该怎么做

- 不要持续猛打同一个端点，而是做 backoff 后重试
- 降低 overview 类查询的 polling 频率
- 尽可能对事件写入做批量化
- 如果瓶颈在实验或更重的分析上，把它们迁移到 pro 账户

## 相关内容

- [Bot Traffic](/zh/reference/bot-traffic/)
- [Error Format](/zh/reference/error-format/)
- [API Reference](/zh/api/)
