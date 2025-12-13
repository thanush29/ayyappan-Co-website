# Planning Guide

A professional corporate website showcasing electrical infrastructure construction excellence, specializing in EHV substations and transmission line works with modern digital presentation that inspires trust and demonstrates technical leadership in the power utility sector.

**Experience Qualities**:

1. **Professional** - Enterprise-grade presentation that conveys technical expertise and industry authority through refined typography and purposeful layouts
2. **Trustworthy** - Established credibility through clear information hierarchy, substantial visual weight, and transparent communication of capabilities
3. **Progressive** - Modern interface that balances traditional industrial strength with forward-thinking innovation and digital sophistication

**Complexity Level**: Content Showcase (information-focused)
This is primarily an informational corporate site presenting company capabilities, products, and services with some interactive elements for engagement, but without complex application features or user accounts.

## Essential Features

### Hero Section with Company Overview

- **Functionality**: Immersive introduction showcasing company mission and core capabilities
- **Purpose**: Immediately establish credibility and communicate value proposition to visitors
- **Trigger**: Page load
- **Progression**: Animated entrance → Company tagline display → Key metrics counter animation → CTA buttons visible
- **Success criteria**: Clear understanding of company purpose within 3 seconds, visible call-to-action

### Product & Services Showcase

- **Functionality**: Grid-based display of manufacturing products and engineering services with detailed descriptions
- **Purpose**: Demonstrate breadth of capabilities and technical expertise across steel products and engineering solutions
- **Trigger**: User scrolls to products section or clicks navigation
- **Progression**: Section enters viewport → Cards animate in → Hover reveals additional details → Click navigates to detail view
- **Success criteria**: All product categories clearly visible, easy to browse, details accessible

### Image Gallery Showcase

- **Functionality**: Visual gallery displaying manufacturing facilities and completed projects with categorized tabs and modal detail views
- **Purpose**: Build credibility through visual evidence of infrastructure capabilities and successful project delivery
- **Trigger**: User scrolls to gallery section or clicks navigation
- **Progression**: Gallery section enters viewport → Tab selection (facilities/projects) → Card grid animates in → Click opens detailed modal view → View details → Close modal
- **Success criteria**: High-quality visual representation, smooth transitions, detailed information accessible, categories clearly organized

### About Us / Company Information

- **Functionality**: Detailed company history, leadership, values, and infrastructure information
- **Purpose**: Build trust and credibility through transparency about operations and expertise
- **Trigger**: Navigation click or scroll
- **Progression**: Navigation selection → Content section loads → Timeline/stats animate in → Content readable
- **Success criteria**: Comprehensive company information presented in scannable format

### Contact Information & Inquiry Form

- **Functionality**: Multiple contact methods with inquiry form for business communication
- **Purpose**: Facilitate business connections and customer inquiries
- **Trigger**: User clicks contact section or CTA button
- **Progression**: Contact section opens → User views contact details → Form input → Validation → Success confirmation
- **Success criteria**: Contact details immediately visible, form validates properly, confirmation provided

### Responsive Navigation System

- **Functionality**: Persistent navigation header with smooth section scrolling and mobile menu
- **Purpose**: Enable easy exploration of all content areas across device sizes
- **Trigger**: Page load (header visible) or hamburger menu click (mobile)
- **Progression**: Navigation click → Smooth scroll to section → Section highlights → Active state updates
- **Success criteria**: All sections accessible within 2 clicks, smooth transitions, clear active states

## Edge Case Handling

- **Empty Form Submission**: Display inline validation messages for required fields with constructive guidance
- **Long Company Names/Titles**: Implement text truncation with ellipsis and tooltip on hover for full text
- **Slow Network**: Progressive image loading with skeleton states, priority to above-fold content
- **Small Screens**: Collapsible sections, stacked layouts, touch-friendly targets (minimum 44px)
- **Missing Content**: Graceful fallbacks with placeholder states that maintain layout integrity

## Design Direction

The design should evoke industrial strength combined with modern sophistication—serious and professional yet approachable, with clean lines reminiscent of precision engineering. A minimal interface serves the content best, avoiding decorative clutter while using strategic whitespace and subtle motion to guide attention and convey quality.

## Color Selection

Triadic color scheme balancing industrial steel blues, earthy reliability, and energetic accents to communicate both traditional manufacturing heritage and forward-thinking innovation.

- **Primary Color**: Deep Industrial Blue (oklch(0.38 0.12 250)) - Communicates trust, professionalism, and technical expertise as the foundational brand color with enhanced saturation for better visual impact
- **Secondary Colors**:
  - Warm Steel Gray (oklch(0.48 0.02 260)) - Supporting neutral that adds sophistication without coldness
  - Terracotta Accent (oklch(0.58 0.15 35)) - Warmth representing fire, forge, and human elements of manufacturing
- **Accent Color**: Vibrant Orange (oklch(0.70 0.20 45)) - High-energy highlight for CTAs and important interactive elements, suggesting innovation and energy
- **Background Enhancement**: Subtle color tints applied to background (oklch(0.985 0.002 260)) for warmth and depth, moving away from pure white
- **Foreground/Background Pairings**:
  - Background (Soft Warm White oklch(0.985 0.002 260)): Deep charcoal text (oklch(0.25 0.015 260)) - Ratio 12.2:1 ✓
  - Card (Very Light Warm oklch(0.99 0.001 260)): Deep charcoal text (oklch(0.25 0.015 260)) - Ratio 11.8:1 ✓
  - Primary (Deep Industrial Blue oklch(0.38 0.12 250)): White text (oklch(0.99 0 0)) - Ratio 8.5:1 ✓
  - Secondary (Warm Steel Gray oklch(0.48 0.02 260)): White text (oklch(0.99 0 0)) - Ratio 5.3:1 ✓
  - Accent (Vibrant Orange oklch(0.70 0.20 45)): Deep charcoal text (oklch(0.25 0.015 260)) - Ratio 6.8:1 ✓
  - Muted (Soft Gray oklch(0.94 0.005 260)): Medium gray text (oklch(0.52 0.015 260)) - Ratio 5.1:1 ✓

## Font Selection

Typography should convey engineering precision and corporate professionalism with excellent readability across long-form content, using a contemporary sans-serif family that balances geometric clarity with humanist warmth.

**Primary Font**: Inter - Modern, highly legible sans-serif with excellent screen optimization and professional character suitable for both headlines and body content

- **Typographic Hierarchy**:
  - H1 (Hero Title): Inter Bold/48px/tight letter-spacing (-0.02em)/line-height 1.1
  - H2 (Section Headers): Inter SemiBold/36px/tight letter-spacing (-0.01em)/line-height 1.2
  - H3 (Subsection Headers): Inter SemiBold/24px/normal letter-spacing/line-height 1.3
  - H4 (Card Titles): Inter Medium/20px/normal letter-spacing/line-height 1.4
  - Body (Content): Inter Regular/16px/normal letter-spacing/line-height 1.6
  - Small (Captions): Inter Regular/14px/normal letter-spacing/line-height 1.5
  - Button Text: Inter Medium/16px/slight letter-spacing (0.01em)

## Animations

Animations should be purposeful and restrained, reflecting industrial precision—subtle entrance animations that reveal content systematically, smooth scrolling that feels engineered rather than rushed, and micro-interactions that provide tactile feedback without frivolity. **Enhanced with comprehensive GSAP animations throughout all sections for professional polish.**

**Animation Library**: GSAP (GreenSock Animation Platform) with ScrollTrigger plugin for professional, performance-optimized animations with precise control and smooth easing.

- **Purposeful Meaning**: Motion communicates quality and attention to detail through smooth, physics-based transitions that feel engineered and intentional, never arbitrary or playful
- **Hierarchy of Movement**:
  - Primary: Hero elements fade-up with stagger on load using GSAP timeline, section headers slide in as they enter viewport with ScrollTrigger
  - Secondary: Product cards stagger-animate with GSAP delays (0.1s increments), smooth entrance animations triggered by scroll position
  - Tertiary: Hover states on buttons (lift/shadow increase), ScrollTrigger-based animations for sections, automated carousels for testimonials and certifications
- **Implementation Details**:
  - Hero Section: Multi-layered entrance with badge sliding from left (0.6s), content fading up (0.8s), stats appearing (0.8s delay), features scaling with back easing
  - All Sections: Title animations triggered at 80% viewport entry with fade-up and y-translation
  - Product/Service Cards: Individual card animations with staggered delays based on index (index \* 0.1s) for cascading effect
  - Gallery Items: Stagger animation with 0.05s delays for smooth sequential appearance
  - Testimonials: Auto-rotating carousel (7s interval) with smooth transitions between slides
  - Certifications: Auto-rotating showcase (5s interval) with scale and fade animations
  - Contact Form: Split animation - form slides from left, contact cards stagger from right
  - Quality Cards: Staggered grid animation (0.1s) for cohesive group entrance
  - CTA Sections: Scale animations with back.out easing for attention-grabbing polish
  - GSAP `gsap.from()` for entrance animations with power2/power3 easing
  - ScrollTrigger for viewport-based animations with `start: 'top 80%'` triggers
  - Context cleanup with `gsap.context()` for proper React component lifecycle management
  - Stagger effects for grid items to create cascading entrance animations (0.05s - 0.15s delays)
  - Hover transforms on cards: -translate-y-1 with shadow transitions

## Component Selection

- **Components**:

  - **Card** - Primary container for product showcases, service offerings, and feature highlights with hover effects
  - **Button** - Primary and secondary variants for CTAs, modified with Tailwind for shadow-lg on primary, outline styling on secondary
  - **Separator** - Visual dividers between major sections
  - **Tabs** - Product category navigation and service area switching
  - **Accordion** - FAQ section and expandable company history timeline
  - **Badge** - Category tags and status indicators for certifications/capabilities
  - **Form** + **Input** + **Textarea** + **Label** - Contact inquiry form with validation states
  - **ScrollArea** - For any content overflow scenarios
  - **Avatar** - Leadership team display if needed

- **Customizations**:

  - **StatsCounter** - Custom animated component for numerical metrics (years in business, capacity, clients)
  - **ProductGrid** - Custom responsive grid with category filtering
  - **SectionHeader** - Reusable component for consistent section introductions with subtitle support
  - **FeatureCard** - Enhanced card with icon, title, description, and optional CTA

- **States**:

  - Buttons: Default (solid primary), Hover (slight lift + shadow increase), Active (press down), Focus (ring-2 ring-accent)
  - Input fields: Default (border-input), Focus (border-primary ring-2 ring-primary/20), Error (border-destructive), Success (border-green-500)
  - Cards: Default (shadow-sm), Hover (shadow-md translate-y-[-2px] transition), Active (no special state)
  - Navigation links: Default (text-foreground), Hover (text-primary), Active section (text-primary font-semibold border-b-2)

- **Icon Selection**:

  - Factory/Building - Manufacturing facilities
  - Gear/Engine - Engineering services
  - Certificate - Quality certifications
  - ChartLine - Growth/statistics
  - Users - Team/leadership
  - MapPin - Location information
  - Phone/Envelope - Contact methods
  - CheckCircle - Features/benefits verification
  - ArrowRight - CTAs and navigation
  - List - Product specifications

- **Spacing**:

  - Section padding: py-20 lg:py-28 (80px/112px vertical)
  - Container max-width: max-w-[1440px] (1280px)
  - Card padding: p-6 lg:p-8
  - Grid gaps: gap-6 lg:gap-8
  - Content spacing: space-y-4 for related content, space-y-8 for distinct sections
  - Button padding: px-6 py-3

- **Mobile**:
  - Navigation: Hamburger menu with slide-in drawer on mobile, full horizontal nav on desktop
  - Grid layouts: Single column on mobile (grid-cols-1), 2-column on tablet (md:grid-cols-2), 3-4 column on desktop (lg:grid-cols-3 xl:grid-cols-4)
  - Typography: Reduced sizes on mobile (Hero 36px mobile vs 48px desktop)
  - Hero: Simplified layout with stacked elements, reduced height
  - Spacing: Reduced padding (py-12 mobile vs py-20 desktop)
  - Touch targets: Minimum 44px height for all interactive elements
  - Images: Full-width on mobile with aspect ratio preservation
