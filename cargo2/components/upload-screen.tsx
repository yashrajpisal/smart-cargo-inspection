'use client';

import { useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadScreenProps {
  uploadedImages: {
    cargo: File | null;
    cargoPreview: string;
  };
  onImageUpload: (type: 'cargo', file: File) => void;
  onAnalyze: () => void;
  canAnalyze: boolean;
}

export default function UploadScreen({
  uploadedImages,
  onImageUpload,
  onAnalyze,
  canAnalyze,
}: UploadScreenProps) {
  const cargoInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    type: 'cargo'
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(type, file);
    }
  };

  const handleFileSelect = (type: 'cargo', file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(type, file);
    }
  };

  const UploadZone = ({
    hasImage,
    preview,
    inputRef,
  }: {
    hasImage: boolean;
    preview: string;
    inputRef: React.RefObject<HTMLInputElement | null>; // ✅ FIXED
  }) => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          Cargo X-Ray Image
        </h2>
        <p className="text-sm text-muted-foreground">
          Upload cargo X-ray scan for analysis
        </p>
      </div>

      <div
        onDrop={(e) => handleDrop(e, 'cargo')}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all ${
          hasImage
            ? 'border-primary bg-primary/5'
            : 'border-border bg-card hover:border-primary hover:bg-primary/5'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) =>
            handleFileSelect('cargo', e.target.files?.[0] || null)
          }
        />

        {!hasImage ? (
          <>
            <Upload className="mb-3 h-8 w-8 text-primary" />
            <p className="text-center">
              <span className="font-semibold text-foreground">
                Drag and drop
              </span>
              <span className="text-muted-foreground">
                {' '}
                or click to browse
              </span>
            </p>
          </>
        ) : (
          <>
            <div className="relative mb-4 h-48 w-full">
              <img
                src={preview}
                alt="cargo"
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <p className="text-sm font-medium text-primary">
              Image uploaded ✓
            </p>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-16 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 p-8 sm:p-12 text-center">
        <h1 className="mb-4 text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Smart Cargo Inspector
        </h1>
        <p className="mb-6 text-xl text-foreground/90">
          AI-Powered X-Ray Threat Detection
        </p>
      </div>

      {/* Upload Section */}
      <div className="mb-12">
        <UploadZone
          hasImage={!!uploadedImages.cargo}
          preview={uploadedImages.cargoPreview}
          inputRef={cargoInputRef}
        />

        <div className="mt-16 flex flex-col items-center gap-6">
          <Button
            onClick={onAnalyze}
            disabled={!canAnalyze}
            size="lg"
            className={`gap-3 px-12 py-8 text-lg font-semibold rounded-xl ${
              canAnalyze
                ? 'bg-gradient-to-r from-primary to-accent'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <ImageIcon className="h-6 w-6" />
            Start AI Analysis
          </Button>

          <p className="text-sm">
            {canAnalyze
              ? '✓ Ready to analyze'
              : '⚠ Upload an image first'}
          </p>
        </div>
      </div>
    </div>
  );
}