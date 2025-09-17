# Lendsqr Frontend Engineering Test

This is my implementation of the Lendsqr frontend engineering assessment.  
The project was built using *React + TypeScript + SCSS* with mock APIs and unit testing.

---

## Features
- **Login Page** – Authentication UI (mock login via `mockApi.ts`)
- **Dashboard** – Overview layout (sidebar, top navigation, widgets)
- **Users Page** – Paginated users table with filtering and status badges
- **User Details Page** – Full profile details pulled from mock API, persisted via `localStorage`

---

## Tech Stack
- **React (Vite + TS)** – Frontend framework
- **SCSS** – Styles with variables & mixins for responsive design
- **React Router** – Navigation between pages
- **Vitest + React Testing Library** – Unit testing for components and API flows
- **Mock API (`src/utils/mockApi.ts`)** – Generates 500 users and exposes async functions

---

## Project Structure

src/
├── hooks/         # Use Toasts
├── components/    # Reusable Layout/UI components (DashboardLayout, Sidebar, Table, etc.)
├── pages/         # Login, Dashboard, Users, UserDetails
├── styles/        # SCSS partials and global styles
├── tests/         # Vitest unit tests
├── utils/         # mockApi.ts and helpers
├── types/         # Type definitions


---

## Setup & Running Locally

# Clone the repository
git clone https://github.com/<your-username>/lendsqr-fe-test.git
cd lendsqr-fe-test

# Install dependencies
npm install

# Run development server
npm run dev

# Run unit tests
npm run test

---

## Deployment

The app is deployed on Vercel
👉 [Live Demo Link](https://<your-name>-lendsqr-fe-test.vercel.app)

---

## Testing

* Tests are written with Vitest + React Testing Library.
* Covered pages: Login, Users, User Details.
* Includes positive and negative scenarios.

Run tests with:

npm run test

---

## Responsiveness

* Designed to match the Figma pixel-perfect layouts.
* Fully responsive across desktop, tablet, and mobile breakpoints using SCSS media queries.

---

## Notes

* Instead of external tools like json-server, I used a custom mockApi.ts for this project for simplicity and better test control.

---

## Assessment Requirements Checklist

* [-] 4 Pages implemented (Login, Dashboard, Users, User Details)
* [-] Mock API with 500 users
* [-] LocalStorage persistence
* [-] SCSS styling
* [-] Mobile responsive
* [-] Unit testing with Vitest
* [-] Deployment + Public Repo

---

## Author

Ahmed Ayinla
Frontend Engineer Candidate @ Lendsqr


---