import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Detection {
  label: string;
  confidence: number;
  box: [number, number, number, number];
}

interface DetectedObjectsPanelProps {
  detections: Detection[];
}

export default function DetectedObjectsPanel({
  detections,
}: DetectedObjectsPanelProps) {
  const getObjectCategory = (
    label: string
  ): 'prohibited' | 'restricted' | 'normal' => {
    const prohibited = ['gun', 'weapon', 'explosive', 'bomb'];
    const restricted = ['knife', 'blade', 'sharp'];

    const lowerLabel = label.toLowerCase();
    if (prohibited.some((p) => lowerLabel.includes(p))) return 'prohibited';
    if (restricted.some((r) => lowerLabel.includes(r))) return 'restricted';
    return 'normal';
  };

  const getCategoryColor = (
    category: 'prohibited' | 'restricted' | 'normal'
  ) => {
    switch (category) {
      case 'prohibited':
        return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' };
      case 'restricted':
        return { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' };
      default:
        return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' };
    }
  };

  return (
    <Card className="border border-border bg-card p-6 backdrop-blur-sm">
      <h3 className="mb-4 font-semibold text-foreground">Detected Objects</h3>

      {detections.length === 0 ? (
        <p className="text-sm text-muted-foreground">No objects detected</p>
      ) : (
        <div className="space-y-3">
          {detections.map((detection, index) => {
            const category = getObjectCategory(detection.label);
            const colors = getCategoryColor(category);

            return (
              <div
                key={index}
                className={`rounded-lg border ${colors.border} ${colors.bg} p-3 backdrop-blur-sm`}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className={`font-medium ${colors.text}`}>
                    {detection.label}
                  </span>
                  <Badge
                    variant="outline"
                    className={`${colors.text} border-current`}
                  >
                    {(detection.confidence * 100).toFixed(0)}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground capitalize">
                  {category === 'prohibited'
                    ? '🚫 Prohibited Item'
                    : category === 'restricted'
                      ? '⚠️ Restricted Item'
                      : '✓ Normal Item'}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
