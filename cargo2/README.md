# Smart Cargo Inspection System

A professional AI-powered dashboard for analyzing cargo X-ray images and detecting suspicious items using YOLOv9 and advanced ML models.

## Features

### 🎯 Core Features
- **Multi-Model AI Integration**: YOLOv9, CNN/Autoencoder, Siamese/SSIM, and Rule-Based ML
- **Three-Screen Interface**:
  - **Upload Screen**: Drag-drop X-ray image and optional reference image
  - **Processing Screen**: Real-time AI model execution visualization
  - **Results Dashboard**: Comprehensive analysis with 6 insight panels

### 📊 Results Dashboard
- **Image Viewer**: Toggle between original, detection overlay, and anomaly heatmap
- **Risk Score**: 0-100 scale with color-coded threat levels (Green/Orange/Red)
- **Detected Objects**: List of identified items with confidence scores
- **Image Comparison**: Similarity percentage between cargo and reference images
- **Anomaly Detection**: Visual heatmap showing suspicious regions
- **Explanation Panel**: AI-generated explanations for flagged items
- **Model Metrics**: Precision, Recall, and mAP scores

### 🎨 Design
- Dark theme with glassmorphism effects
- Professional cybersecurity/analytics aesthetic
- Responsive layout for desktop and tablet
- Smooth animations and transitions
- Gradient accents (Indigo & Blue color scheme)

## Project Structure

```
app/
├── page.tsx                    # Main app container with state management
├── layout.tsx                  # Root layout with dark mode
└── globals.css                 # Theme colors and global styles

components/
├── header.tsx                  # App header with branding
├── upload-screen.tsx           # Image upload interface
├── processing-screen.tsx       # Loading/progress animation
├── results-screen.tsx          # Main results dashboard
├── detection-canvas.tsx        # Canvas-based detection rendering
├── risk-score-panel.tsx        # Risk score visualization
├── detected-objects-panel.tsx  # Objects list
├── image-comparison-panel.tsx  # Comparison metrics
├── anomaly-panel.tsx           # Anomaly heatmap
├── explanation-panel.tsx       # AI explanations
└── metrics-panel.tsx           # Model performance metrics
```

## Color Scheme

- **Background**: Deep Navy (#0a0e27)
- **Cards**: Darker Navy (#131829)
- **Primary**: Indigo (#6366f1)
- **Secondary**: Blue (#1e40af)
- **Accent**: Bright Blue (#3b82f6)
- **Text**: Light Indigo (#e8eaf6)
- **Muted**: Dark Gray (#1f2937)

## API Integration

The system is ready to integrate with a backend API. Update the analyze call in `app/page.tsx`:

```typescript
const response = await fetch('/api/analyze', {
  method: 'POST',
  body: formData, // FormData with cargo and reference images
});
const result = await response.json();
```

Expected API response format:
```json
{
  "detections": [
    { "label": "Gun", "confidence": 0.92, "box": [x, y, w, h] }
  ],
  "risk_score": 87,
  "risk_level": "HIGH",
  "comparison": {
    "status": "Mismatch",
    "similarity": 62
  },
  "anomaly_map": "url_to_heatmap",
  "explanations": ["explanation 1", "explanation 2"],
  "metrics": {
    "precision": 0.91,
    "recall": 0.88,
    "mAP": 0.89
  }
}
```

## Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Canvas**: HTML5 Canvas for detection visualization

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Customization

### Adding New Detections
Modify the mock data in `app/page.tsx` or connect to your actual YOLOv9 API.

### Adjusting Risk Thresholds
Update risk level logic in `risk-score-panel.tsx`:
```typescript
const getRiskColor = (score: number) => {
  if (score > 75) return 'HIGH'; // Adjust threshold
  // ...
}
```

### Changing Color Scheme
Update the CSS variables in `app/globals.css`:
```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
  /* ... */
}
```

## Production Ready Features

- ✅ Dark mode by default
- ✅ Responsive design
- ✅ Smooth animations and transitions
- ✅ Accessibility-friendly UI
- ✅ Type-safe with TypeScript
- ✅ State management with React hooks
- ✅ Modular component architecture
- ✅ API-ready endpoints
- ✅ Mock data for testing
