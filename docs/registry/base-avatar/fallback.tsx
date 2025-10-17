import { User } from 'lucide-react';

import { Avatar, AvatarFallback } from '@pelatform/ui/base';

export default function Component() {
  return (
    <div className="flex gap-6">
      <Avatar>
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-destructive/10 text-destructive">AJ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-primary/10 text-primary">
          <User className="size-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
