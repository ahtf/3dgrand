# 3DGrand Static Website

یک وب‌سایت استاتیک بدون نیاز به build یا نصب پکیج.

## فایل‌ها
- `index.html` ساختار سایت
- `styles.css` ظاهر و Responsive
- `script.js` اطلاعات تماس، محصولات و رفتارهای تعاملی
- `assets/` لوگو و favicon
- `.nojekyll` برای انتشار مستقیم در GitHub Pages

## مهم: قبل از انتشار
در ابتدای `script.js` بخش `CONFIG` را باز کنید و این موارد را تغییر دهید:
- `whatsappNumber`
- `phoneNumber`
- `instagramUsername`
- `email`
- `products`

شماره واتساپ باید با کد کشور و بدون علامت + باشد. مثال: `989121234567`

## تست محلی
می‌توانید روی `index.html` دوبار کلیک کنید و سایت را در مرورگر ببینید.
برای تست حرفه‌ای‌تر، در پوشه سایت اجرا کنید:

```bash
python -m http.server 8000
```


سپس `http://localhost:8000` را باز کنید.
