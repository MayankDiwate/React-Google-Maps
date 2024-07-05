# Google Maps Clone with Vite and React

This project is a Google Maps clone built with Vite and React. The application allows users to add a source, stops, and a destination to get the best route, distance, and estimated time of arrival (ETA).

## Features

- Add a source location
- Add multiple stops
- Add a destination
- Get the best route
- View the total distance
- Get the estimated time of arrival (ETA)

## Technologies Used

- HTML5
- Tailwindcss
- Typescript
- React
- Maptiler API
- React Leaflet
- Vite

## Setup and Run Locally

Follow these steps to set up and run the project locally:

1. **Clone the repository:**

   ```bash [Terminal]
   git clone https://github.com/MayankDiwate/google-maps-clone.git
   cd google-maps-clone
   ```

2. **Install dependencies:**

   ```bash [Terminal]
   npm install
   ```

3. **Create a .env file:**

   ```bash [Terminal]
   VITE_MAPTILER_API_KEY=YOUR_MAPTILER_API_KEY
   ```

4. **Run the development server:**

   ```bash [Terminal]
   npm run dev
   ```

**Build for Production**

```bash [Terminal]
npm run build
npm i -g serve
serve build
```
