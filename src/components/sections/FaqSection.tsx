import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { homeFaqs as faqs } from "@/lib/faq-data";

export default function FaqSection() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="md:text-center">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            자주 묻는 질문
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          <Accordion type="single" collapsible>
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-base md:text-[1.2rem]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-[1.05rem]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
