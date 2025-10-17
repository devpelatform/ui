import { X } from 'lucide-react';

import { Badge, BadgeButton } from '@pelatform/ui/base';

export default function BadgeDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <Badge variant="secondary" appearance="ghost">
          Ghost
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="secondary">
          Solid
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="secondary" appearance="light">
          Light
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="outline">
          Outline
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant="primary" appearance="ghost">
          Ghost
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="primary">
          Solid
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="primary" appearance="light">
          light
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="primary" appearance="outline">
          Outline
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant="success" appearance="ghost">
          Ghost
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="success">
          Solid
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="success" appearance="light">
          light
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="success" appearance="outline">
          Outline
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant="info" appearance="ghost">
          Ghost
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="info">
          Solid
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="info" appearance="light">
          light
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="info" appearance="outline">
          Outline
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant="warning" appearance="ghost">
          Ghost
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="warning">
          Solid
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="warning" appearance="light">
          light
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="warning" appearance="outline">
          Outline
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant="destructive" appearance="ghost">
          Ghost
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="destructive">
          Solid
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="destructive" appearance="light">
          light
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
        <Badge variant="destructive" appearance="outline">
          Outline
          <BadgeButton>
            <X />
          </BadgeButton>
        </Badge>
      </div>
    </div>
  );
}
