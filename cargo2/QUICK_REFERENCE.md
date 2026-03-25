# Smart Cargo Inspector - Quick Reference

## 🚀 Quick Commands

```bash
# Install
npm install

# Development
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Build for production
npm run start        # Start production server

# Deployment
npm run build && npm run start  # Vercel: automatic
vercel deploy                    # Deploy to Vercel
docker build -t cargo .         # Docker build
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main state management & flow |
| `app/api/analyze/route.ts` | API endpoint - connect models here |
| `app/globals.css` | Colors, animations, theme |
| `components/results-screen.tsx` | Main dashboard layout |

## 🎨 Colors

| Variable | Color | Use |
|----------|-------|-----|
| `--primary` | `#6366f1` | Indigo accent |
| `--secondary` | `#1e40af` | Blue accent |
| `--accent` | `#3b82f6` | Bright blue |
| `--background` | `#0a0e27` | Dark navy bg |
| `--card` | `#131829` | Card bg |
| `--foreground` | `#e8eaf6` | Text color |

## 📊 UI Screens

```
Upload Screen
↓ (user uploads image)
Processing Screen
↓ (3 seconds animation)
Results Screen
└─ Left: Image viewer
└─ Right: 6 insight panels
```

## 🔌 API Endpoint

```
POST /api/analyze

Request:
  cargo (File) - Required
  reference (File) - Optional

Response:
  detections[]
  risk_score (0-100)
  risk_level (LOW/MEDIUM/HIGH)
  comparison
  anomaly_map
  explanations[]
  metrics
```

## 🎯 Risk Scoring

```
🟢 0-44    LOW
🟡 45-74   MEDIUM
🔴 75-100  HIGH
```

## 🏷️ Object Categories

```
🚫 Prohibited: gun, weapon, explosive
⚠️ Restricted: knife, blade
✓ Normal: electronics, luggage
```

## 📝 Common Customizations

### Change Risk Threshold
File: `components/risk-score-panel.tsx`
```typescript
const level = score >= 75 ? 'HIGH' : score >= 45 ? 'MEDIUM' : 'LOW';
```

### Add Detection Category
File: `components/detected-objects-panel.tsx`
```typescript
const prohibited = ['gun', 'weapon', 'YOUR-ITEM'];
```

### Change Colors
File: `app/globals.css`
```css
--primary: #your-color;
```

### Adjust Processing Time
File: `app/page.tsx`
```typescript
setTimeout(() => { ... }, 3000); // milliseconds
```

## 🔗 Backend Integration

1. Copy `.env.example` → `.env.local`
2. Set `ML_SERVER_URL`
3. Implement `/api/analyze` route
4. Call ML inference server
5. Return JSON response

## 🧩 Component Structure

```
HeaderComponent
├── Upload Screen
│   ├── Cargo Upload Zone
│   └── Reference Upload Zone
├── Processing Screen
│   ├── Loader
│   └── Model Progress
└── Results Screen
    ├── Detection Canvas
    ├── Risk Score Panel
    ├── Image Comparison
    ├── Detected Objects
    ├── Anomaly Panel
    ├── Explanation Panel
    └── Metrics Panel
```

## 🌐 Environment Variables

```env
ML_SERVER_URL=http://localhost:8000
ML_SERVER_TIMEOUT=30000
YOLOV9_CONFIDENCE_THRESHOLD=0.5
RISK_THRESHOLD_HIGH=75
RISK_THRESHOLD_MEDIUM=45
```

## 🔍 Debugging Tips

```javascript
// Add to app/page.tsx to debug state
console.log("[v0] State:", { appState, uploadedImages, analysisResult });

// Check API response
console.log("[v0] API Response:", response);

// Check detection coordinates
console.log("[v0] Detections:", detections);
```

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Grid layout:
```
Mobile: 1 column
Tablet: 2 columns
Desktop: Image (2/3) + Panels (1/3)
```

## ✅ Checklist Before Deployment

- [ ] Environment variables set
- [ ] ML server connected and tested
- [ ] Error handling implemented
- [ ] Security review passed
- [ ] Mobile responsiveness verified
- [ ] Performance optimized
- [ ] Accessibility audit done
- [ ] Monitoring setup

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Images not loading | Check CORS headers, file size |
| API timeout | Increase `ML_SERVER_TIMEOUT` |
| Canvas not rendering | Verify image CORS, check coordinates |
| Styling looks wrong | Clear cache, rebuild, check `dark` class |
| State not updating | Check state setter usage |

## 📚 Documentation Files

- **README.md** - Project overview
- **GETTING_STARTED.md** - Beginner guide (read first!)
- **ARCHITECTURE.md** - Technical deep dive
- **INTEGRATION_GUIDE.md** - Backend setup
- **QUICK_REFERENCE.md** - This file
- **.env.example** - Environment template

## 🎯 Feature Flags

In `.env.local`:
```env
ENABLE_REFERENCE_IMAGE=true
ENABLE_ANOMALY_DETECTION=true
ENABLE_IMAGE_COMPARISON=true
ENABLE_RISK_SCORING=true
```

## 🔐 Security Notes

1. Validate file uploads on backend
2. Scan uploaded files for malware
3. Set max file size (default 50MB)
4. Require authentication in production
5. Log all analysis requests
6. Encrypt sensitive data
7. Use HTTPS in production

## 🚀 Performance Tips

1. Cache anomaly maps
2. Compress images
3. Lazy load panels
4. Debounce state updates
5. Use RequestAnimationFrame for canvas
6. Implement image queuing
7. Monitor API response times

## 📊 Models Used

1. **YOLOv9** - Object Detection
   - Labels: Gun, Knife, Electronics
   - Output: Bounding boxes + confidence

2. **CNN/Autoencoder** - Anomaly Detection
   - Input: Image
   - Output: Heatmap (0-255)

3. **Siamese/SSIM** - Image Comparison
   - Input: Cargo + Reference
   - Output: Similarity score (0-100)

4. **Rule-Based ML** - Risk Scoring
   - Input: All above results
   - Output: Score (0-100) + Level

## 🌟 Best Practices

✅ Keep components small and focused
✅ Use TypeScript for type safety
✅ Follow semantic HTML
✅ Test with real cargo images
✅ Monitor API performance
✅ Log errors properly
✅ Document API changes
✅ Version control everything
✅ Use environment variables
✅ Implement rate limiting

## 🔗 Useful Links

- [Tailwind Docs](https://tailwindcss.com)
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [YOLOv9 GitHub](https://github.com/WongKinYiu/yolov9)
- [React Docs](https://react.dev)

---

**Print this page for quick reference!** 📋
