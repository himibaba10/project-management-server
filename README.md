# Project Management Server

This document provides an overview of the API routes available in the Project Management Server, including their request parameters and response parameters.

---

## API Routes

### 1. **User Routes**

#### `POST /api/users/register`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "fullName": {
      "firstName": "string",
      "lastName": "string (optional)"
    },
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      "user": {
        "fullName": {
          "firstName": "string",
          "lastName": "string"
        },
        "email": "string"
      },
      "token": "string"
    }
  }
  ```

#### `POST /api/users/login`
- **Description**: Authenticate a user.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "data": {
      "user": {
        "fullName": {
          "firstName": "string",
          "lastName": "string"
        },
        "email": "string"
      },
      "token": "string"
    }
  }
  ```

#### `GET /api/users/profile`
- **Description**: Retrieve the authenticated user's profile.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User profile fetched successfully",
    "data": {
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "email": "string"
    }
  }
  ```

#### `PUT /api/users/profile`
- **Description**: Update the authenticated user's profile.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "fullName": {
      "firstName": "string (optional)",
      "lastName": "string (optional)"
    },
    "email": "string (optional)",
    "password": "string (optional)"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User profile updated successfully",
    "data": {
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "email": "string"
    }
  }
  ```

#### `POST /api/users/logout`
- **Description**: Log out the authenticated user.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User logged out successfully"
  }
  ```

---

### 2. **Project Routes**

#### `GET /api/projects`
- **Description**: Retrieve all projects for the authenticated user.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Projects fetched successfully",
    "data": [
      {
        "projectId": "string",
        "title": "string",
        "description": "string",
        "status": "active | archived",
        "createdAt": "string",
        "updatedAt": "string"
      }
    ]
  }
  ```

#### `POST /api/projects`
- **Description**: Create a new project.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string (optional)",
    "status": "active | archived (optional)"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Project created successfully",
    "data": {
      "projectId": "string",
      "title": "string",
      "description": "string",
      "status": "active | archived",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```

#### `PUT /api/projects/:projectId`
- **Description**: Update an existing project.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "title": "string (optional)",
    "description": "string (optional)",
    "status": "active | archived (optional)"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Project updated successfully",
    "data": {
      "projectId": "string",
      "title": "string",
      "description": "string",
      "status": "active | archived",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```

#### `DELETE /api/projects/:projectId`
- **Description**: Delete a project.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Project deleted successfully"
  }
  ```

---

### 3. **Task Routes**

#### `GET /api/projects/:projectId/tasks/:taskId`
- **Description**: Retrieve a specific task from a project.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Task fetched successfully",
    "data": {
      "taskId": "string",
      "name": "string",
      "description": "string",
      "status": "to-do | in-progress | completed",
      "dueDate": "string",
      "priority": "low | medium | high",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```

#### `POST /api/projects/:projectId/tasks`
- **Description**: Add a new task to a project.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string (optional)",
    "status": "to-do | in-progress | completed (optional)",
    "dueDate": "string (optional)",
    "priority": "low | medium | high (optional)"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Task added successfully",
    "data": {
      "taskId": "string",
      "name": "string",
      "description": "string",
      "status": "to-do | in-progress | completed",
      "dueDate": "string",
      "priority": "low | medium | high",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```

#### `PUT /api/projects/:projectId/tasks/:taskId`
- **Description**: Update an existing task in a project.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "name": "string (optional)",
    "description": "string (optional)",
    "status": "to-do | in-progress | completed (optional)",
    "dueDate": "string (optional)",
    "priority": "low | medium | high (optional)"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Task updated successfully",
    "data": {
      "taskId": "string",
      "name": "string",
      "description": "string",
      "status": "to-do | in-progress | completed",
      "dueDate": "string",
      "priority": "low | medium | high",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```

#### `DELETE /api/projects/:projectId/tasks/:taskId`
- **Description**: Delete a task from a project.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Task deleted successfully"
  }
  ```

---

## Notes
- All routes requiring authentication must include a valid `Authorization` header with a Bearer token.
- Ensure to handle errors appropriately in your client application based on the response status codes.

