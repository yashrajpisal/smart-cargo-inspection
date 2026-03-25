import { Card } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface ExplanationPanelProps {
  explanations: string[];
}

export default function ExplanationPanel({
  explanations,
}: ExplanationPanelProps) {
  return (
    <Card className="border border-border bg-card p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Why Flagged?</h3>
      </div>

      <ul className="space-y-3">
        {explanations.map((explanation, index) => (
          <li key={index} className="flex gap-3 text-sm">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs text-primary">
              {index + 1}
            </span>
            <span className="text-muted-foreground">{explanation}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
