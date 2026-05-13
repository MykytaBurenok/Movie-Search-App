Movie Search App
A responsive movie search application built with React, TypeScript, Vite, and TanStack Query. The app searches movies through the TMDB API, shows paginated results, opens a movie details modal, and handles loading, error, and empty states in a user-friendly way.

## Live Demo

[View the live project](https://04-react-query-4xgjm38sp-mykytaburenoks-projects.vercel.app/)



Overview
This project was created as a React project and demonstrates a practical modern frontend setup: component-based architecture, typed data models, server-state management, API integration with Axios, and deployment on Vercel.

The application allows users to enter a movie title, fetch matching movies from TMDB, browse results page by page, and open a modal with additional movie information. The API requests are authenticated with a TMDB Read Access Token stored in environment variables.

Features
Search movies by title using TMDB Search API.

Paginated results using TMDB page parameter and total_pages from the API response.

Data fetching and caching with TanStack Query.

HTTP requests with Axios.

Responsive interface for desktop, tablet, and mobile screens.

Movie details modal with backdrop image, overview, release date, and rating.

Toast notifications for empty search and no-results states using react-hot-toast.

CSS Modules for scoped styling.

Deployment-ready Vite project with Vercel environment variables.
Tech Stack
Technology	Purpose
React	UI library for building components.
TypeScript	Static typing for components, props, and API data.
Vite	Fast development server and production build tool.
Axios	HTTP client for TMDB requests.
TanStack Query	Server-state management, caching, loading, and error states.
React Paginate	Ready-made pagination component.
react-hot-toast	Toast notifications.
CSS Modules	Scoped component styles.
modern-normalize	Base style normalization across browsers.
Vercel	Deployment and environment variable management.

Project Structure
text
src/
  components/
    App/
      App.tsx
      App.module.css
    SearchBar/
      SearchBar.tsx
      SearchBar.module.css
    MovieGrid/
      MovieGrid.tsx
      MovieGrid.module.css
    MovieModal/
      MovieModal.tsx
      MovieModal.module.css
    Loader/
      Loader.tsx
      Loader.module.css
    ErrorMessage/
      ErrorMessage.tsx
      ErrorMessage.module.css
  services/
    movieService.ts
  types/
    movie.ts
  index.css
  main.tsx
This structure follows a component-based approach where each component lives in its own folder with a .tsx file and a .module.css file. Shared domain types are separated from service-specific API response types.

Main Libraries and Why They Were Used
React
React is used to build the application UI out of reusable components such as the search bar, movie grid, loader, error message, and modal. This keeps the code modular and easier to maintain as the app grows.
TypeScript
TypeScript provides safer code by typing movie objects, component props, and API responses. It helps catch mistakes early, especially when working with async requests and nested data from TMDB.

Vite
Vite powers the development server and production build. It also exposes environment variables through import.meta.env, which is why client-side variables must start with the VITE_ prefix.

Axios
Axios is used for HTTP requests because it provides a clean API, easy configuration of headers and query params, and typed responses in TypeScript projects.

TanStack Query
TanStack Query manages server state instead of storing fetched movies manually in local component state. It handles loading, error states, caching, and refetching logic, while the query key ['movies', query, page] makes pagination work correctly across different search terms and pages.

React Paginate
React Paginate is used to render ready-made pagination controls. The component is controlled through props like pageCount, forcePage, and onPageChange, while the actual page data still comes from TMDB.

How the App Works
1. Search input
The user enters a movie title in the SearchBar component. If the input is empty, the app shows a toast notification instead of making a request.[web:232]

2. Fetching movies
When the user submits a valid search, the app stores the new query, resets the current page to 1, and sends a request to the TMDB Search endpoint. The request includes the search text, language, and page number.

3. Query management
TanStack Query fetches the data inside App.tsx with a query key based on the current search string and current page. This allows the app to cache results separately for different searches and pages.

4. Displaying results
The returned results array is passed to MovieGrid, which renders movie cards with poster images and titles. Clicking a card opens the MovieModal with more details about the selected movie.

5. Pagination
The app reads total_pages from the TMDB response and passes it to ReactPaginate. Pagination is displayed only when more than one page of results exists, which keeps the interface clean.

Setup and Run Locally
1. Install dependencies
bash
npm install
2. Create .env.local
text
VITE_TMDB_TOKEN=your_tmdb_read_access_token
3. Start the development server
bash
npm run dev
4. Build for production
bash
npm run build
Deployment on Vercel
Push the project to GitHub.

Import the repository into Vercel.

Add VITE_TMDB_TOKEN in the project environment variables.

Redeploy the project after saving the variable.

Styling
The application uses CSS Modules, which scope styles locally to each component and help avoid class name collisions. The project also uses modern-normalize to make base browser styles more consistent across environments.

Responsive styles were added for pagination and layout spacing so the application remains usable on mobile phones and tablets. Media queries reduce padding, gaps, and button sizes on smaller screens.

Error Handling and UX
The project includes several user experience improvements:

Loader while requests are in progress.

Error message when a request fails.

Toast if the user submits an empty search.

Toast if no movies are found.

Modal close support via backdrop click and Escape key.

These states make the application feel complete instead of only handling the happy path.




Author
Created by Mykyta Burenok as a React + TypeScript movie search project.
