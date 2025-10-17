'use client';

import { Briefcase, CircleCheck, Mail, Settings, User } from 'lucide-react';

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
        defaultValue=""
        selectedValue="selected"
        classNames={{
          separator: '-mx-2 mb-2.5',
        }}
      >
        <AccordionMenuLabel>States</AccordionMenuLabel>
        <AccordionMenuSeparator />
        <AccordionMenuGroup>
          <AccordionMenuItem
            value="default"
            onClick={() =>
              toast.custom((t) => (
                <Alert variant="mono" icon="primary" onClose={() => toast.dismiss(t)}>
                  <AlertIcon>
                    <CircleCheck />
                  </AlertIcon>
                  <AlertTitle>Default menu option clicked</AlertTitle>
                </Alert>
              ))
            }
          >
            <User />
            <span>Default</span>
          </AccordionMenuItem>

          <AccordionMenuItem
            value="selected"
            onClick={() =>
              toast.custom((t) => (
                <Alert variant="mono" icon="primary" onClose={() => toast.dismiss(t)}>
                  <AlertIcon>
                    <CircleCheck />
                  </AlertIcon>
                  <AlertTitle>Selected menu option clicked</AlertTitle>
                </Alert>
              ))
            }
          >
            <Mail />
            <span>Selected</span>
            <AccordionMenuIndicator>
              <Badge variant="primary" size="sm" shape="circle">
                8
              </Badge>
            </AccordionMenuIndicator>
          </AccordionMenuItem>
          <AccordionMenuItem value="disabled" disabled>
            <Settings />
            <span>Disabled</span>
          </AccordionMenuItem>
          <AccordionMenuItem
            value="companyInfo"
            variant="destructive"
            onClick={() =>
              toast.custom((t) => (
                <Alert variant="mono" icon="primary" onClose={() => toast.dismiss(t)}>
                  <AlertIcon>
                    <Briefcase />
                  </AlertIcon>
                  <AlertTitle>Destructive menu option clicked</AlertTitle>
                </Alert>
              ))
            }
          >
            <Briefcase />
            <span>Destructive</span>
          </AccordionMenuItem>
        </AccordionMenuGroup>
      </AccordionMenu>
    </div>
  );
}
