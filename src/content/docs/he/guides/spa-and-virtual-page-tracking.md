---
title: מעקב SPA ועמודים וירטואליים
description: מדדו אפליקציות single-page ב-Agent Analytics בלי ספירה כפולה, על ידי שימוש בניווט מבוסס URL כשאפשר וב-page views וירטואליים ידניים רק כשצריך.
---

השתמשו במדריך הזה כשהאתר או האפליקציה שלכם מחליפים מסכים בדפדפן בלי לבצע טעינת דף מלאה, ואתם רוצים שמדידת הדפים תישאר מדויקת.

המדריך הזה מתאים ל-React, Vue, Svelte, מעברי לקוח ב-Next.js, routers מבוססי hash, flows של onboarding ולכל UI אחר שמחליף מסכים בצד הלקוח.

## לפני שמתחילים

- `tracker.js` כבר מותקן באתר שלכם.
- הפרויקט כבר קיים ב-Agent Analytics.
- אתם יודעים אם האפליקציה משנה את ה-URL בזמן ניווט, או שאתם רוצים שהסוכן יאמת את זה קודם.

אם אתם עדיין צריכים את ההגדרה הראשונית, התחילו עם [התחלה מהירה](/he/getting-started/).

## 1. העדיפו שינויי URL אמיתיים כשאפשר

Agent Analytics מודד `page_view` אוטומטית כשה-URL בדפדפן משתנה דרך `pushState`, `replaceState`, `popstate` או `hashchange`.

כלומר, ההגדרה הנקייה ביותר עדיין נשענת על שינוי route אמיתי בצד הלקוח. אם ה-path, ה-query string או ה-hash משתנים כך שיתאימו למסך החדש, Agent Analytics יכול לעקוב אחריהם בלי מעקב ידני נוסף.

פרומפט מוכן להעתקה:

```text
Inspect this app's client-side routing and tell me whether it uses real path changes, hash routing, or no URL changes at all. Prefer URL-driven routing and do not add manual page tracking if Agent Analytics already auto-detects the transition.
```

אם ה-router שלכם כבר מעדכן את ה-URL לכל מסך, בדרך כלל אין צורך להוסיף שום דבר נוסף.

## 2. ניתוב hash נתמך

גם SPAs מבוססי hash כמו `/#/settings` או `/#pricing` נתמכים. Agent Analytics מאזין ל-`hashchange`, ולכן ניתוב hash הוא fallback תקין כשאתם רוצים ניווט מבוסס URL בלי טעינות דף מלאות.

פרומפט מוכן להעתקה:

```text
Verify whether this app uses hash routing. If it does, keep the tracking URL-driven and confirm that Agent Analytics can rely on hash changes instead of extra manual page calls.
```

אם ה-hash משתנה בכל מעבר מסך, Agent Analytics אמור לספור את המעברים האלה בתור page views נפרדים.

## 3. הוסיפו מעקב עמודים וירטואליים ידני רק כשאין שינוי URL

לפעמים ה-UI מחליף מסכים אבל ה-URL בדפדפן לא משתנה בכלל. זה נפוץ ב-wizards, באפליקציות עם טאבים, בדשבורדים מוטמעים וב-flows שמבוססים על modals.

במקרה כזה Agent Analytics לא יזהה אוטומטית דף חדש. במקום זאת, השתמשו ב-`page_view` ידני.

הימנעו מ-`aa.page(name)` חשוף במקרה הזה. `aa.page(name)` מוסיף תווית `page`, אבל `path` ו-`url` עדיין מגיעים מהמיקום הנוכחי של הדפדפן. אם ה-URL מעולם לא השתנה, הדוחות עדיין יראו את ה-path הישן.

השתמשו ב-`track('page_view', ...)` ועקפו בעצמכם את שדות הניתוב:

```js
window.aa?.track('page_view', {
  page: 'Checkout Step 2',
  path: '/checkout/step-2',
  url: `${location.origin}/checkout/step-2`
});
```

דוגמה framework-agnostic:

```js
function trackCheckoutStep(step) {
  window.aa?.track('page_view', {
    page: `Checkout Step ${step}`,
    path: `/checkout/step-${step}`,
    url: `${location.origin}/checkout/step-${step}`
  });
}
```

פרומפט מוכן להעתקה:

```text
Add manual virtual page tracking only for screen changes that do not update the browser URL. Use `window.aa?.track('page_view', { page, path, url })` and do not add tracking to routes that Agent Analytics already auto-tracks.
```

## 4. דוגמת React למסכי state בלי שינוי URL

השתמשו בתבנית הזו רק כשהמסך משתנה בלי שינוי אמיתי ב-path, ב-query או ב-hash. אם React Router כבר מעדכן את ה-URL, תנו ל-Agent Analytics למדוד את זה אוטומטית.

```jsx
import { useEffect } from 'react';

function CheckoutFlow({ activeStep }) {
  useEffect(() => {
    if (!activeStep) return;

    window.aa?.track('page_view', {
      page: `Checkout Step ${activeStep}`,
      path: `/checkout/step-${activeStep}`,
      url: `${window.location.origin}/checkout/step-${activeStep}`
    });
  }, [activeStep]);

  return <div>{/* checkout UI */}</div>;
}
```

## 5. בצעו QA בדפדפן וחפשו ספירה כפולה

ב-localhost Agent Analytics רושם קריאות tracking לקונסול של הדפדפן במקום לשלוח נתוני production. כך קל לעבור דרך האפליקציה ולוודא שכל שינוי מסך שאתם מתכוונים למדוד מייצר בדיוק page view אחד.

פרומפט מוכן להעתקה:

```text
Open the app, click through the SPA navigation, and verify that each intended screen produces one `page_view`. Flag any transitions that send both an automatic page view and a manual one.
```

אם אתם רואים page views כפולים עבור אותו מעבר, הסירו את המעקב הידני מה-routes שכבר משנים את ה-URL.

## טעויות נפוצות

- שימוש ב-`aa.page(name)` חשוף עבור שינויי מסך שבהם ה-URL לא משתנה.
- שליחה גם של page views אוטומטיים מבוססי router וגם של page views ידניים עבור אותו מעבר.
- שכחה לעקוף את `path` ו-`url` כששולחים `page_view` וירטואלי.

## קשור

- [מדריכים](/he/guides/)
- [התחלה מהירה](/he/getting-started/)
- [Tracker.js](/he/reference/tracker-js/)
- [מעקב ניסויים לסוכני AI](/he/guides/ai-agent-experiment-tracking/)
