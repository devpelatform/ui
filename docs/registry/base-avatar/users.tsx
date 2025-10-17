import { Avatar, AvatarFallback, AvatarImage } from '@pelatform/ui/base';
import { getImagePath } from '@/lib/utils';

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border p-0.5 shadow-black/5 shadow-sm">
      <div className="-space-x-1 flex">
        <Avatar className="size-7">
          <AvatarImage
            src={getImagePath('/media/avatars/2.png')}
            alt="@pelatform"
            className="border-2 border-background hover:z-10"
          />
          <AvatarFallback>CH</AvatarFallback>
        </Avatar>
        <Avatar className="size-7">
          <AvatarImage
            src={getImagePath('/media/avatars/4.png')}
            alt="@pelatform"
            className="border-2 border-background hover:z-10"
          />
          <AvatarFallback>CH</AvatarFallback>
        </Avatar>
        <Avatar className="size-7">
          <AvatarImage
            src={getImagePath('/media/avatars/6.png')}
            alt="@pelatform"
            className="border-2 border-background hover:z-10"
          />
          <AvatarFallback>CH</AvatarFallback>
        </Avatar>
        <Avatar className="size-7">
          <AvatarImage
            src={getImagePath('/media/avatars/8.png')}
            alt="@pelatform"
            className="border-2 border-background hover:z-10"
          />
          <AvatarFallback>CH</AvatarFallback>
        </Avatar>
      </div>

      <p className="me-1.5 text-muted-foreground text-xs">
        Trusted by <span className="font-semibold text-foreground">100K+</span> useers.
      </p>
    </div>
  );
}
