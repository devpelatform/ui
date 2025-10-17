import { GithubButton } from '@pelatform/ui/animation';

export default function Component() {
  return (
    <div className="flex flex-wrap gap-4">
      <GithubButton
        initialStars={8889}
        targetStars={80890}
        label="Github Stars"
        roundStars={true}
        repoUrl="https://github.com/devpelatform/ui"
        variant="outline"
      />
    </div>
  );
}
