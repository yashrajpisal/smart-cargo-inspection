# Getting Started with Smart Cargo Inspector

Welcome! This guide will help you quickly understand and start using the Smart Cargo Inspection System.

## What is This?

Smart Cargo Inspector is a **professional AI-powered dashboard** for customs officers and cargo inspectors to analyze X-ray images and detect suspicious items using:

- **YOLOv9**: State-of-the-art object detection
- **CNN/Autoencoder**: Anomaly detection in cargo
- **Siamese/SSIM**: Image comparison and matching
- **Rule-Based ML**: Risk scoring and threat assessment

## Quick Start (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Open in Browser

Visit [http://localhost:3000](http://localhost:3000)

### 4. Try the Demo

1. **Upload Screen**: Drag any image file to the upload area
2. **Processing Screen**: Watch the AI models run (animated demo)
3. **Results Screen**: See the analysis dashboard with 6 insight panels

**Note**: Currently uses mock data. See INTEGRATION_GUIDE.md to connect real models.

## What Can You Do?

### Upload Phase
- ✅ Drag-drop cargo X-ray images
- ✅ Optionally add reference images for comparison
- ✅ See image previews before analysis
- ✅ Click "Analyze Cargo" to start

### Analysis Phase
- ✅ Real-time progress indicators
- ✅ Shows which AI models are running
- ✅ Completion percentage

### Results Phase
- ✅ View detected objects (Gun, Knife, Electronics, etc.)
- ✅ See risk score (0-100) with color coding
- ✅ View anomaly heatmap
- ✅ Toggle between original, detection overlay, and heatmap views
- ✅ Read AI explanations for why items were flagged
- ✅ Check model performance metrics (Precision, Recall, mAP)
- ✅ Download analysis report (PDF)

## File Structure Explained

```
📦 smart-cargo-inspector
├── 📄 README.md                 ← Overview
├── 📄 GETTING_STARTED.md        ← You are here
├── 📄 ARCHITECTURE.md           ← Technical deep dive
├── 📄 INTEGRATION_GUIDE.md      ← Connect your models
├── 📄 .env.example              ← Environment variables
│
├── 📁 app/
│   ├── page.tsx                 ← Main app (state management)
│   ├── layout.tsx               ← Root layout (dark mode)
│   ├── globals.css              ← Theme colors & animations
│   └── api/
│       └── analyze/
│           └── route.ts         ← API endpoint (ready for backend)
│
├── 📁 components/
│   ├── header.tsx               ← Top navigation
│   ├── upload-screen.tsx        ← Image upload UI
│   ├── processing-screen.tsx    ← Loading state
│   ├── results-screen.tsx       ← Main dashboard
│   ├── detection-canvas.tsx     ← Canvas rendering
│   ├── risk-score-panel.tsx     ← Risk visualization
│   ├── detected-objects-panel.tsx  ← Objects list
│   ├── image-comparison-panel.tsx  ← Comparison results
│   ├── anomaly-panel.tsx        ← Anomaly heatmap
│   ├── explanation-panel.tsx    ← AI explanations
│   ├── metrics-panel.tsx        ← Model performance
│   └── ui/                      ← shadcn/ui components (pre-installed)
│
├── 📁 public/                   ← Static assets
├── 📄 package.json              ← Dependencies
└── 📄 tsconfig.json             ← TypeScript config
```

## Key Concepts

### Three Screens

1. **Upload Screen** 📤
   - User uploads cargo and reference images
   - Validates file types
   - Shows previews
   - Enables analysis button when ready

2. **Processing Screen** ⏳
   - Animated loader
   - Shows 4 AI models running sequentially
   - Progress bar (0-100%)
   - Takes ~3-10 seconds in production

3. **Results Screen** 📊
   - **Left Panel**: Image viewer with 3 toggle modes
   - **Right Panel**: 6 information cards
   - Download report button
   - New Analysis button to start over

### Risk Levels

```
🔴 HIGH (75-100)    → Must investigate further
🟡 MEDIUM (45-74)   → Check but may be safe
🟢 LOW (0-44)       → Likely safe to pass
```

### Detected Items

```
🚫 Prohibited → Guns, weapons, explosives
⚠️ Restricted → Knives, blades
✓ Normal     → Electronics, luggage, etc.
```

## For Developers

### Adding Mock Data

Edit `app/page.tsx` in the `handleAnalyze` function:

```typescript
const mockResult: AnalysisResult = {
  detections: [
    { label: 'Your Item', confidence: 0.95, box: [100, 150, 200, 250] },
    // Add more detections here
  ],
  risk_score: 85,
  risk_level: 'HIGH',
  // ... other fields
};
```

### Connecting Real API

1. Copy `.env.example` to `.env.local`
2. Set `ML_SERVER_URL=http://your-server:port`
3. Follow INTEGRATION_GUIDE.md for full setup

### Custom Styling

Edit `app/globals.css` to change:
- Colors (CSS variables)
- Fonts (Tailwind)
- Animations (keyframes)
- Glassmorphism effects

### Adding New Panels

1. Create `components/new-panel.tsx`
2. Import in `components/results-screen.tsx`
3. Add to the right sidebar

## Common Tasks

### Change the Risk Threshold

In `components/risk-score-panel.tsx`:
```typescript
const level = score >= 80 ? 'HIGH' : score >= 50 ? 'MEDIUM' : 'LOW';
//              ↑ Change this number
```

### Customize Detected Objects Categories

In `components/detected-objects-panel.tsx`:
```typescript
const prohibited = ['gun', 'weapon', 'explosive', 'bomb', 'YOUR-ITEM'];
const restricted = ['knife', 'blade', 'YOUR-ITEM'];
```

### Change Colors

In `app/globals.css`, update these CSS variables:
```css
--primary: #6366f1;      /* Main accent color */
--secondary: #1e40af;    /* Secondary accent */
--accent: #3b82f6;       /* Bright accent */
--background: #0a0e27;   /* Dark background */
```

### Adjust Processing Time

In `app/page.tsx`, change timeout in `handleAnalyze`:
```typescript
setTimeout(() => {
  // API response
}, 3000); // Change milliseconds (3000 = 3 seconds)
```

## Troubleshooting

### Images not uploading?
- Check browser console for errors
- Verify file type is supported (jpg, png, gif)
- Check file size limit (default 50MB)

### API calls failing?
- Check if `/api/analyze` endpoint exists
- Verify ML server URL in environment
- Check network tab in DevTools

### Styling looks wrong?
- Ensure `dark` class is on `<html>` tag (in `app/layout.tsx`)
- Check if Tailwind CSS is loaded
- Clear browser cache and rebuild

### Canvas not showing detection boxes?
- Verify image loaded successfully
- Check detection box coordinates are valid
- Ensure CORS headers are set on image origin

## Production Deployment

### Before Deploying

- [ ] Connect real ML server
- [ ] Set environment variables
- [ ] Run security audit
- [ ] Test with real cargo images
- [ ] Verify model accuracy
- [ ] Load test the API
- [ ] Setup monitoring
- [ ] Configure error logging

### Deploy to Vercel (Recommended)

```bash
# Connect GitHub repo
git init
git add .
git commit -m "Initial commit"
git push origin main

# In Vercel dashboard:
# 1. Import project
# 2. Add environment variables
# 3. Deploy
```

### Deploy to Other Platforms

See deployment sections in README.md

## What's Next?

1. **Understand Architecture**: Read ARCHITECTURE.md
2. **Connect Your Models**: Follow INTEGRATION_GUIDE.md
3. **Test with Real Data**: Use actual cargo X-ray images
4. **Deploy**: Choose hosting (Vercel, Docker, etc.)
5. **Monitor**: Setup logging and alerts

## API Endpoint Reference

### POST /api/analyze

**Request**:
```bash
curl -X POST http://localhost:3000/api/analyze \
  -F "cargo=@path/to/image.jpg" \
  -F "reference=@path/to/reference.jpg"
```

**Response** (JSON):
```json
{
  "detections": [
    {
      "label": "Gun",
      "confidence": 0.92,
      "box": [100, 150, 200, 250]
    }
  ],
  "risk_score": 87,
  "risk_level": "HIGH",
  "comparison": {
    "status": "Mismatch",
    "similarity": 62
  },
  "anomaly_map": "https://...",
  "explanations": ["Gun detected", "..."],
  "metrics": {
    "precision": 0.91,
    "recall": 0.88,
    "mAP": 0.89
  }
}
```

## Learning Resources

- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **Next.js**: [nextjs.org](https://nextjs.org)
- **shadcn/ui**: [ui.shadcn.com](https://ui.shadcn.com)
- **React**: [react.dev](https://react.dev)
- **YOLOv9**: [github.com/WongKinYiu/yolov9](https://github.com/WongKinYiu/yolov9)

## Getting Help

### Documentation
- README.md - Project overview
- ARCHITECTURE.md - Technical details
- INTEGRATION_GUIDE.md - Backend setup
- GETTING_STARTED.md - This file!

### Common Issues
1. Check browser console (F12 → Console tab)
2. Check network requests (F12 → Network tab)
3. Read error messages carefully
4. Search in documentation first

## Support

For issues:
1. Check troubleshooting section above
2. Review relevant documentation
3. Check component code comments
4. Review network requests in DevTools

## License & Attribution

Built with:
- ✨ Next.js 15
- 🎨 Tailwind CSS
- 🧩 shadcn/ui
- 📦 Lucide React Icons

---

**Ready to get started?** Run `npm run dev` and visit http://localhost:3000 👉

Happy analyzing! 🔍
