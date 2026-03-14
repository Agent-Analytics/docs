---
title: Error Format
description: All API errors return a machine-readable code plus a human-readable message.
---

All errors return JSON with an `error` code and a `message`.

```json
{
  "error": "AUTH_REQUIRED",
  "message": "API key required"
}
```

## Common error codes

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

## How to debug

1. check the `error` field first and branch on that in your code
2. use the `message` field for logs and human-readable tool output
3. confirm whether the failure came from auth, a missing project, or invalid query shape before retrying

## Related

- [Authentication](/reference/authentication/)
- [Rate Limits](/reference/rate-limits/)
- [API Reference](/api/)
