# Naksh Jewels E-Commerce Platform

A modern, full-stack e-commerce module built with React and Node.js, featuring product listing, shopping cart functionality, and complete Docker deployment.

## 🚀 Features

- **Product Listing**: Browse beautiful jewelry with images, prices, and descriptions
- **Shopping Cart**: Add items, update quantities, and manage your cart
- **Responsive Design**: Mobile-friendly interface with custom CSS
- **State Management**: Context API for global cart state
- **REST API**: Express backend with MongoDB
- **Docker Deployment**: Complete containerization with docker-compose

## 🛠️ Technology Stack

### Frontend
- React 18
- React Router v6
- Context API (State Management)
- Custom CSS (No UI libraries)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

### DevOps
- Docker & Docker Compose
- Nginx (Production server)
- Multi-stage builds

## 📁 Project Structure

```
naksh-jewels-ecommerce/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # Context API providers
│   │   ├── pages/           # Page components
│   │   ├── styles/          # CSS files
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Validation & error handling
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   └── server.js
│   ├── .env
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🐳 Docker Deployment (Recommended)

### Prerequisites
- Docker Desktop installed
- Docker Compose installed

### Quick Start

1. **Clone or navigate to the project directory**
   ```bash
   cd naksh-jewels-ecommerce
   ```

2. **Start all services with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Wait for services to start** (first build may take a few minutes)

4. **Seed sample products** (one-time setup)
   ```bash
   curl -X POST http://localhost:5000/api/products/seed
   ```

5. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:5000/api
   - MongoDB: localhost:27017

### Stop Services
```bash
docker-compose down
```

### Remove All Data (including database)
```bash
docker-compose down -v
```

## 💻 Local Development Setup

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Edit `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/naksh-jewels
   NODE_ENV=development
   ```

4. **Ensure MongoDB is running locally**

5. **Start the backend server**
   ```bash
   npm start
   ```

6. **Seed sample products**
   ```bash
   curl -X POST http://localhost:5000/api/products/seed
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Edit `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000

## 📡 API Documentation

### Products

#### Get All Products
```http
GET /api/products
```

**Response:**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "_id": "...",
      "name": "Diamond Necklace",
      "price": 45000,
      "image": "...",
      "description": "...",
      "category": "Necklaces",
      "stock": 5
    }
  ]
}
```

#### Seed Products (Demo)
```http
POST /api/products/seed
```

### Cart

#### Add to Cart
```http
POST /api/cart
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item added to cart successfully",
  "data": {
    "productId": "...",
    "name": "Diamond Necklace",
    "price": 45000,
    "quantity": 1,
    "total": 45000
  }
}
```

### Health Check
```http
GET /api/health
```

## ✨ Key Features Implementation

### State Management
- **Context API** used for global cart state
- **localStorage** persistence for cart data
- Clean separation of concerns

### Validation
- Request body validation middleware
- Product stock checking
- Error handling for edge cases

### Responsive Design
- Mobile-first approach
- CSS Grid and Flexbox layouts
- No external UI libraries (as per requirements)

### Error Handling
- Centralized error handler
- Specific error types (Validation, Cast, Duplicate)
- User-friendly error messages

## 🎨 Design Highlights

- Premium gold and dark color scheme
- Smooth hover animations
- Card-based product display
- Sticky header with cart badge
- Loading states and spinners
- Empty state handling

## 📝 Development Notes

### Functional Components Only
All React components use functional components with hooks (no class components).

### Clean Folder Structure
- Components organized by type (components, pages, context)
- Styles separated by component
- Backend follows MVC pattern

### Git Commits
Meaningful commit messages following best practices:
- Initial project setup
- Backend API implementation
- Frontend components
- Docker configuration
- Documentation

## 🧪 Testing

### Manual Testing Checklist
- [ ] Products load correctly
- [ ] Add to cart functionality works
- [ ] Cart updates quantity
- [ ] Remove from cart works
- [ ] Cart persists on page reload
- [ ] Responsive on mobile devices
- [ ] Docker deployment successful

## 🚧 Future Enhancements

- User authentication
- Payment integration
- Order management
- Product search and filters
- Wishlist functionality
- Product reviews and ratings

## 👨‍💻 Author

Developed for Naksh Jewels Internship Assessment

## 📄 License

This project is created for assessment purposes.

---

**Note**: This is a demonstration project built for the Naksh Jewels ReactJS & Node.js Internship Assessment.
