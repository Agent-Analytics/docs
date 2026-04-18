---
title: OpenClaw
description: התקינו את Agent Analytics skill ב-OpenClaw דרך ClawHub, השתמשו באישור בדפדפן וב-finish code בתור מסלול ההתחברות הרגיל, והמשיכו את ה-workflow מתוך הצ'אט.
---

ל-OpenClaw, המסלול הנקי ביותר הוא ה-skill המארח דרך ClawHub. הוא שומר על ההגדרה agent-native ועובד היטב עם workflow מוכוון CLI.

הפרט החשוב: `npx` הוא רק ה-launcher. ה-skill משתמש ב-CLI הרשמי של Agent Analytics, וה-CLI הזה עוטף את אותו HTTP API מתועד שמופיע בתיעוד.

## דרישות מקדימות

- גישה לסביבת OpenClaw שבה אתם רוצים להתקין את ה-skill
- `npx` זמין באותה סביבת runtime
- גישה להתחברות עם Google או GitHub שתרצו לחבר כאשר OpenClaw שולח את קישור האישור

## מומלץ: התקנה מתוך ClawHub

אמרו ל-OpenClaw:

> Install the Agent Analytics skill from ClawHub. Use the official Agent Analytics CLI. Send me the login link and wait. I will sign in with Google or GitHub, approve it, and paste back the finish code if you need it.

הרישום המארח נמצא כאן:

- [Agent Analytics on ClawHub](https://clawhub.ai/dannyshmueli/agent-analytics)

אחרי ההתקנה, OpenClaw יכול ליצור פרויקטים, לייצר סניפטי מעקב, לשאול סטטיסטיקות, לבדוק funnels ולנהל ניסויים מתוך אותו לולאת שיחה.

אם OpenClaw נתקע בהתחברות ומבקש את קוד הסיום, מסך הדפדפן אמור להיראות כך:

![Agent Analytics finish-code handoff screen](/finishcode.jpg)

## אחסון auth מתמשך

ב-OpenClaw ובסביבות מנוהלות דומות, אל תסתמכו על נתיב ברירת המחדל תחת home עבור auth של Agent Analytics. הגדירו נתיב מתמשך בתוך סביבת העבודה לפני login:

```bash
export AGENT_ANALYTICS_CONFIG_DIR="$PWD/.openclaw/agent-analytics"
npx @agent-analytics/cli@0.5.16 login --detached
npx @agent-analytics/cli@0.5.16 auth status
```

שמרו על ההגדרה הזו בכל פקודת Agent Analytics CLI באותה משימה. אם לא בטוח שמשתני shell נשמרים, הוסיפו prefix לכל פקודה:

```bash
AGENT_ANALYTICS_CONFIG_DIR="$PWD/.openclaw/agent-analytics" npx @agent-analytics/cli@0.5.16 projects
```

ל-debug חד-פעמי אפשר להשתמש ב-`--config-dir "$PWD/.openclaw/agent-analytics"` לפני או אחרי הפקודה. ודאו ש-`.openclaw/` נמצא ב-gitignore לפני login, ולעולם אל תבצעו commit ל-`.openclaw/agent-analytics/config.json`.

התיעוד הציבורי עדיין חשוב כי הוא מראה בדיוק מה ה-CLI עוטף:

- [CLI vs MCP vs API](/he/reference/cli-mcp-api/)
- [API Reference](/he/api/)

זהו ההסבר הנכון אם ביקורת אבטחה שואלת מה פקודת ה-`npx` באמת עושה.

## בדיקת ההתקנה

בקשו מ-OpenClaw:

- `List my Agent Analytics projects`
- `Set up Agent Analytics for this project. Install it here if needed. Send me the login link and wait. I will sign in with Google or GitHub, approve it, and paste back the finish code if you need it. Then create the project, add tracking and key events, and verify the first event.`
- `How is my-site doing this week?`
- `Create a recurring 8:00 AM analytics job. Every morning, query Agent Analytics for the latest 24 hours across my projects and send me a short brief with anomalies, winners, drop-offs, and one recommended action.`

אם עוד לא יצרתם את הפרויקט האמיתי הראשון, המשיכו אל [הפרויקט הראשון ב-5 דקות](/he/guides/first-project-in-5-minutes/).

## פתרון תקלות

- אם ClawHub מסמן את ה-skill בגלל `npx`, הפנו את הסוקרים אל [CLI vs MCP vs API](/he/reference/cli-mcp-api/) ו-[API Reference](/he/api/). ה-CLI הוא ה-wrapper הרשמי סביב אותן נקודות קצה מתועדות.
- אם OpenClaw שולח קישור אישור אבל לא ממשיך, הדביקו חזרה את קוד הסיום באותו thread.
- אם ההתחברות עבדה קודם ואז מתקבלת הודעת "Not logged in", הריצו `auth status` וודאו ש-`AGENT_ANALYTICS_CONFIG_DIR` מצביע אל הנתיב המתמשך `.openclaw/agent-analytics`.
- אם ה-skill מותקן אבל לא מצליח לשאול נתונים אחרי ההתחברות, ודאו שהאישור בדפדפן הושלם עם אותו חשבון Agent Analytics שבו אתם מצפים להשתמש.
- אם בחרתם במפורש במסלול המתקדם/ידני של API key, ודאו ש-`AGENT_ANALYTICS_API_KEY` זמין בסביבת OpenClaw ולא מודבק בצ'אט.
- אם צריך דיבוג ברמת endpoint, השתמשו ב-[API reference](/he/api/) עם `curl` לפני שחוזרים ל-flow של ה-skill.

## קשור

- [התחלה מהירה](/he/getting-started/)
- [הפרויקט הראשון ב-5 דקות](/he/guides/first-project-in-5-minutes/)
- [Claude Code](/he/installation/claude-code/)
- [OpenAI Codex](/he/installation/openai-codex/)
- [API Reference](/he/api/)
