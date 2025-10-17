import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarIndicator,
  AvatarStatus,
} from '@pelatform/ui/base';
import { getImagePath } from '@/lib/utils';

export default function AvatarDemo() {
  return (
    <div className="flex flex-wrap gap-6">
      <Avatar>
        <AvatarImage src={getImagePath('/media/avatars/14.png')} alt="@pelatform" />
        <AvatarFallback>CH</AvatarFallback>
        <AvatarIndicator className="-end-1.5 -top-1.5">
          <AvatarStatus variant="online" className="size-2.5" />
        </AvatarIndicator>
      </Avatar>
      <Avatar>
        <AvatarImage src={getImagePath('/media/avatars/14.png')} alt="@pelatform" />
        <AvatarFallback>CH</AvatarFallback>
        <AvatarIndicator className="-end-1.5 -top-1.5">
          <AvatarStatus variant="offline" className="size-2.5" />
        </AvatarIndicator>
      </Avatar>
      <Avatar>
        <AvatarImage src={getImagePath('/media/avatars/14.png')} alt="@pelatform" />
        <AvatarFallback>CH</AvatarFallback>
        <AvatarIndicator className="-end-1.5 -bottom-1.5">
          <AvatarStatus variant="busy" className="size-2.5" />
        </AvatarIndicator>
      </Avatar>
      <Avatar>
        <AvatarImage src={getImagePath('/media/avatars/14.png')} alt="@pelatform" />
        <AvatarFallback>CH</AvatarFallback>
        <AvatarIndicator className="-end-1.5 -bottom-1.5">
          <AvatarStatus variant="away" className="size-2.5" />
        </AvatarIndicator>
      </Avatar>
    </div>
  );
}
