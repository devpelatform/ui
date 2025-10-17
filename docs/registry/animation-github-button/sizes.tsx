import { GithubButton } from '@pelatform/ui/animation';

export default function Component() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <GithubButton
        targetStars={1501}
        label="Small"
        size="sm"
        repoUrl="https://github.com/devpelatform/ui"
      />
      <GithubButton
        targetStars={1501}
        label="Medium"
        repoUrl="https://github.com/devpelatform/ui"
      />
      <GithubButton
        targetStars={1501}
        label="Large"
        size="lg"
        repoUrl="https://github.com/devpelatform/ui"
      />
    </div>
  );
}
