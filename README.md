# Anmlpedia

Anmlpedia is a full-stack web application that allows users to create, organize, and manage animal species and their respective groups. Built with **React (Vite)** on the front end and **Java Spring Boot** on the back end, the app supports CRUD (Create, Read, Update, Delete) operations for groups, species, and animals. It also features an interactive interface to streamline the management process.

## Features

- **CRUD Operations**: 
  - **Groups**: Users can create, update, and delete groups to organize species and animals.
  - **Species**: Species can be added to, updated within, or removed from groups.
  - **Animals**: Detailed information about animals can be created, updated, or deleted and linked to specific species.
- **Responsive UI**: A user-friendly interface built with React and styled with CSS for ease of navigation.
- **Data Persistence**: All changes are saved and retrieved from a MySQL database, ensuring persistent data storage across sessions.

## Tech Stack

- **Frontend**: React, Vite, HTML, CSS
- **Backend**: Java Spring Boot, RESTful APIs
- **Database**: MySQL (via MySQL Workbench)
- **Version Control**: Git, GitHub
- **Tools**: VS Code, Swagger (for API testing)

## Getting Started

### Prerequisites

- Java 17+ (for backend)
- Node.js and npm (for frontend)
- MySQL (for database)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jscotton13/anmlpedia.git
2. **Backend Setup (Java Spring Boot)**:
- Navigate to the backend directory:
  ```
  cd backend
  ```
- Install dependencies:
  ```
  mvn install
  ```
- Run the backend application:
  ```
  mvn spring-boot:run
  ```

3. **Frontend Setup (React)**:
- Navigate to the frontend directory:
  ```
  cd frontend
  ```
- Install dependencies:
  ```
  npm install
  ```
- Run the development server:
  ```
  npm run dev
  ```

4. **Database Setup**:
- Set up a MySQL database and create the required tables based on the provided schema. You can find the schema in the `backend` directory or inside the database migration folder. Note, you may need to change the applications-property file to point to the localhost.

5. **Access the application**:
- Visit `http://localhost:5173` in your browser for the front-end interface.

## Contributing

Feel free to fork the repository and submit pull requests for bug fixes or new features.

## License

This project is licensed under the MIT License.
