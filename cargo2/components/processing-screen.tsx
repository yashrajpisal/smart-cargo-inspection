'use client';

import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';

const models = [
  { name: 'YOLOv9', description: 'Object Detection' },
  { name: 'CNN/Autoencoder', description: 'Anomaly Detection' },
  { name: 'Siamese/SSIM', description: 'Image Comparison' },
  { name: 'Rule-Based ML', description: 'Risk Scoring' },
];

export default function ProcessingScreen() {
  const [activeModel, setActiveModel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModel((prev) => (prev + 1) % models.length);
    }, 750);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-card to-background px-4">
      <div className="max-w-md text-center">
        {/* Animated Loading Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative h-20 w-20">
            <Loader className="absolute inset-0 h-20 w-20 animate-spin text-primary opacity-75" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-accent opacity-30" />
            </div>
          </div>
        </div>

        {/* Main Text */}
        <h2 className="mb-2 text-3xl font-bold text-foreground">Analyzing Cargo...</h2>
        <p className="mb-8 text-muted-foreground">
          Running AI Models for comprehensive threat assessment
        </p>

        {/* Model Progress */}
        <div className="space-y-3">
          {models.map((model, index) => {
            const isActive = index === activeModel;
            const isComplete = index < activeModel;

            return (
              <div
                key={model.name}
                className={`rounded-lg border px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? 'border-primary bg-primary/10'
                    : isComplete
                      ? 'border-border bg-card'
                      : 'border-border/50 bg-muted/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${
                      isComplete
                        ? 'bg-accent text-accent-foreground'
                        : isActive
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isComplete ? (
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : isActive ? (
                      <div className="h-2 w-2 rounded-full bg-current animate-pulse" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-current" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p
                      className={`font-semibold ${
                        isActive || isComplete
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {model.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {model.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-1/3 animate-pulse bg-gradient-to-r from-primary to-accent" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8">
          <div className="h-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{
                width: `${((activeModel + 1) / models.length) * 100}%`,
              }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {Math.round(((activeModel + 1) / models.length) * 100)}% Complete
          </p>
        </div>
      </div>
    </div>
  );
}
