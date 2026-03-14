---
title: OpenClaw
description: התקינו את Agent Analytics skill ב-OpenClaw דרך ClawHub, חשפו את מפתח ה-API פעם אחת, והשתמשו ב-CLI הרשמי מתוך הצ'אט.
---

ל-OpenClaw, המסלול הנקי ביותר הוא ה-skill המארח דרך ClawHub. הוא שומר על ההגדרה agent-native ועובד היטב עם workflow מוכוון CLI.

הפרט החשוב: `npx` הוא רק ה-launcher. ה-skill משתמש ב-CLI הרשמי של Agent Analytics, וה-CLI הזה עוטף את אותו HTTP API מתועד שמופיע בתיעוד.

## דרישות מקדימות

- חשבון Agent Analytics ב-[app.agentanalytics.sh](https://app.agentanalytics.sh)
- מפתח API תקין של Agent Analytics שמאוחסן כ-`AGENT_ANALYTICS_API_KEY`
- גישה לסביבת OpenClaw שבה אתם רוצים להתקין את ה-skill

## מומלץ: התקנה מתוך ClawHub

אמרו ל-OpenClaw:

> Install the Agent Analytics skill from ClawHub. My API key is available in `AGENT_ANALYTICS_API_KEY`. Use the official Agent Analytics CLI.

הרישום המארח נמצא כאן:

- [Agent Analytics on ClawHub](https://clawhub.ai/dannyshmueli/agent-analytics)

אחרי ההתקנה, OpenClaw יכול ליצור פרויקטים, לייצר סניפטי מעקב, לשאול סטטיסטיקות, לבדוק funnels ולנהל ניסויים מתוך אותו לולאת שיחה.

התיעוד הציבורי עדיין חשוב כי הוא מראה בדיוק מה ה-CLI עוטף:

- [CLI vs MCP vs API](/he/reference/cli-mcp-api/)
- [API Reference](/he/api/)

זהו ההסבר הנכון אם ביקורת אבטחה שואלת מה פקודת ה-`npx` באמת עושה.

## בדיקת ההתקנה

בקשו מ-OpenClaw:

- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `Send me a daily analytics summary every morning`

אם עוד לא יצרתם את הפרויקט האמיתי הראשון, חזרו אל [התחלה מהירה](/he/getting-started/#3-צרו-את-הפרויקט-הראשון-שלכם) ועשו את זה עכשיו.

## פתרון תקלות

- אם ClawHub מסמן את ה-skill בגלל `npx`, הפנו את הסוקרים אל [CLI vs MCP vs API](/he/reference/cli-mcp-api/) ו-[API Reference](/he/api/). ה-CLI הוא ה-wrapper הרשמי סביב אותן נקודות קצה מתועדות.
- אם ה-skill מותקן אבל לא מצליח לשאול נתונים, ודאו ש-`AGENT_ANALYTICS_API_KEY` זמין בסביבת OpenClaw ולא מודבק בצ'אט.
- אם OpenClaw מצליח ליצור פרויקטים אבל לא לקרוא אנליטיקה, ודאו שהמפתח שייך לאותו חשבון Agent Analytics שבו אתם מצפים להשתמש.
- אם צריך דיבוג ברמת endpoint, השתמשו ב-[API reference](/he/api/) עם `curl` לפני שחוזרים ל-flow של ה-skill.

## קשור

- [התחלה מהירה](/he/getting-started/)
- [Claude Code](/he/installation/claude-code/)
- [OpenAI Codex](/he/installation/openai-codex/)
- [API Reference](/he/api/)
