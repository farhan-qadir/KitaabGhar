# 🚀 MongoDB Atlas Setup Guide

## Step-by-Step Setup (Free Cloud Database)

### Step 1: Create MongoDB Atlas Account
```
1. Open: https://www.mongodb.com/cloud/atlas
2. Click "Register" (top right)
3. Sign up with email
4. Verify email
```

### Step 2: Create a Cluster
```
1. After login, click "Create"
2. Choose "M0 Cluster" (FREE)
3. Select region: Choose closest to you
4. Click "Create Cluster"
5. Wait 3-5 minutes for creation
```

### Step 3: Create Database User
```
1. In left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Username: kitaab_user
4. Password: Generate secure password (copy it!)
5. Click "Add User"
```

### Step 4: Allow Network Access
```
1. In left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Select "Allow access from anywhere"
4. Click "Add Entry"
```

### Step 5: Get Connection String
```
1. Go to "Databases" tab
2. Click "Connect" button
3. Choose "Drivers" option
4. Select "Node.js"
5. Copy the connection string

String looks like:
mongodb+srv://kitaab_user:PASSWORD@cluster0.xxx.mongodb.net/kitaabghar?retryWrites=true&w=majority

IMPORTANT: Replace:
- PASSWORD with your actual password
- Add database name: kitaabghar
```

### Step 6: Update Backend Configuration
```
Edit: backend/.env

Change:
MONGODB_URI=mongodb+srv://kitaab_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/kitaabghar?retryWrites=true&w=majority
```

### Step 7: Restart Backend
```bash
npm run dev
```

---

## Example Configuration

**Before:**
```env
MONGODB_URI=mongodb://localhost:27017/kitaabghar
```

**After:**
```env
MONGODB_URI=mongodb+srv://kitaab_user:MySecurePassword123@cluster0.abcd1234.mongodb.net/kitaabghar?retryWrites=true&w=majority
```

---

## ✅ Verification

After updating `.env`:

```bash
# Restart backend
npm run dev

# Test connection
curl http://localhost:5000/api/health

# Should return:
# {"message":"Server is running"}

# Test books endpoint
curl http://localhost:5000/api/books
```

---

## 🆘 If Something Goes Wrong

**Connection Timeout:**
- Check password in connection string
- Verify IP address is whitelisted
- Wait 2 minutes after adding IP

**Authentication Failed:**
- Check username and password
- Ensure special characters are URL encoded

**Still Having Issues:**
- Use MongoDB Compass (download free) to test connection
- Verify cluster is running (green status in Atlas)

---

**Time needed:** 5-10 minutes  
**Cost:** FREE  
**Difficulty:** Easy ✅
