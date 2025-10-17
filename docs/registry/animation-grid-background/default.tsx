import { GridBackground } from '@pelatform/ui/animation';

export default function Component() {
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-xl">
      <GridBackground gridSize="6:6" />
    </div>
  );
}
