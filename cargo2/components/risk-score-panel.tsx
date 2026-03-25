import { Card } from '@/components/ui/card';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

interface RiskScorePanelProps {
  score: number;
  level: 'LOW' | 'MEDIUM' | 'HIGH';
}

export default function RiskScorePanel({ score, level }: RiskScorePanelProps) {
  const getRiskColor = (lvl: string) => {
    switch (lvl) {
      case 'HIGH':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          text: 'text-red-400',
          icon: AlertTriangle,
        };
      case 'MEDIUM':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          icon: AlertCircle,
        };
      default:
        return {
          bg: 'bg-green-500/10',
          border: 'border-green-500/30',
          text: 'text-green-400',
          icon: CheckCircle,
        };
    }
  };

  const risk = getRiskColor(level);
  const Icon = risk.icon;

  return (
    <Card
      className={`border ${risk.border} ${risk.bg} p-6 backdrop-blur-sm`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="mb-1 text-sm font-medium text-muted-foreground">
            Risk Score
          </p>
          <div className="mb-4 flex items-baseline gap-2">
            <span className={`text-4xl font-bold ${risk.text}`}>{score}</span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
          <p className={`${risk.text} font-semibold`}>{level} RISK</p>
        </div>
        <Icon className={`h-8 w-8 ${risk.text}`} />
      </div>

      {/* Risk indicator bar */}
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full transition-all ${
            level === 'HIGH'
              ? 'bg-red-500'
              : level === 'MEDIUM'
                ? 'bg-amber-500'
                : 'bg-green-500'
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </Card>
  );
}
