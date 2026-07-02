"use client"

import { Card } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "What brands do you sell?",
    a: "We are an authorized dealer for Dell, HP, Lenovo, ASUS, Acer, Canon, Brother, Epson, Samsung, LG, Zebronics, Finger, and more. All products come with manufacturer warranty.",
  },
  {
    q: "Do you provide GST invoices?",
    a: "Yes! We provide GST-compliant tax invoices for all purchases. Businesses can claim input tax credit using our invoices.",
  },
  {
    q: "What are your shipping charges?",
    a: "We offer free shipping on all orders above ₹5,000. For orders below ₹5,000, a nominal shipping fee of ₹299 applies. We deliver across India.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders are typically dispatched within 24 hours. Delivery to major cities takes 2-4 business days. Remote areas may take 5-7 business days.",
  },
  {
    q: "What is your return and replacement policy?",
    a: "We offer a 7-day replacement guarantee for defective products. The product must be returned in original packaging with all accessories. Some items may require manufacturer verification.",
  },
  {
    q: "Do you offer wholesale pricing?",
    a: "Yes! We provide special bulk pricing for businesses, retailers, educational institutions, and government organizations. Contact us for a custom quote.",
  },
  {
    q: "How can I track my order?",
    a: "Once your order is shipped, you will receive a tracking number via SMS and email. You can track your order on our website or the courier partner's website.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI (Google Pay, PhonePe, Paytm), credit/debit cards (Visa, Mastercard, RuPay), net banking, and cash on delivery (COD). All online payments are processed securely via Razorpay.",
  },
  {
    q: "Do you provide installation support for CCTV cameras?",
    a: "Yes! We provide professional CCTV installation services. Our technicians handle camera mounting, DVR/NVR setup, and complete system configuration. Installation charges vary based on the setup.",
  },
  {
    q: "Can I get technical support after purchase?",
    a: "Absolutely! We provide free technical support for all products purchased from us. You can reach us via phone, email, or visit our store for assistance.",
  },
]

export default function FAQPage() {
  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "FAQ" }]} className="mb-6" />

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">Frequently Asked Questions</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Find answers to common questions about our products, services, and policies.
            </p>
          </div>

          <Card className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-semibold text-sm">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          <div className="text-center mt-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Still have questions?{" "}
              <a href="/contact" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
