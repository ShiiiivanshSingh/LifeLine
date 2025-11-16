import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'lifeline-backend' });
});

// Placeholder routes for core modules
app.post('/auth/otp/request', (_req: Request, res: Response) => {
  // TODO: integrate with OTP provider (e.g., Twilio/Firebase)
  res.json({ success: true, message: 'OTP requested (stub)' });
});

app.post('/auth/otp/verify', (_req: Request, res: Response) => {
  // TODO: verify OTP and return JWT
  res.json({ token: 'stub-jwt-token' });
});

app.get('/users/me', (_req: Request, res: Response) => {
  // TODO: fetch user profile from DB
  res.json({
    id: 'stub-user-id',
    name: 'Demo User',
    age: 30,
    language: 'en',
  });
});

app.get('/records', (_req: Request, res: Response) => {
  // TODO: fetch records for authenticated user
  // For now return some stub data so the mobile UI has something to display.
  res.json({
    records: [
      {
        id: 'rec-1',
        visit_date: '2025-11-10',
        doctor_notes: 'Follow-up for blood pressure check. BP improved.',
        prescription: 'Continue tablets once daily for 1 month.',
      },
      {
        id: 'rec-2',
        visit_date: '2025-10-02',
        doctor_notes: 'Cough and cold, no fever.',
        prescription: 'Cough syrup for 5 days, steam inhalation.',
      },
    ],
  });
});

app.get('/pharmacy/stock', (_req: Request, res: Response) => {
  // TODO: fetch pharmacy stock
  // Stub list of medicines to demonstrate the UI.
  res.json({
    items: [
      {
        id: 'med-1',
        medicine_name: 'Paracetamol 500mg',
        quantity: 120,
        last_updated: 'Today',
      },
      {
        id: 'med-2',
        medicine_name: 'Blood pressure tablet',
        quantity: 45,
        last_updated: 'Yesterday',
      },
      {
        id: 'med-3',
        medicine_name: 'ORS packets',
        quantity: 200,
        last_updated: 'Today',
      },
    ],
  });
});

app.post('/symptoms/check', (_req: Request, res: Response) => {
  // TODO: forward to AI microservice
  res.json({
    conditions: [],
    advice: 'This is a stub response from the AI symptom checker.',
  });
});

app.post('/teleconsult/token', (_req: Request, res: Response) => {
  // TODO: integrate with Agora/Daily to create call token
  res.json({ token: 'stub-call-token' });
});

app.listen(PORT, () => {
  console.log(`Lifeline backend running on port ${PORT}`);
});
