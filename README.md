# 🛒 BazarDor

BazarDor is a modern market price tracking platform that helps users view, compare, and manage daily commodity prices. The application provides an intuitive interface for browsing market data while offering authenticated features for registered users.

![BazarDor Banner](./bazar-hero.png)

## ✨ Features

- 📊 View daily market prices
- 🔍 Browse and search commodity listings
- 👤 User authentication and account management
- 📱 Fully responsive design
- ⚡ Fast performance with Next.js
- 🎨 Modern UI built with Tailwind CSS
- 🗄️ Database integration for storing and managing price data

## 🛠 Tech Stack

### Frontend
- Next.js 15
- React
- TypeScript
- Tailwind CSS

### Backend & Database
- Next.js Server Components
- Drizzle ORM
- Database integration

### Deployment
- Vercel

## 📂 Project Structure

```text
├── app/
├── components/
├── drizzle/
├── lib/
├── public/
├── .env.example
├── package.json
├── tailwind.config.js
└── next.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- Database instance

### Installation

Clone the repository:

```bash
git clone https://github.com/MSKhanDA/BazarDor-Redone.git
cd BazarDor-Redone
```

Install dependencies:

```bash
npm install
```

Copy environment variables:

```bash
cp .env.example .env.local
```

Configure your database credentials in `.env.local`.

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🔑 Environment Variables

Create a `.env.local` file and configure the required variables:

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

Refer to `.env.example` for the full configuration.

## 🧪 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build production app
npm run start    # Start production server
npm run lint     # Run linting
```

## 🌐 Live Demo

**Production:** https://bazar-dor-mskhanda.vercel.app/

## 👨‍💻 Author

**MS Khan**

GitHub: https://github.com/MSKhanDA

## 📄 License

This project was developed for educational and portfolio purposes.
