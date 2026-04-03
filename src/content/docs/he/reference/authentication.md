---
title: Authentication
description: הבינו את ההבדל בין agent sessions, API keys ו-project tokens לפני שאתם מחברים סוכן או טרקר.
---

Agent Analytics משתמש בשלושה credentials שונים. יש להם תפקידים שונים, ולא צריך להחליף ביניהם.

## Agent session (`aas_*`)

השתמשו ב-agent session עבור:

- התחברות ה-CLI הרשמי דרך אישור בדפדפן
- זרימות plugin ו-skill שמתחברות דרך מסלול האישור המארח
- setup agent-native שבו הסוכן אמור להחזיק את החיבור אחרי האישור

במסלול המוצר הרגיל לא מעתיקים את הטוקן הזה ידנית. מסלול האישור המארח יוצר אותו עבור הסוכן או ה-CLI ושומר אותו מקומית לשימוש מאוחר יותר.

## API key (`aak_*`)

השתמשו ב-API key עבור:

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

## Project token (`aat_*`)

השתמשו ב-project token עבור:

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

## עזרי auth של CLI

אם אתם משתמשים ב-CLI הרשמי, הוא מספק שלוש פקודות auth נוחות:

- `npx @agent-analytics/cli login` מפעיל אישור בדפדפן ושומר session מקומי של ה-CLI.
- `npx @agent-analytics/cli login --detached` מפעיל את אותו flow עבור runtimes חסרי ממשק או מבוססי issues, שבהם הסוכן שולח לכם קישור אישור ועלול לבקש finish code.
- `npx @agent-analytics/cli login --token aak_...` שומר מקומית API key כ-fallback הידני/המתקדם.
- `npx @agent-analytics/cli logout` מוחק את auth המקומי השמור של ה-CLI.

אם התחברתם עם `--token`, `logout` לא מבטל את ה-API key בשרת. השתמשו ב-`revoke-key` כשאתם רוצים לפסול את המפתח הישן ולהנפיק חדש.

אם הגדרתם `AGENT_ANALYTICS_API_KEY` בסביבת shell, ה-CLI ימשיך להשתמש במשתנה הזה גם אחרי `logout` עד שתבטלו אותו.

## קשור

- [התחלה מהירה](/he/getting-started/)
- [CLI vs MCP vs API](/he/reference/cli-mcp-api/)
- [Error Format](/he/reference/error-format/)
- [API Reference](/he/api/)
