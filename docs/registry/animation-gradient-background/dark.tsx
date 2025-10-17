import { GradientBackground } from '@pelatform/ui/animation';

export default function GradientBackgroundDark() {
  return (
    <div className="h-64 w-full overflow-hidden rounded-lg">
      <GradientBackground
        className="from-slate-900 via-purple-900 to-slate-950"
        transition={{ duration: 15, ease: 'easeInOut', repeat: Infinity }}
      />
    </div>
  );
}
