---
title: Claude Desktop / Cowork
description: חברו את שרת ה-MCP המארח ב-Claude Desktop או Cowork ובדקו את כלי האנליטיקה ישירות בצ'אט.
---

<div class="aa-agent-badge aa-agent-badge--plain">
  <img src="/logos/claude-code-logo.png" alt="" />
  <span>Claude Desktop / Cowork</span>
</div>

Claude Desktop ו-Cowork שניהם מתאימים למסלול ה-MCP המארח. השתמשו בממשק ה-connector במקום לנהל ידנית מפתחות API בתוך פרומפטים.

## דרישות מקדימות

- חשבון Agent Analytics ב-[app.agentanalytics.sh](https://app.agentanalytics.sh)
- גישה ל-Claude Desktop או Cowork
- התחברות עם GitHub או Google שתואמת לחשבון שלכם ב-Agent Analytics

## מומלץ: הוספת ה-connector המארח

1. פתחו את **Settings**
2. פתחו את **Connectors**
3. בחרו **Add**
4. בחרו **Custom**
5. הזינו:

```text
https://mcp.agentanalytics.sh/mcp
```

תתבקשו להתחבר עם GitHub או Google. השתמשו באותה זהות שמחזיקה את הפרויקטים ב-Agent Analytics.

## בדיקת ההתקנה

שאלו את Claude:

- `List my projects`
- `Show me a 7 day overview for my-site`
- `Where do users drop off between signup and purchase?`

זהו המסלול המארח הטוב ביותר לאנליטיקה שיחתית, כי שרת ה-MCP יכול להחזיר תוצאות כלי מובנות וממשק עשיר כשזה נתמך.

אם עוד לא יצרתם את הפרויקט האמיתי הראשון, חזרו אל [התחלה מהירה](/he/getting-started/#3-צרו-את-הפרויקט-הראשון-שלכם) ועשו את זה עכשיו.

## הערות ידניות

- כתובת ה-URL של שרת ה-MCP המארח נשארת זהה גם ב-Claude Desktop וגם ב-Cowork.
- לא צריך להעביר ידנית `X-API-Key` אחרי שההתחברות דרך ה-connector הצליחה.

## פתרון תקלות

- אם ההתחברות הצליחה אבל לא מופיעים פרויקטים, ודאו שהחשבון המחובר תואם לחשבון הדשבורד שלכם ב-Agent Analytics.
- אם כתובת connector מותאמת נדחית, הזינו שוב את כתובת ה-MCP המדויקת: `https://mcp.agentanalytics.sh/mcp`
- אם אתם צריכים דיבוג ברמה נמוכה יותר, עברו ל-[API reference](/he/api/) ובדקו את אותו ה-flow עם קריאות HTTP ישירות.

## קשור

- [התחלה מהירה](/he/getting-started/)
- [Claude Code](/he/installation/claude-code/)
- [Cursor](/he/installation/cursor/)
- [API Reference](/he/api/)
