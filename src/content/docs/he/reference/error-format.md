---
title: Error Format
description: כל שגיאת API מחזירה קוד קריא-מכונה יחד עם הודעה קריאה לאדם.
---

כל השגיאות מחזירות JSON עם קוד `error` ועם `message`.

```json
{
  "error": "AUTH_REQUIRED",
  "message": "API key required"
}
```

## קודי שגיאה נפוצים

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

## איך לדבג

1. בדקו קודם את השדה `error` והתפצלו עליו בקוד שלכם
2. השתמשו בשדה `message` עבור לוגים ועבור פלט קריא לבני אדם
3. ודאו אם הכישלון הגיע מ-auth, מפרויקט חסר, או ממבנה שאילתה לא תקין לפני שאתם מנסים שוב

## קשור

- [Authentication](/he/reference/authentication/)
- [Rate Limits](/he/reference/rate-limits/)
- [API Reference](/he/api/)
