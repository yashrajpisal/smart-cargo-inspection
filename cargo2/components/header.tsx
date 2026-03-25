'use client';

import { Shield, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onReset?: () => void;
}

export default function Header({ onReset }: HeaderProps) {
  return (
    <header className="border-b border-border/50 bg-gradient-to-b from-card/50 to-background/50 glassmorphism backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 sm:py-6">
          {/* Logo and Title */}
          <button
            onClick={onReset || (() => window.location.reload())}
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="rounded-lg bg-gradient-to-br from-primary to-accent p-2.5 shadow-lg shadow-primary/20">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Smart Cargo Inspector
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                YOLOv8 • Autoencoder • SSIM • Risk Engine
              </p>
            </div>
          </button>

          {/* Action Buttons */}
          {onReset && (
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                onClick={onReset}
                variant="outline"
                size="sm"
                className="gap-2 border-primary/30 hover:bg-primary/10 transition-all"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
              <Button
                onClick={onReset}
                variant="ghost"
                size="sm"
                className="gap-2 hover:bg-accent/10"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">New Analysis</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
