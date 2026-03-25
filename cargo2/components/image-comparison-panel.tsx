import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ImageComparisonPanelProps {
  comparison: {
    status: 'Match' | 'Mismatch';
    similarity: number;
  };
}

export default function ImageComparisonPanel({
  comparison,
}: ImageComparisonPanelProps) {
  const isMatch = comparison.status === 'Match';

  return (
    <Card
      className={`border ${
        isMatch
          ? 'border-green-500/30 bg-green-500/10'
          : 'border-amber-500/30 bg-amber-500/10'
      } p-6 backdrop-blur-sm`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="mb-1 text-sm font-medium text-muted-foreground">
            Image Comparison
          </p>
          <div className="flex items-center gap-2">
            {isMatch ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-400" />
            )}
            <span
              className={`font-semibold ${
                isMatch ? 'text-green-400' : 'text-amber-400'
              }`}
            >
              {comparison.status}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-foreground">
          {comparison.similarity}%
        </span>
        <span className="text-xs text-muted-foreground">similarity</span>
      </div>

      {/* Similarity bar */}
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all"
          style={{ width: `${comparison.similarity}%` }}
        />
      </div>
    </Card>
  );
}
