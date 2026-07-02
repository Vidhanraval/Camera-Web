# Camera-Web

Dev Enterprise — Full-stack e-commerce website built with Next.js 16, Prisma, PostgreSQL, and NextAuth.

## 🚀 Quick Setup (New Laptop / Fresh Machine)

### One-command setup:
```bash
git clone https://github.com/Vidhanraval/Camera-Web.git
cd Camera-Web
chmod +x setup.sh
./setup.sh
```

### Manual setup:

1. **Clone & enter project**
   ```bash
   git clone https://github.com/Vidhanraval/Camera-Web.git
   cd Camera-Web/dev-enterprise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment**
   ```bash
   cp .env.example .env
   ```

4. **Database (PostgreSQL required)**
   ```bash
   createdb -U postgres dev_enterprise
   npx prisma generate
   npx prisma db push
   npx prisma db seed    # optional: sample data
   ```

5. **Start dev server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## 🛠️ Requirements

| Tool | Version |
|------|---------|
| Node.js | 18+ |
| PostgreSQL | 14+ |
| npm | 9+ |

## 📦 Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4, Radix UI, Framer Motion
- **Backend:** Next.js API routes, Prisma ORM, NextAuth.js
- **Database:** PostgreSQL
- **State:** Zustand
- **Forms:** React Hook Form + Zod
