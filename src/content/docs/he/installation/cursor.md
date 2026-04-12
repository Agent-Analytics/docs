---
title: Cursor
description: התקינו את Agent Analytics skill ב-Cursor והעדיפו workflow בסגנון CLI. השתמשו ב-MCP רק אם אתם באמת רוצים קריאות כלי בסגנון connector.
---

<div class="aa-agent-badge aa-agent-badge--plain">
  <img src="/logos/cursor-final.png" alt="" />
  <span>Cursor</span>
</div>

ב-Cursor עדיף להתחיל עם Agent Analytics skill ו-workflow בסגנון CLI. בפועל זה בדרך כלל מהיר יותר, זול יותר בטוקנים וקל יותר לכיוון מאשר MCP לשימוש יומיומי.

## דרישות מקדימות

- Cursor מותקן
- `npx` זמין בסביבה שבה Cursor משתמש
- גישה להתחברות עם Google או GitHub שתרצו לחבר כאשר Cursor פותח את אישור הדפדפן

## מומלץ: התקנת ה-Agent Skill

```bash
npx skills add Agent-Analytics/agent-analytics-skill
```

אחר כך בקשו מ-Cursor:

```text
Set up Agent Analytics for this project. Install it here if needed. Open the browser for me or give me a login link, then wait. I will sign in with Google or GitHub, approve it, and paste back any finish code if you need it. Then create the project, add tracking and key events, and verify the first event.
```

כך Cursor מקבל גם את שכבת ה-workflow של Agent Analytics וגם הרצה מוכוונת CLI באותה סביבה. לרוב זהו ה-tradeoff הטוב ביותר כשאתם רוצים פחות latency ופחות overhead של טוקנים מאשר קריאות כלי דרך MCP. אישור הדפדפן יוצר או מחבר את החשבון במהלך ההגדרה, כך שאין צורך להכין מפתח API מראש.

## בדיקת ההתקנה

בקשו מ-Cursor:

- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `What are the top pages for my-site this week?`

אם עוד לא יצרתם את הפרויקט האמיתי הראשון, המשיכו אל [הפרויקט הראשון ב-5 דקות](/he/guides/first-project-in-5-minutes/).

## חלופה: הוספת שרת MCP מותאם אישית

השתמשו ב-MCP ב-Cursor רק אם אתם רוצים במפורש קריאות כלי בסגנון connector במקום skill + CLI execution.

1. פתחו את Command Palette
2. חפשו `MCP`
3. בחרו **Cursor Settings > Tools & MCP**
4. לחצו על **Add Custom MCP**
5. הוסיפו את זה ל-`mcp.json` שלכם:

```json
{
  "mcpServers": {
    "agent-analytics": {
      "url": "https://mcp.agentanalytics.sh/mcp"
    }
  }
}
```

שמרו את הקובץ וטעינו מחדש את Cursor אם רשימת הכלים לא מתרעננת אוטומטית. MCP עובד, אבל בדרך כלל מוסיף יותר latency ו-overhead של טוקנים מאשר מסלול ה-skill.

## fallback: שימוש ישיר ב-CLI

אם אתם לא רוצים את שכבת ה-skill, עברו קודם ל-CLI הרשמי לפני שאתם יורדים ל-HTTP גולמי:

```bash
npx @agent-analytics/cli@0.5.10 login
npx @agent-analytics/cli@0.5.10 projects
npx @agent-analytics/cli@0.5.10 stats my-site --days 7
```

כך Cursor נשאר על אותו מסלול shell-first בלי לעבור ל-auth headers ידניים ול-payloads גולמיים. עבור התנהגות login, כיסוי פקודות ומיפוי CLI ל-API, השתמשו בעמוד [CLI](/he/reference/cli/).

## פתרון תקלות

- אם ה-skill נעצר בשלב האישור, השלימו את ההתחברות בדפדפן והדביקו חזרה כל finish code אם Cursor מבקש אותו.
- אם בחרתם במפורש במסלול הידני/המתקדם של API key, ודאו ש-`AGENT_ANALYTICS_API_KEY` זמין בסביבה שבה Cursor באמת רץ.
- אם בחרתם במסלול MCP, ודאו שהערך ב-`mcp.json` הוא JSON תקין.
- טענו מחדש את Cursor אחרי הוספת שרת MCP מותאם אם פאנל הכלים עדיין מציג את המצב הישן.
- אם Cursor רואה את שרת ה-MCP אבל לא את הפרויקטים שלכם, ודאו שההתחברות המארחת הושלמה עם החשבון הנכון.

## קשור

- [התחלה מהירה](/he/getting-started/)
- [הפרויקט הראשון ב-5 דקות](/he/guides/first-project-in-5-minutes/)
- [CLI](/he/reference/cli/)
- [CLI vs MCP vs API](/he/reference/cli-mcp-api/)
- [Claude Desktop / Cowork](/he/installation/claude-desktop-cowork/)
- [OpenAI Codex](/he/installation/openai-codex/)
- [API Reference](/he/api/)
