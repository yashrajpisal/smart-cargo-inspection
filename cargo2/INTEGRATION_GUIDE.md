# Backend Integration Guide

This guide explains how to integrate the Smart Cargo Inspection System with your YOLOv9 and ML model backend.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Frontend (Next.js)                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Upload Screen  →  2. Processing Screen  →  3. Results   │
│  (User uploads)        (Loading states)       (Dashboard)   │
│       ↓                      ↓                      ↑         │
└──────────┬──────────────────┬──────────────────────┘         
           │                  │                                 
           └─────────────────→└──── POST /api/analyze ────────→
                                                               │
┌─────────────────────────────────────────────────────────────┴──┐
│                    Backend API (Your Server)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  1. YOLOv9 Model     2. CNN/Autoencoder   3. Siamese/SSIM       │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────────┐  │
│  │ Object         │  │ Anomaly        │  │ Image            │  │
│  │ Detection      │→ │ Detection      │→ │ Comparison       │  │
│  └────────────────┘  └────────────────┘  └──────────────────┘  │
│          ↓                   ↓                    ↓             │
│       [Labels]          [Heatmap]         [Similarity %]        │
│                                                                   │
│  4. Rule-Based ML      5. Risk Aggregation                      │
│  ┌────────────────┐    ┌──────────────────────────────────┐    │
│  │ Risk Score     │→   │ Final Score (0-100)              │    │
│  │ Calculation    │    │ Risk Level (LOW/MED/HIGH)        │    │
│  └────────────────┘    └──────────────────────────────────┘    │
│                                  ↓                              │
└──────────────────────────────────┬───────────────────────────────┘
                                   │
                    ┌──── JSON Response ────┐
                    ↓                       ↓
              [Frontend]           [Dashboard Update]
```

## API Endpoint

### POST /api/analyze

**Location**: `app/api/analyze/route.ts`

**Request**:
```typescript
const formData = new FormData();
formData.append('cargo', cargoFile); // Required: File
formData.append('reference', referenceFile); // Optional: File

const response = await fetch('/api/analyze', {
  method: 'POST',
  body: formData,
});
```

**Response Format**:
```json
{
  "detections": [
    {
      "label": "Gun",
      "confidence": 0.92,
      "box": [x, y, width, height]
    }
  ],
  "risk_score": 87,
  "risk_level": "HIGH",
  "comparison": {
    "status": "Mismatch",
    "similarity": 62
  },
  "anomaly_map": "https://example.com/heatmap.png",
  "explanations": [
    "Gun detected in primary scan",
    "High-density anomaly found"
  ],
  "metrics": {
    "precision": 0.91,
    "recall": 0.88,
    "mAP": 0.89
  }
}
```

## Implementation Steps

### 1. Set Up Model Inference Server

Create a Python backend using FastAPI, Flask, or your preferred framework:

```python
# Example with FastAPI
from fastapi import FastAPI, File, UploadFile
from ultralytics import YOLO
import numpy as np

app = FastAPI()
model = YOLO('yolov9.pt')  # Load YOLOv9 model

@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    contents = await file.read()
    image = cv2.imdecode(np.frombuffer(contents, np.uint8), cv2.IMREAD_COLOR)
    
    results = model(image)
    detections = []
    
    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = box.xyxy[0].tolist()
            detections.append({
                'label': result.names[int(box.cls)],
                'confidence': float(box.conf),
                'box': [int(x1), int(y1), int(x2-x1), int(y2-y1)]
            })
    
    return {'detections': detections}
```

### 2. Implement Model Pipeline in API Route

Update `app/api/analyze/route.ts`:

```typescript
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const cargoFile = formData.get('cargo') as File;
  const referenceFile = formData.get('reference') as File | null;

  // Convert files to buffers
  const cargoBuffer = Buffer.from(await cargoFile.arrayBuffer());
  const referenceBuffer = referenceFile 
    ? Buffer.from(await referenceFile.arrayBuffer())
    : null;

  // 1. Run YOLOv9 Detection
  const detections = await runYOLOv9Detection(cargoBuffer);

  // 2. Run Anomaly Detection
  const anomalyMap = await runAnomalyDetection(cargoBuffer);

  // 3. Run Image Comparison (if reference exists)
  const comparison = referenceBuffer
    ? await runImageComparison(cargoBuffer, referenceBuffer)
    : { status: 'Match', similarity: 0 };

  // 4. Calculate Risk Score
  const { risk_score, risk_level } = calculateRiskScore(
    detections,
    anomalyMap,
    comparison
  );

  // 5. Generate Explanations
  const explanations = generateExplanations(detections, anomalyMap, comparison);

  // 6. Get Model Metrics
  const metrics = await getModelMetrics();

  return NextResponse.json({
    detections,
    risk_score,
    risk_level,
    comparison,
    anomaly_map: anomalyMapUrl,
    explanations,
    metrics,
  });
}

async function runYOLOv9Detection(imageBuffer: Buffer) {
  // Call your ML server
  const response = await fetch('http://ml-server:8000/detect', {
    method: 'POST',
    body: imageBuffer,
  });
  const data = await response.json();
  return data.detections;
}

async function runAnomalyDetection(imageBuffer: Buffer) {
  // Call your anomaly detection model
  const response = await fetch('http://ml-server:8000/anomaly', {
    method: 'POST',
    body: imageBuffer,
  });
  const data = await response.json();
  return data.heatmap_url;
}

async function runImageComparison(
  cargo: Buffer,
  reference: Buffer
): Promise<{ status: 'Match' | 'Mismatch'; similarity: number }> {
  // Call your image comparison model
  const formData = new FormData();
  formData.append('cargo', new Blob([cargo]));
  formData.append('reference', new Blob([reference]));
  
  const response = await fetch('http://ml-server:8000/compare', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return {
    status: data.similarity > 70 ? 'Match' : 'Mismatch',
    similarity: data.similarity,
  };
}

function calculateRiskScore(
  detections: Detection[],
  anomalyScore: number,
  comparison: { status: string; similarity: number }
): { risk_score: number; risk_level: string } {
  let score = 0;

  // Score from detections
  const prohibitedItems = ['gun', 'weapon', 'explosive', 'bomb'];
  const restrictedItems = ['knife', 'blade'];
  
  detections.forEach((det) => {
    const lowerLabel = det.label.toLowerCase();
    if (prohibitedItems.some((p) => lowerLabel.includes(p))) {
      score += 40 * det.confidence; // Prohibited item: high weight
    } else if (restrictedItems.some((r) => lowerLabel.includes(r))) {
      score += 25 * det.confidence; // Restricted item: medium weight
    } else {
      score += 10 * det.confidence; // Normal item: low weight
    }
  });

  // Score from anomalies
  score += anomalyScore * 0.2; // 20% weight for anomalies

  // Score from comparison mismatch
  if (comparison.status === 'Mismatch') {
    score += (100 - comparison.similarity) * 0.15; // 15% weight for mismatch
  }

  // Cap at 100
  score = Math.min(100, score);

  const level = score >= 75 ? 'HIGH' : score >= 45 ? 'MEDIUM' : 'LOW';

  return { risk_score: Math.round(score), risk_level: level };
}

function generateExplanations(
  detections: Detection[],
  anomalyScore: number,
  comparison: { status: string; similarity: number }
): string[] {
  const explanations: string[] = [];

  // Add detection explanations
  detections.forEach((det) => {
    if (det.label.toLowerCase().includes('gun')) {
      explanations.push(`Gun detected with ${(det.confidence * 100).toFixed(0)}% confidence - HIGH ALERT`);
    } else if (det.label.toLowerCase().includes('knife')) {
      explanations.push(`Knife/blade detected with ${(det.confidence * 100).toFixed(0)}% confidence`);
    }
  });

  // Add anomaly explanation
  if (anomalyScore > 70) {
    explanations.push('High-density anomaly found in cargo region');
  }

  // Add comparison explanation
  if (comparison.status === 'Mismatch') {
    explanations.push(`Image mismatch detected - ${comparison.similarity}% similarity with reference`);
  }

  return explanations;
}

async function getModelMetrics(): Promise<Metrics> {
  // Return your model's performance metrics
  // These can be cached or calculated periodically
  return {
    precision: 0.91,
    recall: 0.88,
    mAP: 0.89,
  };
}
```

### 3. Environment Configuration

Add to `.env.local`:

```env
# ML Server
ML_SERVER_URL=http://localhost:8000
ML_SERVER_TIMEOUT=30000

# Model paths (if using local models)
YOLOV9_MODEL_PATH=/models/yolov9.pt
ANOMALY_MODEL_PATH=/models/anomaly.pth
SIAMESE_MODEL_PATH=/models/siamese.pt
```

### 4. Update Frontend State Management

The frontend state management is already built into `app/page.tsx`. The analyze function will call the API:

```typescript
const handleAnalyze = async () => {
  if (!uploadedImages.cargo) return;

  setAppState('processing');

  try {
    const formData = new FormData();
    formData.append('cargo', uploadedImages.cargo);
    if (uploadedImages.reference) {
      formData.append('reference', uploadedImages.reference);
    }

    const response = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    setAnalysisResult(result);
    setAppState('results');
  } catch (error) {
    console.error('Analysis failed:', error);
    setAppState('upload');
  }
};
```

## Testing

### 1. Test with Mock Data

The system currently uses mock data. To test your integration:

1. Replace the setTimeout with actual API call
2. Use Postman or curl to test the endpoint:

```bash
curl -X POST http://localhost:3000/api/analyze \
  -F "cargo=@path/to/xray.jpg" \
  -F "reference=@path/to/reference.jpg"
```

### 2. Test with Sample Images

```bash
# Create test directory
mkdir -p test_images

# Download sample X-ray images for testing
# Add your test images to test_images/
```

### 3. Performance Testing

Monitor these metrics:
- API response time (target: < 10 seconds)
- Model inference time per image
- Memory usage during concurrent requests

## Deployment

### Option 1: Vercel Deployment

```bash
vercel deploy
```

Add environment variables in Vercel dashboard:
- `ML_SERVER_URL` - Your ML inference server URL
- Other model paths as needed

### Option 2: Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY . .
RUN npm install && npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Option 3: ML Server Containerization

```dockerfile
FROM python:3.10-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY models/ ./models/
COPY server.py .

EXPOSE 8000
CMD ["python", "server.py"]
```

## Troubleshooting

### Model Inference is Slow

1. Check GPU availability: `nvidia-smi`
2. Optimize model: Use quantization or pruning
3. Increase timeout in API: Update `ML_SERVER_TIMEOUT`

### Memory Issues

1. Process images in smaller batches
2. Stream responses for large heatmaps
3. Implement request queuing

### CORS Issues

Add CORS headers to your ML server:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["POST"],
    allow_headers=["*"],
)
```

## Support

For issues with:
- Frontend UI: Check component props in `components/`
- API integration: Update `app/api/analyze/route.ts`
- Model performance: Optimize your ML server

## Next Steps

1. ✅ Frontend UI is ready
2. 🔜 Connect YOLOv9 model server
3. 🔜 Implement anomaly detection
4. 🔜 Add image comparison logic
5. 🔜 Deploy to production
6. 🔜 Monitor and optimize performance
