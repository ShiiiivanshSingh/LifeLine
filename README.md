# lifeline

Initial scaffold for the Lifeline Telemedicine Platform.

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
