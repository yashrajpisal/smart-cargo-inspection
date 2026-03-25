# Smart Cargo Inspector - Complete Deployment Guide

## Overview

This guide covers deploying the complete Smart Cargo Inspector system with:
- Next.js 16 Frontend (React)
- Python Backend with YOLOv8, Autoencoder, SSIM models

---

## Part 1: Frontend Setup (Next.js)

### 1.1 Local Development

```bash
# Clone and install
git clone <your-repo>
cd cargo-inspector
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### 1.2 Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Smart Cargo Inspector
```

### 1.3 Deploy to Vercel

```bash
# Login to Vercel
npx vercel login

# Deploy
npx vercel

# Set environment variables in Vercel dashboard
# Settings > Environment Variables
```

---

## Part 2: Python Backend Setup

### 2.1 Install Dependencies

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install requirements
pip install -r requirements.txt
```

### 2.2 Requirements.txt

```
flask==2.3.0
flask-cors==4.0.0
numpy==1.24.0
opencv-python==4.7.0
pillow==9.5.0
torch==2.0.0
torchvision==0.15.0
ultralytics==8.0.0
scikit-image==0.21.0
python-dotenv==1.0.0
```

### 2.3 Verify Model Paths

Update `backend/app.py`:

```python
# YOLOv8 model
YOLO_MODEL_PATH = '/Users/govindmishra/Desktop/cargo_model/weights/best.pt'

# Autoencoder model
AUTOENCODER_MODEL_PATH = 'models/autoencoder.pt'

# Or use environment variable
import os
YOLO_MODEL_PATH = os.getenv('YOLO_MODEL_PATH', '/Users/govindmishra/Desktop/cargo_model/weights/best.pt')
```

### 2.4 Run Backend Locally

```bash
# Flask
python backend/app.py

# Or FastAPI
uvicorn backend.main:app --reload --port 5000

# Test endpoint
curl -X POST \
  -F "cargo=@test_image.jpg" \
  http://localhost:5000/api/analyze
```

---

## Part 3: Docker Deployment

### 3.1 Backend Dockerfile

Create `backend/Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Download YOLOv8 weights (optional, or mount volume)
RUN python -c "from ultralytics import YOLO; YOLO('yolov8n.pt')"

# Expose port
EXPOSE 5000

# Run Flask app
CMD ["python", "app.py"]
```

### 3.2 Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - YOLO_MODEL_PATH=/Users/govindmishra/Desktop/cargo_model/weights/best.pt
      - FLASK_ENV=production
    volumes:
      - /Users/govindmishra/Desktop/cargo_model/weights:/app/weights
      - /Users/govindmishra/Desktop/models:/app/models
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:5000
    depends_on:
      - backend
    restart: unless-stopped
```

### 3.3 Run with Docker

```bash
# Build and start services
docker-compose up --build

# Access
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

---

## Part 4: Cloud Deployment Options

### Option A: AWS EC2 + ALB

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t3.medium or larger
   - Allow ports 80, 443, 5000

2. **SSH and Setup**
   ```bash
   ssh -i key.pem ubuntu@<instance-ip>
   
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   
   # Clone repo and run
   git clone <your-repo>
   cd cargo-inspector
   docker-compose up -d
   ```

3. **Setup Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       # Frontend
       location / {
           proxy_pass http://localhost:3000;
       }
       
       # Backend API
       location /api {
           proxy_pass http://localhost:5000;
       }
   }
   ```

### Option B: Google Cloud Run

```bash
# Build and push Docker image
gcloud builds submit --tag gcr.io/PROJECT-ID/cargo-backend

# Deploy
gcloud run deploy cargo-backend \
  --image gcr.io/PROJECT-ID/cargo-backend \
  --platform managed \
  --region us-central1 \
  --memory 4Gi
```

### Option C: AWS Lambda + S3 (Serverless)

```python
# backend/lambda_handler.py
import json
from app import analyze

def handler(event, context):
    try:
        # Parse multipart form data
        files = event.get('files', {})
        result = analyze(files)
        
        return {
            'statusCode': 200,
            'body': json.dumps(result)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
```

---

## Part 5: Production Configuration

### 5.1 Frontend (.env.production)

```
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_APP_NAME=Smart Cargo Inspector
```

### 5.2 Backend (production_settings.py)

```python
DEBUG = False
UPLOAD_FOLDER = '/tmp/uploads'
MAX_CONTENT_LENGTH = 50 * 1024 * 1024  # 50MB
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}
MODEL_CACHE_SIZE = 2  # Keep 2 models in memory

# Error logging
import logging
logging.basicConfig(
    filename='logs/app.log',
    level=logging.INFO,
    format='%(asctime)s %(levelname)s: %(message)s'
)
```

### 5.3 Security Headers

```python
# backend/app.py
@app.after_request
def add_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return response
```

---

## Part 6: Monitoring & Logging

### 6.1 Application Monitoring

```bash
# Install monitoring tools
pip install prometheus-flask-exporter
pip install sentry-sdk
```

```python
# backend/app.py
from prometheus_flask_exporter import PrometheusMetrics
import sentry_sdk

sentry_sdk.init("your-sentry-dsn")
metrics = PrometheusMetrics(app)
```

### 6.2 Log Aggregation

```python
# Cloudwatch Logs (AWS)
import watchtower
logging.basicConfig(
    handlers=[
        watchtower.CloudWatchLogHandler()
    ]
)
```

---

## Part 7: Testing

### 7.1 Backend Tests

```python
# test_backend.py
import pytest
from app import app, analyze

@pytest.fixture
def client():
    return app.test_client()

def test_analyze_endpoint(client):
    with open('test_images/cargo.jpg', 'rb') as cargo:
        response = client.post(
            '/api/analyze',
            data={'cargo': cargo},
            content_type='multipart/form-data'
        )
    assert response.status_code == 200
    assert 'detections' in response.json
```

```bash
# Run tests
pytest test_backend.py -v
```

### 7.2 Frontend Tests

```bash
# Jest
npm test

# E2E with Cypress
npm run cypress:open
```

---

## Part 8: Performance Optimization

### 8.1 Model Optimization

```python
# Use ONNX for faster inference
import onnx
import onnxruntime as ort

# Convert PyTorch to ONNX
torch.onnx.export(model, dummy_input, 'model.onnx')

# Load ONNX model
sess = ort.InferenceSession('model.onnx')
```

### 8.2 GPU Support

```bash
# Install GPU support
pip install torch torchvision torch::cuda

# In backend
import torch
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)
```

### 8.3 Caching

```python
from functools import lru_cache

@lru_cache(maxsize=10)
def load_model(model_path):
    return torch.load(model_path)
```

---

## Part 9: Troubleshooting

### Issue: "Module not found: ultralytics"
```bash
pip install ultralytics --upgrade
```

### Issue: "CUDA out of memory"
```python
# Use smaller batch size or lower resolution
image = cv2.resize(image, (416, 416))  # Match model input
torch.cuda.empty_cache()
```

### Issue: "API connection timeout"
- Increase timeout in frontend
- Check backend is running
- Verify firewall rules

### Issue: "Model weights not found"
```bash
# Download weights
python -c "from ultralytics import YOLO; YOLO('yolov8n.pt')"
```

---

## Part 10: Quick Reference

| Component | URL | Port |
|-----------|-----|------|
| Frontend | localhost:3000 | 3000 |
| Backend API | localhost:5000 | 5000 |
| Prometheus Metrics | localhost:5000/metrics | 5000 |

---

## Next Steps

1. ✅ Setup local development
2. ✅ Test models integration
3. ✅ Deploy backend (Docker/Cloud)
4. ✅ Deploy frontend (Vercel)
5. ✅ Setup monitoring
6. ✅ Enable SSL/HTTPS
7. ✅ Configure logging

Your Smart Cargo Inspector is ready for production!
