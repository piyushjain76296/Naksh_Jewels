# Docker Troubleshooting Guide

## ❌ Error: "The system cannot find the file specified"

```
unable to get image: error during connect: Get "http://%2F%2F.%2Fpipe%2FdockerDesktopLinuxEngine/v1.51/images/...": 
open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified.
```

### 🔧 Solution: Start Docker Desktop

This error means **Docker Desktop is not running**.

#### Steps to Fix:

1. **Open Docker Desktop**
   - Search for "Docker Desktop" in Windows Start menu
   - Click to launch the application
   - Wait for Docker to fully start (whale icon in system tray should be steady, not animated)

2. **Verify Docker is Running**
   ```bash
   docker --version
   docker ps
   ```
   
   If these commands work, Docker is running!

3. **Try Again**
   ```bash
   docker-compose up --build
   ```

---

## 📋 Common Docker Issues

### Issue 1: Docker Desktop Not Installed

**Error**: `docker: command not found` or `docker-compose: command not found`

**Solution**: 
- Download and install Docker Desktop from: https://www.docker.com/products/docker-desktop/
- Restart your computer after installation

### Issue 2: WSL 2 Not Enabled (Windows)

**Error**: Docker Desktop requires WSL 2

**Solution**:
```powershell
# Run in PowerShell as Administrator
wsl --install
wsl --set-default-version 2
```
Then restart your computer.

### Issue 3: Port Already in Use

**Error**: `Bind for 0.0.0.0:80 failed: port is already allocated`

**Solution**:
```bash
# Check what's using the port
netstat -ano | findstr :80

# Stop the conflicting service or change ports in docker-compose.yml
# For example, change frontend port from 80 to 8080:
ports:
  - "8080:80"
```

### Issue 4: Build Fails - No Space Left

**Error**: `no space left on device`

**Solution**:
```bash
# Clean up Docker
docker system prune -a --volumes
```

### Issue 5: MongoDB Connection Issues

**Error**: `MongooseServerSelectionError`

**Solution**:
- Wait longer for MongoDB to initialize (can take 30-60 seconds)
- Check MongoDB logs: `docker-compose logs mongodb`
- Ensure health checks are passing

---

## ✅ Verification Steps

After starting Docker Desktop:

```bash
# 1. Check Docker is running
docker --version

# 2. Check Docker Compose
docker-compose --version

# 3. List running containers
docker ps

# 4. Start your application
docker-compose up --build
```

---

## 🚀 Alternative: Run Without Docker

If Docker continues to have issues, you can run the application locally:

### Backend:
```bash
# Ensure MongoDB is installed and running locally
cd backend
npm install
npm start
```

### Frontend:
```bash
cd frontend
npm install
npm start
```

Then access:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 📞 Still Having Issues?

1. **Check Docker Desktop Status**
   - Look for the whale icon in system tray
   - Should be steady (not animated)
   - Right-click → Check for updates

2. **Restart Docker Desktop**
   - Right-click whale icon → Quit Docker Desktop
   - Start it again

3. **Check System Requirements**
   - Windows 10/11 64-bit
   - Virtualization enabled in BIOS
   - At least 4GB RAM available

4. **View Logs**
   ```bash
   docker-compose logs
   docker-compose logs backend
   docker-compose logs frontend
   docker-compose logs mongodb
   ```
