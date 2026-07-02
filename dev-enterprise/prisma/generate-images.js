const { writeFileSync, mkdirSync } = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

// ─── SVG generators ──────────────────────────────
function productSvg(brand, name, color1 = "#2563eb", color2 = "#1d4ed8") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1}15"/>
      <stop offset="100%" style="stop-color:${color2}25"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)" rx="24"/>
  <rect x="80" y="80" width="440" height="440" rx="20" fill="white" stroke="#e2e8f0" stroke-width="2"/>
  <text x="300" y="280" text-anchor="middle" font-family="system-ui,sans-serif" font-size="36" font-weight="700" fill="${color1}">${brand}</text>
  <text x="300" y="340" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" fill="#64748b">${name}</text>
  <rect x="180" y="380" width="240" height="4" rx="2" fill="${color1}" opacity="0.3"/>
</svg>`;
}

function brandSvg(name) {
  const colors = {Dell:'#007DB8', HP:'#0096D6', Lenovo:'#E2231A', ASUS:'#00A7E1', Acer:'#83B81A', Canon:'#DC143C', Brother:'#1B2F5B', Epson:'#002F6C', Samsung:'#1428A0', LG:'#A50034', Zebronics:'#00A650', Finger:'#FF6600', Hikvision:'#EE2A24', CPPlus:'#F7941D', DLink:'#005A9C', TP_Link:'#4CB848'};
  const c = colors[name.replace(/ /g,'_')] || '#2563eb';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 200 80">
  <rect width="200" height="80" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="100" y="48" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="800" fill="${c}">${name}</text>
</svg>`;
}

function heroSvg(title, color1, color2) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1}"/>
      <stop offset="100%" style="stop-color:${color2}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bg)"/>
  <circle cx="650" cy="250" r="200" fill="white" opacity="0.1"/>
  <circle cx="150" cy="400" r="120" fill="white" opacity="0.05"/>
  <text x="400" y="220" text-anchor="middle" font-family="system-ui,sans-serif" font-size="42" font-weight="800" fill="white">${title}</text>
  <text x="400" y="280" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" fill="rgba(255,255,255,0.7)">Dev Enterprise</text>
  <rect x="300" y="320" width="200" height="50" rx="25" fill="white" opacity="0.2"/>
  <text x="400" y="353" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="600" fill="white">Shop Now</text>
</svg>`;
}

function blogSvg(title, color = "#2563eb") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="420" viewBox="0 0 800 420">
  <rect width="800" height="420" fill="#f8fafc"/>
  <rect x="200" y="80" width="400" height="260" rx="12" fill="${color}" opacity="0.1"/>
  <text x="400" y="200" text-anchor="middle" font-family="system-ui,sans-serif" font-size="28" font-weight="700" fill="${color}">${title}</text>
  <text x="400" y="240" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" fill="#94a3b8">Dev Enterprise Blog</text>
</svg>`;
}

// ─── Write images ────────────────────────────────
const publicDir = path.join(__dirname, "..", "public", "images");

const products = [
  { file: "dell-inspiron.jpg", brand: "DELL", name: "Inspiron 15 Laptop", c1: "#007DB8", c2: "#005a8a" },
  { file: "hp-laserjet.jpg", brand: "HP", name: "LaserJet Pro Printer", c1: "#0096D6", c2: "#006ea0" },
  { file: "hikvision-ip.jpg", brand: "HIKVISION", name: "IP CCTV Camera 4MP", c1: "#EE2A24", c2: "#c41e1a" },
  { file: "asus-router.jpg", brand: "ASUS", name: "RT-AX88U WiFi 6 Router", c1: "#00A7E1", c2: "#0078a3" },
  { file: "samsung-monitor.jpg", brand: "SAMSUNG", name: "24\" Full HD Monitor", c1: "#1428A0", c2: "#0e1f75" },
  { file: "zebronics-km.jpg", brand: "ZEBRONICS", name: "Keyboard Mouse Combo", c1: "#00A650", c2: "#007a3a" },
  { file: "samsung-ssd.jpg", brand: "SAMSUNG", name: "870 EVO 1TB SSD", c1: "#1428A0", c2: "#0e1f75" },
  { file: "canon-webcam.jpg", brand: "CANON", name: "EOS Webcam Kit", c1: "#DC143C", c2: "#a01028" },
  { file: "dell-optiplex.jpg", brand: "DELL", name: "OptiPlex Desktop PC", c1: "#007DB8", c2: "#005a8a" },
  { file: "hp-elitebook.jpg", brand: "HP", name: "EliteBook 840 G9", c1: "#0096D6", c2: "#006ea0" },
  { file: "lenovo-thinkpad.jpg", brand: "LENOVO", name: "ThinkPad E14 Gen 5", c1: "#E2231A", c2: "#b01a13" },
  { file: "asus-vivobook.jpg", brand: "ASUS", name: "VivoBook 15 OLED", c1: "#00A7E1", c2: "#0078a3" },
  { file: "brother-printer.jpg", brand: "BROTHER", name: "DCP-L2541DW Laser", c1: "#1B2F5B", c2: "#121f3d" },
  { file: "epson-ecotank.jpg", brand: "EPSON", name: "EcoTank L3250", c1: "#002F6C", c2: "#001d44" },
  { file: "camera-cp-plus.jpg", brand: "CP PLUS", name: "2MP IP Bullet Camera", c1: "#F7941D", c2: "#c57410" },
  { file: "dvr-hikvision.jpg", brand: "HIKVISION", name: "8CH DVR Kit", c1: "#EE2A24", c2: "#c41e1a" },
  { file: "tp-link-router.jpg", brand: "TP-LINK", name: "Archer AX73 Router", c1: "#4CB848", c2: "#388e34" },
  { file: "dlink-switch.jpg", brand: "D-LINK", name: "24-Port Gigabit Switch", c1: "#005A9C", c2: "#003d6b" },
  { file: "lg-monitor.jpg", brand: "LG", name: "27\" UltraGear Monitor", c1: "#A50034", c2: "#7a0026" },
  { file: "acer-laptop.jpg", brand: "ACER", name: "Aspire 5 Laptop", c1: "#83B81A", c2: "#608613" },
  { file: "samsung-ups.jpg", brand: "SAMSUNG", name: "1000VA UPS Backup", c1: "#1428A0", c2: "#0e1f75" },
  { file: "zebronics-headphone.jpg", brand: "ZEBRONICS", name: "Bluetooth Headphone", c1: "#00A650", c2: "#007a3a" },
  { file: "canon-dslr.jpg", brand: "CANON", name: "EOS 200D DSLR", c1: "#DC143C", c2: "#a01028" },
  { file: "finger-speaker.jpg", brand: "FINGER", name: "Bluetooth Speaker", c1: "#FF6600", c2: "#cc5200" },
  { file: "dell-server.jpg", brand: "DELL", name: "PowerEdge T350 Server", c1: "#007DB8", c2: "#005a8a" },
  { file: "hp-workstation.jpg", brand: "HP", name: "Z4 G5 Workstation", c1: "#0096D6", c2: "#006ea0" },
  { file: "lenovo-desktop.jpg", brand: "LENOVO", name: "IdeaCentre AIO", c1: "#E2231A", c2: "#b01a13" },
  { file: "asus-motherboard.jpg", brand: "ASUS", name: "ROG Strix B650", c1: "#00A7E1", c2: "#0078a3" },
  { file: "samsung-tablet.jpg", brand: "SAMSUNG", name: "Galaxy Tab A9", c1: "#1428A0", c2: "#0e1f75" },
  { file: "lg-projector.jpg", brand: "LG", name: "CineBeam Projector", c1: "#A50034", c2: "#7a0026" },
  { file: "cable-cat6.jpg", brand: "D-LINK", name: "CAT6 Ethernet Cable", c1: "#005A9C", c2: "#003d6b" },
  { file: "ram-corsair.jpg", brand: "CORSAIR", name: "Vengeance 16GB DDR5", c1: "#FFD700", c2: "#ccb000" },
];

for (const p of products) {
  writeFileSync(path.join(publicDir, "products", p.file), productSvg(p.brand, p.name, p.c1, p.c2));
}

// Hero images
const heroes = [
  { file: "hero-1.png", title: "Premium Computers", c1: "#2563eb", c2: "#4338ca" },
  { file: "hero-2.png", title: "CCTV & Security", c1: "#4338ca", c2: "#6d28d9" },
  { file: "hero-3.png", title: "Networking Solutions", c1: "#0891b2", c2: "#2563eb" },
  { file: "hero-4.png", title: "Printers & Office", c1: "#ea580c", c2: "#dc2626" },
];
for (const h of heroes) {
  writeFileSync(path.join(publicDir, "hero", h.file), heroSvg(h.title, h.c1, h.c2));
}

// Brand logos
const brands = [
  "Dell","HP","Lenovo","ASUS","Acer","Canon","Brother","Epson","Samsung","LG","Zebronics","Finger",
  "Hikvision","CP Plus","TP-Link","D-Link","Corsair"
];
for (const b of brands) {
  writeFileSync(path.join(publicDir, "brands", `${b.toLowerCase().replace(/ /g,'-')}.svg`), brandSvg(b));
}

// Blog images
const blogs = [
  "Choosing the Right Laptop", "CCTV Installation Guide", "Networking Basics",
  "Printer Buying Guide", "SSD vs HDD Comparison"
];
for (let i = 0; i < blogs.length; i++) {
  const colors = ["#2563eb","#4338ca","#0891b2","#ea580c","#059669"];
  writeFileSync(path.join(publicDir, "blog", `blog-${i+1}.jpg`), blogSvg(blogs[i], colors[i]));
}

// OG image
writeFileSync(path.join(publicDir, "og-image.jpg"), heroSvg("Dev Enterprise", "#2563eb", "#4338ca"));
writeFileSync(path.join(publicDir, "logo.svg"), `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="40" viewBox="0 0 200 40">
  <text x="0" y="30" font-family="system-ui,sans-serif" font-size="28" font-weight="900" fill="#2563eb">DEV</text>
  <text x="72" y="30" font-family="system-ui,sans-serif" font-size="28" font-weight="300" fill="#0a0a1a">Enterprise</text>
</svg>`);

console.log(`✅ ${products.length} product images created`);
console.log(`✅ ${heroes.length} hero images created`);
console.log(`✅ ${brands.length} brand logos created`);
console.log(`✅ ${blogs.length} blog images created`);
console.log(`✅ Logo & OG image created`);
