import type { Metadata } from "next"
import Link from "next/link"
import { Wrench, ShieldCheck, Network, Camera, Monitor, HeadphonesIcon, ArrowRight } from "lucide-react"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Our Services",
  description: "Professional IT services — computer repair, CCTV installation, networking setup, AMC, and tech support at Dev Enterprise.",
}

const services = [
  { icon: Wrench, title: "Computer Repair & Service", desc: "Hardware repair, motherboard service, data recovery, OS installation, and virus removal for all brands.", price: "Starting ₹499" },
  { icon: Camera, title: "CCTV Installation", desc: "Professional CCTV camera installation, DVR/NVR setup, and configuration for homes, offices, and shops.", price: "Starting ₹999" },
  { icon: Network, title: "Networking Setup", desc: "Structured cabling, router configuration, WiFi mesh setup, and enterprise network design and installation.", price: "Starting ₹1,499" },
  { icon: Monitor, title: "AMC Services", desc: "Annual Maintenance Contracts for computers, printers, CCTV, and networking equipment with priority support.", price: "Custom Plans" },
  { icon: ShieldCheck, title: "Data Backup & Recovery", desc: "Professional data recovery from failed drives and backup solution implementation for businesses.", price: "Assessment Free" },
  { icon: HeadphonesIcon, title: "Tech Consultation", desc: "Expert advice on IT infrastructure, hardware selection, and technology roadmap for your business.", price: "Free Consultation" },
]

export default function ServicesPage() {
  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Services" }]} className="mb-6" />

        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">Our Services</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Beyond selling products, we provide comprehensive IT services to ensure your technology works for you. From repairs to complete installations, our experts are here to help.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((svc) => (
            <Card key={svc.title} className="p-6 group hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svc.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold mb-2">{svc.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{svc.desc}</p>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{svc.price}</p>
            </Card>
          ))}
        </div>

        <div className="text-center p-10 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <h2 className="text-2xl font-extrabold mb-3">Need a Service?</h2>
          <p className="text-blue-100 mb-6 max-w-md mx-auto">Contact us for a free consultation or to schedule a service visit.</p>
          <Link href="/contact">
            <Button className="rounded-xl bg-white text-blue-700 hover:bg-blue-50">
              Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
