# International Blood — সেটআপ গাইড

ফাইলগুলো:
- `index.html` — ইউজার অ্যাপ/ওয়েবসাইট
- `admin.html` — অ্যাডমিন প্যানেল (ওয়েবসাইটে `/admin` লিংকে খুলবে)
- `firestore.rules` — ডাটাবেজের সুরক্ষা রুলস
- `vercel.json`, `manifest.webmanifest`, `sw.js`, `icon-*.png` — Vercel ও "অ্যাপ হিসেবে ইনস্টল" এর জন্য

## ধাপ ১ — Firebase Authentication
Firebase Console → **Authentication → Sign-in method** → **Email/Password** চালু করুন (Google/Phone আগে চালু থাকলে থাকুক)।

## ধাপ ২ — Firestore rules
Firebase Console → **Firestore Database → Rules** → `firestore.rules` ফাইলের পুরো লেখা পেস্ট করে **Publish**।

## ধাপ ৩ — অ্যাডমিন অ্যাকাউন্ট (খুব গুরুত্বপূর্ণ)
Firebase Console → **Authentication → Users → Add user**
- Email: `admin@kapilmuni.app`
- Password: আপনার নিজের শক্ত পাসওয়ার্ড (এটাই অ্যাডমিন প্যানেলের পাসওয়ার্ড)

এই কাজ সাইট চালু করার **আগেই** করুন, যাতে অন্য কেউ ওই ইমেইলে অ্যাকাউন্ট খুলতে না পারে।
অন্য ইমেইল চাইলে `admin.html`-এর `ADMIN_EMAIL` এবং `firestore.rules`-এর `isAdmin()` — দুই জায়গাতেই বদলান।

## ধাপ ৪ — GitHub ও Vercel
1. GitHub-এ নতুন repository খুলে এই ফোল্ডারের সব ফাইল আপলোড করুন।
2. vercel.com → **Add New Project** → repository সিলেক্ট → **Deploy** (কোনো build সেটিং লাগবে না)।
3. Vercel-এর ডোমেইন (যেমন `yourapp.vercel.app`) Firebase Console → **Authentication → Settings → Authorized domains**-এ যোগ করুন। না করলে লগইন কাজ করবে না।

## ধাপ ৫ — ব্যবহার
- ইউজার: `https://yourapp.vercel.app`
- অ্যাডমিন: `https://yourapp.vercel.app/admin`
- ফোনে Chrome-এ সাইট খুলে **Add to Home screen / Install app** দিলে অ্যাপের মতো চলবে।

## অ্যাডমিন প্যানেলের মেনু
Dashboard · Notice bar · All-member notice · Slider banners · Community · Urgent requests · Donations · Members · ID card requests · Reports · Site settings · Live activity · Chats & Online

## আইডি কার্ড কীভাবে কাজ করে
- ২ বার রক্তদান হলে কার্ড নিজে থেকে খুলে যায়।
- না হলে ইউজার কার্ড স্ক্রিনে কারণ লিখে অ্যাডমিনের কাছে আবেদন করে।
- অ্যাডমিন **ID card requests**-এ তথ্য যাচাই করে Approve করলে ইউজারের কার্ড সাথে সাথে খুলে যায়; Reject করলে নির্বাচিত কারণ ইউজার দেখে।

## লগইন, গুগল ও OTP ঠিকমতো চালাতে (Firebase)
1. Authentication → Sign-in method: **Email/Password**, **Google**, **Phone** তিনটাই চালু থাকতে হবে।
2. Authentication → Settings → **Authorized domains**-এ আপনার Vercel ডোমেইন এবং অ্যাপ কনভার্টারের (Wevlo ইত্যাদি) ডোমেইন যোগ করুন। কোনো ডোমেইন অনুমোদিত না থাকলে অ্যাপ নিজেই স্ক্রিনে বলে দেবে কোন ঠিকানাটা যোগ করতে হবে।
3. **গুগল লগইন:** গুগল নিজেই অ্যাপের ভেতরের ওয়েব-ভিউতে সাইন-ইন বন্ধ রাখে। তাই কনভার্ট করা অ্যাপে ইমেইল বা ফোন OTP দিয়ে ঢোকা যাবে; Chrome/ব্রাউজারে ওয়েবসাইটে গুগল লগইন চলবে।
4. **ফোন OTP:** Firebase-এর ফ্রি (Spark) প্ল্যানে দিনে সীমিত এসএমএস যায়। বেশি ব্যবহারে Blaze প্ল্যান লাগে। পরীক্ষার জন্য Phone সেটিংসে "Phone numbers for testing" ব্যবহার করুন।

## নতুন অ্যাডমিন ফিচার
- **Live support:** ইউজারের সব মেসেজ এখানে আসে, উত্তর দিলে সাথে সাথে ইউজার দেখে। চ্যাট Export (.txt), বন্ধ/আবার খোলা, Ban/Unban করা যায়।
- **Maintenance mode:** ছবি (গ্যালারি/লিংক) ও কারণ লিখে ON করলে সব ইউজারের সামনে আপডেটের স্ক্রিন আসে, কেউ কিছু ব্যবহার করতে পারে না।
- **Members → চোখ বাটন:** প্রোফাইল দেখা, Ban/Unban, Remove member।
- **Site settings → Default logo:** আপলোড করা ছবি সরিয়ে ডিফল্ট রক্তের ফোঁটার লোগো ফেরত আনা।

## মনে রাখবেন
- Firebase `apiKey` ওয়েব কোডে থাকা স্বাভাবিক; সুরক্ষা আসে `firestore.rules` থেকে।
- অ্যাডমিন ও ইউজার অ্যাপ একই ডোমেইনে হলে একই ব্রাউজারে দুটোতে একসাথে লগইন থাকে না। অ্যাডমিন প্যানেল আলাদা ব্রাউজার/প্রোফাইলে খুলুন।
- ভয়েস কল WebRTC দিয়ে চলে। মোবাইল ডেটায় কল না লাগলে `index.html`-এ TURN সার্ভার যোগ করতে হবে।

---

# নতুন আপডেট (v2) — যা বদলেছে

## ⚠️ সবার আগে করুন: Firestore rules আবার Publish করুন
`firestore.rules` ফাইলে নতুন নিয়ম যোগ হয়েছে (নোটিফিকেশন ও পাবলিক কাউন্টার)। Firebase Console → **Firestore Database → Rules** → ফাইলের পুরো লেখা পেস্ট করে **Publish** না করলে নতুন নোটিফিকেশন ও ল্যান্ডিং পেজের সংখ্যা কাজ করবে না।

## অ্যাডমিন প্যানেলে কোন সেকশন কী করে
প্রতিটি সেকশনের উপরে এখন লেখা আছে সেটা কী কাজ করে এবং সদস্যরা কোথায় দেখে।
- **Notice bar** — হোম পেজের নিচে নামা লাল চলমান লাইনটা। শুধু একটি বক্সে লিখে **Save** দিন।
- **Send notification** — ঘণ্টা (🔔) আইকনে যায়। মেসেজ লিখুন → সদস্যের নামের পাশে **Send** চাপলে শুধু তার কাছে যাবে; **Select all** বা **Send to ALL members** দিলে সবার কাছে যাবে। চাইলে "pop-up with sound" টিক দিন।
- **Site settings** — আলাদা কার্ডে: ওয়েবসাইট লোগো (কোথায় কোথায় দেখায় লেখা আছে, **Remove** দিলে ডিফল্ট ব্লাড-ড্রপ লোগো), নাম ও ঠিকানা, লাইভ সাপোর্টের ছবি/নাম, ওয়েলকাম পপআপ, এন্ট্রি পপআপ, আইডি কার্ড সই।
- **Live support** — এখন ছবিও পাঠানো যায় (📷 বাটন)। সদস্যও ছবি পাঠাতে পারে।

## হেডারের লোগো
হোম হেডারের উপরের বাঁ দিকে এখন সবসময় **ওয়েবসাইটের লোগো** দেখায়, কোনো মানুষের ছবি নয়। আগে আপনি যদি Site settings-এ নিজের ছবি লোগো হিসেবে আপলোড করে থাকেন তাহলে সেটাই দেখাবে — **Site settings → Website logo → Remove** চাপুন, ডিফল্ট লোগো ফিরে আসবে।

## ল্যান্ডিং পেজ ও সংখ্যা
লগইনের আগে ল্যান্ডিং পেজ আসে: নির্দেশনা, ডোনার/গ্রহীতা/মোট সদস্যের সংখ্যা, **Get Started** বাটন ও কপিরাইট। সংখ্যা `stats/public` থেকে আসে। অ্যাডমিন প্যানেল খোলা থাকলে সংখ্যা নিজে নিজে ঠিক হয়ে যায়, আর নতুন কেউ রেজিস্টার করলে +১ হয়। কেউ মেম্বার রিমুভ হলে অ্যাডমিন প্যানেল একবার খুললেই সংখ্যা মিলে যাবে।

## গুগল লগইন
- ডেস্কটপ ও মোবাইল ব্রাউজারে (Chrome/Safari) কাজ করবে — শর্ত: Firebase → Authentication → Sign-in method-এ **Google** চালু এবং Authorized domains-এ আপনার Vercel ডোমেইন যোগ করা।
- **Wevlo/WebView টাইপ অ্যাপে** গুগল নিজেই OAuth ব্লক করে (এটা গুগলের নিয়ম, কোড দিয়ে খোলা যায় না)। সেখানে ইউজার নতুন ডায়ালগে "OTP দিয়ে লগইন" বা "ব্রাউজারে খুলুন" অপশন পাবে। অ্যাপে গুগল সত্যিই লাগলে নেটিভ অ্যাপ (Capacitor + Firebase Native Google Sign-In) বানাতে হবে।

## OTP
৬ ঘরের কোড, পেস্ট/অটো-ফিল সাপোর্ট, ৬০ সেকেন্ডের রিসেন্ড টাইমার, নম্বর বদলানোর লিংক।

## কলের রিংটোন
ইনকামিং কলে আইফোন-স্টাইল ম্যারিম্বা রিংটোন বাজে, কলারের কাছে আলাদা রিংব্যাক টোন।

## সুরক্ষা — সৎ কথা
- ব্রাউজারে যে HTML/JS যায় তা কেউ দেখতে পারবেই, এটা লুকানো সম্ভব নয়। আসল সুরক্ষা আসে **firestore.rules** আর অ্যাডমিন লগইন থেকে।
- `.vercelignore` যোগ হয়েছে যাতে `README.md` ও `firestore.rules` সাইটে পাবলিক হয়ে না যায়।
- `vercel.json`-এ সিকিউরিটি হেডার (HSTS, nosniff, অ্যাডমিন পেজে frame-block ও no-store) যোগ হয়েছে।
- অ্যাডমিন রুলে এখন পাসওয়ার্ড-লগইন বাধ্যতামূলক। আরও শক্ত করতে `firestore.rules`-এর কমেন্ট দেখে অ্যাডমিনের **UID** বসিয়ে দিন।
- অ্যাডমিন অ্যাকাউন্ট (`admin@kapilmuni.app`) Firebase-এ আগেই তৈরি করে রাখুন এবং অনেক বড়, আলাদা পাসওয়ার্ড দিন।


## International Blood — authentication and deployment notes

### Web app updates in this package
- Login identifier accepts a mobile number or email; the visible `+880` prefix has been removed from the login field.
- Phone OTP uses a resettable Firebase `RecaptchaVerifier` and normalizes Bangladeshi mobile numbers to E.164 format.
- Forgot password sends a Firebase reset email for email-based accounts. For phone-based accounts, it opens SMS OTP verification (phone authentication does not use email password-reset links).
- The last selected in-app section is remembered for same-tab reloads, and the splash screen is shortened/skipped for authenticated dashboard loads.
- Public-facing branding is changed to **International Blood**.

### Required Firebase Console settings
1. Authentication → Sign-in method: enable **Email/Password**, **Google**, and **Phone** as needed.
2. Authentication → Settings → Authorized domains: add the production Vercel domain and any custom domain used by the site.
3. For Google sign-in, configure the OAuth consent screen and authorized web client as appropriate. Browser popup restrictions/WebViews can still prevent Google popups; test in Chrome.
4. Phone OTP requires billing/quotas and supported SMS configuration in the Firebase project. Test with Firebase fictional phone numbers first, then a real number. reCAPTCHA cannot be validated from a static file alone.
5. Verify Firestore rules and admin permissions in a test project before deploying.

### Native Android configuration limitation
The uploaded project is a static web/PWA project (HTML, service worker, manifest, and Vercel config); it does **not** contain an Android Gradle project (`settings.gradle`, root `build.gradle`, `app/build.gradle`, or Android source). The supplied `google-services.json` belongs at `app/google-services.json` in a real Android Gradle app whose `applicationId` is `com.international.blood.app`. The Google Services Gradle plugin must be applied in that Android app. Copying the JSON into this web-only project does not create or configure a native Android app.

### Push notification setup still needs owner-provided Firebase values
Browser push cannot be completed or honestly described as 100% live without a Firebase Cloud Messaging Web Push VAPID key, a working service worker registration/token flow, notification permission granted by each user, and a trusted server/Admin SDK or Cloud Function to send messages. Never put Firebase service-account credentials in HTML or a public ZIP. Once the VAPID public key and chosen trusted sender/server approach are supplied, complete and test the subscription and send pipeline. Browser/OS notification settings and battery restrictions can affect delivery.

### Important verification
The changes in this archive are static-code fixes, not proof of a live Firebase deployment. Run authentication tests on the deployed domain and inspect Firebase Console logs before treating OTP, Google sign-in, admin operations, or push delivery as production-verified.
