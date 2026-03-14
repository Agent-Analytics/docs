---
title: Claude Code
description: התקינו את Agent Analytics ב-Claude Code דרך התוסף המארח תחילה, ורק אחר כך עברו ל-skill או ל-MCP גולמי.
---

<div class="aa-agent-badge aa-agent-badge--plain">
  <img src="/logos/claude-code-logo.png" alt="" />
  <span>Claude Code</span>
</div>

התחילו ממסלול התוסף. הוא נותן ל-Claude Code גם חיבור לשרת ה-MCP וגם את שכבת ה-workflow הייעודית לאנליטיקה בהתקנה אחת.

## דרישות מקדימות

- חשבון Agent Analytics ב-[app.agentanalytics.sh](https://app.agentanalytics.sh)
- Claude Code מותקן מקומית
- גישה לאותה זהות GitHub או Google שבה אתם משתמשים ב-Agent Analytics

## מומלץ: התקנת התוסף

```bash
/plugin marketplace add Agent-Analytics/agent-analytics-plugin
/plugin install agent-analytics
```

זהו המסלול המארח הקצר ביותר עבור Claude Code, כי הוא אורז יחד את חיבור ה-MCP ואת ההנחיות לשימוש.

## בדיקת ההתקנה

בקשו מ-Claude Code:

- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `What are the top pages for my-site this week?`

אם התוסף עובד, Claude Code אמור להגיע לחשבון שלכם בלי לבקש מכם לכתוב בקשות HTTP ידנית.

אם עוד לא יצרתם את הפרויקט האמיתי הראשון, חזרו אל [התחלה מהירה](/he/getting-started/#3-צרו-את-הפרויקט-הראשון-שלכם) ועשו את זה עכשיו.

## מסלול חלופי: התקנת ה-skill של Claude Code

אם אתם לא רוצים את התוסף המלא, עברו למסלול ה-skill לפני שאתם יורדים ל-MCP גולמי:

```bash
npx skills add Agent-Analytics/agent-analytics-mcp
```

המסלול הזה מלמד את Claude Code איך להגדיר מעקב, לשאול אנליטיקה ולהריץ ניסויים. עדיין צריך מפתח API תקין של Agent Analytics בסביבת העבודה שבה Claude Code רץ.

## חלופה ברמה נמוכה יותר: חיבור שרת MCP בלבד

אם אתם רוצים רק את שרת ה-MCP בלי שכבת התוסף או ה-skill:

```bash
claude mcp add agent-analytics --transport http https://mcp.agentanalytics.sh/mcp
```

השתמשו ב-`--transport http`. שרת ה-MCP המארח לא מוגדר ל-legacy SSE transport.

## פתרון תקלות

- ודאו ש-Claude Code משתמש באותו חשבון GitHub או Google כמו חשבון הדשבורד שלכם ב-Agent Analytics.
- אם ה-skill מותקן אבל Claude Code לא מצליח לשאול נתונים, ודאו שהסביבה חושפת את `AGENT_ANALYTICS_API_KEY`.
- אם פקודת ה-MCP נכשלת, בדקו שהשתמשתם ב-`--transport http`.

## קשור

- [התחלה מהירה](/he/getting-started/)
- [Claude Desktop / Cowork](/he/installation/claude-desktop-cowork/)
- [Authentication](/he/reference/authentication/)
- [API Reference](/he/api/)
