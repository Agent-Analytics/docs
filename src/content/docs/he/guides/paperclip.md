---
title: הגדירו את Agent Analytics עבור חברת ה-Paperclip שלכם
description: בקשו מהמשתמש ליצור משימת CEO אחת, בדקו את המשימה החסומה כשנדרש אישור התחברות, ואז תשאלו את הפרויקט החי את השאלה הראשונה.
---

[📎Paperclip](https://paperclip.ing/) הוא מנוע orchestration בקוד פתוח לחברות בלי בני אדם. המסלול הנכון ל-Agent Analytics בתוך 📎Paperclip הוא עכשיו:

1. לבקש מהמשתמש ליצור משימה אחת עבור ה-CEO
2. לבדוק את המשימה החסומה כשנדרש אישור התחברות
3. לבקש מהאנליסט לענות על שאלת תנועה או הרשמה אמיתית ראשונה

השתמשו ב-`Connect as agent` אם אתם רוצים שהסוכן יחזיק את מסירת ההתחברות החסומה מתחילתה ועד סופה. השתמשו ב-`Connect as human` רק כשאתם צריכים גישה ישירה לחשבון בעצמכם, לא כי תהליך ההגדרה השתנה.

בהגדרת Paperclip רגילה, השאירו אישור בדפדפן ומסירת finish code בתור ברירת המחדל. מפתחות API גולמיים קיימים רק כ-fallback מתקדם ל-runtimes מותאמים אישית.

אם אתם רוצים קודם את ההקשר האסטרטגי, קראו את [If You Use Paperclip, You Need End-User Analytics](https://blog.agentanalytics.sh/blog/paperclip-companies-need-agent-readable-analytics/).

אם למהנדס כבר יש גישה וכל מה שאתם צריכים עכשיו הוא לולאת ההפעלה, המשיכו אל [הפרויקט הראשון ב-5 דקות](/he/guides/first-project-in-5-minutes/).

## שלב 1: צרו משימת CEO אחת

עבור רוב חברות Paperclip, ההגדרה צריכה להתחיל ממשימת CEO מפורשת אחת.

כותרת המשימה:

```text
Hire an analyst to use AgentAnalytics
```

תיאור המשימה:

```text
Hire or assign the analytics analyst for our company.

First install the Agent Analytics skill in Paperclip:
npx skills add Agent-Analytics/agent-analytics-skill@agent-analytics

Make sure Agent Analytics is available to the analyst and the engineer working on the project. Ask the engineer on the relevant project to set up Agent Analytics tracking in the codebase.

If approval is needed, send me the approval link, wait for me to sign in with Google or GitHub, accept the finish code I reply with, and then continue by creating the project, adding tracking and key events, and verifying the first event.
```

![משימת CEO לשכירת אנליסט ולהגדרת Agent Analytics ב-Paperclip](/paperclip-ceo-issue-creation.png)

## שלב 2: בדקו את המשימה החסומה ואשרו התחברות

בשלב מסוים הסוכן שעובד על המשימה יחזור ויגיד שהמשימה חסומה כי הוא צריך את העזרה שלכם עם אישור ההתחברות.

כשזה קורה:

1. פתחו את כתובת ה-URL לאישור ההתחברות שהסוכן פרסם במשימת ה-Paperclip
2. התחברו עם Google או GitHub
3. העתיקו את ה-finish code מהדפדפן
4. הדביקו את ה-finish code הזה חזרה למשימת ה-Paperclip החסומה

![מסך מסירת finish code של Agent Analytics](/finishcode.jpg)

כך הסוכן שמבצע את ההגדרה יכול להמשיך:

- להשלים את ההתחברות
- ליצור את הפרויקט
- להוסיף tracking
- לאמת את האירוע הראשון

אם חברת ה-Paperclip שלכם רוצה primitive משותף להתקנה, מפתח ה-skill ברמת החברה עדיין נשאר:

```text
agent-analytics/agent-analytics-skill/agent-analytics
```

אבל זהו פרט מימוש, לא הסיפור המוצרי המרכזי. המסלול החשוב באמת עדיין נשאר: ליצור משימת CEO אחת, לתת לה להוביל את ההגדרה בתוך הפרויקט האמיתי, ואז להתחיל לשאול שאלות אנליטיקה אמיתיות.

## איך נראה האישור בפועל

ב-Paperclip, זרימת ההתחברות המנותקת אמורה להיראות כך:

1. הסוכן שמבצע את ההגדרה מתחיל התחברות ל-Agent Analytics ומשיב עם approval URL
2. אתם פותחים את ה-URL הזה בדפדפן
3. אתם מתחברים עם Google או GitHub
4. הדפדפן מציג finish code
5. אתם מדביקים את ה-finish code בחזרה ל-thread של ה-issue ב-Paperclip
6. הסוכן שמבצע את ההגדרה משתמש בקוד הזה כדי להשלים את ההתחברות ולהמשיך

כלל המוצר החשוב כאן פשוט: המשתמש מאשר זהות בדפדפן, אבל הסוכן שמבצע את העבודה הוא זה שמסיים עם ה-session וממשיך את ההגדרה.

אם אחר כך תרצו לבדוק או לבטל את ה-session שבבעלות Paperclip, פתחו את [app.agentanalytics.sh](https://app.agentanalytics.sh), עברו אל `Account Settings`, והשתמשו באזור `Agent Sessions`. בדף הזה מופיעים עכשיו חיבורי Paperclip, CLI, macOS Live וחיבורים דומים אחרים של סוכנים מתארחים.

## שלב 3: בקשו מהאנליסט שאלות אמיתיות

ברגע שהמהנדס העלה את הפרויקט לאוויר, בקשו מהאנליסט לענות על שאלות אמיתיות:

- `הראה לי תנועה, דפים מובילים, אירועים אחרונים, הרשמות, רכישות ושימוש בפיצ'רים עבור הפרויקט הזה.`
- `הקם ניסוי A/B עבור הפרויקט הזה ועזור לי להחליט מה לשנות אחר כך.`

תנאי ההצלחה הוא לא רק התחברות. תנאי ההצלחה הוא:

- שסוכן ההגדרה יכול לבצע אימות דרך אישור בדפדפן ומסירת finish code
- ליצור את הפרויקט
- לאמת את האירוע החי הראשון
- ושהאנליסט יכול לענות על שאלת אנליטיקה אמיתית מתוך אותו זרם issue

## סדר rollout מהיר לחברות Paperclip

השתמשו בסדר הזה אם אתם רוצים את המסלול הקצר ביותר לערך הראשון:

1. צרו את משימת ה-CEO
2. תנו למשימה הזאת לכסות את האנליסט ואת המהנדס במסלול delegation אחד
3. בדקו את המשימה החסומה כשהסוכן שעובד צריך אישור
4. התחברו והשיבו עם ה-finish code
5. תנו לסוכן שעובד ליצור את הפרויקט הראשון ולאמת את האירוע הראשון
6. בקשו מהאנליסט שאלה אמיתית אחת על תנועה או הרשמה
7. הרחיבו אחר כך לניסויים ולעבודת אנליטיקה מחזורית

## fallback מתקדם/ידני

אם בהמשך תצטרכו גישת HTTP ישירה עבור runtime מותאם אישית, עדיין תוכלו ליצור API key גולמי מתוך [app.agentanalytics.sh](https://app.agentanalytics.sh). התייחסו לזה כאל fallback מתקדם/ידני.

במסלול ההגדרה הרגיל של Paperclip, העדיפו אישור בדפדפן יחד עם מסירת finish code.

## מתי להשתמש בדף אחר

- השתמשו ב-[התחלה מהירה](/he/getting-started/) אם אתם רוצים את הסקירה הקצרה ביותר על כל המוצר.
- השתמשו ב-[מרכז ההתקנה](/he/installation/) אם אתם צריכים דפי התקנה גולמיים לפי סביבה, מחוץ לזרימת חברת Paperclip.
- השתמשו ב-[הפרויקט הראשון ב-5 דקות](/he/guides/first-project-in-5-minutes/) אם למהנדס כבר יש גישה ואתם רוצים את מסלול ההתקנה-עד-חי הברור ביותר.
- השתמשו ב-[Tracker.js](/he/reference/tracker-js/) אם אתם צריכים פרטים בצד הדפדפן כמו SPA tracking, אירועים דקלרטיביים, consent, שגיאות או web vitals.
- השתמשו ב-[CLI vs MCP vs API](/he/reference/cli-mcp-api/) אם הצוות שלכם מחליט בין מסלולי הגישה.

## קשור

- [If You Use Paperclip, You Need End-User Analytics](https://blog.agentanalytics.sh/blog/paperclip-companies-need-agent-readable-analytics/)
- [Paperclip Live Plugin](/he/reference/paperclip-live-plugin/)
- [התחלה מהירה](/he/getting-started/)
- [הפרויקט הראשון ב-5 דקות](/he/guides/first-project-in-5-minutes/)
- [Tracker.js](/he/reference/tracker-js/)
- [CLI vs MCP vs API](/he/reference/cli-mcp-api/)
- [עיון ב-API](/he/api/)
