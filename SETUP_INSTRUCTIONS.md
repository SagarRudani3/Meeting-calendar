# 🚀 Real Google OAuth Setup Instructions

Follow these steps to connect your app to your real Google Calendar.

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "NEW PROJECT"
3. Name it "Katalyst Calendar"
4. Click "CREATE"

## Step 2: Enable Google Calendar API

1. In the left sidebar, go to **"APIs & Services" → "Library"**
2. Search for **"Google Calendar API"**
3. Click on it and press **"ENABLE"**

## Step 3: Configure OAuth Consent Screen

1. Go to **"APIs & Services" → "OAuth consent screen"**
2. Choose **"External"** (unless you have Google Workspace)
3. Click **"CREATE"**
4. Fill in the required information:
   - **App name**: `Katalyst Calendar Viewer`
   - **User support email**: Your email
   - **Developer contact**: Your email
5. Click **"SAVE AND CONTINUE"**

6. **Add Scopes**:
   - Click **"ADD OR REMOVE SCOPES"**
   - Search and select:
     - `openid`
     - `profile`
     - `email`
     - `../auth/calendar.readonly`
     - `../auth/calendar.events.readonly`
   - Click **"UPDATE"** → **"SAVE AND CONTINUE"**

7. **Add Test Users**:
   - Click **"ADD USERS"**
   - Enter YOUR Google email (the one with calendar events)
   - Click **"ADD"** → **"SAVE AND CONTINUE"**

8. Click **"BACK TO DASHBOARD"**

## Step 4: Create OAuth 2.0 Credentials

1. Go to **"APIs & Services" → "Credentials"**
2. Click **"+ CREATE CREDENTIALS" → "OAuth client ID"**
3. Choose **"Web application"**
4. Name it: `Katalyst Calendar Web Client`

5. **Authorized JavaScript origins**:
   - Click **"+ ADD URI"**
   - Add: `http://localhost:5174`

6. **Authorized redirect URIs**:
   - Click **"+ ADD URI"**
   - Add: `http://localhost:5174`
   - ⚠️ **IMPORTANT**: Just `http://localhost:5174` - no `/auth/callback`!

7. Click **"CREATE"**

8. **COPY YOUR CLIENT ID** - it looks like:
   ```
   123456789-abc123def456.apps.googleusercontent.com
   ```

## Step 5: Update .env File

1. Open `katalyst-calendar-viewer/.env` file

2. Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Client ID:

```env
VITE_GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
VITE_GOOGLE_REDIRECT_URI=http://localhost:5174
VITE_USE_MOCK_AUTH=false
VITE_USE_REAL_CALENDAR_API=true
```

3. Save the file

## Step 6: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 7: Test the Login!

1. Open [http://localhost:5174](http://localhost:5174)
2. Click **"Sign in with Google"**
3. You'll be redirected to Google
4. **Select your Google account**
5. You'll see a warning: **"Google hasn't verified this app"**
   - Click **"Advanced"**
   - Click **"Go to Katalyst Calendar Viewer (unsafe)"**
6. Review permissions and click **"Continue"**
7. You'll be redirected back to the app!
8. See YOUR REAL CALENDAR MEETINGS! 🎉

---

## ✅ Success Checklist

- [ ] Google Cloud Project created
- [ ] Calendar API enabled
- [ ] OAuth consent screen configured
- [ ] Test user (your email) added
- [ ] OAuth credentials created
- [ ] Client ID copied
- [ ] `.env` file updated
- [ ] Dev server restarted
- [ ] Successfully logged in with Google
- [ ] Real calendar events displayed

---

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"
**Fix**: Make sure redirect URI in Google Console is EXACTLY:
```
http://localhost:5174
```
(No `/auth/callback` at the end!)

### Error: "Access blocked: This app's request is invalid"
**Fix**:
1. Double-check your scopes in OAuth consent screen
2. Make sure you added yourself as a test user

### Error: "Invalid client"
**Fix**: Check that your Client ID in `.env` is correct

### No calendar events showing
**Fix**:
1. Open browser console (F12)
2. Check for errors
3. Make sure your Google account has calendar events
4. Try logging out and back in

### "This app isn't verified" warning
**This is normal!**
- Click "Advanced" → "Go to Katalyst Calendar Viewer (unsafe)"
- This warning appears because the app is in testing mode
- It's safe - you're just accessing your own calendar

---

## 🔐 Security Notes

- ✅ Never commit your `.env` file to Git (it's already in `.gitignore`)
- ✅ Never share your Client ID publicly (though it's not a secret)
- ✅ Keep your account secure with 2FA
- ✅ Tokens are stored in browser localStorage
- ✅ You can revoke access anytime at: https://myaccount.google.com/permissions

---

## 📱 What You'll See

After successful login:
- ✅ Your real Google account profile picture
- ✅ Your real email address
- ✅ All your past meetings (last 30 days)
- ✅ All your upcoming meetings (next 60 days)
- ✅ Real meeting titles, times, attendees, locations
- ✅ AI-generated summaries for past meetings
- ✅ Interactive calendar view

---

## 🎯 Next Steps

1. Deploy to production (Vercel/Netlify)
2. Update redirect URI for production domain
3. Submit app for Google verification (for public use)
4. Add more features!

Need help? Check the console logs (F12) for detailed debug info!
