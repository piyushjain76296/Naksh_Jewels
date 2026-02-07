# PowerShell Commands Reference

## 🔧 PowerShell vs Bash Commands

PowerShell uses `Invoke-WebRequest` instead of `curl`. Here are the correct commands:

### Seed Products (PowerShell)
```powershell
Invoke-WebRequest -Uri http://localhost:5000/api/products/seed -Method POST
```

### Get Products (PowerShell)
```powershell
Invoke-WebRequest -Uri http://localhost:5000/api/products -Method GET
```

### Check Backend Health (PowerShell)
```powershell
Invoke-WebRequest -Uri http://localhost:5000/api/health -Method GET
```

### Add to Cart (PowerShell)
```powershell
$body = @{
    productId = "your-product-id"
    quantity = 1
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:5000/api/cart -Method POST -Body $body -ContentType "application/json"
```

---

## 📋 Quick Commands

### Seed Products (Shortest)
```powershell
iwr http://localhost:5000/api/products/seed -Method POST
```

### Get Products
```powershell
iwr http://localhost:5000/api/products
```

---

## 🐳 Docker Commands

### Start Application
```powershell
docker-compose up --build
```

### Stop Application
```powershell
# Press Ctrl+C, then:
docker-compose down
```

### View Logs
```powershell
docker-compose logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb
```

### Restart Services
```powershell
docker-compose restart
```

### Remove Everything (including volumes)
```powershell
docker-compose down -v
```

---

## 🌐 Access URLs

- **Frontend**: http://localhost
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health
- **Products API**: http://localhost:5000/api/products

---

## 🔍 Troubleshooting

### Check if Backend is Running
```powershell
iwr http://localhost:5000/api/health
```

### Check Docker Containers
```powershell
docker ps
```

### Check Container Logs
```powershell
docker-compose logs -f backend
```

---

## 💡 Tips

- `iwr` is short for `Invoke-WebRequest`
- Use `-Method POST` for POST requests
- Use `-Method GET` for GET requests (default)
- Add `-UseBasicParsing` if you get HTML parsing errors
