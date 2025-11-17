# LifeLine
Initial build for the Lifeline Telemedicine Platform.

## Screenshots
<p align="center">
  <img src="https://github.com/user-attachments/assets/87c7fe5f-56dc-408b-9ba4-2c7c95d5f6ea" width="35%">
  <img src="https://github.com/user-attachments/assets/afda9484-667d-4f9f-9c95-ec1649a12174" width="35%">
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
