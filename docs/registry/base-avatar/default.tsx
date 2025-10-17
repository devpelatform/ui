import { Avatar, AvatarFallback, AvatarImage } from '@pelatform/ui/base';

export default function Component() {
  return (
    <Avatar>
      <AvatarImage src="/media/avatars/14.png" alt="@reui" />
      <AvatarFallback>CH</AvatarFallback>
    </Avatar>
  );
}
