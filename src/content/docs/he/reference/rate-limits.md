---
title: Rate Limits
description: ב-Agent Analytics המארח יש מגבלות API ברמת החשבון ומגבלות נפח אירועים שמשתנות לפי תוכנית.
---

## מגבלות סטנדרטיות

| Tier | Requests / minute | Event limit | Data retention |
| --- | --- | --- | --- |
| Free | 10 | 100,000 / month | 90 days |
| Pro | 1,000 | Unlimited | 365 days |

חשבונות hosted free מקבלים גם:

- עד 2 פרויקטים
- 500 פעולות קריאה של סוכן/API בחודש
- גישת MCP ל-`list_projects`, `create_project`, `all_sites_overview`, `analytics_overview`, `bot_traffic_overview` ו-`all_sites_bot_traffic`

Bot traffic overview נשאר זמין בשתי התוכניות המארחות דרך API, CLI ו-MCP.

תוכניות בתשלום פותחות את כל המשטח של API, CLI ו-MCP. חשבונות free יקבלו `PRO_REQUIRED` על query, funnels, retention, experiments ונקודות הקצה העשירות יותר של האנליטיקה.

`POST /track/batch` מקבל עד 100 אירועים בכל בקשה. אם אתם שומרים אירועים עד consent או לשליחה מאוחרת, פצלו מאגרים גדולים לכמה בקשות batch. מגבלות requests per minute נספרות לפי בקשת HTTP; מגבלות חודשיות ו-spend caps נספרות לפי אירוע שהתקבל.

## מגבלות סטרימינג

| Limit | Value |
| --- | --- |
| Concurrent SSE streams | 10 per account |
| `/live` rate | Standard API rate limit |
| Inactivity timeout | 30 minutes |
| Ring buffer | 5 minutes / 10,000 events |

## מה לעשות אם הגעתם למגבלה

- בצעו backoff ונסו שוב במקום להכות שוב ושוב באותה נקודת קצה
- צמצמו את תדירות ה-polling לשאילתות overview
- בצעו batching לקליטת אירועים כשאפשר
- העבירו ניסויים וניתוחים כבדים יותר לחשבון pro אם זה צוואר הבקבוק

## קשור

- [Bot Traffic](/he/reference/bot-traffic/)
- [Error Format](/he/reference/error-format/)
- [API Reference](/he/api/)
