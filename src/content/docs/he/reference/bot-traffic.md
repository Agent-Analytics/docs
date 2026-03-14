---
title: Bot Traffic
description: ראו אילו קריאות אוטומטיות פגעו בטרקר שלכם, כמה אירועים סוננו, ואילו actors יצרו את התעבורה הזאת.
---

Bot Traffic מציג בקשות אוטומטיות שהגיעו אל Agent Analytics וסוננו מחוץ לאנליטיקה הרגילה שלכם.

השתמשו בזה כשאתם רוצים לענות על שאלות כמו:

- האם ChatGPT או סוכן אחר באמת פגע באתר הזה?
- האם סורקי חיפוש או preview bots נוגעים בטרקר?
- כמה אירועי אנליטיקה נזרקו כי הם הגיעו מאוטומציה?

## היקף חשוב

היכולת הזאת בכוונה צרה יותר מלוגים של CDN או reverse proxy.

- זה **לא** שקול לראיית כל תעבורת האתר כמו Cloudflare.
- היא כוללת רק בקשות אוטומטיות שהגיעו ל-`POST /track` או ל-`POST /track/batch`.
- היא שומרת אגרגציות יומיות, לא לוגים גולמיים של בקשות.
- היא **לא** שומרת כתובות IP.
- היא **לא** מוסיפה פגיעות של בוטים לאנליטיקת האירועים, ל-sessions או לחיוב.

## מה מקבלים בחזרה

תצוגות פרויקט וחשבון מחזירות:

- `automated_requests`: כמה בקשות tracking מסוננות התקבלו
- `dropped_events`: כמה אירועי אנליטיקה נזרקו מתוך אותן בקשות
- `categories`: קטגוריות מקובצות כמו `ai_agent`, `search_crawler`, `social_preview`, `monitoring_perf`
- `actors`: מקורות מנורמלים כמו `ChatGPT-User`, `Googlebot`, `ClaudeBot`, `curl`
- `time_series`: רולאפ יומי עם מילוי אפסים לתקופה שנבחרה

## מסלולי גישה

### CLI

```bash
npx @agent-analytics/cli bot-traffic my-site --period 7d --limit 5
npx @agent-analytics/cli bot-traffic --all --period 7d --limit 10
```

### MCP

השתמשו ב:

- `bot_traffic_overview` עבור פרויקט אחד
- `all_sites_bot_traffic` עבור טווח ברמת החשבון

### API

```bash
curl "https://api.agentanalytics.sh/bot-traffic?project=my-site&period=7d&limit=5" \
  -H "X-API-Key: aak_..."
```

```bash
curl "https://api.agentanalytics.sh/account/bot-traffic?period=7d&limit=10" \
  -H "X-API-Key: aak_..."
```

## פרויקט מול חשבון

השתמשו בטווח של פרויקט כשאתם רוצים actors מובילים ופילוח לפי קטגוריות עבור אתר אחד.

השתמשו בטווח של חשבון כשאתם רוצים:

- סך כל האוטומציה המסוננת בכל הפרויקטים הפעילים
- אילו פרויקטים רואים את התעבורה הזאת
- סקירה קלה של כל האתרים במקום פירוט לכל פרויקט

פרויקטים שנמחקו מוחרגים מהדירוגים ומהסכומים ברמת החשבון.

## זמינות

Bot traffic overview זמין גם בתוכניות hosted free וגם בתוכניות pro דרך API, CLI ו-MCP.

## קשור

- [Tracker.js](/he/reference/tracker-js/)
- [CLI vs MCP vs API](/he/reference/cli-mcp-api/)
- [Rate Limits](/he/reference/rate-limits/)
- [API Reference](/he/api/)
