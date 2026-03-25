# Smart Cargo Inspector - Visual & UI Guide

## Color Palette

### Primary Colors
```
█ Indigo        #6366f1    Used for buttons, accents, progress
█ Dark Navy     #0a0e27    Main background
█ Navy Card     #131829    Card background
█ Light Indigo  #e8eaf6    Text color
```

### Secondary Colors
```
█ Blue          #1e40af    Secondary accent
█ Bright Blue   #3b82f6    Accent highlights
█ Dark Gray     #1f2937    Muted elements
█ Muted Gray    #9ca3af    Muted text
```

### Status Colors
```
█ Green         #10b981    Low risk / Safe
█ Orange        #f59e0b    Medium risk / Warning
█ Red           #ef4444    High risk / Danger
█ Cyan          #06b6d4    Anomaly detection
```

## UI Layout

### Desktop Layout (1920px+)
```
┌─────────────────────────────────────────────────────────┐
│                     HEADER                               │
│  Shield Icon │ Smart Cargo Inspector │ New Analysis     │
├────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────────────────┐  ┌─────────────────┐ │
│  │                              │  │ Risk Score      │ │
│  │       DETECTION IMAGE        │  │ 87 HIGH RISK    │ │
│  │                              │  ├─────────────────┤ │
│  │  [Original|Detection|Heat]   │  │ Comparison      │ │
│  │                              │  │ Mismatch 62%    │ │
│  │                              │  ├─────────────────┤ │
│  │                              │  │ Anomaly         │ │
│  │                              │  │ [Heatmap]       │ │
│  │                              │  ├─────────────────┤ │
│  │                              │  │ Objects         │ │
│  │                              │  │ • Gun 0.92      │ │
│  │                              │  │ • Knife 0.87    │ │
│  │                              │  ├─────────────────┤ │
│  │                              │  │ Why Flagged?    │ │
│  │                              │  │ 1. Gun detected │ │
│  └──────────────────────────────┘  ├─────────────────┤ │
│                                      │ Metrics         │ │
│  ┌──────────────────────────────┐  │ P: 91% R: 88%   │ │
│  │ Detected Objects             │  │ mAP: 89%        │ │
│  │ Gun → 🚫 Prohibited          │  └─────────────────┘ │
│  │ Knife → ⚠️ Restricted         │                      │
│  │ Electronics → ✓ Normal        │                      │
│  └──────────────────────────────┘                      │
│                                                           │
└────────────────────────────────────────────────────────┘
```

### Mobile Layout (<640px)
```
┌─────────────────────────────────┐
│       HEADER / New Analysis      │
├─────────────────────────────────┤
│                                  │
│    DETECTION IMAGE (Full Width)  │
│    [Original|Detection|Heat]     │
│                                  │
├─────────────────────────────────┤
│                                  │
│     Risk Score                   │
│     87 HIGH RISK                 │
│     ▓▓▓▓▓▓▓▓▓░ (Progress)        │
│                                  │
├─────────────────────────────────┤
│     Comparison                   │
│     Mismatch 62%                 │
├─────────────────────────────────┤
│     Anomaly Heatmap              │
│     [Image Preview]              │
├─────────────────────────────────┤
│     Detected Objects             │
│     • Gun 0.92                   │
│     • Knife 0.87                 │
├─────────────────────────────────┤
│     Why Flagged?                 │
│     1. Gun detected              │
├─────────────────────────────────┤
│     Metrics                      │
│     Precision: 91%               │
│     Recall: 88%                  │
│     mAP: 89%                     │
│                                  │
└─────────────────────────────────┘
```

## Screen Flows

### Upload Screen
```
┌────────────────────────────────┐
│ Analyze Cargo Images           │
│ Upload X-ray images for...     │
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │ CARGO IMAGE (Required)   │  │
│  │                          │  │
│  │ ⬆️ Drag and drop here    │  │
│  │    or click to browse    │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │ REFERENCE IMAGE (Optional)  │
│  │                          │  │
│  │ ⬆️ Drag and drop here    │  │
│  │    or click to browse    │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                │
│      [🔍 Analyze Cargo]        │
│  Ready for analysis. Press... │
│                                │
└────────────────────────────────┘
```

### Processing Screen
```
┌────────────────────────────────┐
│                                │
│    Analyzing Cargo...          │
│    Running AI Models           │
│                                │
│        🔄 (spinning)           │
│                                │
│  ✓ YOLOv9                      │
│    Object Detection            │
│                                │
│  ⏳ CNN/Autoencoder             │
│    Anomaly Detection ⚪        │
│                                │
│  ⭕ Siamese/SSIM               │
│    Image Comparison            │
│                                │
│  ⭕ Rule-Based ML              │
│    Risk Scoring                │
│                                │
│  ━━━━━━━━━━━━━━━━━ 50%        │
│  Estimated: 5 seconds left    │
│                                │
└────────────────────────────────┘
```

## Component Details

### Risk Score Panel
```
┌─────────────────────────────┐
│ Risk Score          🚨       │
│                             │
│ 87  /100                    │
│                             │
│ HIGH RISK                   │
│                             │
│ ▓▓▓▓▓▓▓▓▓░ (Progress Bar)   │
└─────────────────────────────┘

Color Coding:
🟢 0-44%   = GREEN background
🟡 45-74%  = ORANGE background
🔴 75-100% = RED background
```

### Detection Canvas
```
Original View:
┌─────────────────────┐
│                     │
│    X-Ray Image      │
│  [No annotations]   │
│                     │
└─────────────────────┘

Detection View:
┌─────────────────────┐
│    ┌─────────┐      │
│    │ Gun 0.92│      │
│    ├─────────┤      │
│    │         │      │
│  ┌─────────────────┐│
│  │ Knife 0.87      ││
│  └─────────────────┘│
│                     │
└─────────────────────┘

Heatmap View:
┌─────────────────────┐
│ 🔴🔴🔴🟠🟠🟡🟡🟢 │
│ 🔴🔴🔴🟠🟠🟡🟡🟢 │
│ 🟠🟠🟠🟡🟡🟢🟢🟢 │
│ 🟡🟡🟡🟢🟢🟢🟢🟢 │
│ (Red = High anomaly)  │
│ (Green = Normal)      │
└─────────────────────┘
```

### Detection Badge Styles
```
🚫 Prohibited Items (RED Background)
┌──────────────────────┐
│ Gun        confidence: 92% │
│ 🔴 Prohibited Item   │
└──────────────────────┘

⚠️ Restricted Items (ORANGE Background)
┌──────────────────────┐
│ Knife      confidence: 87% │
│ 🟡 Restricted Item   │
└──────────────────────┘

✓ Normal Items (BLUE Background)
┌──────────────────────┐
│ Electronics          │
│ confidence: 71%      │
│ ✓ Normal Item        │
└──────────────────────┘
```

## Typography

### Headlines
- **Size**: 32px (desktop), 24px (mobile)
- **Weight**: Bold (700)
- **Font**: System sans-serif
- **Color**: #e8eaf6 (Light Indigo)
- **Example**: "Smart Cargo Inspector"

### Titles (Sections)
- **Size**: 18px
- **Weight**: Semibold (600)
- **Color**: #e8eaf6

### Body Text
- **Size**: 14px
- **Weight**: Regular (400)
- **Color**: #e8eaf6
- **Line Height**: 1.5

### Labels
- **Size**: 12px
- **Weight**: Medium (500)
- **Color**: #9ca3af (Muted)

### Small Text
- **Size**: 10px
- **Weight**: Regular (400)
- **Color**: #6b7280 (Very Muted)

## Spacing Scale

```
2px   = xs (minimal spacing)
4px   = 0.5 (extra small)
8px   = 1  (small)
12px  = 1.5 (small-medium)
16px  = 2  (medium)
24px  = 3  (large)
32px  = 4  (extra large)
48px  = 6  (huge)
64px  = 8  (massive)
```

## Border Radius

```
4px   = sm (minimal rounding)
8px   = md (standard)
10px  = lg (large)
12px  = xl (extra large)
16px  = 2xl (cards, panels)
```

## Shadows (Depth)

### Light Shadow (Hover)
```css
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
```

### Medium Shadow (Cards)
```css
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
```

### Deep Shadow (Modals)
```css
box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
```

## Animations

### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Slide In
```css
@keyframes slideIn {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

### Pulse Glow (for active states)
```css
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
  50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.5); }
}
```

### Spin (loading)
```css
animation: spin 1s linear infinite;
```

## Transitions

```
Fast:    100ms (hover states)
Normal:  300ms (fade, slide)
Slow:    500ms (complex changes)
```

## Button Styles

### Primary Button
```
Background: Gradient (Indigo → Blue)
Text: White
Padding: 12px 24px
Border Radius: 8px
Hover: Increase opacity
Active: Slightly darker
```

### Secondary Button
```
Background: Transparent
Border: 1px solid border color
Text: Foreground
Padding: 10px 20px
Hover: Light background
```

### Ghost Button
```
Background: Transparent
Text: Foreground
No border by default
Hover: Light background
```

## Glassmorphism Effect

```css
background: rgba(19, 24, 41, 0.4);
backdrop-filter: blur(10px);
border: 1px solid rgba(99, 102, 241, 0.1);
```

## Dark Mode Background

```
Base: #0a0e27 (Dark Navy)
Pattern: Subtle radial gradients
  - Circle 1: rgba(99, 102, 241, 0.08) at 20% 50%
  - Circle 2: rgba(59, 130, 246, 0.08) at 80% 80%
Effect: Ambient glow from accent colors
```

## Responsive Breakpoints

```
XS: 0px - 640px     (Mobile)
SM: 640px - 768px   (Tablet Small)
MD: 768px - 1024px  (Tablet)
LG: 1024px - 1280px (Desktop)
XL: 1280px - 1536px (Desktop Large)
2XL: 1536px+        (Ultra Wide)
```

## Grid Layout

```
Desktop (LG+):
┌──────────────────────┬──────────┐
│   Image (2/3)        │ Panels   │
│                      │ (1/3)    │
├──────────────────────┼──────────┤
│   Objects List       │          │
└──────────────────────┴──────────┘

Tablet (MD-LG):
┌──────────────────────┐
│   Image (Full)       │
├──────────────────────┤
│   Panels (1 column)  │
├──────────────────────┤
│   Objects List       │
└──────────────────────┘

Mobile (<MD):
┌──────────────────────┐
│   Image (Full)       │
├──────────────────────┤
│   Each Panel (Full)  │
├──────────────────────┤
│   Objects (Full)     │
└──────────────────────┘
```

---

**Use this guide to maintain visual consistency across the application!** 🎨
