# 🎬 Movie Review & Trailer Streaming Application

A full-stack web application for discovering movies, watching trailers, and sharing reviews with star ratings. Built with **React** + **Spring Boot** + **MongoDB Atlas**, containerized with **Docker**, and deployed on **Render**.

**Production Architecture**: React Frontend → Render (Dockerized Spring Boot API) → MongoDB Atlas (Cloud Database)

**Special Features**: 
- Role-based access control (RBAC) with JWT authentication
- Global movie search by title, genre, and IMDB ID
- OTT platform tracking (Netflix, Prime Video, Disney+, etc.)
- Admin/Developer content management with IMDB validation
- Docker containerization for production deployment
- Cloud-based MongoDB Atlas integration

## 🎯 What is This Project?

This is a comprehensive, production-grade movie discovery and review platform combining user-generated content with professional movie metadata. It demonstrates full-stack architecture, secure authentication, and cloud deployment best practices.

**What Users Can Do:**

- **Discover movies** through a searchable database with detailed metadata and filtering
- **Watch trailers** directly within the app via embedded, responsive YouTube players
- **Share reviews** with 1-5 star ratings and detailed commentary
- **Track streaming availability** across multiple OTT platforms
- **Role-based content management** - Admin/Developer users can add and manage movies
- **Secure authentication** with JWT tokens and role-based authorization

**Perfect for**: Movie enthusiasts, content creators, developers showcasing production-grade applications, and anyone wanting a secure, scalable movie platform.


## How to Run This Project

### 🔴 Development Mode (Local)

**Step 1: Clone & Setup Backend**
```bash
cd backend

# Install dependencies (Maven handles this)
mvn clean install

# Update application.properties with local MongoDB
# spring.data.mongodb.uri=mongodb://localhost:27017/movie_review_db

# Run backend
mvn spring-boot:run

# Backend available at http://localhost:8080
```

**Step 2: Setup Frontend**
```bash
cd frontend

# Install Node dependencies
npm install

# Configure local API endpoint
# Edit .env.development: VITE_API_URL=http://localhost:8080/api/v1

# Start Vite dev server
npm run dev

# Frontend available at http://localhost:5173
```

**Step 3: Open in Browser**
```
Frontend: http://localhost:5173
Backend API: http://localhost:8080
MongoDB: Local instance on localhost:27017
```


## ✨ Key Features

### 🔐 1. JWT-Based Authentication & Authorization

✅ Secure login and registration system  
✅ Passwords hashed using BCrypt  
✅ JWT tokens with configurable expiration time  
✅ Role-based access control (RBAC) enforced  
✅ Unauthorized access automatically blocked with 401 redirects  

**Roles:**
- **USER** → Default role. Can review movies and view content.
- **DEVELOPER** → Can add/update movies in the database.
- **ADMIN** → Full system access. Can delete movies and manage users.

### 🎬 2. Movie Management System

✅ View all movies with complete metadata  
✅ Add movies with validation (Admin/Developer only)  
✅ Update movie details and OTT platforms  
✅ Delete movies (Admin only with confirmation)  
✅ IMDB ID validation enforced (format: tt + 7-9 digits)  
✅ Stores: title, release date, genres, trailer links, posters, backdrops, OTT platforms

### ⭐ 3. Review & Rating System

✅ 1–5 star rating system with visual feedback  
✅ Add detailed text reviews alongside ratings  
✅ Edit/Delete only your own reviews  
✅ Reviews linked to specific IMDB ID  
✅ Real-time review display with sorting options  
✅ Pagination with "Load More" functionality  
✅ Timestamps on reviews (created/updated)

### 🔍 4. Global Movie Search

✅ Search by:
  - Movie title (case-insensitive)
  - Genre name
  - IMDB ID (format: tt + 7-9 digits)  

✅ Instant search results with result count  
✅ Modern search bar with visual feedback  
✅ Redirects to dedicated search results page

### 📺 5. Embedded YouTube Trailer Player

✅ Automatically converts YouTube links to embeddable format  
✅ Responsive iframe that adapts to screen size  
✅ Auto-plays on page load  
✅ Fallback handling if invalid or missing link  
✅ Full-screen viewing support

### 🌍 6. OTT Platform Tracking

✅ Track streaming availability across multiple platforms  
✅ Platforms: Netflix, Amazon Prime, Disney+, Hulu, HBO Max, Apple TV, etc.  
✅ Add/remove platforms when adding or editing movies  
✅ Display platform availability on movie details page  
✅ Optional field - movies can exist without OTT platform info  
✅ Stored dynamically in MongoDB

### ☁️ 7. Cloud Database (MongoDB Atlas)

✅ No local database dependency in production  
✅ Automatic backups and high availability  
✅ Environment variable-based connection string management  
✅ Secure connection with SSL/TLS encryption  
✅ Network access managed through IP whitelist  
✅ Scalable storage with automatic data replication


## 🏗️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & development server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Context API** - State management
- **CSS Modules** - Component-scoped styling

### Backend
- **Spring Boot 3.2** - Web framework
- **Spring Security** - Authentication & authorization
- **Spring Data MongoDB** - Database ORM for MongoDB
- **JWT (JJWT)** - Token-based authentication
- **BCrypt** - Password hashing & verification
- **Maven** - Build automation tool
- **Java 17** - Programming language

### Database
- **MongoDB Atlas** - Cloud-hosted NoSQL database

### DevOps & Deployment
- **Docker** - Container orchestration
- **Docker Hub** - Container registry
- **Render** - Application hosting platform
- **Eclipse Temurin JDK 17** - Docker base image

## 🚀 Getting Started

### Prerequisites

- **Java 17+** - For backend
- **Node.js 16+** - For frontend
- **MongoDB** - Database (local or cloud)
- **Maven** - Build tool

### Backend Setup

#### 1. Install Java & Maven

```bash
# Check Java version (should be 17+)
java -version

# Check Maven version
mvn -version

# If not installed, download from:
# Java: https://adoptium.net/
# Maven: https://maven.apache.org/download.cgi
```

#### 2. Build & Run Backend

```bash
cd backend

# Build the project
mvn clean package

# Run the application
mvn spring-boot:run

# The backend will start at http://localhost:8080
```

### Frontend Setup

#### 1. Install Dependencies

```bash
cd frontend
npm install
```

#### 2. Configure API URL

Edit `frontend/.env.development`:

```
VITE_API_URL=http://localhost:8080/api/v1
```

#### 3. Run Development Server

```bash
npm run dev

# Frontend will start at http://localhost:5173
```


## 🔒 Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Frontend stores token in localStorage
4. Axios interceptor adds token to all API requests
5. Backend validates token in security filter
6. Protected endpoints require valid token

### ⚙️ Backend Configuration

**application.properties (Spring Boot)**
```properties
spring.application.name=movie-review-backend
spring.data.mongodb.uri=${MONGO_URI}
spring.data.mongodb.database=movie_review_db

server.port=${PORT:8080}

jwt.secret=${JWT_SECRET}
jwt.expiration=86400000

logging.level.root=INFO
logging.level.com.moviereview=DEBUG
```

### 🌍 Frontend Configuration

**vite.config.js**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
```

### 🔒 Security Best Practices

✅ **Secrets Management**
- Never hardcode secrets in source code
- Use environment variables for all sensitive data
- Rotate JWT secret periodically

✅ **Network Security**
- MongoDB Atlas IP whitelist configured
- HTTPS enforced on Render
- CORS restricted to known origins

✅ **Data Protection**
- BCrypt for password hashing (cost factor: 10)
- JWT tokens expire in 24 hours
- Sensitive fields excluded from API responses

✅ **Access Control**
- Role-based access control on all endpoints
- [User] can only delete own reviews
- [Admin] can manage all content


## 📝 Development Notes

### Managing User Roles
```bash
# Update user role in MongoDB:
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "ADMIN" } }
)

# Valid roles: USER, DEVELOPER, ADMIN
```

### Adding a New Movie
1. Login with ADMIN or DEVELOPER role
2. Click "Add Movie" button in header
3. Fill mandatory fields:
   - Title
   - IMDB ID (format: tt + 7-9 digits)
   - Release Date
   - Genres (comma-separated)
   - Trailer URL (YouTube link)
   - Poster URL
   - Backdrop Images (optional)
4. Optionally add OTT Platforms
5. Submit form - auto-redirects to movie page

### Creating Test Reviews
1. Register a test account (gets USER role by default)
2. Navigate to any movie
3. Fill out review form with rating and text
4. Submit review

### Testing Global Search
1. Navigate to home page
2. Use search bar at top
3. Search by:
   - Movie title (case-insensitive)
   - Genre name
   - IMDB ID (tt + 7-9 digits)

### JWT Configuration
```yaml
jwt.secret=YOUR_SECRET_KEY          # Min 32 chars recommended
jwt.expiration=86400000              # Expiration in milliseconds (24 hours)
```

### IMDB ID Format Validation
- Must start with "tt"
- Followed by 7-9 digits
- Example: tt0111161 (The Shawshank Redemption)
- Invalid examples: t01234567, tt012345 (too short), tt0123456789 (too long)


## 📚 Learning Resources

- [React Router Documentation](https://reactrouter.com/)
- [Spring Boot Guide](https://spring.io/guides/gs/spring-boot/)
- [MongoDB University](https://university.mongodb.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [Docker Documentation](https://docs.docker.com/)
- [Render Deployment Guide](https://render.com/docs)
- [Axios Documentation](https://axios-http.com/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - Free to use for educational and commercial projects

## 👨‍💻 Author

**Vadiithya Manoj Kumar**  
Full-Stack Developer | Spring Boot | React | MongoDB | Docker | Render

### Key Expertise Areas
- Full-stack web application development
- Microservices architecture
- Cloud deployment (Render, AWS, Azure)
- Docker containerization
- MongoDB database design
- JWT authentication & security
- React component development
- Spring Boot REST APIs

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the author.

---

**Happy coding! 🚀 Deploy with confidence!**
