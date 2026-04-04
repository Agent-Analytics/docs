---
title: אימות
description: הבינו את ההבדל בין agent sessions, API keys ו-project tokens לפני שאתם מחברים סוכן או טרקר.
---

Agent Analytics משתמש בשלושה פרטי גישה שונים. יש להם תפקידים שונים, ולא צריך להחליף ביניהם.

## סשן סוכן (`aas_*`)

השתמשו בסשן סוכן עבור:

- התחברות ה-CLI הרשמי דרך אישור בדפדפן
- זרימות plugin ו-skill שמתחברות דרך מסלול האישור המארח
- setup agent-native שבו הסוכן אמור להחזיק את החיבור אחרי האישור

במסלול המוצר הרגיל לא מעתיקים את הטוקן הזה ידנית. מסלול האישור המארח יוצר אותו עבור הסוכן או ה-CLI ושומר אותו מקומית לשימוש מאוחר יותר.

## ניהול סשני סוכן פעילים

אם אתם רוצים לבדוק או לבטל logins של סוכנים אחר כך, פתחו את [app.agentanalytics.sh](https://app.agentanalytics.sh) ועברו אל `Account Settings` → `Agent Sessions`.

בעמוד הזה תראו סשני סוכן פעילים כמו:

- התחברויות CLI
- חיבורי macOS Live
- חיבורי Paperclip
- לקוחות MCP או לקוחות agent-session מארחים אחרים

השתמשו ב-`Disconnect` שם כשאתם רוצים לבטל סשן מסוים בצד השרת.

## מפתח API (`aak_*`)

השתמשו במפתח API עבור:

- קריאת נתוני אנליטיקה
- יצירה או רשימה של פרויקטים
- נקודות קצה ברמת החשבון
- גישה ישירה ל-API מתוך סקריפטים, כלים וסוכנים

העבירו אותו עם כותרת `X-API-Key` או עם query parameter בשם `?key=`.

```bash
curl "https://api.agentanalytics.sh/stats?project=my-site&since=7d" \
  -H "X-API-Key: aak_..."
```

התייחסו אליו כחומר סודי.

## טוקן פרויקט (`aat_*`)

השתמשו בטוקן פרויקט עבור:

- `POST /track`
- `POST /track/batch`
- סניפט הטרקר בדפדפן שמוטמע באתר שלכם

הטוקן ציבורי בכוונה. הוא מזהה את הפרויקט עבור קליטת אירועים, ולכן צפוי להופיע ב-HTML.

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."></script>
```

## טעות נפוצה

אל תשימו את ה-API key בתוך הטרקר בצד הלקוח. הטרקר משתמש רק ב-project token הציבורי.

## עזרי אימות של CLI

אם אתם משתמשים ב-CLI הרשמי, הוא מספק שלוש פקודות auth נוחות:

- `npx @agent-analytics/cli login` מפעיל אישור בדפדפן ושומר session מקומי של ה-CLI.
- `npx @agent-analytics/cli login --detached` מפעיל את אותו flow עבור runtimes חסרי ממשק או מבוססי issues, שבהם הסוכן שולח לכם קישור אישור ועלול לבקש finish code.
- `npx @agent-analytics/cli login --token aak_...` שומר מקומית מפתח API כ-fallback הידני/המתקדם.
- `npx @agent-analytics/cli logout` מוחק את auth המקומי השמור של ה-CLI.

`logout` הוא מקומי בלבד עבור מצב ה-CLI. אם אתם רוצים לבטל גם את ה-session המארח עצמו, נתקו את אותו session מתוך `Agent Sessions` באפליקציית הווב.

אם התחברתם עם `--token`, `logout` לא מבטל את מפתח ה-API בשרת. השתמשו ב-`revoke-key` כשאתם רוצים לפסול את המפתח הישן ולהנפיק חדש.

אם הגדרתם `AGENT_ANALYTICS_API_KEY` בסביבת shell, ה-CLI ימשיך להשתמש במשתנה הזה גם אחרי `logout` עד שתבטלו אותו.

## קשור

- [התחלה מהירה](/he/getting-started/)
- [CLI מול MCP מול API](/he/reference/cli-mcp-api/)
- [פורמט שגיאות](/he/reference/error-format/)
- [רפרנס API](/he/api/)
