'use client';

import { Card } from '@/components/ui/card';
import { Zap, TrendingUp } from 'lucide-react';

interface AnomalyDetectionPanelProps {
  anomalyScore: number;
  heatmapImage: string;
  accuracy?: number;
  sensitivity?: number;
  reconstructionError?: number;
}

export default function AnomalyDetectionPanel({
  anomalyScore,
  heatmapImage,
  accuracy = 94.2,
  sensitivity = 88.5,
  reconstructionError = 0.42,
}: AnomalyDetectionPanelProps) {
  // Determine anomaly level based on score
  const getAnomalyLevel = (score: number) => {
    if (score > 0.75) return { level: 'CRITICAL', color: 'text-red-500', bgColor: 'bg-red-500/10' };
    if (score > 0.5) return { level: 'HIGH', color: 'text-orange-500', bgColor: 'bg-orange-500/10' };
    if (score > 0.25) return { level: 'MEDIUM', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' };
    return { level: 'LOW', color: 'text-green-500', bgColor: 'bg-green-500/10' };
  };

  const anomaly = getAnomalyLevel(anomalyScore);
  const percentageScore = Math.round(anomalyScore * 100);

  return (
    <div className="space-y-4">
      {/* Anomaly Score Card */}
      <Card className="border border-border bg-card p-6 glassmorphism">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${anomaly.bgColor}`}>
              <Zap className={`h-6 w-6 ${anomaly.color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Anomaly Detection</h3>
              <p className="text-sm text-muted-foreground">AI Autoencoder Analysis</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${anomaly.bgColor} ${anomaly.color}`}>
            {anomaly.level}
          </div>
        </div>

        {/* Score Visualization */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Anomaly Score</span>
            <span className={`text-2xl font-bold ${anomaly.color}`}>{percentageScore}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                anomalyScore > 0.75
                  ? 'bg-red-500'
                  : anomalyScore > 0.5
                  ? 'bg-orange-500'
                  : anomalyScore > 0.25
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${percentageScore}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {anomalyScore > 0.75
              ? 'Critical anomalies detected - Immediate inspection required'
              : anomalyScore > 0.5
              ? 'Significant anomalies detected - Further analysis recommended'
              : anomalyScore > 0.25
              ? 'Minor anomalies detected - Monitor closely'
              : 'No significant anomalies detected'}
          </p>
        </div>

        {/* Reconstruction Error */}
        <div className="p-3 bg-muted/30 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Reconstruction Error</span>
            <span className="font-mono text-sm font-semibold text-primary">{reconstructionError.toFixed(3)}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Lower values indicate better image reconstruction
          </p>
        </div>
      </Card>

      {/* Heatmap Visualization */}
      <Card className="border border-border bg-card overflow-hidden glassmorphism">
        <div className="p-4 border-b border-border">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Anomaly Heatmap
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Red regions indicate high anomaly concentration
          </p>
        </div>
        <div className="relative bg-muted/50 aspect-video flex items-center justify-center p-4">
          <img
            src={heatmapImage}
            alt="Anomaly heatmap"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Card>

      {/* Accuracy Metrics */}
      <Card className="border border-border bg-card p-4 glassmorphism">
        <h4 className="font-semibold text-foreground mb-4">Model Performance</h4>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Detection Accuracy</span>
              <span className="text-sm font-bold text-primary">{accuracy}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${accuracy}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Sensitivity</span>
              <span className="text-sm font-bold text-accent">{sensitivity}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="h-full bg-accent rounded-full transition-all"
                style={{ width: `${sensitivity}%` }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
