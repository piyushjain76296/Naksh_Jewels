# 🚀 Push to GitHub - Step by Step

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name**: `naksh-jewels-ecommerce`
3. **Description**: 
   ```
   Mini e-commerce module built with React and Node.js for Naksh Jewels internship assessment. Features product listing, shopping cart with Context API state management, Express REST API, MongoDB database, and complete Docker deployment with docker-compose.
   ```
4. **Visibility**: Public
5. **DO NOT** check "Initialize with README" (we already have one)
6. Click **"Create repository"**

## Step 2: Push Your Code

After creating the repository, run these commands in PowerShell:

```powershell
# Navigate to your project
cd d:\Naksh_jewels\naksh-jewels-ecommerce

# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/naksh-jewels-ecommerce.git

# Verify remote was added
git remote -v

# Push to GitHub
git push -u origin main
```

### If you get "remote origin already exists" error:
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/naksh-jewels-ecommerce.git
git push -u origin main
```

## Step 3: Verify Upload

1. Go to your repository: `https://github.com/YOUR_USERNAME/naksh-jewels-ecommerce`
2. Check that all files are there
3. Verify README.md displays correctly

## Step 4: Add Topics (Optional but Recommended)

On your GitHub repository page:
1. Click "Add topics"
2. Add: `react` `nodejs` `express` `mongodb` `docker` `ecommerce` `context-api` `rest-api` `docker-compose` `full-stack`

---

## 📝 For Submission

**Submit this:**
- **GitHub Repository Link**: `https://github.com/YOUR_USERNAME/naksh-jewels-ecommerce`
- **Note**: README.md is included with complete setup instructions

---

## 🔐 Authentication

If you get an authentication error:
- GitHub no longer accepts passwords
- Use a **Personal Access Token** instead:
  1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token with `repo` scope
  3. Use the token as your password when pushing

Or set up SSH keys for easier authentication.

---

## ✅ Quick Commands (Copy-Paste Ready)

Replace `YOUR_USERNAME` with your actual GitHub username:

```powershell
cd d:\Naksh_jewels\naksh-jewels-ecommerce
git remote add origin https://github.com/YOUR_USERNAME/naksh-jewels-ecommerce.git
git push -u origin main
```

That's it! Your project will be on GitHub! 🎉
