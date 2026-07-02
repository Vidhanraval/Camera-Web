const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // ─── CLEAN ──────────────────────────────────────
  await prisma.orderStatusHistory.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.compareItem.deleteMany();
  await prisma.recentlyViewed.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productSeo.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.newsletter.deleteMany();
  await prisma.contactQuery.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.page.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.setting.deleteMany();
  console.log("✅ Cleaned existing data");

  // ─── USERS ──────────────────────────────────────
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@deventerprise.com",
      password: hashedPassword,
      phone: "+91-9876543210",
      role: "SUPER_ADMIN",
      emailVerified: new Date(),
      isActive: true,
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: "Rahul Sharma",
      email: "rahul@email.com",
      password: hashedPassword,
      phone: "+91-9876543211",
      role: "CUSTOMER",
      emailVerified: new Date(),
      isActive: true,
      addresses: {
        create: {
          fullName: "Rahul Sharma",
          phone: "+91-9876543211",
          addressLine1: "Shop No. 5, Tech Market",
          addressLine2: "Near Bus Stand",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
          type: "HOME",
          isDefault: true,
        },
      },
    },
  });
  console.log("✅ Users created (admin & customer)");

  // ─── CATEGORIES ─────────────────────────────────
  const cats = await Promise.all([
    prisma.category.create({ data: { name: "Computers & Desktops", slug: "computers", description: "Desktop PCs, Gaming Rigs, Workstations & AIO", icon: "Monitor", isFeatured: true, sortOrder: 1 } }),
    prisma.category.create({ data: { name: "Laptops & Notebooks", slug: "laptops", description: "Business, Gaming & Student Laptops", icon: "Laptop", isFeatured: true, sortOrder: 2 } }),
    prisma.category.create({ data: { name: "Printers & Scanners", slug: "printers", description: "Laser, Inkjet, All-in-One Printers", icon: "Printer", isFeatured: true, sortOrder: 3 } }),
    prisma.category.create({ data: { name: "CCTV & Security", slug: "cctv", description: "IP Cameras, DVR, NVR & Accessories", icon: "Camera", isFeatured: true, sortOrder: 4 } }),
    prisma.category.create({ data: { name: "Networking", slug: "networking", description: "Routers, Switches, Mesh WiFi, Cables", icon: "Network", isFeatured: true, sortOrder: 5 } }),
    prisma.category.create({ data: { name: "Monitors & Displays", slug: "monitors", description: "FHD, 4K, Gaming & Ultrawide Monitors", icon: "Monitor", isFeatured: true, sortOrder: 6 } }),
    prisma.category.create({ data: { name: "Storage & Memory", slug: "storage", description: "SSD, HDD, USB Drives, RAM", icon: "HardDrive", isFeatured: false, sortOrder: 7 } }),
    prisma.category.create({ data: { name: "Accessories", slug: "accessories", description: "Keyboard, Mouse, Webcam, Headphones", icon: "Headphones", isFeatured: true, sortOrder: 8 } }),
    prisma.category.create({ data: { name: "Components & Parts", slug: "components", description: "Motherboards, PSU, UPS, Cabinets", icon: "Cpu", isFeatured: false, sortOrder: 9 } }),
    prisma.category.create({ data: { name: "Printing Supplies", slug: "printer-accessories", description: "Cartridges, Toners, Ink & Paper", icon: "Droplet", isFeatured: false, sortOrder: 10 } }),
    prisma.category.create({ data: { name: "Servers & Enterprise", slug: "servers", description: "Tower & Rack Servers, Workstations", icon: "Server", isFeatured: false, sortOrder: 11 } }),
    prisma.category.create({ data: { name: "Cables & Adapters", slug: "cables", description: "CAT6, HDMI, USB, DisplayPort Cables", icon: "Cable", isFeatured: false, sortOrder: 12 } }),
  ]);
  console.log("✅ 12 Categories created");

  // ─── BRANDS ─────────────────────────────────────
  const brandData = [
    { name: "Dell", slug: "dell", logo: "/images/brands/dell.svg", isFeatured: true },
    { name: "HP", slug: "hp", logo: "/images/brands/hp.svg", isFeatured: true },
    { name: "Lenovo", slug: "lenovo", logo: "/images/brands/lenovo.svg", isFeatured: true },
    { name: "ASUS", slug: "asus", logo: "/images/brands/asus.svg", isFeatured: true },
    { name: "Acer", slug: "acer", logo: "/images/brands/acer.svg", isFeatured: true },
    { name: "Canon", slug: "canon", logo: "/images/brands/canon.svg", isFeatured: true },
    { name: "Brother", slug: "brother", logo: "/images/brands/brother.svg", isFeatured: true },
    { name: "Epson", slug: "epson", logo: "/images/brands/epson.svg", isFeatured: true },
    { name: "Samsung", slug: "samsung", logo: "/images/brands/samsung.svg", isFeatured: true },
    { name: "LG", slug: "lg", logo: "/images/brands/lg.svg", isFeatured: true },
    { name: "Zebronics", slug: "zebronics", logo: "/images/brands/zebronics.svg", isFeatured: false },
    { name: "Finger", slug: "finger", logo: "/images/brands/finger.svg", isFeatured: false },
    { name: "Hikvision", slug: "hikvision", logo: "/images/brands/hikvision.svg", isFeatured: true },
    { name: "CP Plus", slug: "cp-plus", logo: "/images/brands/cp-plus.svg", isFeatured: false },
    { name: "TP-Link", slug: "tp-link", logo: "/images/brands/tp-link.svg", isFeatured: false },
    { name: "D-Link", slug: "d-link", logo: "/images/brands/d-link.svg", isFeatured: false },
    { name: "Corsair", slug: "corsair", logo: "/images/brands/corsair.svg", isFeatured: false },
  ];
  const brandMap = {};
  for (const bd of brandData) {
    const brand = await prisma.brand.create({ data: bd });
    brandMap[brand.slug] = brand;
  }
  console.log("✅ 17 Brands created");

  // ─── PRODUCTS ───────────────────────────────────
  const catMap = {};
  for (const c of cats) catMap[c.slug] = c;

  const productList = [
    // Computers
    { name: "Dell Inspiron 15 Laptop", slug: "dell-inspiron-15-laptop", sku: "LAP-DEL-INSP15", basePrice: 45990, salePrice: 39990, brand: "dell", category: "laptops", stock: 25, image: "/images/products/dell-inspiron.jpg", isFeatured: true, isBestSeller: true, desc: "Powerful 15.6\" laptop with Intel Core i5, 16GB RAM, 512GB SSD. Perfect for business and everyday use." },
    { name: "HP LaserJet Pro Printer", slug: "hp-laserjet-pro-printer", sku: "PRN-HP-LJPRO", basePrice: 28500, salePrice: 24999, brand: "hp", category: "printers", stock: 15, image: "/images/products/hp-laserjet.jpg", isFeatured: true, isNewArrival: true, desc: "Fast monochrome laser printer with automatic duplex printing. 28 PPM, network-ready." },
    { name: "Hikvision IP CCTV Camera", slug: "hikvision-ip-cctv-camera", sku: "CCTV-HIK-IP4MP", basePrice: 4500, salePrice: 3499, brand: "hikvision", category: "cctv", stock: 100, image: "/images/products/hikvision-ip.jpg", isFeatured: true, isBestSeller: true, desc: "4MP IP bullet camera with IR night vision, IP67 weatherproof, PoE support." },
    { name: "ASUS RT-AX88U Router", slug: "asus-rt-ax88u-router", sku: "NET-ASUS-AX88U", basePrice: 18999, salePrice: 15999, brand: "asus", category: "networking", stock: 20, image: "/images/products/asus-router.jpg", isFeatured: true, isNewArrival: true, desc: "WiFi 6 AX6000 dual-band gaming router with MU-MIMO, OFDMA, AiMesh support." },
    { name: "Samsung 24-inch Monitor", slug: "samsung-24-inch-monitor", sku: "MON-SAM-24FHD", basePrice: 12999, salePrice: 10999, brand: "samsung", category: "monitors", stock: 40, image: "/images/products/samsung-monitor.jpg", isFeatured: true, isBestSeller: true, desc: "24\" Full HD IPS monitor with 75Hz refresh, AMD FreeSync, flicker-free technology." },
    { name: "Zebronics Keyboard & Mouse", slug: "zebronics-keyboard-mouse-combo", sku: "ACC-ZEB-KMCOMBO", basePrice: 1499, salePrice: 999, brand: "zebronics", category: "accessories", stock: 200, image: "/images/products/zebronics-km.jpg", isFeatured: true, isBestSeller: true, desc: "Wireless keyboard and mouse combo with sleek design. Plug & play USB receiver." },
    { name: "Samsung 1TB SSD 870 EVO", slug: "samsung-1tb-ssd-870-evo", sku: "SSD-SAM-870-1TB", basePrice: 8999, salePrice: 7499, brand: "samsung", category: "storage", stock: 80, image: "/images/products/samsung-ssd.jpg", isFeatured: true, isBestSeller: true, desc: "1TB SATA III internal SSD. Read speed up to 560MB/s. 5-year warranty." },
    { name: "Canon EOS Webcam Kit", slug: "canon-eos-webcam-kit", sku: "ACC-CAN-WEBCAM", basePrice: 5999, salePrice: 4999, brand: "canon", category: "accessories", stock: 35, image: "/images/products/canon-webcam.jpg", isFeatured: true, isNewArrival: true, desc: "HD webcam with auto-focus, built-in microphone, plug-and-play USB connectivity." },

    // More products
    { name: "Dell OptiPlex 7010 Desktop", slug: "dell-optiplex-desktop", sku: "DESK-DEL-OPT7010", basePrice: 52990, salePrice: 48990, brand: "dell", category: "computers", stock: 18, image: "/images/products/dell-optiplex.jpg", isFeatured: true, desc: "Business desktop with Intel Core i7, 16GB RAM, 512GB SSD, Windows 11 Pro." },
    { name: "HP EliteBook 840 G9", slug: "hp-elitebook-840-g9", sku: "LAP-HP-ELITE840", basePrice: 85990, salePrice: 79990, brand: "hp", category: "laptops", stock: 10, image: "/images/products/hp-elitebook.jpg", isFeatured: true, isNewArrival: true, desc: "14\" premium business laptop with Intel Core i7 vPro, 16GB RAM, 512GB SSD." },
    { name: "Lenovo ThinkPad E14 Gen 5", slug: "lenovo-thinkpad-e14", sku: "LAP-LEN-TPE14", basePrice: 55990, salePrice: 49990, brand: "lenovo", category: "laptops", stock: 15, image: "/images/products/lenovo-thinkpad.jpg", isFeatured: true, desc: "14\" business laptop, AMD Ryzen 5, 8GB RAM, 512GB SSD, MIL-STD tested." },
    { name: "ASUS VivoBook 15 OLED", slug: "asus-vivobook-15", sku: "LAP-ASUS-VIVO15", basePrice: 62990, salePrice: 58990, brand: "asus", category: "laptops", stock: 12, image: "/images/products/asus-vivobook.jpg", isFeatured: false, isNewArrival: true, desc: "15.6\" OLED display laptop with Intel Core i5, 16GB RAM, 1TB SSD." },
    { name: "Brother DCP-L2541DW", slug: "brother-dcp-l2541dw", sku: "PRN-BRO-DCPL2541", basePrice: 19990, salePrice: 17999, brand: "brother", category: "printers", stock: 22, image: "/images/products/brother-printer.jpg", isFeatured: true, desc: "Multi-function laser printer with auto duplex, WiFi, and network connectivity." },
    { name: "Epson EcoTank L3250", slug: "epson-ecotank-l3250", sku: "PRN-EPS-L3250", basePrice: 13499, salePrice: 12499, brand: "epson", category: "printers", stock: 30, image: "/images/products/epson-ecotank.jpg", isFeatured: true, isNewArrival: true, desc: "All-in-one ink tank printer with WiFi. Ultra-low cost per print." },
    { name: "CP Plus 2MP IP Camera", slug: "cp-plus-2mp-ip-camera", sku: "CCTV-CP-2MPIP", basePrice: 3200, salePrice: 2499, brand: "cp-plus", category: "cctv", stock: 150, image: "/images/products/camera-cp-plus.jpg", isFeatured: false, isBestSeller: true, desc: "2MP IP bullet camera with 20m IR range, IP67, ONVIF compatible." },
    { name: "Hikvision 8CH DVR Kit", slug: "hikvision-8ch-dvr-kit", sku: "CCTV-HIK-DVR8CH", basePrice: 15999, salePrice: 13999, brand: "hikvision", category: "cctv", stock: 25, image: "/images/products/dvr-hikvision.jpg", isFeatured: true, desc: "Complete 8-channel DVR kit with 4 cameras, 1TB HDD, cables included." },
    { name: "TP-Link Archer AX73", slug: "tp-link-archer-ax73", sku: "NET-TPL-AX73", basePrice: 9999, salePrice: 8999, brand: "tp-link", category: "networking", stock: 35, image: "/images/products/tp-link-router.jpg", isFeatured: true, desc: "WiFi 6 router with 5400Mbps speed, MU-MIMO, Beamforming, HomeShield security." },
    { name: "D-Link 24-Port Gigabit Switch", slug: "dlink-24-port-switch", sku: "NET-DLK-24G", basePrice: 6999, salePrice: 6299, brand: "d-link", category: "networking", stock: 45, image: "/images/products/dlink-switch.jpg", isFeatured: false, desc: "24-port gigabit unmanaged switch, metal housing, plug & play, fanless." },
    { name: "LG 27-inch UltraGear Monitor", slug: "lg-27-ultragear-monitor", sku: "MON-LG-UG27", basePrice: 24999, salePrice: 21999, brand: "lg", category: "monitors", stock: 15, image: "/images/products/lg-monitor.jpg", isFeatured: true, isNewArrival: true, desc: "27\" QHD IPS gaming monitor, 165Hz, 1ms, G-Sync compatible, HDR10." },
    { name: "Acer Aspire 5 Laptop", slug: "acer-aspire-5-laptop", sku: "LAP-ACER-AS5", basePrice: 42990, salePrice: 38990, brand: "acer", category: "laptops", stock: 20, image: "/images/products/acer-laptop.jpg", isFeatured: false, desc: "15.6\" FHD laptop, Intel Core i5, 8GB RAM, 512GB SSD, Windows 11." },
    { name: "Samsung 1000VA UPS", slug: "samsung-ups-1000va", sku: "UPS-SAM-1000VA", basePrice: 5499, salePrice: 4999, brand: "samsung", category: "components", stock: 50, image: "/images/products/samsung-ups.jpg", isFeatured: false, desc: "1000VA/600W line-interactive UPS with AVR, 3 backup outlets, compact design." },
    { name: "Zebronics Bluetooth Headphone", slug: "zebronics-bluetooth-headphone", sku: "ACC-ZEB-BT-HP", basePrice: 1999, salePrice: 1499, brand: "zebronics", category: "accessories", stock: 120, image: "/images/products/zebronics-headphone.jpg", isFeatured: false, isBestSeller: true, desc: "Wireless Bluetooth headphones with 40mm drivers, 20hr battery, foldable design." },
    { name: "Canon EOS 200D DSLR", slug: "canon-eos-200d-dslr", sku: "CAM-CAN-EOS200D", basePrice: 45990, salePrice: 42990, brand: "canon", category: "accessories", stock: 8, image: "/images/products/canon-dslr.jpg", isFeatured: false, desc: "24.1MP DSLR with 18-55mm lens, Dual Pixel AF, vari-angle touchscreen." },
    { name: "Finger Bluetooth Speaker", slug: "finger-bluetooth-speaker", sku: "ACC-FIN-BT-SPK", basePrice: 2499, salePrice: 1799, brand: "finger", category: "accessories", stock: 90, image: "/images/products/finger-speaker.jpg", isFeatured: false, desc: "Portable Bluetooth speaker with 20W output, IPX7 waterproof, 12hr battery." },
    { name: "Dell PowerEdge T350 Server", slug: "dell-poweredge-t350", sku: "SRV-DEL-PET350", basePrice: 89990, salePrice: 84990, brand: "dell", category: "servers", stock: 5, image: "/images/products/dell-server.jpg", isFeatured: false, desc: "Entry-level tower server with Intel Xeon, 32GB ECC RAM, 2x1TB HDD RAID." },
    { name: "HP Z4 G5 Workstation", slug: "hp-z4-g5-workstation", sku: "WS-HP-Z4G5", basePrice: 129990, salePrice: 119990, brand: "hp", category: "servers", stock: 3, image: "/images/products/hp-workstation.jpg", isFeatured: false, isNewArrival: true, desc: "Professional workstation with Intel Xeon W, 64GB RAM, 1TB SSD, RTX A2000." },
    { name: "Lenovo IdeaCentre AIO", slug: "lenovo-ideacentre-aio", sku: "DESK-LEN-AIO", basePrice: 47990, salePrice: 44990, brand: "lenovo", category: "computers", stock: 10, image: "/images/products/lenovo-desktop.jpg", isFeatured: false, desc: "23.8\" All-in-One PC, AMD Ryzen 5, 8GB RAM, 512GB SSD, wireless keyboard." },
    { name: "ASUS ROG Strix B650", slug: "asus-rog-strix-b650", sku: "MOBO-ASUS-B650", basePrice: 21999, salePrice: 19999, brand: "asus", category: "components", stock: 15, image: "/images/products/asus-motherboard.jpg", isFeatured: false, desc: "AMD B650 ATX gaming motherboard, PCIe 5.0, WiFi 6E, DDR5 support." },
    { name: "Samsung Galaxy Tab A9", slug: "samsung-galaxy-tab-a9", sku: "TAB-SAM-A9", basePrice: 14999, salePrice: 12999, brand: "samsung", category: "accessories", stock: 30, image: "/images/products/samsung-tablet.jpg", isFeatured: false, isNewArrival: true, desc: "8.7\" Android tablet, 4GB RAM, 64GB storage, 5100mAh battery." },
    { name: "LG CineBeam Projector", slug: "lg-cinebeam-projector", sku: "PROJ-LG-CB", basePrice: 12999, salePrice: 11999, brand: "lg", category: "accessories", stock: 8, image: "/images/products/lg-projector.jpg", isFeatured: false, desc: "LED portable projector, 500 ANSI lumens, 1080p, built-in battery." },
    { name: "D-Link CAT6 Ethernet Cable", slug: "dlink-cat6-ethernet-cable", sku: "CAB-DLK-CAT6", basePrice: 499, salePrice: 399, brand: "d-link", category: "cables", stock: 500, image: "/images/products/cable-cat6.jpg", isFeatured: false, desc: "CAT6 UTP patch cord, 3 meter, 250MHz, gold-plated connectors, snagless." },
    { name: "Corsair Vengeance 16GB DDR5", slug: "corsair-vengeance-16gb-ddr5", sku: "RAM-COR-V16D5", basePrice: 5499, salePrice: 4999, brand: "corsair", category: "storage", stock: 60, image: "/images/products/ram-corsair.jpg", isFeatured: false, desc: "16GB (2x8GB) DDR5 5200MHz, CL40, Intel XMP 3.0 ready." },
  ];

  const productIds = [];
  for (let i = 0; i < productList.length; i++) {
    const p = productList[i];
    const cat = catMap[p.category];
    const brd = brandMap[p.brand];
    if (!cat || !brd) { console.warn(`⚠ Missing category or brand for ${p.name}`); continue; }

    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        sku: p.sku,
        description: p.desc,
        shortDescription: `${p.name} — Best price guarantee. Authorized dealer warranty.`,
        basePrice: p.basePrice,
        salePrice: p.salePrice,
        stock: p.stock,
        stockStatus: p.stock > 10 ? "IN_STOCK" : "LOW_STOCK",
        isActive: true,
        isFeatured: p.isFeatured || false,
        isNewArrival: p.isNewArrival || false,
        isBestSeller: p.isBestSeller || false,
        viewCount: Math.floor(Math.random() * 500),
        salesCount: Math.floor(Math.random() * 100),
        gstRate: 18,
        hsnCode: "8471",
        categoryId: cat.id,
        brandId: brd.id,
        images: {
          create: [
            { url: p.image, alt: p.name, isPrimary: true, sortOrder: 0 },
          ],
        },
        seo: {
          create: {
            metaTitle: `${p.name} — Best Price at Dev Enterprise`,
            metaDescription: `Buy ${p.name} at the best price in India. Free shipping, GST invoice, authorized dealer warranty.`,
            keywords: `${p.brand}, ${p.name}, best price, India, online`,
          },
        },
      },
    });
    productIds.push(product.id);
  }
  console.log(`✅ ${productIds.length} Products created with images & SEO`);

  // ─── BANNERS ────────────────────────────────────
  const banners = [
    { title: "Premium Computers & Laptops", subtitle: "Authorized Dealer — Dell, HP, Lenovo & ASUS", image: "/images/hero/hero-1.png", type: "HERO", link: "/shop?category=computers", buttonText: "Shop Computers", sortOrder: 1, isActive: true },
    { title: "CCTV & Security Solutions", subtitle: "IP Cameras, DVR, NVR — Protect What Matters", image: "/images/hero/hero-2.png", type: "HERO", link: "/shop?category=cctv", buttonText: "Explore CCTV", sortOrder: 2, isActive: true },
    { title: "Networking & IT Infrastructure", subtitle: "Routers, Switches, Access Points", image: "/images/hero/hero-3.png", type: "HERO", link: "/shop?category=networking", buttonText: "View Networking", sortOrder: 3, isActive: true },
    { title: "Printers & Office Solutions", subtitle: "Canon, HP, Brother, Epson — Print Smarter", image: "/images/hero/hero-4.png", type: "HERO", link: "/shop?category=printers", buttonText: "Shop Printers", sortOrder: 4, isActive: true },
    { title: "🎉 Summer Sale — Up to 25% OFF", subtitle: "Limited time offer on laptops & printers", image: "/images/hero/hero-1.png", type: "PROMO", link: "/shop?sort=discount", buttonText: "Grab Deal", sortOrder: 5, isActive: true },
    { title: "Bulk Orders Welcome", subtitle: "Wholesale pricing & GST invoice available", image: "/images/hero/hero-2.png", type: "SIDEBAR", link: "/contact", buttonText: "Enquire Now", sortOrder: 6, isActive: true },
  ];
  for (const b of banners) {
    await prisma.banner.create({ data: b });
  }
  console.log("✅ 6 Banners created");

  // ─── BLOG POSTS ─────────────────────────────────
  const posts = [
    { title: "How to Choose the Right Laptop for Your Business", slug: "choose-right-laptop-business", excerpt: "A comprehensive guide to selecting the perfect business laptop based on performance, battery life, and budget.", content: `<h2>How to Choose the Right Laptop for Your Business</h2><p>Choosing the right laptop for your business can be challenging. Here are key factors to consider:</p><h3>1. Performance (CPU & RAM)</h3><p>For business use, an Intel Core i5 or AMD Ryzen 5 processor with at least 8GB RAM is recommended. For heavy multitasking, go for 16GB RAM and Core i7.</p><h3>2. Storage</h3><p>SSD storage is essential for fast boot times and application loading. A 512GB SSD provides a good balance of speed and capacity.</p><h3>3. Battery Life</h3><p>Look for laptops with 8+ hours of battery life for all-day productivity without hunting for power outlets.</p><h3>4. Build Quality & Portability</h3><p>Business laptops should be durable. Look for MIL-STD tested models like Lenovo ThinkPad or Dell Latitude.</p><h3>5. Connectivity</h3><p>Ensure the laptop has enough ports — USB-A, USB-C, HDMI, and an SD card reader are essential for business use.</p>`, image: "/images/blog/blog-1.jpg", author: "Admin", isPublished: true, publishedAt: new Date("2026-06-10") },
    { title: "Complete CCTV Installation Guide for Small Businesses", slug: "cctv-installation-guide", excerpt: "Step-by-step guide to planning, selecting, and installing a CCTV system for your office or shop.", content: `<h2>CCTV Installation Guide</h2><p>Protecting your business with a CCTV system is easier than ever. Here's how to get started:</p><h3>1. Assess Your Needs</h3><p>Determine how many areas need coverage. Key locations include entrances, cash counters, storage rooms, and parking areas.</p><h3>2. Choose Camera Types</h3><p>Bullet cameras for outdoor use, dome cameras for indoor, and PTZ cameras for large areas that need monitoring.</p><h3>3. Resolution Matters</h3><p>2MP (1080p) is the minimum for clear footage. 4MP cameras provide better detail for license plates and faces.</p><h3>4. DVR vs NVR</h3><p>DVR works with analog cameras, NVR with IP cameras. IP cameras offer higher resolution and smart features.</p><h3>5. Storage & Backup</h3><p>Plan for at least 7-15 days of continuous recording. A 2TB HDD can store about 15 days of 4-camera 2MP footage.</p>`, image: "/images/blog/blog-2.jpg", author: "Admin", isPublished: true, publishedAt: new Date("2026-06-15") },
    { title: "WiFi 6 vs WiFi 6E: Which Router Should You Buy?", slug: "wifi-6-vs-wifi-6e", excerpt: "Understand the differences between WiFi 6 and WiFi 6E to make the best networking decision.", content: `<h2>WiFi 6 vs WiFi 6E</h2><p>WiFi technology keeps evolving. Here's what you need to know about the latest standards:</p><h3>WiFi 6 (802.11ax)</h3><p>Operates on 2.4GHz and 5GHz bands. Key features include OFDMA, MU-MIMO, and Target Wake Time for better efficiency and battery life.</p><h3>WiFi 6E</h3><p>Adds the 6GHz band for less congestion and more channels. Ideal for dense environments with many devices.</p><h3>Which to Choose?</h3><p>For most homes and small offices, WiFi 6 is sufficient. Choose WiFi 6E if you have gigabit internet and many WiFi 6E-compatible devices.</p><h3>Recommended Models</h3><p>ASUS RT-AX88U for WiFi 6, TP-Link Archer AX73 for budget WiFi 6, and higher-end models for WiFi 6E.</p>`, image: "/images/blog/blog-3.jpg", author: "Admin", isPublished: true, publishedAt: new Date("2026-06-20") },
    { title: "Printer Buying Guide: Inkjet vs Laser vs Tank", slug: "printer-buying-guide", excerpt: "Compare different printer technologies to find the right one for your home or office needs.", content: `<h2>Printer Buying Guide</h2><p>Choosing the right printer can save you thousands in running costs:</p><h3>Inkjet Printers</h3><p>Best for home use and photo printing. Lower upfront cost but higher per-page cost.</p><h3>Laser Printers</h3><p>Ideal for offices with high-volume black & white printing. Fast, reliable, lower per-page cost.</p><h3>Ink Tank Printers</h3><p>Ultra-low running cost. Epson EcoTank and Canon MegaTank printers can print thousands of pages per refill.</p><h3>Our Recommendation</h3><p>For small business: Brother DCP-L2541DW. For home: Epson EcoTank L3250. For corporate: HP LaserJet Pro.</p>`, image: "/images/blog/blog-4.jpg", author: "Admin", isPublished: true, publishedAt: new Date("2026-06-25") },
    { title: "SSD vs HDD: Why You Should Upgrade to SSD Today", slug: "ssd-vs-hdd-upgrade-guide", excerpt: "Everything you need to know about SSDs and why upgrading your old HDD is worth it.", content: `<h2>SSD vs HDD</h2><p>If your computer still uses a traditional hard drive, you're missing out on massive performance gains:</p><h3>Speed Comparison</h3><p>SSDs are 5-10x faster than HDDs. Boot time drops from 60+ seconds to under 15 seconds. Applications launch almost instantly.</p><h3>Reliability</h3><p>SSDs have no moving parts, making them more durable and less prone to failure from drops or vibration.</p><h3>Recommended SSDs</h3><p>Samsung 870 EVO for SATA upgrade, Samsung 980 Pro for NVMe. Corsair and WD also offer great options.</p><h3>Installation</h3><p>Most laptops and desktops support SSD upgrades. We offer professional installation at Dev Enterprise.</p>`, image: "/images/blog/blog-5.jpg", author: "Admin", isPublished: true, publishedAt: new Date("2026-06-28") },
  ];
  for (const post of posts) {
    await prisma.blogPost.create({ data: post });
  }
  console.log("✅ 5 Blog posts created");

  // ─── COUPONS ────────────────────────────────────
  await prisma.coupon.createMany({
    data: [
      { code: "WELCOME10", description: "10% off on first order", discountType: "PERCENTAGE", discountValue: 10, minOrderValue: 5000, isActive: true },
      { code: "SUMMER25", description: "Summer sale — 25% off on accessories", discountType: "PERCENTAGE", discountValue: 25, minOrderValue: 2000, maxDiscount: 1000, isActive: true },
      { code: "BULK500", description: "₹500 off on orders above ₹10,000", discountType: "FIXED", discountValue: 500, minOrderValue: 10000, isActive: true },
    ],
  });
  console.log("✅ 3 Coupons created");

  // ─── PAGES ──────────────────────────────────────
  await prisma.page.createMany({
    data: [
      { title: "About Us", slug: "about", content: "<h2>About Dev Enterprise</h2><p>Dev Enterprise is a leading technology solutions provider based in Maharashtra. Since our inception, we have been committed to delivering the best IT hardware, networking equipment, CCTV systems, and office automation solutions to businesses and consumers across India.</p><p>We are authorized dealers for top brands including Dell, HP, Lenovo, ASUS, Canon, Brother, Epson, Samsung, LG, and more.</p><h3>Our Mission</h3><p>To empower businesses and individuals with reliable, affordable technology solutions backed by exceptional service and support.</p>", metaTitle: "About Dev Enterprise — Your Trusted Technology Partner", isActive: true },
      { title: "Contact Us", slug: "contact", content: "<h2>Contact Dev Enterprise</h2><p>Visit our store or get in touch for bulk orders, technical support, or any inquiries.</p><h3>Store Address</h3><p>Shop No. 12, Tech Plaza, Main Road, City Center, Maharashtra - 400001</p><h3>Phone</h3><p>+91-9876543210</p><h3>Email</h3><p>info@deventerprise.com</p>", metaTitle: "Contact Dev Enterprise", isActive: true },
      { title: "Services", slug: "services", content: "<h2>Our Services</h2><h3>CCTV Installation</h3><p>Professional CCTV camera installation for homes, offices, and enterprises. We handle everything from planning to maintenance.</p><h3>Computer Repair & AMC</h3><p>Desktop and laptop repair services with annual maintenance contracts for businesses.</p><h3>Networking Setup</h3><p>Complete networking solutions including structured cabling, WiFi setup, and network configuration.</p><h3>Printer Service</h3><p>Printer repair, maintenance, and cartridge refilling services.</p>", metaTitle: "Our Services — Dev Enterprise", isActive: true },
    ],
  });
  console.log("✅ 3 Pages created (About, Contact, Services)");

  // ─── SETTINGS ───────────────────────────────────
  await prisma.setting.createMany({
    data: [
      { key: "store_open", value: "true" },
      { key: "free_shipping_min", value: 5000 },
      { key: "gst_number", value: "27AXXXXX1234X1Z" },
      { key: "whatsapp", value: "+919876543210" },
      { key: "working_hours", value: "Mon-Sat: 10AM-8PM, Sun: 11AM-6PM" },
    ],
  });
  console.log("✅ Settings created");

  // ─── SAMPLE REVIEWS ─────────────────────────────
  const reviewData = [
    { rating: 5, title: "Excellent laptop, great price!", content: "Got the Dell Inspiron at the best price in the market. Genuine product with proper GST bill. Highly recommended!", productSlug: "dell-inspiron-15-laptop" },
    { rating: 4, title: "Good printer, fast delivery", content: "The HP LaserJet Pro works perfectly. Delivery was faster than expected. Only issue was packaging could be better.", productSlug: "hp-laserjet-pro-printer" },
    { rating: 5, title: "Best CCTV camera for the price", content: "Installed 4 Hikvision cameras from Dev Enterprise. Crystal clear footage. The installation team was professional.", productSlug: "hikvision-ip-cctv-camera" },
    { rating: 4, title: "Router works great", content: "WiFi range improved significantly with the ASUS router. Setup was straightforward. Using for 3 months now.", productSlug: "asus-rt-ax88u-router" },
    { rating: 5, title: "Excellent SSD, speed boost!", content: "Upgraded old laptop with Samsung 870 EVO. Boot time reduced from 2 minutes to 15 seconds. Amazing difference!", productSlug: "samsung-1tb-ssd-870-evo" },
  ];

  for (const r of reviewData) {
    const product = await prisma.product.findUnique({ where: { slug: r.productSlug } });
    if (product) {
      await prisma.review.create({
        data: {
          rating: r.rating,
          title: r.title,
          content: r.content,
          status: "APPROVED",
          userId: customer.id,
          productId: product.id,
        },
      });
    }
  }
  console.log("✅ 5 Sample reviews created");

  console.log("\n🎉 SEEDING COMPLETE!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Admin login: admin@deventerprise.com / admin123");
  console.log("Customer: rahul@email.com / admin123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
