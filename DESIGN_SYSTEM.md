# Merit Advisory - Design System & Color Reference

## 🎨 Color Palette

### Differentiator Colors

Each differentiator has a unique color to make it visually distinct:

```
🔷 Blue (#3B82F6)
   - End-to-End ERP Solutions
   - Proven Track Record
   
🟣 Purple (#A855F7)
   - Audit & Assurance Excellence
   
🟠 Orange (#F97316)
   - Tax Optimization Strategies
   
🟢 Green (#22C55E)
   - Corporate Training Hub
   
🔴 Pink (#EC4899)
   - Seasoned Consultants
   
🟡 Yellow (#EAB308)
   - Fast Implementation
   
💚 Emerald (#10B981)
   - Affordable Pricing
   
🔴 Red (#EF4444)
   - Compliance Guaranteed
   
🔵 Indigo (#6366F1)
   - Odoo Gold Partner
   
🔷 Cyan (#06B6D4)
   - (Reserved for future use)
```

## 📐 Layout Specifications

### Service Detail Pages

#### Hero Section
- **Height**: Auto (content-based)
- **Padding**: py-20 md:py-32 (80px-128px)
- **Background**: Gradient from primary/5 via accent/5 to background
- **Grid**: 2 columns on desktop (text + visualization)

#### Stats Bar
- **Layout**: 3 equal columns
- **Padding**: py-12 (48px)
- **Background**: Card color
- **Border**: Top and bottom borders

#### Benefits Grid
- **Columns**: 1 (mobile) → 2 (tablet) → 3 (desktop)
- **Gap**: 24px (gap-6)
- **Card Padding**: 24px (p-6)
- **Hover Effect**: -translate-y-1 (4px lift)

#### Approach Timeline
- **Layout**: Vertical timeline
- **Step Numbers**: 48px circles with gradient
- **Connecting Line**: 2px vertical line
- **Card Padding**: 24px (p-6)

### Differentiators Section

#### Grid Layout
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 5 columns (2 rows)
- **Gap**: 24px (gap-6)

#### Central Logo
- **Size**: 128px × 128px (h-32 w-32)
- **Shape**: Rounded square (rounded-2xl)
- **Background**: Gradient from primary to accent
- **Animation**: Pulsing rings + rotation on hover

#### Differentiator Cards
- **Height**: Auto (content-based)
- **Padding**: 24px (p-6)
- **Icon Size**: 48px × 48px (h-12 w-12)
- **Top Accent**: 4px colored line
- **Hover Effect**: -translate-y-2 (8px lift)

## 🎭 Animation Specifications

### Scroll Animations

```javascript
// Fade in + Slide up
{
  initial: { opacity: 0, translateY: 32px }
  animate: { opacity: 1, translateY: 0 }
  duration: 600ms
  easing: ease-in-out
}

// Staggered delays
delay = baseDelay + (index * 80ms)
```

### Hover Animations

```javascript
// Card lift
{
  transform: translateY(-8px)
  shadow: xl
  duration: 300ms
}

// Icon scale
{
  transform: scale(1.1)
  duration: 300ms
}

// Glow effect
{
  opacity: 0 → 100
  blur: 3xl
  duration: 500ms
}
```

### Orbiting Icons (Service Pages)

```javascript
// Floating animation
@keyframes float {
  0%, 100% { translateY: 0px }
  50% { translateY: -10px }
}

// Duration: 3-6 seconds (varies per icon)
// Delay: 0-1.2 seconds (staggered)
```

### Pulsing Rings (Differentiators)

```javascript
@keyframes ping-slow {
  75%, 100% {
    transform: scale(1.5)
    opacity: 0
  }
}

// Duration: 3 seconds
// Iteration: infinite
```

## 📱 Responsive Breakpoints

```css
/* Mobile First */
default: 0-639px (1 column)

/* Tablet */
sm: 640px+ (2 columns)
md: 768px+ (2-3 columns)

/* Desktop */
lg: 1024px+ (3-5 columns)
xl: 1280px+ (max-width container)
```

## 🔤 Typography

### Headings

```css
/* Main Page Title (H1) */
font-size: 2.25rem (36px) → 4rem (64px)
font-weight: 700 (bold)
line-height: tight (1.25)
letter-spacing: tight (-0.025em)

/* Section Title (H2) */
font-size: 1.875rem (30px) → 2.25rem (36px)
font-weight: 700 (bold)
line-height: tight (1.25)

/* Card Title (H3) */
font-size: 1.25rem (20px)
font-weight: 600 (semibold)
line-height: normal (1.5)

/* Body Text */
font-size: 1rem (16px)
line-height: relaxed (1.625)
```

### Text Colors

```css
/* Primary Text */
color: foreground (theme-aware)

/* Secondary Text */
color: muted-foreground (theme-aware)

/* Accent Text */
color: accent or primary (theme-aware)
```

## 🎯 Spacing System

### Container Padding
```css
padding-x: 24px (px-6)
padding-y: 80px → 128px (py-20 md:py-32)
```

### Element Spacing
```css
/* Tight */
gap: 8px (gap-2)

/* Normal */
gap: 16px (gap-4)

/* Comfortable */
gap: 24px (gap-6)

/* Spacious */
gap: 32px (gap-8)
```

### Margin System
```css
/* Small */
margin-top: 16px (mt-4)

/* Medium */
margin-top: 24px (mt-6)

/* Large */
margin-top: 32px (mt-8)

/* Extra Large */
margin-top: 64px (mt-16)
```

## 🎨 Shadow System

```css
/* Small */
shadow-sm: 0 1px 2px rgba(0,0,0,0.05)

/* Medium */
shadow-md: 0 4px 6px rgba(0,0,0,0.1)

/* Large */
shadow-lg: 0 10px 15px rgba(0,0,0,0.1)

/* Extra Large */
shadow-xl: 0 20px 25px rgba(0,0,0,0.1)

/* 2XL */
shadow-2xl: 0 25px 50px rgba(0,0,0,0.25)
```

## 🔘 Border Radius

```css
/* Small */
rounded-lg: 8px

/* Medium */
rounded-xl: 12px

/* Large */
rounded-2xl: 16px

/* Extra Large */
rounded-3xl: 24px

/* Full */
rounded-full: 9999px (perfect circle)
```

## 🎨 Gradient Patterns

### Primary Gradient
```css
background: linear-gradient(
  to bottom right,
  primary,
  accent
)
```

### Hero Background
```css
background: linear-gradient(
  to bottom right,
  primary/5,
  accent/5,
  background
)
```

### Card Glow
```css
background: accent/10 → accent/20 (on hover)
filter: blur(3xl)
```

## 📊 Icon Sizes

```css
/* Small */
h-4 w-4: 16px × 16px

/* Medium */
h-5 w-5: 20px × 20px
h-6 w-6: 24px × 24px

/* Large */
h-7 w-7: 28px × 28px
h-8 w-8: 32px × 32px

/* Extra Large */
h-12 w-12: 48px × 48px
h-14 w-14: 56px × 56px
h-16 w-16: 64px × 64px
```

## 🎯 Button Styles

### Primary Button
```css
background: primary
color: primary-foreground
padding: 12px 24px (px-6 py-3)
border-radius: 8px (rounded-lg)
font-weight: 600 (semibold)
hover: primary/90
```

### Secondary Button
```css
background: background
border: 1px solid border
color: foreground
padding: 12px 24px (px-6 py-3)
border-radius: 8px (rounded-lg)
font-weight: 600 (semibold)
hover: accent/10
```

### Outline Button
```css
background: transparent
border: 1px solid border
color: foreground
padding: 12px 24px (px-6 py-3)
border-radius: 8px (rounded-lg)
font-weight: 600 (semibold)
hover: background
```

## 🎨 Badge Styles

```css
/* Default */
background: secondary
color: secondary-foreground
padding: 4px 12px (px-3 py-1)
border-radius: 9999px (rounded-full)
font-size: 12px (text-xs)
font-weight: 500 (medium)

/* Outline */
background: transparent
border: 1px solid border
color: foreground
padding: 12px 24px (px-6 py-3)
border-radius: 9999px (rounded-full)
```

## 📐 Card Styles

### Default Card
```css
background: card
border: 1px solid border
border-radius: 12px (rounded-xl)
padding: 24px (p-6)
shadow: none → xl (on hover)
```

### Accent Card
```css
background: card
border-top: 4px solid accent/primary
border-radius: 12px (rounded-xl)
padding: 24px (p-6)
```

## 🎯 Z-Index Layers

```css
/* Background patterns */
z-index: -10

/* Base content */
z-index: 0

/* Elevated cards */
z-index: 10

/* Overlays */
z-index: 40

/* Modals */
z-index: 50
```

---

## 🎨 Quick Reference: Differentiator Colors

Copy-paste ready CSS classes:

```tsx
// Blue
className="text-blue-500 bg-blue-500/10"

// Purple
className="text-purple-500 bg-purple-500/10"

// Orange
className="text-orange-500 bg-orange-500/10"

// Green
className="text-green-500 bg-green-500/10"

// Pink
className="text-pink-500 bg-pink-500/10"

// Yellow
className="text-yellow-500 bg-yellow-500/10"

// Emerald
className="text-emerald-500 bg-emerald-500/10"

// Red
className="text-red-500 bg-red-500/10"

// Indigo
className="text-indigo-500 bg-indigo-500/10"

// Cyan
className="text-cyan-500 bg-cyan-500/10"
```

---

This design system ensures consistency across all components and makes it easy to extend or modify the design in the future!
