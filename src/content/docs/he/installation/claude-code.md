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

- Claude Code מותקן מקומית
- גישה להתחברות עם Google או GitHub שתרצו לחבר כאשר Claude Code פותח את אישור הדפדפן

## מומלץ: התקנת התוסף

```bash
/plugin marketplace add Agent-Analytics/agent-analytics-plugin
/plugin install agent-analytics
```

זהו המסלול המארח הקצר ביותר עבור Claude Code, כי הוא אורז יחד את חיבור ה-MCP ואת ההנחיות לשימוש.

## בדיקת ההתקנה

בקשו מ-Claude Code:

- `Set up Agent Analytics for this project. Install it here if needed. Open the browser for me or give me a login link, then wait. I will sign in with Google or GitHub, approve it, and paste back any finish code if you need it. Then create the project, add tracking and key events, and verify the first event.`
- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `What are the top pages for my-site this week?`

אם התוסף עובד, Claude Code אמור להגיע לחשבון שלכם בלי לבקש מכם לכתוב בקשות HTTP ידנית.

אם עוד לא יצרתם את הפרויקט האמיתי הראשון, המשיכו אל [הפרויקט הראשון ב-5 דקות](/he/guides/first-project-in-5-minutes/).

## מסלול חלופי: התקנת ה-skill של Claude Code

אם אתם לא רוצים את התוסף המלא, עברו למסלול ה-skill לפני שאתם יורדים ל-MCP גולמי:

```bash
npx skills add Agent-Analytics/agent-analytics-skill@agent-analytics
```

המסלול הזה מלמד את Claude Code איך להגדיר מעקב, לשאול אנליטיקה ולהריץ ניסויים. כברירת מחדל הוא משתמש באישור בדפדפן וב-agent sessions. השתמשו במפתח API גולמי רק במסלול הידני/המתקדם.

## חלופה ברמה נמוכה יותר: חיבור שרת MCP בלבד

אם אתם רוצים רק את שרת ה-MCP בלי שכבת התוסף או ה-skill:

```bash
claude mcp add agent-analytics --transport http https://mcp.agentanalytics.sh/mcp
```

השתמשו ב-`--transport http`. שרת ה-MCP המארח לא מוגדר ל-legacy SSE transport.

## פתרון תקלות

- ודאו ש-Claude Code משלים את אישור הדפדפן עם אותו חשבון GitHub או Google שתרצו לחבר ל-Agent Analytics.
- אם ה-plugin או ה-skill נעצרים בשלב האישור, השלימו את ההתחברות בדפדפן ותנו ל-Claude Code להמשיך.
- אם בחרתם במפורש במסלול הידני/המתקדם של API key, ודאו שהסביבה חושפת את `AGENT_ANALYTICS_API_KEY`.
- אם פקודת ה-MCP נכשלת, בדקו שהשתמשתם ב-`--transport http`.

## קשור

- [התחלה מהירה](/he/getting-started/)
- [הפרויקט הראשון ב-5 דקות](/he/guides/first-project-in-5-minutes/)
- [Claude Desktop / Cowork](/he/installation/claude-desktop-cowork/)
- [Authentication](/he/reference/authentication/)
- [API Reference](/he/api/)
