# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0](https://github.com/devpelatform/ui/compare/animation-v0.1.0...animation-v0.2.0) (2025-11-26)


### 🚀 Features

* **ci:** setup release-please for automated releases ([8a5331f](https://github.com/devpelatform/ui/commit/8a5331f904ccd61bf7f8100c88afdc84f9a2e257))


### 🐛 Bug Fixes

* **components:** fix build script order for CSS export ([21cc7c4](https://github.com/devpelatform/ui/commit/21cc7c41b79614f2360516f0bf594e7d4c9eb181))


### 📚 Documentation

* add comprehensive documentation for all packages ([dd08601](https://github.com/devpelatform/ui/commit/dd086011ca0bfabb268ca2e6e897fbb45b6f57d0))
* update README files with consistent formatting and syntax ([7273fce](https://github.com/devpelatform/ui/commit/7273fceb62e9764a97130f9d494e7883578efc73))


### 💎 Styles

* standardize quote usage in import statements across docs ([7273fce](https://github.com/devpelatform/ui/commit/7273fceb62e9764a97130f9d494e7883578efc73))


### 👷 Continuous Integration

* remove createGithubReleases flag from release workflow ([7273fce](https://github.com/devpelatform/ui/commit/7273fceb62e9764a97130f9d494e7883578efc73))

## [0.1.0] - 2025-11-26

### Added

#### Text Animation Components

- **AvatarGroup**: Grouped avatars with animated tooltips

  - 3 animation styles: default (spring scale), flip (3D rotation), reveal (fade with stagger)
  - Parallax tooltip positioning based on mouse movement
  - Gradient highlights with emerald and sky colors
  - Context-based configuration sharing

- **ShimmeringText**: Text with shimmer/shine animation effect

  - Smooth shimmer gradient sweep across text
  - Dynamic spread calculation based on text length
  - In-view trigger support
  - Customizable colors and shimmer duration

- **TextReveal**: Character/word-by-word reveal with 12 animation variants

  - Variants: fade, slideUp, slideDown, slideLeft, slideRight, scale, blur, typewriter, wave, stagger, rotate, elastic
  - Staggered animations with configurable delays
  - Character-level or word-level splitting
  - GPU-accelerated with transform3d

- **TypingText**: Typewriter effect for single or cycling texts

  - Character-by-character typing animation
  - Animated blinking cursor
  - Multiple text cycling support
  - Loop and pause duration controls

- **WordRotate**: Cycle through words with transition animations
  - 5 animation styles: fade, slide-up, slide-down, scale, flip
  - Spring-based animations for smooth transitions
  - Configurable duration and pause times
  - Perspective effect for flip animation

#### Number Animation Components

- **CountingNumber**: Animate counting from one number to another

  - Smooth numerical animation with customizable duration
  - Viewport entry trigger
  - Custom formatting function support
  - Completion callback

- **SlidingNumber**: Digit-by-digit sliding effect (slot machine style)

  - Individual digit animations
  - EaseOutCubic easing for natural feel
  - Handles negative numbers
  - Configurable digit height

- **GithubButton**: Animated GitHub star counter button
  - Animated star counter with easeOutQuart easing
  - Animated star icon fill effect (clips from bottom to top)
  - Multiple size and variant styles via CVA
  - Number formatting with k/M/B/T units
  - GitHub navigation integration

#### Background Effect Components

- **GradientBackground**: Animated gradient background with shifting colors

  - Smooth animated gradient position shifts
  - Fuchsia -> Violet -> Fuchsia color progression
  - 300x300% background size for movement effect
  - Scale animation on tap

- **GridBackground**: Animated grid pattern with moving light beams

  - Customizable grid dimensions (4x4 to 16x16)
  - Animated colored beams traversing grid lines (horizontal & vertical)
  - Configurable beam count, colors, and speeds
  - Variable grid line styling (solid/dashed/dotted)

- **HoverBackground**: Interactive background with parallax objects
  - 1-12 random floating objects (circles or squares)
  - Parallax effect triggered by mouse movement
  - Individual breathing animations
  - Floating particles on hover
  - Spring-based smooth animation

#### Media Effect Components

- **SvgText**: Display SVG content masked within text shapes

  - SVG displayed as text fill
  - Dynamic dimension measurement using ResizeObserver
  - Customizable font size and weight
  - Screen reader text support

- **VideoText**: Display video masked within text shapes using canvas
  - Video drawn and clipped to text shape
  - Multiple video format support
  - Configurable video behavior (autoplay, loop, mute)
  - Real-time canvas rendering
  - Video event callbacks

#### Utility Components

- **Marquee**: Horizontal or vertical scrolling marquee effect
  - Seamless looping content
  - Optional reverse direction
  - Pause on hover capability
  - Vertical or horizontal orientation
  - ARIA labels and roles for accessibility

#### Features

- Built with Motion/React (Framer Motion) for smooth animations
- In-view activation pattern for performance optimization
- Spring physics for natural motion
- SSR-safe implementations
- Full TypeScript support with comprehensive types
- GPU-accelerated animations with transform3d
- Accessibility support (ARIA labels, keyboard navigation, screen readers)
- Customizable styling with Tailwind CSS
- Canvas and SVG rendering support

#### Dependencies

- Added motion (^12.0.0) for animation library
- Added lucide-react (^0.5.0) for icons
- Added @pelatformui/general (>=0.1.0) for styling utilities

#### CSS Export

- Added CSS export via `./css` entry point
- Style file: `dist/style.css`
- Import with `import '@pelatformui/animation/css'`
