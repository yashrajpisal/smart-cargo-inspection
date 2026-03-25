import { Card } from '@/components/ui/card';
import { Zap } from 'lucide-react';

interface AnomalyPanelProps {
  anomalyMap: string;
}

export default function AnomalyPanel({ anomalyMap }: AnomalyPanelProps) {
  return (
    <Card className="border border-border bg-card p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Anomaly Detection</h3>
      </div>

      <div className="relative overflow-hidden rounded-lg bg-muted">
        <img
          src={anomalyMap}
          alt="Anomaly heatmap"
          className="aspect-square w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Red areas indicate high-density anomalies. Yellow/orange areas show
        potential concerns.
      </p>
    </Card>
  );
}
