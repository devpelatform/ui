import { Avatar, AvatarFallback, AvatarImage, Button } from '@pelatform/ui/base';
import { getImagePath } from '@/lib/utils';

export default function AvatarDemo() {
  return (
    <div className="-space-x-2 flex">
      <Avatar>
        <AvatarImage
          src={getImagePath('/media/avatars/2.png')}
          alt="@pelatform"
          className="border-2 border-background hover:z-10"
        />
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src={getImagePath('/media/avatars/4.png')}
          alt="@pelatform"
          className="border-2 border-background hover:z-10"
        />
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src={getImagePath('/media/avatars/16.png')}
          alt="@pelatform"
          className="border-2 border-background hover:z-10"
        />
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src={getImagePath('/media/avatars/8.png')}
          alt="@pelatform"
          className="border-2 border-background hover:z-10"
        />
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>
      <Button
        variant="secondary"
        mode="icon"
        radius="full"
        className="relative size-10 border-2 border-background hover:z-10"
      >
        +7
      </Button>
    </div>
  );
}
