'use client';

import { CircleCheck, HelpCircle, Info, Mail, Settings, User } from 'lucide-react';

import {
  AccordionMenu,
  AccordionMenuGroup,
  AccordionMenuIndicator,
  AccordionMenuItem,
  AccordionMenuLabel,
  AccordionMenuSeparator,
  Alert,
  AlertIcon,
  AlertTitle,
  Badge,
} from '@pelatform/ui/default';
import { toast } from '@pelatform/ui/re/sonner';

export default function AccordionMenuDemo() {
  return (
    <div className="w-full overflow-hidden rounded-md border border-border p-2 md:w-[200px]">
      <AccordionMenu
        type="single"
        collapsible
        classNames={{
          separator: '-mx-2 mb-2.5',
        }}
      >
        {/* Menu Label */}
        <AccordionMenuLabel>My Account</AccordionMenuLabel>
        <AccordionMenuSeparator />

        {/* Menu Items */}
        <AccordionMenuGroup>
          <AccordionMenuItem value="profile">
            <User />
            <span>Profile</span>
          </AccordionMenuItem>

          <AccordionMenuItem
            value="/inbox"
            onClick={() => {
              toast.custom((t) => (
                <Alert variant="mono" icon="primary" onClose={() => toast.dismiss(t)}>
                  <AlertIcon>
                    <CircleCheck />
                  </AlertIcon>
                  <AlertTitle>Inbox clicked</AlertTitle>
                </Alert>
              ));
            }}
          >
            <Mail />
            <span>Inbox</span>
            <AccordionMenuIndicator>
              <Badge variant="primary" size="sm" shape="circle">
                5
              </Badge>
            </AccordionMenuIndicator>
          </AccordionMenuItem>

          <AccordionMenuItem
            value="settings"
            onClick={() => {
              toast.custom((t) => (
                <Alert variant="mono" icon="primary" onClose={() => toast.dismiss(t)}>
                  <AlertIcon>
                    <CircleCheck />
                  </AlertIcon>
                  <AlertTitle>Settings clicked</AlertTitle>
                </Alert>
              ));
            }}
          >
            <Settings />
            <span>Settings</span>
          </AccordionMenuItem>

          <AccordionMenuItem value="about">
            <Info />
            <span>About</span>
          </AccordionMenuItem>

          <AccordionMenuItem value="help">
            <HelpCircle />
            <span>Help</span>
          </AccordionMenuItem>
        </AccordionMenuGroup>
      </AccordionMenu>
    </div>
  );
}
