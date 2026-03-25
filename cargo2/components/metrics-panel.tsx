import { Card } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface MetricsPanelProps {
  metrics: {
    precision: number;
    recall: number;
    mAP: number;
  };
}

export default function MetricsPanel({ metrics }: MetricsPanelProps) {
  const formatMetric = (value: number) => (value * 100).toFixed(1);

  const metricsList = [
    {
      label: 'Precision',
      value: formatMetric(metrics.precision),
      description: 'Detection accuracy rate',
    },
    {
      label: 'Recall',
      value: formatMetric(metrics.recall),
      description: 'Detection coverage',
    },
    {
      label: 'mAP',
      value: formatMetric(metrics.mAP),
      description: 'Overall model performance',
    },
  ];

  return (
    <Card className="border border-border bg-card p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Model Metrics</h3>
      </div>

      <div className="space-y-4">
        {metricsList.map((metric) => (
          <div key={metric.label}>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                {metric.label}
              </p>
              <span className="text-lg font-bold text-primary">
                {metric.value}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                style={{ width: `${metric.value}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
