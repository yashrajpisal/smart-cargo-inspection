'use client';

import { useState } from 'react';
import Header from '@/components/header';
import UploadScreen from '@/components/upload-screen';
import ProcessingScreen from '@/components/processing-screen';
import ResultsScreen from '@/components/results-screen';

type AppState = 'upload' | 'processing' | 'results';

interface AnalysisResult {
  detections: Array<{
    label: string;
    confidence: number;
    box: [number, number, number, number];
  }>;
  risk_score: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  comparison: {
    status: 'Match' | 'Mismatch';
    similarity: number;
  };
  anomaly_map: string;
  anomaly_score?: number;
  anomaly_accuracy?: number;
  anomaly_sensitivity?: number;
  reconstruction_error?: number;
  explanations: string[];
  metrics: {
    precision: number;
    recall: number;
    mAP: number;
  };
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>('upload');
  const [uploadedImages, setUploadedImages] = useState<{
    cargo: File | null;
    reference: File | null;
    cargoPreview: string;
    referencePreview: string;
  }>({
    cargo: null,
    reference: null,
    cargoPreview: '',
    referencePreview: '',
  });
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleImageUpload = (type: 'cargo' | 'reference', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      setUploadedImages((prev) => ({
        ...prev,
        [type]: file,
        [type === 'cargo' ? 'cargoPreview' : 'referencePreview']: preview,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!uploadedImages.cargo) return;

    setAppState('processing');

    // Simulate API call to backend
    // In production, send to: POST /api/analyze with FormData
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        detections: [
          { label: 'Gun', confidence: 0.92, box: [100, 150, 200, 250] },
          { label: 'Knife', confidence: 0.87, box: [300, 200, 150, 180] },
          { label: 'Electronics', confidence: 0.76, box: [180, 80, 280, 160] },
        ],
        risk_score: 87,
        risk_level: 'HIGH',
        comparison: {
          status: 'Mismatch',
          similarity: 62,
        },
        anomaly_map: 'https://via.placeholder.com/600x400/1a1a2e/6366f1?text=Anomaly+Heatmap',
        anomaly_score: 0.78,
        anomaly_accuracy: 94.2,
        anomaly_sensitivity: 88.5,
        reconstruction_error: 0.42,
        explanations: [
          'YOLOv8 detected gun with 92% confidence - HIGH ALERT',
          'Autoencoder found critical anomalies (78% score) in cargo region',
          'SSIM comparison shows significant mismatch (62%) with reference',
          'Risk engine calculated: Gun(70) + Anomaly(40) + Mismatch(30) = 87 HIGH',
        ],
        metrics: {
          precision: 0.91,
          recall: 0.88,
          mAP: 0.89,
        },
      };

      setAnalysisResult(mockResult);
      setAppState('results');
    }, 3000);
  };

  const handleReset = () => {
    setAppState('upload');
    setUploadedImages({
      cargo: null,
      reference: null,
      cargoPreview: '',
      referencePreview: '',
    });
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onReset={appState !== 'upload' ? handleReset : undefined} />

      <main className="flex-1">
        {appState === 'upload' && (
          <UploadScreen
            uploadedImages={uploadedImages}
            onImageUpload={handleImageUpload}
            onAnalyze={handleAnalyze}
            canAnalyze={!!uploadedImages.cargo}
          />
        )}

        {appState === 'processing' && <ProcessingScreen />}

        {appState === 'results' && analysisResult && (
          <ResultsScreen
            cargoImage={uploadedImages.cargoPreview}
            result={analysisResult}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}
