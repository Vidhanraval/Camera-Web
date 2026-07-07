export const SITE_CONFIG = {
  name: "Dev Enterprise",
  tagline:
    "Your Trusted Technology Partner — Computers, Laptops, Printers, CCTV & More",
  description:
    "Dev Enterprise is a leading wholesale and retail provider of computers, laptops, printers, networking equipment, CCTV cameras, and IT accessories. Authorized dealer for Dell, HP, Lenovo, ASUS, Canon, Brother, Epson, Samsung, LG, and more.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://deventerprise.com",
  phone: "+91-XXXXXXXXXX",
  email: "info@deventerprise.com",
  address:
    "Shop No. 12, Tech Plaza, Main Road, City Center, Maharashtra - 400001",
  logo: "/images/logo.svg",
  ogImage: "/images/og-image.jpg",
}

export const NAV_LINKS = [
  { title: "Home", href: "/" },
  {
    title: "Shop",
    href: "/shop",
    children: [
      { title: "All Products", href: "/shop" },
      { title: "New Arrivals", href: "/shop?sort=new" },
      { title: "Best Sellers", href: "/shop?sort=bestseller" },
      { title: "Special Offers", href: "/shop?sort=discount" },
    ],
  },
  {
    title: "Categories",
    href: "/categories",
    children: [
      {
        title: "Computers",
        href: "/categories/computers",
        children: [
          { title: "Desktop Computers", href: "/categories/computers/desktop" },
          { title: "Gaming PCs", href: "/categories/computers/gaming" },
          { title: "Workstations", href: "/categories/computers/workstations" },
          { title: "All in One PCs", href: "/categories/computers/aio" },
        ],
      },
      {
        title: "Laptops",
        href: "/categories/laptops",
      },
      {
        title: "Printers & Accessories",
        href: "/categories/printers",
        children: [
          { title: "Printers", href: "/categories/printers" },
          {
            title: "Printer Accessories",
            href: "/categories/printer-accessories",
          },
        ],
      },
      {
        title: "CCTV & Security",
        href: "/categories/cctv",
        children: [
          { title: "CCTV Cameras", href: "/categories/cctv-cameras" },
          { title: "IP Cameras", href: "/categories/ip-cameras" },
          { title: "DVR / NVR", href: "/categories/dvr-nvr" },
          { title: "Accessories", href: "/categories/cctv-accessories" },
        ],
      },
      {
        title: "Networking",
        href: "/categories/networking",
        children: [
          { title: "Routers", href: "/categories/routers" },
          { title: "Mesh WiFi", href: "/categories/mesh-wifi" },
          { title: "Access Points", href: "/categories/access-points" },
          { title: "Switches", href: "/categories/switches" },
          { title: "Cables", href: "/categories/cables" },
        ],
      },
      {
        title: "Accessories",
        href: "/categories/accessories",
      },
      {
        title: "Storage",
        href: "/categories/storage",
        children: [
          { title: "SSD", href: "/categories/ssd" },
          { title: "HDD", href: "/categories/hdd" },
          { title: "USB Drives", href: "/categories/usb-drives" },
        ],
      },
      {
        title: "Components",
        href: "/categories/components",
        children: [
          { title: "RAM", href: "/categories/ram" },
          { title: "SMPS / PSU", href: "/categories/smps" },
          { title: "UPS", href: "/categories/ups" },
        ],
      },
    ],
  },
  {
    title: "Brands",
    href: "/brands",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

export const FOOTER_LINKS = {
  shop: {
    title: "Shop",
    links: [
      { title: "Desktop Computers", href: "/categories/computers/desktop" },
      { title: "Laptops", href: "/categories/laptops" },
      { title: "Printers", href: "/categories/printers" },
      { title: "CCTV Cameras", href: "/categories/cctv-cameras" },
      { title: "Networking", href: "/categories/networking" },
      { title: "Accessories", href: "/categories/accessories" },
    ],
  },
  brands: {
    title: "Top Brands",
    links: [
      { title: "Dell", href: "/brands/dell" },
      { title: "HP", href: "/brands/hp" },
      { title: "Lenovo", href: "/brands/lenovo" },
      { title: "ASUS", href: "/brands/asus" },
      { title: "Canon", href: "/brands/canon" },
      { title: "Brother", href: "/brands/brother" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Contact", href: "/contact" },
      { title: "Blog", href: "/blog" },
      { title: "Services", href: "/services" },
      { title: "Careers", href: "/careers" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { title: "FAQ", href: "/faq" },
      { title: "Shipping Policy", href: "/policies/shipping" },
      { title: "Return Policy", href: "/policies/returns" },
      { title: "Privacy Policy", href: "/policies/privacy" },
      { title: "Terms & Conditions", href: "/policies/terms" },
    ],
  },
}

export const BRANDS = [
  { name: "Dell", slug: "dell", logo: "/images/brands/dell.svg" },
  { name: "HP", slug: "hp", logo: "/images/brands/hp.svg" },
  { name: "Lenovo", slug: "lenovo", logo: "/images/brands/lenovo.svg" },
  { name: "ASUS", slug: "asus", logo: "/images/brands/asus.svg" },
  { name: "Acer", slug: "acer", logo: "/images/brands/acer.svg" },
  { name: "Canon", slug: "canon", logo: "/images/brands/canon.svg" },
  { name: "Brother", slug: "brother", logo: "/images/brands/brother.svg" },
  { name: "Epson", slug: "epson", logo: "/images/brands/epson.svg" },
  { name: "Samsung", slug: "samsung", logo: "/images/brands/samsung.svg" },
  { name: "LG", slug: "lg", logo: "/images/brands/lg.svg" },
  { name: "Zebronics", slug: "zebronics", logo: "/images/brands/zebronics.svg" },
  { name: "Finger", slug: "finger", logo: "/images/brands/finger.svg" },
]

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Chandigarh",
  "Puducherry",
]

export const SORT_OPTIONS = [
  { label: "Newest", value: "new" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Popularity", value: "popular" },
  { label: "Best Seller", value: "bestseller" },
  { label: "Discount", value: "discount" },
]
