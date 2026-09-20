# Tuition Forum Dhaka

A tuition marketplace connecting Guardians and Tutors in Bangladesh, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma, and Auth.js (NextAuth v5).

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Copy the environment file and fill in your credentials:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

3. Push the Prisma schema to your PostgreSQL database:
   \`\`\`bash
   npx prisma db push
   npx prisma generate
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000).

## Project Structure

- \`src/app/(auth)\` — Login & registration routes
- \`src/app/(public)\` — Public marketplace pages
- \`src/app/(dashboard)\` — Tutor & Guardian dashboards
- \`src/app/admin\` — Admin panel
- \`src/app/api\` — Route handlers (auth, tuitions, applications, payments, admin)
- \`src/lib\` — Prisma client, utils, constants
- \`src/schemas\` — Zod validation schemas
- \`prisma/schema.prisma\` — Database schema

## Deployment

\`\`\`bash
npx prisma db push
npx prisma generate
npm run build
npm start
\`\`\`
