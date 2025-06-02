# Hypersense Payments Cost Dashboard

A modern dashboard for monitoring and analyzing card-payment costs, deviations, and settlement status.

## Features

- Real-time monitoring of payment processing costs
- Cost deviation detection and analysis
- Settlement breakdown and reconciliation
- Multi-dimensional cost analysis (by card network, region, etc.)
- Interactive visualizations and trend analysis

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** Headless UI, Tremor
- **Charts:** Chart.js
- **Backend:** Supabase
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hypersense-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── dashboard/    # Dashboard-specific components
│   │   ├── layout/       # Layout components
│   │   └── shared/       # Reusable components
│   ├── lib/             # Utility functions and API clients
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Helper functions
├── public/             # Static assets
└── styles/            # Global styles
```

## Development

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use Tailwind CSS for styling
- Follow component-based architecture
- Implement responsive design patterns

## Deployment

The application is configured for deployment on Vercel:

1. Push your code to a Git repository
2. Import the project to Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. # test
