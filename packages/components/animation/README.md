# @pelatformui/animation

Animation components for the Pelatform UI Library. A collection of 14 production-ready React animation components built with Motion/React (Framer Motion), featuring text effects, number counters, and interactive backgrounds.

## Installation

```bash
# Using bun
bun add @pelatformui/animation

# Using npm
npm install @pelatformui/animation
```

### Peer Dependencies

Make sure you have these installed:

```bash
bun add @pelatformui/general lucide-react motion
```

### Import Styles

Import the component styles in your app:

```typescript
import "@pelatformui/animation/css";
```

## Components

### Text Animation

#### AvatarGroup

Display grouped avatars with animated tooltips on hover.

```typescript
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupTooltip,
} from "@pelatformui/animation";

<AvatarGroup animation="flip">
  <AvatarGroupItem>
    <AvatarGroupTooltip>John Doe</AvatarGroupTooltip>
    <img src="/avatar.jpg" alt="John" />
  </AvatarGroupItem>
</AvatarGroup>;
```

**Features:** 3 animation styles (default, flip, reveal), parallax tooltips, gradient highlights

#### ShimmeringText

Text with a shimmer/shine animation effect.

```typescript
import { ShimmeringText } from "@pelatformui/animation";

<ShimmeringText text="Hello World" duration={2} repeat={true} />;
```

**Features:** Dynamic spread, in-view trigger, customizable colors

#### TextReveal

Character or word-by-word text reveal with 12 animation variants.

```typescript
import { TextReveal } from "@pelatformui/animation";

<TextReveal variant="slideUp" duration={0.6} staggerDelay={0.03}>
  Reveal this text
</TextReveal>;
```

**Variants:** fade, slideUp, slideDown, slideLeft, slideRight, scale, blur, typewriter, wave, stagger, rotate, elastic

#### TypingText

Typewriter effect for single or cycling texts.

```typescript
import { TypingText } from "@pelatformui/animation";

<TypingText texts={["Hello", "World", "!"]} speed={100} loop={true} />;
```

**Features:** Blinking cursor, multiple text cycling, customizable speed

#### WordRotate

Cycle through words with transition animations.

```typescript
import { WordRotate } from "@pelatformui/animation";

<WordRotate
  words={["Fast", "Modern", "Beautiful"]}
  animationStyle="flip"
  duration={1500}
/>;
```

**Styles:** fade, slide-up, slide-down, scale, flip

### Number Animation

#### CountingNumber

Animate counting from one number to another.

```typescript
import { CountingNumber } from "@pelatformui/animation";

<CountingNumber from={0} to={100} duration={2} startOnView={true} />;
```

#### SlidingNumber

Digit-by-digit sliding effect like a slot machine.

```typescript
import { SlidingNumber } from "@pelatformui/animation";

<SlidingNumber from={0} to={12345} duration={2} />;
```

#### GithubButton

Animated button with GitHub star counter.

```typescript
import { GithubButton } from "@pelatformui/animation";

<GithubButton
  targetStars={1000}
  repoUrl="https://github.com/user/repo"
  roundStars={true}
/>;
```

**Features:** Animated star icon fill, number formatting (k/M/B/T), size variants

### Background Effects

#### GradientBackground

Animated gradient background with shifting colors.

```typescript
import { GradientBackground } from "@pelatformui/animation";

<GradientBackground>
  <YourContent />
</GradientBackground>;
```

#### GridBackground

Animated grid pattern with moving light beams.

```typescript
import { GridBackground } from "@pelatformui/animation";

<GridBackground
  gridSize="8:8"
  beams={{ count: 5, colors: ["#3b82f6"], speed: 10 }}
>
  <YourContent />
</GridBackground>;
```

**Features:** Customizable grid size, beam colors and speeds, border styles

#### HoverBackground

Interactive background with parallax floating objects.

```typescript
import { HoverBackground } from "@pelatformui/animation";

<HoverBackground objectCount={12}>
  <YourContent />
</HoverBackground>;
```

**Features:** Parallax on mouse move, breathing animations, hover particles

### Media Effects

#### SvgText

Display SVG content masked within text shapes.

```typescript
import { SvgText } from "@pelatformui/animation";

<SvgText svg={<YourSVG />}>MASKED TEXT</SvgText>;
```

#### VideoText

Display video masked within text shapes using canvas.

```typescript
import { VideoText } from "@pelatformui/animation";

<VideoText src="/video.mp4" autoPlay loop muted>
  VIDEO TEXT
</VideoText>;
```

### Utility Components

#### Marquee

Horizontal or vertical scrolling marquee effect.

```typescript
import { Marquee } from "@pelatformui/animation";

<Marquee pauseOnHover reverse={false}>
  <YourContent />
</Marquee>;
```

**Features:** Reverse direction, pause on hover, vertical mode, ARIA support

## Component Categories

### By Animation Type

- **Text Effects**: ShimmeringText, TextReveal, TypingText, WordRotate
- **Number Counters**: CountingNumber, SlidingNumber, GithubButton
- **Backgrounds**: GradientBackground, GridBackground, HoverBackground
- **Media Masking**: SvgText, VideoText
- **UI Elements**: AvatarGroup, Marquee

### By Complexity

- **Simple**: Marquee, GradientBackground, ShimmeringText
- **Moderate**: CountingNumber, SlidingNumber, WordRotate, TextReveal
- **Advanced**: HoverBackground, GridBackground, VideoText, GithubButton

## Features

- Built with Motion/React (Framer Motion) for smooth animations
- In-view triggers for performance optimization
- Spring physics for natural motion
- SSR-safe implementations
- Full TypeScript support
- Customizable styling with Tailwind CSS
- Accessibility support (ARIA labels, keyboard navigation)
- GPU-accelerated animations

## Dependencies

- `motion` (>=12.0.0) - Animation library
- `lucide-react` (>=0.5.0) - Icons
- `@pelatformui/general` (>=0.1.0) - Styling utilities

## License

MIT
