---
title: Tracker.js
description: הוסיפו את Agent Analytics לכל אתר עם תגית script אחת, ואז הפעילו אירועים דקלרטיביים, consent, מעקב ביצועים ועוד יכולות צד-דפדפן.
---

`tracker.js` הוא החלק הדפדפני של Agent Analytics. השתמשו בו כשאתם רוצים צפיות דף, אירועים מותאמים אישית וניסויים בצד הלקוח בלי לשלוח SDK כבד.

עיון ה-API מתייחס עכשיו ל-`GET /tracker.js` כנקודת הקצה של הסקריפט בלבד. מדריך ההגדרה והיכולות נמצא כאן.

## סניפט בסיסי

הוסיפו את זה לפני `</body>`:

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."></script>
```

מאפיינים נדרשים:

- `data-project`: שם הפרויקט שלכם
- `data-token`: טוקן הפרויקט הציבורי (`aat_*`)

הטרקר אוסף אוטומטית את כתובת הדף, pathname, referrer, דפדפן, מערכת הפעלה, מכשיר, שפה, אזור זמן, פרמטרי UTM, מספר session ו-first-touch attribution. אין צורך בעוגיות.

תעבורה אוטומטית שמגיעה לטרקר מסוננת מהאנליטיקה הרגילה שלכם. השתמשו ב-[Bot Traffic](/he/reference/bot-traffic/) אם אתם רוצים לבדוק את הבקשות האוטומטיות בנפרד.

אם הסוכן שלכם יכול לערוך קוד, בקשו ממנו להוסיף עבורכם את הסניפט. אם לא, צרו את הפרויקט ב-[התחלה מהירה](/he/getting-started/#3-צרו-את-הפרויקט-הראשון-שלכם) והדביקו ידנית את הסניפט שהוחזר.

## אפשרויות נפוצות

| Attribute | מה זה עושה |
| --- | --- |
| `data-link-domains="example.com"` | מחבר זהות אנונימית בין דומיינים או תתי-דומיינים אחים |
| `data-do-not-track="true"` | מכבד את אות Do Not Track של הדפדפן |
| `data-heartbeat="15"` | מודד זמן פעיל בדף בזמן שהטאב גלוי |
| `data-track-outgoing="true"` | עוקב אחרי קליקים על קישורים חיצוניים בתור `outgoing_link` |
| `data-track-clicks="true"` | עוקב אחרי קליקים על `<a>` ו-`<button>` בתור `$click` |
| `data-track-errors="true"` | לוכד שגיאות JS לא מטופלות ו-promise rejections בתור `$error` |
| `data-track-performance="true"` | מוסיף מדדי Navigation Timing ל-`page_view` |
| `data-track-vitals="true"` | מוסיף Core Web Vitals ל-`page_view` |
| `data-track-downloads="true"` | עוקב אחרי קליקים על קישורי הורדה בתור `$download` |
| `data-track-forms="true"` | עוקב אחרי שליחת טפסים בתור `$form_submit` |
| `data-track-404="true"` | עוקב אחרי דפי 404 בתור `$404` |
| `data-track-scroll-depth="true"` | מוסיף עומק גלילה מקסימלי ל-`page_view` |
| `data-require-consent="true"` | מחזיק אירועים בבאפר עד שניתן consent |

דוגמה:

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."
        data-track-outgoing="true"
        data-track-performance="true"
        data-track-vitals="true"
        data-track-errors="true"
        data-track-scroll-depth="true"
        data-heartbeat="15"></script>
```

## אירועים דקלרטיביים

למעקב קליקים פשוט, לרוב לא צריך JavaScript מותאם אישית. הוסיפו `data-aa-event` ישירות ל-HTML:

```html
<button data-aa-event="signup" data-aa-event-plan="pro">
  Sign up for Pro
</button>
```

זה ישלח אירוע `signup` עם `{ plan: "pro" }`.

ברוב המקרים זהו גם המסלול הקל ביותר לסוכנים. הם יכולים להוסיף מאפיינים ל-markup קיים במקום לחווט `onclick` handlers או לערוך קוד אפליקציה.

## חשיפות

עקבו אחרי האם מקטע מסוים באמת נצפה:

```html
<section data-aa-impression="pricing_table"
         data-aa-impression-plan="pro">
  ...
</section>
```

כשהאלמנט הופך לגלוי, הטרקר שולח אירוע `$impression`.

## API של `window.aa`

השתמשו ב-JavaScript API כשהאירוע תלוי במצב runtime:

```js
window.aa?.track('checkout_started', { plan: 'pro' });
window.aa?.identify('user_123');
window.aa?.set({ plan: 'pro', team: 'acme' });
```

שיטות שימושיות:

- `aa.track(event, properties)`: שליחת אירוע מותאם אישית
- `aa.page(name)`: שליחת page view ידנית
- `aa.identify(id)`: קישור התנהגות אנונימית למזהה משתמש ידוע
- `aa.set(properties)`: צירוף מאפיינים גלובליים לאירועים עתידיים
- `aa.experiment(name, variants)`: שיוך וריאנטים בצד הלקוח בצורה דטרמיניסטית
- `aa.grantConsent()` / `aa.revokeConsent()`: ניהול מצב consent

## ניתוב SPA ועמודים וירטואליים

Agent Analytics מודד `page_view` אוטומטית כשה-URL בדפדפן משתנה דרך `history.pushState()`, `history.replaceState()`, אירועי `popstate` או `hashchange`. זה מכסה את רוב ה-client-side routers, כולל SPAs מבוססי hash.

אם ה-UI משתנה בלי שינוי ב-path, ב-query string או ב-hash, הטרקר לא מנסה לנחש שמסך חדש הופיע. במקרה כזה צריך לשלוח `page_view` ידני.

סדר ההעדפה ליישום:

1. שינויי URL אמיתיים
2. ניתוב hash
3. `page_view` וירטואלי ידני

השתמשו ב-`aa.page(name)` כשה-URL הנוכחי בדפדפן כבר תואם למסך שאתם רוצים לתייג. הוא שולח `page_view` עם מאפיין `page`, אבל `path` ו-`url` עדיין מגיעים מהמיקום הנוכחי של הדפדפן.

לעמודים וירטואליים אמיתיים בלי שינוי URL, שלחו `page_view` ידני ועקפו בעצמכם את שדות הניתוב:

```js
window.aa?.track('page_view', {
  page: 'Checkout Step 2',
  path: '/checkout/step-2',
  url: `${location.origin}/checkout/step-2`
});
```

אל תשלבו מעקב דפים ידני עם מעברי router ש-Agent Analytics כבר מודד אוטומטית, אחרת תספרו את אותו שינוי מסך פעמיים.

אם אתם רוצים workflow מבוסס-פרומפטים לבחירה בין מעקב router למעקב עמודים וירטואליים, השתמשו ב-[מעקב SPA ועמודים וירטואליים](/he/guides/spa-and-virtual-page-tracking/).

## מתכונים נפוצים

### זהות חוצת-דומיינים

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."
        data-link-domains="example.com,app.example.com,docs.example.com"></script>
```

### פרטיות ו-consent

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."
        data-do-not-track="true"
        data-require-consent="true"></script>
```

```js
window.aa?.grantConsent();
window.aa?.revokeConsent();
```

### ניסויים

```html
<h1 data-aa-experiment="hero_text"
    data-aa-variant-b="Try it free today!">
  Start your free trial
</h1>
```

אם אתם רוצים את ה-workflow המלא, מבוסס-הפרומפטים, ליצירה, חיווט, QA וקריאת תוצאות של ניסוי דרך הסוכן שלכם, השתמשו ב-[מעקב ניסויים לסוכני AI](/he/guides/ai-agent-experiment-tracking/).

### פיתוח מקומי

ב-localhost הטרקר עובר למצב פיתוח ורושם פעילות לקונסול של הדפדפן במקום לשלוח נתוני production. כך בדיקות מקומיות לא מזהמות את האנליטיקה האמיתית שלכם.

## קשור

- [התחלה מהירה](/he/getting-started/)
- [מעקב SPA ועמודים וירטואליים](/he/guides/spa-and-virtual-page-tracking/)
- [מעקב ניסויים לסוכני AI](/he/guides/ai-agent-experiment-tracking/)
- [Bot Traffic](/he/reference/bot-traffic/)
- [Authentication](/he/reference/authentication/)
- [API Reference](/he/api/)
