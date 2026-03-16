---
title: התחלה מהירה
description: צרו פרויקט, התקינו את Agent Analytics בסוכן שלכם, וודאו שהשאילתה הראשונה עובדת.
---

זהו המסלול הקצר ביותר מאפס להגדרה עובדת של Agent Analytics.

## 1. קבלו את מפתח ה-API

הירשמו ב-[app.agentanalytics.sh](https://app.agentanalytics.sh) וצרו מפתח API מתוך הדשבורד.

- השתמשו במפתח ה-API (`aak_*`) לקריאה של נתוני אנליטיקה, ניהול פרויקטים והגדרת skills לסוכן.
- השתמשו בטוקן הפרויקט (`aat_*`) בסניפט המעקב שמוטמע באתר שלכם.

## 2. בחרו והשלימו מסלול התקנה

עברו אל [מרכז ההתקנה](/he/installation/) והשלימו את ההגדרה לסביבה שבה אתם באמת משתמשים:

- [Claude Code](/he/installation/claude-code/)
- [Claude Desktop / Cowork](/he/installation/claude-desktop-cowork/)
- [Cursor](/he/installation/cursor/)
- [OpenClaw](/he/installation/openclaw/)
- [OpenAI Codex](/he/installation/openai-codex/)

אם אף אחת מהאפשרויות האלה לא מתאימה, [עיון ב-API](/he/api/) עדיין זמין לאינטגרציה ישירה.

## 3. צרו את הפרויקט הראשון שלכם

אחרי שהסוכן מחובר, בקשו ממנו ליצור עבורכם את הפרויקט הראשון:

- `Create a project called my-site.com`
- `Create a project called my-site.com and give me the tracking snippet`

אם לסוכן יש גישת כתיבה לקוד של האתר, בקשו ממנו:

- `Set up analytics for my-site.com`

הסוכן שלכם אמור ליצור את הפרויקט ואז:

- להחזיר לכם את סניפט הטרקר כדי שתדביקו אותו, או
- להתקין את הטרקר בעצמו אם הוא יכול לערוך את האתר

## 4. הוסיפו את הטרקר ידנית אם צריך

אם הסוכן כבר הוסיף את הטרקר לאתר, אפשר לדלג על השלב הזה.

אם הוא רק יצר את הפרויקט והחזיר סניפט, הוסיפו את הסקריפט לפני `</body>`:

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."></script>
```

צפיות דף נמדדות אוטומטית. אירועים מותאמים אישית אפשר להוסיף אחר כך עם מאפייני `data-aa-event` או עם `window.aa.track()`.

אם האתר שלכם משתמש ב-Astro, הוסיפו `is:inline` לתגית הטרקר.

לאפשרויות מתקדמות כמו אירועים דקלרטיביים, זהות חוצת-דומיינים, consent, עומק גלילה, vitals ומעקב שגיאות, השתמשו ב-[מדריך Tracker.js](/he/reference/tracker-js/).
אם אתם רוצים שהסוכן שלכם ישיק את ניסוי ה-A/B הראשון שלכם אחרי ההגדרה, המשיכו אל [מעקב ניסויים לסוכני AI](/he/guides/ai-agent-experiment-tracking/).

## 5. ודאו שהלולאה נסגרת

ברגע שההתקנה עובדת והטרקר חי, בקשו מהסוכן שלכם אחת מהשאילתות הבאות:

- `List my projects`
- `How is my-site doing this week?`
- `What are the top pages for my-site this week?`
- `Show bot traffic for my-site this week`

אם ההגדרה תקינה, הסוכן אמור לענות בלי שתצטרכו לכתוב בקשות HTTP ידנית.

## השלב הבא

- השתמשו ב-[התקנה](/he/installation/) למסלול ההגדרה המהיר ביותר לכל סוכן.
- השתמשו ב-[מעקב ניסויים לסוכני AI](/he/guides/ai-agent-experiment-tracking/) כשאתם רוצים שהסוכן ישיק ויקרא עבורכם ניסויים בצד הדפדפן.
- השתמשו ב-[Tracker.js](/he/reference/tracker-js/) לאפשרויות מעקב בצד הדפדפן.
- השתמשו ב-[Bot Traffic](/he/reference/bot-traffic/) כדי לבדוק תעבורה אוטומטית שמסוננת מהאנליטיקה הרגילה.
- השתמשו ב-[Authentication](/he/reference/authentication/) כשאתם צריכים להבין את ההבדל בין טוקן קריאה לטוקן כתיבה.
- השתמשו ב-[API Reference](/he/api/) כשאתם צריכים פירוט ברמת נקודת קצה.
