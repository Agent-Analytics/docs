---
title: Error Format
description: 所有 API 错误都会返回一个可机读的错误码，以及一条可读的消息。
---

所有错误都返回带有 `error` 代码和 `message` 的 JSON。

```json
{
  "error": "AUTH_REQUIRED",
  "message": "API key required"
}
```

## 常见错误码

- `AUTH_REQUIRED`
- `FORBIDDEN`
- `PROJECT_REQUIRED`
- `MISSING_FIELDS`
- `RATE_LIMITED`
- `INVALID_TOKEN`
- `BATCH_TOO_LARGE`
- `INVALID_METRIC`
- `INVALID_GROUP_BY`
- `INVALID_FILTER_OP`
- `INVALID_PROPERTY_KEY`
- `NOT_FOUND`
- `EXPERIMENT_NOT_FOUND`
- `EXPERIMENT_NAME_EXISTS`
- `INVALID_VARIANTS`
- `INVALID_EXPERIMENT_STATUS`
- `PRO_REQUIRED`
- `STREAM_LIMIT`
- `INVALID_FUNNEL_STEPS`

## 如何调试

1. 先看 `error` 字段，并在你的代码里基于它做分支处理
2. 使用 `message` 字段输出日志或给人类可读的提示
3. 在重试前，先确认问题来自 auth、缺失项目，还是查询结构无效

## 相关内容

- [Authentication](/zh/reference/authentication/)
- [Rate Limits](/zh/reference/rate-limits/)
- [API Reference](/zh/api/)
