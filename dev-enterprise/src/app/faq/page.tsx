import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getFaqs } from "@/lib/data"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Dev Enterprise — shipping, warranty, billing, and more.",
}

export default async function FaqPage() {
  const faqs = await getFaqs()

  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "FAQ" }]} className="mb-6" />
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight mb-3">Frequently Asked Questions</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Quick answers to common questions about our products, shipping, and services.
            </p>
          </div>
          <Card className="p-6">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-semibold text-sm">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </div>
    </div>
  )
}
