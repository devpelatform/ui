import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@pelatform/ui/default';

export default function AccordionDemo() {
  return (
    <Accordion type="single" variant="solid" collapsible className="w-full lg:w-[75%]">
      <AccordionItem value="pelatform-1">
        <AccordionTrigger>What is Pelatform UI?</AccordionTrigger>
        <AccordionContent>
          Pelatform UI provides ready-to-use CRUD examples for developers.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="pelatform-2">
        <AccordionTrigger>Who benefits from Pelatform UI?</AccordionTrigger>
        <AccordionContent>
          Developers looking to save time with pre-built CRUD solutions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="pelatform-3">
        <AccordionTrigger>Why choose Pelatform UI?</AccordionTrigger>
        <AccordionContent>
          Pelatform UI simplifies development with plug-and-play CRUDs.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
