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

- חשבון Agent Analytics ב-[app.agentanalytics.sh](https://app.agentanalytics.sh)
- Cursor מותקן
- `npx` זמין בסביבה שבה Cursor משתמש
- מפתח API תקין של Agent Analytics זמין כ-`AGENT_ANALYTICS_API_KEY`

## מומלץ: התקנת ה-Agent Skill

```bash
npx skills add Agent-Analytics/agent-analytics-mcp
export AGENT_ANALYTICS_API_KEY=aak_...
```

כך Cursor מקבל גם את שכבת ה-workflow של Agent Analytics וגם הרצה מוכוונת CLI באותה סביבה. לרוב זהו ה-tradeoff הטוב ביותר כשאתם רוצים פחות latency ופחות overhead של טוקנים מאשר קריאות כלי דרך MCP.

## בדיקת ההתקנה

בקשו מ-Cursor:

- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `What are the top pages for my-site this week?`

אם עוד לא יצרתם את הפרויקט האמיתי הראשון, חזרו אל [התחלה מהירה](/he/getting-started/#3-צרו-את-הפרויקט-הראשון-שלכם) ועשו את זה עכשיו.

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

## חלופה ברמה נמוכה יותר: API ישיר

אם אתם רוצים לעקוף גם את ה-skill וגם את MCP, אפשר לקרוא ישירות ל-API המארח:

```bash
curl "https://api.agentanalytics.sh/stats?project=my-site&since=7d" \
  -H "X-API-Key: aak_..."
```

המסלול הזה שימושי לדיבוג auth, אבל ה-flow המומלץ לשימוש יומיומי ב-Cursor הוא skill + CLI.

## פתרון תקלות

- אם ה-skill מותקן אבל השאילתות נכשלות, ודאו ש-`AGENT_ANALYTICS_API_KEY` זמין בסביבה שבה Cursor באמת רץ.
- אם בחרתם במסלול MCP, ודאו שהערך ב-`mcp.json` הוא JSON תקין.
- טענו מחדש את Cursor אחרי הוספת שרת MCP מותאם אם פאנל הכלים עדיין מציג את המצב הישן.
- אם Cursor רואה את שרת ה-MCP אבל לא את הפרויקטים שלכם, ודאו שההתחברות המארחת הושלמה עם החשבון הנכון.

## קשור

- [התחלה מהירה](/he/getting-started/)
- [CLI vs MCP vs API](/he/reference/cli-mcp-api/)
- [Claude Desktop / Cowork](/he/installation/claude-desktop-cowork/)
- [OpenAI Codex](/he/installation/openai-codex/)
- [API Reference](/he/api/)
