# Construction Tech Theme - Quick Reference Guide

## 🎨 Color Codes (Copy-Paste Ready)

### Backgrounds
```css
Deep Black:    #0F1419   hsl(220 15% 8%)
Card Dark:     #181C20   hsl(220 13% 11%)
Muted UI:      #222629   hsl(217 10% 15%)
```

### Text
```css
White Text:    #FAFAFA   hsl(0 0% 98%)
Gray Text:     #9CA3AF   hsl(217 10% 65%)
```

### Accents
```css
Tech Blue:     #0D7FBF   hsl(199 89% 48%)
Blueprint:     #0088DD   hsl(204 100% 45%)
Construction:  #F97316   hsl(27 96% 61%)
Steel Gray:    #363B3F   hsl(210 10% 23%)
```

---

## 🔧 Common CSS Classes

### Backgrounds with Patterns
```html
<!-- Blueprint grid background -->
<div className="blueprint-grid">
  <!-- Your content -->
</div>

<!-- Dense blueprint grid -->
<div className="blueprint-grid-dense">
  <!-- Your content -->
</div>

<!-- Construction gradient -->
<div className="construction-gradient">
  <!-- Your content -->
</div>

<!-- Data visualization gradient (top fade) -->
<div className="data-viz-gradient">
  <!-- Your content -->
</div>
```

---

### Glass Effects
```html
<!-- Standard construction glass -->
<div className="construction-glass p-6 rounded-2xl">
  <!-- Search bars, filter panels -->
</div>

<!-- Strong construction glass -->
<div className="construction-glass-strong p-8 rounded-2xl">
  <!-- Navigation, important panels -->
</div>
```

---

### Typography
```html
<!-- Tech heading (hero titles) -->
<h1 className="tech-heading high-contrast text-5xl">
  Build the Future
</h1>

<!-- Monospace technical text -->
<span className="tech-mono">
  v2.1.0
</span>

<!-- High contrast for complex backgrounds -->
<p className="high-contrast text-lg">
  Important text
</p>
```

---

### Shadows
```html
<!-- Standard tech shadow -->
<div className="tech-shadow rounded-xl p-4">
  Card content
</div>

<!-- Large tech shadow (floating cards) -->
<div className="tech-shadow-lg rounded-2xl p-6">
  Important card
</div>
```

---

### Badges
```html
<!-- Technology badge (blue) -->
<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full construction-glass">
  <Icon className="h-4 w-4 text-primary" />
  <span className="text-sm font-medium text-primary">
    BIM Technology
  </span>
</span>

<!-- Construction accent badge (orange) -->
<span className="inline-flex px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold border border-accent/20">
  Featured
</span>

<!-- Blueprint accent badge -->
<span className="px-2 py-1 tech-mono text-xs rounded bg-blueprint/10 text-blueprint border border-blueprint/20">
  NEW
</span>
```

---

### Buttons

```html
<!-- Primary CTA (Electric Blue) -->
<button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/25 transition-smooth">
  Get Started
</button>

<!-- Secondary CTA (Construction Orange) -->
<button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl font-medium transition-smooth">
  Learn More
</button>

<!-- Ghost/Muted Button -->
<button className="bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-xl font-medium transition-smooth">
  View Details
</button>

<!-- Outline Button -->
<button className="border-2 border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-xl font-medium transition-smooth">
  Explore
</button>
```

---

## 📄 Page Layout Templates

### Standard Page with Blueprint Grid
```jsx
export default function MyPage() {
  return (
    <div className="min-h-screen py-8 blueprint-grid relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 data-viz-gradient pointer-events-none" />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with badge */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full construction-glass mb-4">
            <Icon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Section Label
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4 tech-heading high-contrast">
            Page Title
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Page description
          </p>
        </div>
        
        {/* Your content here */}
      </div>
    </div>
  );
}
```

---

### Card with Construction Glass
```jsx
<div className="construction-glass rounded-2xl p-6 hover:tech-shadow-lg transition-all duration-300">
  <h3 className="text-xl font-semibold text-foreground mb-2">
    Card Title
  </h3>
  <p className="text-muted-foreground mb-4">
    Card description
  </p>
  <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg">
    Action
  </button>
</div>
```

---

### Hero Section with Blueprint
```jsx
<section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
  {/* Blueprint background */}
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 blueprint-grid" />
    
    {/* Gradient overlays */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
  </div>
  
  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full construction-glass mb-6">
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      <span className="text-sm font-medium text-primary">
        Platform Badge
      </span>
    </div>
    
    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tech-heading">
      Hero Title
      <span className="block text-transparent bg-clip-text tech-gradient-blue">
        With Gradient
      </span>
    </h1>
    
    <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
      Hero description
    </p>
  </div>
</section>
```

---

## 🎯 Common Component Patterns

### Search Bar (Construction Glass)
```jsx
<div className="construction-glass-strong rounded-2xl p-6">
  <div className="relative">
    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
    <input
      type="text"
      placeholder="Search..."
      className="w-full pl-12 pr-4 py-3 bg-muted rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground placeholder:text-muted-foreground"
    />
  </div>
</div>
```

---

### Filter Panel
```jsx
<div className="construction-glass rounded-2xl p-6 space-y-4">
  <div>
    <label className="block text-sm font-medium text-foreground mb-2">
      Filter Label
    </label>
    <select className="w-full px-4 py-2 bg-muted rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground">
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
  </div>
  
  <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition-smooth">
    Apply Filters
  </button>
</div>
```

---

### Stat Card (with animation)
```jsx
<div className="construction-glass rounded-xl p-6 text-center group hover:tech-shadow-lg transition-all">
  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 mb-4 group-hover:scale-110 transition-transform">
    <Icon className="h-7 w-7 text-primary" />
  </div>
  <div className="text-4xl font-bold text-white mb-2">
    250+
  </div>
  <div className="text-sm text-muted-foreground">
    Stat Label
  </div>
</div>
```

---

### Job/Profile Card
```jsx
<div className="construction-glass rounded-2xl p-6 hover:tech-shadow-lg transition-all duration-300 group">
  <div className="flex items-start gap-4 mb-4">
    <img 
      src="..." 
      alt="..." 
      className="w-16 h-16 rounded-xl object-cover"
    />
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        Title
      </h3>
      <p className="text-sm text-muted-foreground">
        Subtitle
      </p>
    </div>
  </div>
  
  <p className="text-sm text-muted-foreground mb-4">
    Description...
  </p>
  
  <div className="flex items-center flex-wrap gap-2 mb-4">
    <span className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20">
      Tag 1
    </span>
    <span className="px-2 py-1 text-xs rounded-md bg-accent/10 text-accent border border-accent/20">
      Tag 2
    </span>
  </div>
  
  <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition-smooth">
    View Details
  </button>
</div>
```

---

## 🌟 Gradient Text Effect

```jsx
<h2 className="text-4xl font-bold mb-4">
  Regular Text
  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-glow to-accent">
    Gradient Text
  </span>
</h2>
```

---

## ⚡ Animation Classes

```html
<!-- Fade in on load -->
<div className="animate-fade-in">
  Content
</div>

<!-- Blueprint pulse (for icons) -->
<Icon className="h-6 w-6 text-primary blueprint-pulse" />

<!-- Smooth transition on all properties -->
<div className="transition-smooth hover:scale-105">
  Hover me
</div>
```

---

## 📱 Responsive Utilities

```html
<!-- Show on mobile only -->
<div className="block md:hidden">
  Mobile content
</div>

<!-- Show on desktop only -->
<div className="hidden lg:block">
  Desktop content
</div>

<!-- Responsive grid -->
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <!-- Cards -->
</div>

<!-- Responsive text size -->
<h1 className="text-3xl sm:text-4xl lg:text-5xl">
  Responsive Heading
</h1>
```

---

## 🎨 Color Opacity Utilities

```html
<!-- Background with opacity -->
<div className="bg-primary/10">10% opacity</div>
<div className="bg-primary/20">20% opacity</div>
<div className="bg-primary/50">50% opacity</div>

<!-- Border with opacity -->
<div className="border border-primary/30">
  Subtle border
</div>

<!-- Text with opacity -->
<span className="text-foreground/70">
  Slightly transparent text
</span>
```

---

## 🔍 Focus States (Accessibility)

```html
<!-- Keyboard navigation focus -->
<button className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
  Accessible Button
</button>

<!-- Link focus -->
<a href="#" className="focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
  Accessible Link
</a>
```

---

## 📊 Common Color Combinations

### Tech Card
```
Background: construction-glass
Text: text-foreground
Accent: text-primary
Border: border-primary/20
```

### Warning/Alert
```
Background: bg-accent/10
Text: text-accent
Border: border-accent/30
```

### Success Card
```
Background: bg-success/10
Text: text-success
Border: border-success/30
```

### Muted Card
```
Background: bg-muted
Text: text-muted-foreground
Border: border-border
```

---

## 🚀 Pro Tips

1. **Always use `blueprint-grid` for page backgrounds** - creates consistent tech feel
2. **Pair `construction-glass` with `tech-shadow`** for floating card effect
3. **Use `high-contrast` class for hero text** - ensures readability
4. **Combine animations with `transition-smooth`** - professional feel
5. **Add `hover:tech-shadow-lg`** to interactive cards - depth on hover
6. **Use `tech-mono` for technical specs** - reinforces tech theme
7. **Always include `relative z-10`** when using gradient overlays

---

## ⚠️ Common Mistakes to Avoid

❌ **Don't:** Use light backgrounds on inner pages
✅ **Do:** Keep dark theme consistent across all pages

❌ **Don't:** Overuse blueprint grid (too busy)
✅ **Do:** Use subtle opacity (0.05-0.08)

❌ **Don't:** Forget backdrop-filter fallbacks
✅ **Do:** Test on Safari and older browsers

❌ **Don't:** Use pure black (#000000)
✅ **Do:** Use deep charcoal (#0F1419)

❌ **Don't:** Ignore contrast ratios
✅ **Do:** Test with accessibility tools

---

**Quick Reference Version:** 2.0
**Last Updated:** December 2024
