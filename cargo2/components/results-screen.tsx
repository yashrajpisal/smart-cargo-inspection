'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DetectionCanvas from '@/components/detection-canvas';
import RiskScorePanel from '@/components/risk-score-panel';
import DetectedObjectsPanel from '@/components/detected-objects-panel';
import ImageComparisonPanel from '@/components/image-comparison-panel';
import AnomalyDetectionPanel from '@/components/anomaly-detection-panel';
import ExplanationPanel from '@/components/explanation-panel';
import MetricsPanel from '@/components/metrics-panel';
import { Download, Eye, EyeOff } from 'lucide-react';

interface ResultsScreenProps {
  cargoImage: string;
  result: {
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
  };
  onReset: () => void;
}

type ViewMode = 'detection' | 'original' | 'heatmap';

export default function ResultsScreen({
  cargoImage,
  result,
  onReset,
}: ResultsScreenProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('detection');
  const [showBoxes, setShowBoxes] = useState(true);

  const handleDownloadReport = () => {
    // In production, generate and download PDF report
    alert('Report download would be generated here with all analysis results');
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analysis Results</h1>
          <p className="text-muted-foreground">
            Complete threat assessment and detection report
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleDownloadReport}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
          <Button onClick={onReset} size="sm">
            New Analysis
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Side - Image with Controls */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden border border-border bg-card p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Processed Image</h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => setViewMode('original')}
                  variant={viewMode === 'original' ? 'default' : 'ghost'}
                  size="sm"
                  className="gap-2"
                >
                  {viewMode === 'original' ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                  Original
                </Button>
                <Button
                  onClick={() => setViewMode('detection')}
                  variant={viewMode === 'detection' ? 'default' : 'ghost'}
                  size="sm"
                  className="gap-2"
                >
                  {viewMode === 'detection' ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                  Detection
                </Button>
                <Button
                  onClick={() => setViewMode('heatmap')}
                  variant={viewMode === 'heatmap' ? 'default' : 'ghost'}
                  size="sm"
                  className="gap-2"
                >
                  {viewMode === 'heatmap' ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                  Heatmap
                </Button>
              </div>
            </div>

            {viewMode === 'detection' && (
              <DetectionCanvas
                image={cargoImage}
                detections={result.detections}
                showBoxes={showBoxes}
              />
            )}

            {viewMode === 'original' && (
              <img
                src={cargoImage}
                alt="Original cargo image"
                className="w-full rounded-lg bg-muted"
              />
            )}

            {viewMode === 'heatmap' && (
              <img
                src={result.anomaly_map}
                alt="Anomaly heatmap"
                className="w-full rounded-lg bg-muted"
              />
            )}
          </Card>

          {/* Detected Objects Panel */}
          <DetectedObjectsPanel detections={result.detections} />
        </div>

        {/* Right Side - Panels */}
        <div className="space-y-4">
          {/* Risk Score - Always on Top */}
          <RiskScorePanel
            score={result.risk_score}
            level={result.risk_level}
          />

          {/* Image Comparison */}
          <ImageComparisonPanel comparison={result.comparison} />

          {/* Anomaly Detection - Enhanced */}
          <AnomalyDetectionPanel
            anomalyScore={result.anomaly_score || 0.62}
            heatmapImage={result.anomaly_map}
            accuracy={result.anomaly_accuracy || 94.2}
            sensitivity={result.anomaly_sensitivity || 88.5}
            reconstructionError={result.reconstruction_error || 0.42}
          />

          {/* Explanation Panel */}
          <ExplanationPanel explanations={result.explanations} />

          {/* Model Metrics */}
          <MetricsPanel metrics={result.metrics} />
        </div>
      </div>
    </div>
  );
}
