---
title: CLI מול MCP מול API
description: אפשר להשתמש ב-Agent Analytics דרך MCP, דרך CLI או דרך HTTP גולמי. בחרו את הממשק שמתאים לסביבה שבה הסוכן כבר רץ.
---

ל-Agent Analytics יש שלושה מצבי גישה אמיתיים:

- `MCP` עבור שימוש בכלים מתוך צ'אט או מתוך עורך
- `CLI` עבור workflow של סוכנים מוכווני shell
- `API` עבור שליטה ישירה ב-HTTP

ה-CLI הוא wrapper נוח סביב אותו HTTP API ציבורי. אם הסביבה שלכם מחמירה לגבי הרצת חבילות זמניות או שסורקי אבטחה לא אוהבים `npx`, השתמשו ישירות ב-API docs ותישארו עם אותו workflow בסיסי.

מה הכי טוב תלוי במה שהסוכן שלכם כבר יודע לעשות.

## מתי להשתמש בכל אחד

### MCP

השתמשו ב-MCP כשהסוכן כבר רץ בתוך כלי שתומך ב-connectors או בשרתי MCP, כמו Claude Desktop, Cowork, Cursor או זרימות העבודה של Claude Code plugin.

MCP בדרך כלל מתאים במיוחד כש:

- אתם רוצים שההתקנה תרגיש טבעית בתוך הצ'אט
- אתם רוצים tool calls במקום פקודות shell
- אתם לא רוצים לכתוב ידנית כותרות auth או payloads
- אתם רוצים סיכומים מהירים של פרויקט או חשבון כמו `analytics_overview`, `bot_traffic_overview` או `all_sites_bot_traffic`

Tradeoff:

- MCP לרוב מוסיף יותר latency ויותר overhead של טוקנים מאשר skill + CLI, כי המודל צריך לנהל יותר round trips של tool calls ויותר payloads של תוצאות.

### CLI

השתמשו ב-CLI כשהסוכן כבר עובד טוב עם טרמינל ויודע להריץ פקודות.

CLI בדרך כלל מתאים במיוחד כש:

- הסוכן כבר חי בסביבה שמתחילה מה-shell
- אתם רוצים פלט פקודות צפוי
- אתם מעדיפים הרכבת פקודות על פני אינטגרציה לכלים
- אתם רוצים פחות overhead מ-MCP בסוכנים בסגנון עורך כמו Cursor
- אתם רוצים עזרי auth פשוטים כמו `login` ו-`logout` סביב אותו API

### API

השתמשו ב-API כשאתם רוצים שליטה מלאה על הבקשות, ניסיונות חוזרים וניתוח התגובות.

API בדרך כלל מתאים במיוחד כש:

- אתם מטמיעים מתוך קוד משלכם
- אתם צריכים התנהגות מדויקת ברמת HTTP
- אתם מדבגים auth או מבנה payload ישירות

## מיפוי CLI ל-API

רוב ה-workflows של ה-CLI ממופים ישירות לנקודת קצה ב-HTTP. החריג המרכזי הוא פקודות נוחות של auth מקומי כמו `logout`, שמשנות רק מצב מקומי של ה-CLI:

| CLI Command | API Endpoint |
| --- | --- |
| `npx @agent-analytics/cli stats my-site` | `GET /stats?project=my-site` |
| `npx @agent-analytics/cli all-sites --period 7d` | `GET /account/all-sites?period=7d` |
| `npx @agent-analytics/cli bot-traffic my-site --period 7d` | `GET /bot-traffic?project=my-site&period=7d` |
| `npx @agent-analytics/cli bot-traffic --all --period 7d` | `GET /account/bot-traffic?period=7d` |
| `npx @agent-analytics/cli events my-site` | `GET /events?project=my-site` |
| `npx @agent-analytics/cli query --project my-site --metrics event_count` | `POST /query` |
| `npx @agent-analytics/cli funnel my-site --steps "page_view,signup,purchase"` | `POST /funnel` |
| `npx @agent-analytics/cli retention my-site --period week --cohorts 8` | `GET /retention?project=my-site&period=week&cohorts=8` |
| `npx @agent-analytics/cli experiments list my-site` | `GET /experiments?project=my-site` |
| `npx @agent-analytics/cli experiments create my-site --name signup_cta --variants control,new_cta --goal signup` | `POST /experiments` |
| `npx @agent-analytics/cli experiments get exp_abc123` | `GET /experiments/{id}` |
| `npx @agent-analytics/cli projects` | `GET /projects` |
| `npx @agent-analytics/cli logout` | None. פקודה מקומית בלבד שמוחקת auth שמור של CLI ולא קוראת ל-API. |

`logout` מוחק את ה-API key שנשמר על הדיסק על ידי ה-CLI. הוא לא מבטל את המפתח בשרת. אם ייצאתם את `AGENT_ANALYTICS_API_KEY` ב-shell, ה-CLI עדיין יתחבר עם משתנה הסביבה הזה עד שתבטלו אותו.

## כלל אצבע מהיר

- בחרו ב-`CLI` תחילה בסביבות שמסוגלות להריץ shell, כמו Cursor, כשהסוכן יכול להריץ פקודות ישירות.
- בחרו ב-`MCP` כשאתם רוצים במפורש כלים בסגנון connector או כשאין מסלול shell טוב.
- בחרו ב-`API` כשאתם צריכים שליטה מלאה או דיבוג ברמה נמוכה יותר.

## קשור

- [Bot Traffic](/he/reference/bot-traffic/)
- [סקירת התקנה](/he/installation/)
- [Authentication](/he/reference/authentication/)
- [API Reference](/he/api/)
