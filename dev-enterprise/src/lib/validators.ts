import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(10, "Enter a valid 10-digit phone number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const addressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid 10-digit phone required"),
  alternatePhone: z.string().optional(),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().length(6, "Valid 6-digit pincode required"),
  landmark: z.string().optional(),
  type: z.enum(["HOME", "WORK", "OTHER"]).default("HOME"),
  isDefault: z.boolean().default(false),
})

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  content: z.string().min(10, "Review must be at least 10 characters").max(1000),
})

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export const couponSchema = z.object({
  code: z.string().min(3, "Coupon code required"),
  description: z.string().optional(),
  discountType: z.enum(["PERCENTAGE", "FIXED"]),
  discountValue: z.number().positive(),
  minOrderValue: z.number().optional(),
  maxDiscount: z.number().optional(),
  usageLimit: z.number().optional(),
  isActive: z.boolean().default(true),
  validFrom: z.date().optional(),
  validUntil: z.date().optional(),
})

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  sku: z.string().min(3),
  barcode: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  highlights: z.string().optional(),
  basePrice: z.number().positive(),
  salePrice: z.number().optional(),
  wholesalePrice: z.number().optional(),
  costPrice: z.number().optional(),
  gstRate: z.number().default(18),
  hsnCode: z.string().optional(),
  stock: z.number().default(0),
  categoryId: z.string(),
  brandId: z.string().optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  tags: z.string().optional(),
})

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone required"),
  email: z.string().email("Valid email required"),
})

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "At least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type AddressInput = z.infer<typeof addressSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type CouponInput = z.infer<typeof couponSchema>
export type ProductInput = z.infer<typeof productSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
