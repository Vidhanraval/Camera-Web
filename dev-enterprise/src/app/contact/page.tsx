"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { contactSchema, type ContactInput } from "@/lib/validators"
import { SITE_CONFIG } from "@/lib/constants"
import { toast } from "sonner"

const contactInfo = [
  { icon: Phone, label: "Phone", value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
  { icon: Mail, label: "Email", value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
  { icon: MapPin, label: "Address", value: SITE_CONFIG.address },
  { icon: Clock, label: "Business Hours", value: "Mon–Sat: 9:30 AM – 7:30 PM, Sun: Closed" },
]

export default function ContactPage() {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactInput) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      reset()
      toast.success("Message sent! We'll get back to you within 24 hours.")
    }, 1500)
  }

  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Contact" }]} className="mb-6" />

        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">Contact Us</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Have a question? Need a bulk quote? Our team is here to help you with all your technology needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((info) => (
              <Card key={info.label} className="p-5 flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                  <info.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{info.value}</p>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <Card className="p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-bold">Send us a Message</h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Name *</Label>
                    <Input placeholder="Your name" className="mt-1.5" error={errors.name?.message} {...register("name")} />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <Input type="email" placeholder="you@example.com" className="mt-1.5" error={errors.email?.message} {...register("email")} />
                  </div>
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input placeholder="Optional" className="mt-1.5" {...register("phone")} />
                </div>
                <div>
                  <Label>Subject *</Label>
                  <Input placeholder="What is this about?" className="mt-1.5" error={errors.subject?.message} {...register("subject")} />
                </div>
                <div>
                  <Label>Message *</Label>
                  <Textarea placeholder="Tell us how we can help you..." className="mt-1.5" error={errors.message?.message} {...register("message")} />
                </div>
                <Button type="submit" className="w-full rounded-xl" size="lg" loading={loading}>
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
