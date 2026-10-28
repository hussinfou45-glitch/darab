# درب العراق — المرحلة 1

## التشغيل
```
cd darb-iraq
python3 -m http.server 8080      # أو: npx serve .
```
افتح http://localhost:8080 (الموقع الجغرافي يعمل على localhost أو HTTPS فقط). يلزم اتصال بالإنترنت لتحميل Leaflet والخط وبلاطات الخريطة.

## الملفات
- index.html — الهيكل  | styles.css — الثيمات والتصميم | js/i18n.js — النصوص عربي/إنجليزي | js/app.js — الخريطة والموقع واللغة والثيم

## الخط
Noto Sans Arabic (400–900) من Google Fonts. لخط «نورسل» ضع Norsal-Regular.woff2 وNorsal-Bold.woff2 في fonts/ بعد التحقق من الترخيص؛ سيُستخدم تلقائياً قبل Noto.

## ترخيص الخريطة
بلاطات tile.openstreetmap.org مخصصة للتطوير والاستخدام الخفيف فقط (سياسة OSMF). للإنتاج استخدم مزوّد بلاطات مرخّصاً أو استضف بلاطاتك. النسب ©OpenStreetMap ظاهرة على الخريطة.

## مفاتيح API
لا شيء في المرحلة 1. لاحقاً توضع في .env على الخادم فقط.
