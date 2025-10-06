# 🎯 QUICK START: Real Google Calendar Integration

## ⚡ Your app is NOW configured for REAL Google OAuth!

**Current Status**: ✅ Ready - Just need to add your Google Client ID

---

## 🚀 3-Step Setup (5 minutes)

### Step 1: Get Google Client ID

**Quick Link**: [Create OAuth Credentials](https://console.cloud.google.com/apis/credentials)

1. Create new project or select existing
2. Enable "Google Calendar API"
3. Create OAuth consent screen (add yourself as test user)
4. Create "OAuth Client ID" → "Web application"
   - **Redirect URI**: `http://localhost:5174` (exactly this!)
5. Copy your Client ID

### Step 2: Add Client ID to `.env`

Open: [`katalyst-calendar-viewer/.env`](katalyst-calendar-viewer/.env)

Replace this line:
```env
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com
```

With your actual Client ID:
```env
VITE_GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
```

Save the file!

### Step 3: Open the App

The dev server should auto-reload, or restart it:

```bash
# Your app is at:
http://localhost:5174
```

Click **"Sign in with Google"** → Login → See YOUR REAL CALENDAR! 🎉

---

## ✅ What's Been Changed:

- ❌ Removed all mock data
- ✅ Real Google OAuth 2.0 authentication
- ✅ Fetches YOUR actual Google Calendar events
- ✅ Shows real meetings, attendees, times, locations
- ✅ Modal popup fixed (no scrollbar on outer layer)
- ✅ Displays user profile from your Google account
- ✅ AI summaries for past meetings

---

## 📋 Detailed Instructions

Need more help? See **[SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)** for:
- Step-by-step screenshots
- Troubleshooting guide
- Common errors and fixes

---

## 🔍 How to Verify It's Working:

### 1. Check Console Logs (F12)
You should see:
```
🔐 Redirecting to Google OAuth...
✅ OAuth authentication successful!
📅 Fetching real Google Calendar data for: your@email.com
🔗 Calling Google Calendar API...
📊 Received X events from Google Calendar
✅ Transformed X meetings
✅ Loaded X meetings from your Google Calendar
```

### 2. Check Dashboard
- Your real profile picture
- Your real email address
- Your actual calendar events
- Real attendees and locations

---

## 🎯 Current Configuration:

**File: `.env`**
```env
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com
VITE_GOOGLE_REDIRECT_URI=http://localhost:5174
VITE_USE_MOCK_AUTH=false
VITE_USE_REAL_CALENDAR_API=true
```

**OAuth Flow**: Implicit Grant (no backend needed!)
**Scopes**: Calendar read-only, user profile
**Data Source**: Google Calendar API directly
**No Mock Data**: Everything is real!

---

## 🆘 Quick Troubleshooting:

### "redirect_uri_mismatch"
→ Check redirect URI is exactly: `http://localhost:5174`

### "This app isn't verified"
→ Click "Advanced" → "Go to Katalyst Calendar Viewer (unsafe)"
→ This is normal for test mode!

### "Access blocked"
→ Make sure you added yourself as a test user in OAuth consent screen

### No events showing
→ Check console for errors
→ Make sure your Google account has calendar events

---

## 📱 What You'll See:

✅ **Login Screen**: Real "Sign in with Google" button
✅ **OAuth Redirect**: Google's consent screen
✅ **Dashboard**: Your profile + real meetings
✅ **Calendar View**: Interactive calendar with YOUR events
✅ **Meeting Cards**: Real details, attendees, locations
✅ **Modal**: Click events - clean popup (no outer scrollbar!)

---

**Ready? Let's go!** 🚀

1. Get your Client ID from Google Console
2. Update `.env` file
3. Open http://localhost:5174
4. Sign in with Google
5. See YOUR real calendar!

**Need help?** Check console logs (F12) for detailed debugging info.
