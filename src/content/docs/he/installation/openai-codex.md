---
title: OpenAI Codex
description: התקינו את Agent Analytics skill עבור OpenAI Codex, הגדירו את מפתח ה-API פעם אחת, ואז השתמשו בשאילתות ישירות או ב-workflow מודרך.
---

<div class="aa-agent-badge aa-agent-badge--inverse">
  <img src="/logos/openai-white.png" alt="" />
  <span>OpenAI Codex</span>
</div>

עבור OpenAI Codex, המסלול הנקי ביותר כרגע הוא התקנה דרך Agent Skills. כך ה-workflow נשאר agent-native ואין צורך ב-connector של MCP.

## דרישות מקדימות

- חשבון Agent Analytics ב-[app.agentanalytics.sh](https://app.agentanalytics.sh)
- מפתח API תקין של Agent Analytics
- `npx` זמין בסביבה שבה Codex משתמש

## מומלץ: התקנת Agent Analytics skill

```bash
npx skills add Agent-Analytics/agent-analytics-mcp
```

אחר כך חשפו את מפתח ה-API לסביבת הסוכן:

```bash
export AGENT_ANALYTICS_API_KEY=aak_...
```

ה-skill מלמד את Codex איך להגדיר מעקב, לשאול אנליטיקה, לבדוק את מצב הפרויקט ולהריץ ניסויים מתוך אותו לולאת שיחה.

## בדיקת ההתקנה

בקשו מ-Codex:

- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `Create an experiment for the signup CTA on my-site`

אם עוד לא יצרתם את הפרויקט האמיתי הראשון, חזרו אל [התחלה מהירה](/he/getting-started/#3-צרו-את-הפרויקט-הראשון-שלכם) ועשו את זה עכשיו.

## פתרון תקלות

- אם ה-skill מותקן אבל השאילתות נכשלות, בדקו ש-`AGENT_ANALYTICS_API_KEY` קיים בסביבה שבה הסוכן באמת רץ.
- אם `npx` לא זמין, התקינו קודם את סביבת Node.js הנדרשת או עברו זמנית למסלול של API ישיר.
- אם אתם צריכים דיבוג ברמת endpoint, השתמשו ב-[API reference](/he/api/) ובדקו עם `curl`.

## קשור

- [התחלה מהירה](/he/getting-started/)
- [Claude Code](/he/installation/claude-code/)
- [Authentication](/he/reference/authentication/)
- [API Reference](/he/api/)
