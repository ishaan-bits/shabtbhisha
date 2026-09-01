# Satabhisha

A modern website for **Satabhisha**, a Reiki healing practice founded by Astitwa Ankur. Built with Next.js, Firebase, and Tailwind CSS.

**Live site:** [shabtbhisha.vercel.app](https://shabtbhisha.vercel.app)

## Features

### Public Site
- **Home** — Hero section, services overview, testimonials, and call-to-action
- **About** — Founder story and healing philosophy
- **Services** — Individual sessions and transformation packages
- **Testimonials** — Client reviews and experiences
- **Book a Session** — Multi-step booking form with calendar, time slots, and contact details

### Admin Console
- **Dashboard** — Overview of bookings, testimonials, and contacts
- **Bookings** — View, filter, update status, and manage client bookings
- **Testimonials** — Add, edit, feature, or hide client reviews
- **Services** — Manage healing services and packages
- **Contacts** — View and manage contact form submissions
- **Content** — Edit site copy (hero text, founder info, contact details)
- **Settings** — Admin profile and site configuration

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router, Turbopack)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) 4
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev)
- **Auth:** [Firebase Authentication](https://firebase.google.com/docs/auth) (Email/Password)
- **Database:** [Cloud Firestore](https://firebase.google.com/docs/firestore)
- **Deployment:** [Vercel](https://vercel.com)

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Authentication (Email/Password) and Firestore enabled

### Installation

```bash
git clone https://github.com/ishaan-bits/shabtbhisha.git
cd shabtbhisha
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build & Start

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── about/page.tsx        # About page
│   ├── services/page.tsx     # Services page
│   ├── testimonials/page.tsx # Testimonials page
│   ├── book/page.tsx         # Booking page
│   └── admin/
│       ├── page.tsx          # Admin login
│       ├── layout.tsx        # Admin auth provider
│       └── (protected)/      # Authenticated admin pages
│           ├── dashboard/
│           ├── bookings/
│           ├── testimonials/
│           ├── services/
│           ├── contacts/
│           ├── content/
│           └── settings/
├── components/
│   ├── admin/                # Admin layout, provider, shell
│   ├── AnimatedSection.tsx   # Scroll-triggered animations
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── SiteShell.tsx         # Hides navbar/footer on admin routes
├── hooks/
│   └── useSiteData.ts        # Firestore data hook for public pages
└── lib/
    └── firebase.ts           # Firebase config and lazy initialization
```

## Firestore Security Rules

The `firestore.rules` file defines access control:

| Collection | Public | Authenticated |
|------------|--------|---------------|
| `bookings` | Create | Read, Update, Delete |
| `contacts` | Create | Read, Update, Delete |
| `testimonials` | Read | Full access |
| `services` | Read | Full access |
| `siteContent` | Read | Full access |

Deploy rules with:

```bash
firebase deploy --only firestore:rules
```

## Deployment

The site is deployed on Vercel. Push to `main` triggers automatic production deployment.

```bash
# Manual deploy
npx vercel --yes --prod
```

## License

Private — built by Ishaan Parimal.
