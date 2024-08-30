# BeakBook

BeakBook is a web application that allows users to identify birds, log sightings, and track their bird-watching activities. Built with React, TypeScript, Node.js, and Express, this app aims to provide a simple and user-friendly interface for bird enthusiasts to keep track of their sightings.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Features](#features)
- [Improvements](#improvements)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/<yourusername>/beakbook.git
   cd beakbook
1. Install the dependencies:

   ```bash
   npm install
1. Create an env file with the following variables:

   ```plaintext
    MONGODB_URI=your_mongodb_uri
    OPENAI_API_KEY=your_openai_api_key
## Start the development servers:

### Frontend:

```bash
  npm run dev
  ```
  
The application will be available at http://localhost:5173.

Backend (Node.js/Express):
```bash
node server/server.js
```
The backend server will be running on port 3000.

### Usage
Once the application is running, you can:

* Sign up or log in to your account.
* Log a new bird sighting, including details such as species, date, and location.
* Identify a bird by entering information about its appearance and behavior.
* View and manage your logged sightings.

### Project Structure
The project is organized into the following directories:

* src: Contains the frontend React application code, including components, pages, and styles.
* server: Contains the backend Node.js/Express server code, including routes and data models.
* assets: Contains static assets such as images and icons.

### Features
* User Authentication: Sign up and log in to access personalized account.
* Bird Identification: Input details about a bird to get identification suggestions.
* Bird Sightings Log: Record and manage your bird sightings. Save them to keep track and look at them later.
* Responsive Design: The app is responsive and works well on both desktop and mobile devices.

### Improvements
* Styling: Move heavy React inline styles to separate CSS files for better maintainability.
* API Calls: Refactor API calls by moving them to a separate services folder to follow best practices.
* Unit Tests: Expand unit testing coverage to ensure application stability and catch potential bugs early.

