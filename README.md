# 🌍 Travel Planner

A full-stack travel planning web application that allows users to create trips, organize destinations, visualize locations on Google Maps, and manage their travel itineraries.

This project was developed as a learning project to strengthen my skills in full-stack web development, authentication, database integration, APIs, and modern React/Next.js development.

## ✨ Features

- 🔐 Google and GitHub authentication
- ✈️ Create and manage trips
- 📅 Set trip start and end dates
- 📍 Add destinations to trips
- 🗺️ Interactive Google Maps integration
- 🌎 3D globe visualization
- 🔎 Address geocoding using Google Maps API
- 🧳 Organize travel itineraries
- 🔄 Drag-and-drop itinerary ordering
- 🗑️ Delete destinations and trips
- 🖼️ Upload trip cover images
- 👤 User-specific trip management
- 💾 Persistent PostgreSQL database storage

## 🛠️ Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI / Shadcn-style components
- Lucide Icons

### Backend
- Next.js Server Actions
- Next.js API Routes

### Database
- PostgreSQL
- Neon
- Prisma ORM

### Authentication
- Auth.js / NextAuth
- Google OAuth
- GitHub OAuth

### APIs & Services
- Google Maps JavaScript API
- Google Geocoding API
- UploadThing

### Other Technologies
- React Google Maps API
- React Globe GL
- Three.js
- DnD Kit

## 📁 Project Structure

```text
travelplanner/
│
├── app/
│   ├── api/
│   ├── globe/
│   ├── trips/
│   │   ├── [tripid]/
│   │   └── new/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── Navbar.tsx
│   ├── SortableItinerary.tsx
│   ├── maps.tsx
│   ├── new-location.tsx
│   └── trip-detail.tsx
│
├── lib/
│   ├── actions/
│   ├── auth-actions.ts
│   ├── prisma.ts
│   └── utils.ts
│
├── prisma/
│   └── schema.prisma
│
├── auth.ts
├── next.config.ts
└── package.json
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kushalinisatheeswaran/Trip-Planner-App.git
cd Trip-Planner-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root.

Required environment variables include:

```env
DATABASE_URL=
AUTH_SECRET=

AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

UPLOADTHING_TOKEN=

GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

> ⚠️ Never commit `.env.local`, API keys, database credentials, OAuth secrets, or other sensitive information to GitHub.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🗺️ Google Maps Integration

The application integrates Google Maps for displaying destinations and geocoding addresses.

The project uses:

- **Maps JavaScript API** for interactive maps
- **Geocoding API** for converting destination addresses into coordinates

A valid Google Maps Platform API key and appropriate Google Cloud configuration are required.

## 🔐 Authentication

Authentication is implemented using **Auth.js (NextAuth)**.

Users can sign in using:

- Google
- GitHub

Authenticated users can create and manage their own travel plans.

## 🗄️ Database

The application uses **PostgreSQL hosted on Neon** with **Prisma ORM**.

Main entities include:

```text
User
 └── Trips
      └── Locations
```

Each user can create multiple trips, and each trip can contain multiple destinations.

## 🎯 Project Purpose

This project was created for learning and skills development.

Through this project, I gained practical experience with:

- Full-stack development using Next.js
- React and TypeScript
- PostgreSQL database design
- Prisma ORM
- OAuth authentication
- Google Maps API integration
- Geocoding
- Server Actions and API routes
- Image uploads
- Drag-and-drop interfaces
- Environment variable and API key management
- Git and GitHub version control

## 🔮 Future Improvements

Possible future enhancements include:

- Edit existing trip details
- Google Places autocomplete
- Route visualization between destinations
- Improved globe performance
- More detailed itinerary planning
- Improved mobile responsiveness

## 👩‍💻 Author

**Kushalini Satheeswaran**

Computer Engineering Undergraduate  
University of Sri Jayewardenepura

GitHub: [@kushalinisatheeswaran](https://github.com/kushalinisatheeswaran)

