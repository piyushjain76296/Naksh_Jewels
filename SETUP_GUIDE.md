# Quick Setup Guide - Naksh Jewels E-Commerce

## 🚀 Fastest Way to Run (Docker)

```powershell
# 1. Navigate to project
cd d:\Naksh_jewels\naksh-jewels-ecommerce

# 2. Start all services
docker-compose up --build

# 3. In a new PowerShell terminal, seed sample products
Invoke-WebRequest -Uri http://localhost:5000/api/products/seed -Method POST

# Or use the short form:
iwr http://localhost:5000/api/products/seed -Method POST

# 4. Open browser
# http://localhost
```

## 📋 What You'll See

- **Product Listing**: 6 beautiful jewelry items
- **Add to Cart**: Click any "Add to Cart" button
- **View Cart**: Click "Cart" in navigation
- **Update Quantities**: Use +/- buttons
- **Remove Items**: Click "Remove" button

## 🛑 To Stop

```bash
# Press Ctrl+C in the docker-compose terminal, then:
docker-compose down
```

## 📁 Project Location

```
d:\Naksh_jewels\naksh-jewels-ecommerce\
```

## 📝 Next Steps for Submission

1. **Create GitHub Repository**
   ```bash
   # On GitHub, create new repository
   # Then push:
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Test Docker** (if not already done)
   ```bash
   docker-compose up --build
   ```

3. **Take Screenshots** (optional)
   - Product listing page
   - Cart page with items
   - Docker running

4. **Submit**
   - GitHub repository link
   - README.md (already included)

## ✅ All Requirements Met

- ✅ React with functional components
- ✅ No UI libraries (custom CSS)
- ✅ Context API for state
- ✅ Product listing and cart
- ✅ Express backend with MongoDB
- ✅ Validation and error handling
- ✅ Docker setup (frontend, backend, compose)
- ✅ Comprehensive README
- ✅ Git version control
