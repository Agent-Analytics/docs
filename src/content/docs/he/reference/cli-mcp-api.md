---
title: Plugin מול Skill מול MCP מול CLI מול API
description: Agent Analytics חושפת משטח אנליטיקה אחד דרך plugin, skill, MCP, CLI ו-HTTP גולמי. בחרו את המסלול הטבעי שמתאים לסביבה שבה הסוכן כבר עובד.
---

Agent Analytics חושפת משטח אנליטיקה אחד דרך חמישה מסלולי גישה אמיתיים:

- `Plugin` עבור Claude Code כשאתם רוצים את חיבור ה-MCP ואת שכבת ה-workflow של האנליטיקה באותה התקנה
- `Skill` עבור סביבות סוכן שכבר תומכות ב-skills ובהרצת פקודות
- `MCP` עבור שימוש בכלים מתוך צ'אט או מתוך עורך
- `CLI` עבור workflow של סוכנים מוכווני shell
- `API` עבור שליטה ישירה ב-HTTP

מודל המוצר לא משתנה ביניהם. פרויקטים, קריאות אנליטיקה ופעולות על ניסויים נשארים אותם דברים; רק נקודת הכניסה הטבעית משתנה.

## המסלול המומלץ לפי סביבה

| סביבה | מסלול מומלץ | למה |
| --- | --- | --- |
| Claude Code | Plugin קודם | המסלול המארח הקצר ביותר עם קישוריות MCP ו-guidance של Agent Analytics יחד |
| Claude Desktop / Cowork | Hosted MCP | ההתאמה הטובה ביותר לכלי צ'אט בסגנון connector עם tool calls טבעיים |
| Cursor | Skill + CLI קודם | לרוב פחות overhead מ-MCP כשהסוכן כבר יודע להריץ פקודות |
| OpenAI Codex | Skill קודם | שומר על ה-workflow כ-agent-native בלי לחייב MCP |
| OpenClaw | Skill קודם | המסלול הנקי ביותר ל-workflows מתוזמנים של אנליטיקה מתוך צ'אט |
| Custom runtime או סוכן פנימי | API | הכי מתאים כשאתם שולטים בניסיונות חוזרים, parsing ו-orchestration |

## מתי להשתמש בכל מסלול

### Plugin

השתמשו ב-plugin כשהסביבה היא Claude Code ואתם רוצים התקנה אחת שאורזת גם:

- את חיבור ה-MCP המארח
- את שכבת ה-workflow הייעודית של Agent Analytics

זו ברירת המחדל הנקייה ביותר כשה-plugin marketplace זמין.

### Skill

השתמשו ב-skill כשהסוכן כבר תומך ב-skills ויכול להריץ פקודות באותה סביבה.

Skill היא בדרך כלל ההתאמה הטובה ביותר כש:

- אתם רוצים שכבת workflow מודרכת סביב משימות אנליטיקה נפוצות
- לסוכן כבר יש גישת טרמינל
- אתם רוצים להישאר בלולאה הטבעית של הסוכן במקום לעבור לזרימות MCP עתירות tool calls

### MCP

השתמשו ב-MCP כשהסוכן כבר רץ בתוך כלי שתומך ב-connectors או בשרתי MCP.

MCP בדרך כלל מתאים במיוחד כש:

- אתם רוצים שההתקנה תרגיש טבעית בתוך הצ'אט
- אתם רוצים tool calls במקום פקודות shell
- אתם לא רוצים לכתוב ידנית כותרות auth או payloads
- אתם רוצים סיכומים מהירים של פרויקט או חשבון דרך תוצאות כלי מובנות

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
| `npx @agent-analytics/cli query my-site --metrics event_count` | `POST /query` |
| `npx @agent-analytics/cli query my-site --metrics event_count --count-mode raw` | `POST /query` |
| `npx @agent-analytics/cli funnel my-site --steps "page_view,signup,purchase"` | `POST /funnel` |
| `npx @agent-analytics/cli retention my-site --period week --cohorts 8` | `GET /retention?project=my-site&period=week&cohorts=8` |
| `npx @agent-analytics/cli experiments list my-site` | `GET /experiments?project=my-site` |
| `npx @agent-analytics/cli experiments create my-site --name signup_cta --variants control,new_cta --goal signup` | `POST /experiments` |
| `npx @agent-analytics/cli experiments get exp_abc123` | `GET /experiments/{id}` |
| `npx @agent-analytics/cli projects` | `GET /projects` |
| `npx @agent-analytics/cli logout` | None. פקודה מקומית בלבד שמוחקת auth שמור של CLI ולא קוראת ל-API. |

`logout` מוחק את ה-API key שנשמר על הדיסק על ידי ה-CLI. הוא לא מבטל את המפתח בשרת. אם ייצאתם את `AGENT_ANALYTICS_API_KEY` ב-shell, ה-CLI עדיין יתחבר עם משתנה הסביבה הזה עד שתבטלו אותו.

## הערות על query

- `/events` נשאר הלוג הגולמי וה-lossless. עבור `event_count`, ברירת המחדל של `/query` היא `session_then_user`: שורות עם `session_id` נספרות לפי session, שורות בלי session נופלות חזרה ל-`user_id` רק אם לאותו משתמש אין שורה עם session באותה קבוצה מסוננת, ושורות אנונימיות לגמרי נופלות חזרה למזהה האירוע (`id`).
- השתמשו ב-`--count-mode raw` כשהשאלה היא על נפח ingestion או על דיבוג של כתיבות כפולות, ולא על ספירת activation בטוחה יותר.

## כלל אצבע מהיר

- בחרו ב-`plugin` תחילה ב-Claude Code כשהמסלול דרך marketplace זמין.
- בחרו ב-`skill + CLI` תחילה בסביבות שמסוגלות להריץ shell כמו Cursor או Codex.
- בחרו ב-`MCP` כשהסוכן כבר חי בסביבת צ'אט בסגנון connector ואתם רוצים tool calls טבעיים.
- בחרו ב-`API` כשאתם צריכים שליטה מלאה, אינטגרציה מותאמת או דיבוג ברמה נמוכה יותר.

## קשור

- [סקירת התקנה](/he/installation/)
- [Authentication](/he/reference/authentication/)
- [Bot Traffic](/he/reference/bot-traffic/)
- [API Reference](/he/api/)
