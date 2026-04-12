---
title: CLI
description: השתמשו ב-CLI של Agent Analytics כ-wrapper רשמי ומוכוון shell מעל ה-HTTP API המתועד, עם login מבוסס agent session ופקודות אנליטיקה נפוצות.
---

ה-CLI של Agent Analytics הוא ה-wrapper הרשמי והמוכוון ל-shell מעל ה-HTTP API המתועד. השתמשו בו כשהסוכן כבר מחזיק בגישת טרמינל ואתם רוצים פלט פקודות צפוי עם פחות overhead מזרימות MCP עתירות tool calls.

החבילה המתפרסמת היא `@agent-analytics/cli`. לשימוש חד-פעמי, הריצו אותה דרך `npx` עם גרסה מוצמדת:

```bash
npx @agent-analytics/cli@0.5.10 --help
```

מאגר מקור: [Agent-Analytics/agent-analytics-cli](https://github.com/Agent-Analytics/agent-analytics-cli)

בהמשך העמוד, `agent-analytics` פירושו הבינארי של אותו CLI מאותה חבילה ואותה גרסה.

## מתי להשתמש ב-CLI

בחרו ב-CLI כש:

- הסוכן כבר עובד בסביבה שמתחילה מה-shell
- אתם רוצים wrapper דק מעל ה-API המארח במקום connector flow
- אתם מעדיפים הרכבת פקודות וסקריפטים על פני round trips של tool calls
- אתם רוצים עזרי auth מקומיים כמו `login`, `logout` ו-`whoami`

אם אתם עדיין בוחרים בין מסלולי גישה שונים ולא מחפשים שימושיות CLI ספציפית, התחילו עם [Plugin מול Skill מול MCP מול API](/he/reference/cli-mcp-api/).

## התחברות וקונפיגורציה מקומית

ה-CLI הוא agent-session-first:

- ברירת מחדל: `agent-analytics login` פותח אישור בדפדפן עם local loopback callback
- fallback מנותק: `agent-analytics login --detached` עבור headless או אישור מרוחק
- מתקדם/ידני בלבד: `agent-analytics login --token aak_...`

אל תציגו הדבקה של API keys ארוכי-חיים כנתיב onboarding ראשי. אישור בדפדפן הוא ה-flow המארח הרגיל.

ה-CLI שומר קונפיגורציה מקומית ב-`$XDG_CONFIG_HOME/agent-analytics/config.json`, עם fallback ל-`~/.config/agent-analytics/config.json`.

עדיין יש עדיפות למשתני סביבה, ולכן `AGENT_ANALYTICS_API_KEY` ימשיך לנצח עד שתבטלו אותו.

## פקודות נפוצות

```bash
agent-analytics projects
agent-analytics whoami
agent-analytics create my-site --domain https://mysite.com
agent-analytics stats my-site --days 7
agent-analytics insights my-site --period 7d
agent-analytics events my-site --days 7 --limit 20
agent-analytics breakdown my-site --property path --event page_view --limit 10
agent-analytics funnel my-site --steps "page_view,signup,purchase"
agent-analytics retention my-site --period week --cohorts 8
agent-analytics experiments list my-site
agent-analytics logout
```

משפחות הפקודות העיקריות הן:

- חשבון ו-auth: `login`, `logout`, `whoami`, `revoke-key`
- הקמת פרויקטים: `create`, `projects`
- דוחות: `stats`, `insights`, `breakdown`, `pages`, `sessions-dist`, `events`, `sessions`, `query`
- ניטור חי: `live`
- גילוי סכימה: `properties`, `properties-received`
- workflows אנליטיים: `funnel`, `retention`, `experiments`
- משוב מוצר: `feedback`

## ניהול פרויקטים

`projects` מדפיסה לכל פרויקט את השם, ה-ID, ה-project token וה-origins המותרים. `project`, `update` ו-`delete` מקבלות שם פרויקט מדויק או ID.

השתמשו ב-`update` כדי לשנות origins מותרים בלי לצאת מה-CLI. עבור QA בדפדפן מקומי, השאירו את ה-origin של ה-production והוסיפו את ה-origin המקומי הזמני:

```bash
agent-analytics update stylio --origins 'https://stylio.app,http://lvh.me:3101'
```

## מיפוי CLI ל-API

רוב ה-workflows של ה-CLI ממופים ישירות לנקודת קצה ב-HTTP. החריג המרכזי הוא פקודות נוחות של auth מקומי כמו `logout`, שמשנות רק מצב מקומי של ה-CLI.

| CLI Command | API Endpoint |
| --- | --- |
| `agent-analytics stats my-site` | `GET /stats?project=my-site` |
| `agent-analytics all-sites --period 7d` | `GET /account/all-sites?period=7d` |
| `agent-analytics bot-traffic my-site --period 7d` | `GET /bot-traffic?project=my-site&period=7d` |
| `agent-analytics bot-traffic --all --period 7d` | `GET /account/bot-traffic?period=7d` |
| `agent-analytics events my-site` | `GET /events?project=my-site` |
| `agent-analytics query my-site --metrics event_count` | `POST /query` |
| `agent-analytics query my-site --metrics event_count --count-mode raw` | `POST /query` |
| `agent-analytics funnel my-site --steps "page_view,signup,purchase"` | `POST /funnel` |
| `agent-analytics retention my-site --period week --cohorts 8` | `GET /retention?project=my-site&period=week&cohorts=8` |
| `agent-analytics experiments list my-site` | `GET /experiments?project=my-site` |
| `agent-analytics experiments create my-site --name signup_cta --variants control,new_cta --goal signup` | `POST /experiments` |
| `agent-analytics experiments get exp_abc123` | `GET /experiments/{id}` |
| `agent-analytics projects` | `GET /projects` |
| `agent-analytics project my-site` | `GET /projects/{id}` אחרי פתרון שם או ID |
| `agent-analytics update my-site --origins https://mysite.com` | `PATCH /projects/{id}` אחרי פתרון שם או ID |
| `agent-analytics delete my-site` | `DELETE /projects/{id}` אחרי פתרון שם או ID |
| `agent-analytics logout` | None. פקודה מקומית בלבד שמוחקת auth שמור של CLI ולא קוראת ל-API. |

`logout` מוחק את מצב ה-auth שה-CLI שמר על הדיסק. הוא לא מבטל קרדנצ'לים בשרת.

## הערות על query

- הצורה התקינה היא `agent-analytics query <project> ...`. אל תשתמשו ב-`--project`.
- `/events` נשאר raw ו-lossless. ברירת המחדל של `/query` עבור `event_count` היא `session_then_user`.
- השתמשו ב-`--count-mode raw` כשהשאלה עוסקת בנפח ingestion או בדיבוג כתיבות כפולות, לא בספירות activation-safe.
- שדות query מובנים הם `event`, `user_id`, `date`, `country`, `session_id` ו-`timestamp`.
- שדות לא מובנים כמו `referrer`, `utm_source`, `path`, `browser` ו-`hostname` צריכים להיכתב כ-`properties.<key>`.
- `group_by` מוגבל לשדות המובנים בלבד: `event`, `date`, `user_id`, `session_id` ו-`country`.
- אם צריך לדבג payloads או filters ברמת HTTP, עברו ל-[API Reference](/he/api/) במקום להעמיס JSON מורכב על ה-CLI.

## קשור

- [Plugin מול Skill מול MCP מול API](/he/reference/cli-mcp-api/)
- [Authentication](/he/reference/authentication/)
- [Rate Limits](/he/reference/rate-limits/)
- [API Reference](/he/api/)
