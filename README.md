# Technical Assessment: Angular & NgRx "SpaceX Explorer" v1.0

Welcome! The goal of this technical assessment is to refactor, debug, and finalize an Angular application built for exploring SpaceX rocket launches. 

The application uses **Angular Material** for the UI and **NgRx** for global state management. However, the previous developer rushed the initial implementation. The current codebase contains memory leaks, performance bottlenecks, a critical architectural flaw inside the NgRx Reducer, and missing core async features.


## 🎯 Your Missions

1. **Implement the Missing NgRx Effect:**
   - Currently, the component triggers raw HTTP calls directly via the service. Refactor this logic so the component dispatches a `loadLaunches` action instead.
   - Create a **NgRx Effect** from scratch to handle the asynchronous stream fetching data from the SpaceX API.
2. **Feature Development (Details View & Favorites):**
   - Implement the launch details view, mapped to the `/launch/:id` route.
   - Leverage the NgRx store to manage the "Favorite" state of a launch. This state must persist seamlessly when navigating back and forth between the list and details views.
3. **Project configuration :** 
    - Configure the project to be production ready

## 🛠️ Technical Specifications
- **List Endpoint:** `https://api.spacexdata.com/v4/launches/past`
- **Details Endpoint:** `https://api.spacexdata.com/v4/launches/{id}`
- Angular Material is pre-installed. Baseline layouts and grid styling can be found in the component's SCSS file.

## 📋 Evaluation Criteria
- **Clean Architecture:** Proper separation of concerns (Smart vs. Presentational components, encapsulating logic away from templates).
- **RxJS & NgRx Mastery:** Clean stream manipulation, avoiding nesting subscriptions, keeping the state strictly immutable, and leveraging memoized selectors.
- **Modern Angular Standards:** Proper usage of Standalone components and modern control flow (or Signals if you choose to introduce them).
- **TypeScript Rigor:** Explicit interface definitions for API payloads. The use of `any` is strictly prohibited.
- **Git Hygiene:** Clean, atomic, and descriptive commit history.

## 🚀 How to Run the Project

### Requirements
- **Node.js**: v20 or higher
- **Docker**: For production containerization

### 1. Local Development (Angular CLI)

#### Install Dependencies:
```bash
npm install
```

#### Run the Dev Server:
```bash
npm start
```
The application will be available locally at `http://localhost:4200/`.

#### Run Unit Tests (Vitest):
```bash
npm test
```

#### Build for Production:
```bash
npm run build
```

---

### 2. Production Deployment (Docker Multi-stage)

We have configured a production-ready, highly optimized multi-stage `Dockerfile` served via Nginx with HTML5 client-side routing fallback.

#### Build the Docker Image:
```bash
docker build -t spacex-explorer .
```

#### Run the Docker Container:
```bash
docker run -d -p 8080:80 spacex-explorer
```
The application will be served instantly at `http://localhost:8080/`.

---

## 📘 Comprehensive Architecture & Bug Fixes Report

We created a detailed technical report specifically for the reviewer outlining:
- **NgRx Architecture & Memoized Selectors**: In-depth explanation of the state model.
- **Memory Leak Resolution**: Implementation of reactive patterns with the `async` pipe.
- **Permanent LocalStorage Favorites**: How the favorite state is synchronized and persisted.
- **TypeScript Strict Typing**: Elimination of all `any` occurrences.
- **Angular 21 & Class Fields Fix**: Technical analysis of the effects injection order issue resolved using `inject()`.

You can view the full documentation in your workspace at:
👉 **[SPACE_X_EXPLORER_REPORT.md](SPACE_X_EXPLORER_REPORT.md)**
