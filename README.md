# **Express Server with Logging and Authorization Middleware**  

## **Description**  
This program creates a basic **Express.js server** that includes:  
- **Middleware for logging requests**: Logs each request's **method, URL, and timestamp**.  
- **Middleware for authorization**: Restricts access to the `/admin` route unless `user=admin` is provided in the query parameters.  
- **Three routes**:  
  - `/` (home) - Open to everyone.  
  - `/public` - Open to everyone.  
  - `/admin` - Restricted access (requires `user=admin`).  

The server listens on **port 3000** and implements authentication and request tracking using middleware.  

---

## **Features**  
✔️ **Logs all incoming requests** with method, URL, and timestamp.  
✔️ **Restricts access to `/admin`** unless `user=admin` is provided.  
✔️ **Handles multiple routes** with different access levels.  
✔️ **Lightweight Express.js implementation** for handling HTTP requests.  

---

## **Programmers**  
 **Stephanos Khoury**  
 **Rula Yosef**  

---

## **Example**  
When a client visits `http://localhost:3000/`, `http://localhost:3000/public`, or `http://localhost:3000/admin?user=admin`, the server responds with appropriate messages.  

---

## **Code**

### **Server Code (`server.js`)**
```javascript
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware for Logging Requests
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} request to ${req.url}`);
    next();
});

// Middleware for Authorization (applied only to /admin)
const authMiddleware = (req, res, next) => {
    const user = req.query.user;
    
    if (user !== "admin") {
        return res.status(403).json({ message: "Access Denied" });
    }
    
    next();
};

// Routes

// Home Page (Available to Everyone)
app.get("/", (req, res) => {
    res.send("Welcome to the homepage!");
});

// Admin Page (Protected - Only accessible if user=admin)
app.get("/admin", authMiddleware, (req, res) => {
    res.send("Welcome to the admin page!");
});

// Public Page (Available to Everyone)
app.get("/public", (req, res) => {
    res.send("This is a public page.");
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

## **Example Output**  

### **Visiting the Home Page (`/`)**  
 **URL:** `http://localhost:3000/`  
 **Response:**  
```sh
Welcome to the homepage!
```

### **Visiting the Public Page (`/public`)**  
 **URL:** `http://localhost:3000/public`  
 **Response:**  
```sh
This is a public page.
```

### **Visiting the Admin Page Without Authorization (`/admin`)**  
 **URL:** `http://localhost:3000/admin`  
 **Response:**  
```json
{"message": "Access Denied"}
```

### **Visiting the Admin Page With Authorization (`/admin?user=admin`)**  
 **URL:** `http://localhost:3000/admin?user=admin`  
 **Response:**  
```sh
Welcome to the admin page!
```
