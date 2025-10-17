import { GithubButton } from '@pelatform/ui/animation';

export default function Component() {
  return (
    <div className="flex flex-wrap gap-4">
      <GithubButton
        initialStars={8889}
        targetStars={80890}
        separator={true}
        label=""
        roundStars={true}
        repoUrl="https://github.com/keenthemes/reui"
        variant="outline"
      />
    </div>
  );
}
