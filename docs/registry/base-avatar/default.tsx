import { Avatar, AvatarFallback, AvatarImage } from '@pelatform/ui/base';
import { getImagePath } from '@/lib/utils';

export default function Component() {
  return (
    <Avatar>
      <AvatarImage src={getImagePath('/media/avatars/14.png')} alt="@pelatform" />
      <AvatarFallback>CH</AvatarFallback>
    </Avatar>
  );
}
