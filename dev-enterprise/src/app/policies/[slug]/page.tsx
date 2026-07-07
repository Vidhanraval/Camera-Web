import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Card } from "@/components/ui/card"
import { SITE_CONFIG } from "@/lib/constants"

interface PolicyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { slug } = await params
  const titles: Record<string, string> = {
    shipping: "Shipping Policy",
    returns: "Return & Refund Policy",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    warranty: "Warranty Policy",
  }
  return {
    title: titles[slug] || "Policy",
    description: `${titles[slug] || "Policy"} of ${SITE_CONFIG.name}.`,
  }
}

const content: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
  shipping: {
    title: "Shipping Policy",
    sections: [
      { heading: "Delivery Areas", body: "We deliver across India to all major cities, towns, and rural areas. Delivery to remote locations may take additional time." },
      { heading: "Shipping Charges", body: "Free shipping on all orders above ₹5,000. For orders below ₹5,000, a standard shipping fee of ₹299 applies. Express delivery is available at an additional charge." },
      { heading: "Delivery Time", body: "Orders are typically dispatched within 24 hours of confirmation. Standard delivery takes 2-4 business days for metro cities, 4-7 business days for non-metro cities, and 7-10 business days for remote areas." },
      { heading: "Order Tracking", body: "Once your order is dispatched, you will receive a tracking number via SMS and email. You can track your order on our website or through the courier partner's tracking portal." },
    ],
  },
  returns: {
    title: "Return & Refund Policy",
    sections: [
      { heading: "Return Period", body: "We offer a 7-day return policy for defective or damaged products. The return request must be initiated within 7 days of delivery." },
      { heading: "Return Conditions", body: "Products must be returned in their original packaging with all accessories, manuals, and warranty cards. The product must not show signs of physical damage, misuse, or unauthorized repair." },
      { heading: "Refund Process", body: "Once the returned product is inspected and approved, refunds are processed within 5-7 business days to the original payment method. Shipping charges are non-refundable unless the return is due to our error." },
      { heading: "Non-Returnable Items", body: "Software products, opened consumables (ink cartridges, toners), and custom-built/configurable products are non-returnable unless found defective." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      { heading: "Information Collection", body: "We collect personal information such as name, email, phone number, and shipping address when you place an order or create an account. This information is used solely for order processing and customer support." },
      { heading: "Data Usage", body: "Your personal data is used to process orders, communicate about your purchases, send promotional offers (with your consent), and improve our services. We do not sell or share your data with third parties for marketing purposes." },
      { heading: "Data Security", body: "We implement industry-standard security measures to protect your personal information. All payment transactions are processed through secure, PCI-compliant payment gateways." },
      { heading: "Cookies", body: "Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can disable cookies in your browser settings, though some features may not function properly." },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    sections: [
      { heading: "Agreement", body: "By using our website and placing an order, you agree to these terms and conditions. Please read them carefully before making a purchase." },
      { heading: "Product Information", body: "We strive to provide accurate product descriptions, images, and specifications. However, actual products may vary slightly from images shown. Prices are subject to change without prior notice." },
      { heading: "Payment Terms", body: "All prices are in Indian Rupees (INR). Payment must be made in full before order dispatch, except for Cash on Delivery orders." },
      { heading: "Warranty", body: "All products carry the manufacturer's standard warranty unless otherwise specified. Warranty claims are handled as per the manufacturer's terms. We facilitate warranty service but are not directly liable for manufacturer warranties." },
    ],
  },
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { slug } = await params
  const policy = content[slug]

  if (!policy) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Policy Not Found</h1>
      </div>
    )
  }

  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: policy.title }]} className="mb-6" />
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-8">{policy.title}</h1>
          <Card className="p-6 lg:p-8">
            <div className="space-y-8">
              {policy.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-lg font-bold mb-2">{section.heading}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
          </Card>
          <p className="text-center text-sm text-gray-400 mt-6">
            Last updated: January 2025 | For questions, contact {SITE_CONFIG.email}
          </p>
        </div>
      </div>
    </div>
  )
}
