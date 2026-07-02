#!/bin/bash
set -e

# ──────────────────────────────────────────────────
#  Dev Enterprise - Setup Script
#  Camera-Web / E-commerce Next.js App
# ──────────────────────────────────────────────────

echo "========================================"
echo "  Dev Enterprise - Setup Script"
echo "========================================"

# ─── Colors ────────────────────────────────────────
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ─── 1. Check Node.js ─────────────────────────────
echo ""
echo -e "${YELLOW}[1/6] Checking Node.js...${NC}"
if command -v node &> /dev/null; then
    echo -e "${GREEN}✓ Node.js $(node -v)${NC}"
else
    echo -e "${RED}✗ Node.js not found. Install from: https://nodejs.org${NC}"
    exit 1
fi

# ─── 2. Check PostgreSQL ──────────────────────────
echo ""
echo -e "${YELLOW}[2/6] Checking PostgreSQL...${NC}"
if command -v psql &> /dev/null; then
    echo -e "${GREEN}✓ PostgreSQL found${NC}"
else
    echo -e "${RED}✗ PostgreSQL not found.${NC}"
    echo "  macOS: brew install postgresql@16 && brew services start postgresql@16"
    echo "  Linux: sudo apt install postgresql && sudo systemctl start postgresql"
    echo "  After install, run: createuser -s postgres"
    exit 1
fi

# ─── 3. Create Database ───────────────────────────
echo ""
echo -e "${YELLOW}[3/6] Setting up database...${NC}"
DB_EXISTS=$(psql -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='dev_enterprise'" 2>/dev/null || true)
if [ "$DB_EXISTS" = "1" ]; then
    echo -e "${GREEN}✓ Database 'dev_enterprise' already exists${NC}"
else
    createdb -U postgres dev_enterprise 2>/dev/null && echo -e "${GREEN}✓ Database 'dev_enterprise' created${NC}" || echo -e "${YELLOW}⚠ Could not create DB automatically. Create manually:${NC}"
    echo "   createdb -U postgres dev_enterprise"
fi

# ─── 4. Install Dependencies ──────────────────────
echo ""
echo -e "${YELLOW}[4/6] Installing dependencies...${NC}"
cd dev-enterprise
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"

# ─── 5. Setup .env ────────────────────────────────
echo ""
echo -e "${YELLOW}[5/6] Setting up environment...${NC}"
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created from .env.example${NC}"
    echo -e "${YELLOW}⚠ Edit .env if you need to change DB credentials or API keys${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# ─── 6. Prisma Setup ──────────────────────────────
echo ""
echo -e "${YELLOW}[6/6] Running Prisma setup...${NC}"
npx prisma generate
echo -e "${GREEN}✓ Prisma client generated${NC}"

npx prisma db push
echo -e "${GREEN}✓ Database schema pushed${NC}"

# ─── Seed Database (Optional) ─────────────────────
echo ""
echo -e "${YELLOW}Seed database with sample data? (y/n)${NC}"
read -r SEED_ANSWER
if [ "$SEED_ANSWER" = "y" ] || [ "$SEED_ANSWER" = "Y" ]; then
    node prisma/generate-images.js 2>/dev/null || true
    npx prisma db seed
    echo -e "${GREEN}✓ Database seeded${NC}"
fi

# ─── Done ──────────────────────────────────────────
echo ""
echo "========================================"
echo -e "${GREEN}  Setup Complete! 🎉${NC}"
echo "========================================"
echo ""
echo "  Start the dev server:"
echo -e "  ${YELLOW}cd dev-enterprise && npm run dev${NC}"
echo ""
echo "  Then open: ${GREEN}http://localhost:3000${NC}"
echo ""
