# LifeLine
Initial build for the Lifeline Telemedicine Platform.

## Screenshots
<p align="center">
  <img src="https://github.com/user-attachments/assets/b4659e59-10eb-40b8-a748-f28847b2bb85" width="35%">
  <img src="https://github.com/user-attachments/assets/1f71eb4d-eeb9-4497-a4cd-f27d1cb7400b" width="35%">
</p>



## Structure

- `backend/` – Node.js + Express API (TypeScript)
- `mobile/` – Expo React Native app

## Getting started

### Backend

```bash
cd backend
npm install
npm run dev
```

The backend exposes a basic health check at `GET http://localhost:4000/health` and stub endpoints for:
- OTP auth (`/auth/otp/request`, `/auth/otp/verify`)
- User profile (`/users/me`)
- Records (`/records`)
- Pharmacy stock (`/pharmacy/stock`)
- Symptom checker (`/symptoms/check`)
- Teleconsult token (`/teleconsult/token`)

### Mobile app

```bash
cd mobile
npm install
npm run start
```

This launches the Expo dev server. The app currently has stub screens wired via React Navigation for:
- Auth (phone OTP stub)
- Home (navigation hub)
- Profile
- Teleconsult
- Records
- Pharmacy
- Symptom Checker
