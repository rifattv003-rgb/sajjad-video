# পারিবারিক চাপ — Remotion প্রজেক্ট (1920×1080, 30fps, ৭:৪০.৭)
npm install
npx remotion studio src/index.ts      # প্রিভিউ
npx remotion render src/index.ts Story out/video.mp4   # রেন্ডার
- অডিও: public/voice.mp3 | টাইমিং: src/data/timeline.json, captions.json (tools/align.mjs দিয়ে স্ক্রিপ্ট↔SRT মেলানো)
- সিন: src/scenes/Scene1..11.tsx | ক্যারেক্টার: src/components/Character.tsx
- tools/shim, tools/preview*.tsx শুধু লোকাল ফ্রেম-চেকের জন্য, রেন্ডারে লাগে না।
