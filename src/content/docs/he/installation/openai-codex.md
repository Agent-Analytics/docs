---
title: OpenAI Codex
description: התקינו את Agent Analytics skill עבור OpenAI Codex, השתמשו באישור בדפדפן במסלול הרגיל, ושמרו את workflow ההגדרה בתוך הסוכן.
---

<div class="aa-agent-badge aa-agent-badge--inverse">
  <img src="/logos/openai-white.png" alt="" />
  <span>OpenAI Codex</span>
</div>

עבור OpenAI Codex, המסלול הנקי ביותר כרגע הוא התקנה דרך Agent Skills. כך ה-workflow נשאר agent-native ואין צורך ב-connector של MCP.

## דרישות מקדימות

- `npx` זמין בסביבה שבה Codex משתמש
- גישה להתחברות עם Google או GitHub שתרצו לחבר כאשר Codex פותח את אישור הדפדפן

## מומלץ: התקנת Agent Analytics skill

```bash
npx skills add Agent-Analytics/agent-analytics-skill@agent-analytics
```

אחר כך בקשו מ-Codex:

```text
Set up Agent Analytics for this project. Install it here if needed. Open the browser for me or give me a login link, then wait. I will sign in with Google or GitHub, approve it, and paste back any finish code if you need it. Then create the project, add tracking and key events, and verify the first event.
```

ה-skill מלמד את Codex איך להגדיר מעקב, לשאול אנליטיקה, לבדוק את מצב הפרויקט ולהריץ ניסויים מתוך אותו לולאת שיחה. אישור הדפדפן יוצר או מחבר את החשבון במהלך ההגדרה, כך שאין צורך להכין מפתח API מראש.

## בדיקת ההתקנה

בקשו מ-Codex:

- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `Create an experiment for the signup CTA on my-site`

אם עוד לא יצרתם את הפרויקט האמיתי הראשון, המשיכו אל [הפרויקט הראשון ב-5 דקות](/he/guides/first-project-in-5-minutes/).

## פתרון תקלות

- אם ה-skill נעצר בשלב האישור, השלימו את ההתחברות בדפדפן והדביקו חזרה כל finish code אם Codex מבקש אותו.
- אם בחרתם במפורש במסלול הידני/המתקדם של API key, בדקו ש-`AGENT_ANALYTICS_API_KEY` קיים בסביבה שבה הסוכן באמת רץ.
- אם `npx` לא זמין, התקינו קודם את סביבת Node.js הנדרשת או עברו זמנית למסלול של API ישיר.
- אם אתם צריכים דיבוג ברמת endpoint, השתמשו ב-[API reference](/he/api/) ובדקו עם `curl`.

## קשור

- [התחלה מהירה](/he/getting-started/)
- [הפרויקט הראשון ב-5 דקות](/he/guides/first-project-in-5-minutes/)
- [Claude Code](/he/installation/claude-code/)
- [Authentication](/he/reference/authentication/)
- [API Reference](/he/api/)
