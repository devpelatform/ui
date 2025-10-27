'use client';

import { GridBackground } from '@pelatform/ui/animation';
import { Button } from '@pelatform/ui/default';

export default function Component() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl">
      <GridBackground
        gridSize="4:4"
        colors={{
          background: 'bg-gradient-to-br from-slate-900 via-fuchsia-900 to-slate-900',
          borderColor: 'border-purple-500/20',
          borderSize: '1px',
          borderStyle: 'solid',
        }}
        beams={{
          count: 8,
          colors: [
            'bg-purple-400',
            'bg-indigo-400',
            'bg-cyan-400',
            'bg-violet-400',
            'bg-fuchsia-400',
          ],
          speed: 5,
          shadow: 'shadow-lg shadow-current/60',
        }}
      >
        {/* Content */}
        <div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center space-y-10 px-8">
          {/* Main heading */}
          <h1 className="animate-fade-in bg-linear-to-r from-white via-purple-200 to-fuchsia-400 bg-clip-text text-center font-bold text-3xl text-transparent md:text-4xl">
            AI Agents That
            <br />
            <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Actually Perform
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-lg animate-fade-in text-center text-purple-100 text-xl">
            Deploy AI agents that deliver results that matter to your business and workflows.
          </p>

          {/* CTA buttons */}
          <div className="flex animate-fade-in flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="ghost"
              className="w-40 bg-zinc-950 text-white hover:bg-zinc-950 hover:text-white hover:shadow-fuchsia-950 hover:shadow-lg"
            >
              Start Building Free
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="w-40 bg-fuchsia-900 text-white hover:bg-fuchsia-900 hover:text-white hover:shadow-fuchsia-950 hover:shadow-lg"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </GridBackground>
    </div>
  );
}
