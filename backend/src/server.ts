import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// --- Simple in-memory data models to mirror the TECHNICAL_DOCUMENTATION schema ---

interface User {
  id: string;
  phone: string;
  name: string;
  age: number;
  language: string;
  village?: string;
  chronicIssues?: string[];
  lastVisit?: string;
  nextVisit?: string;
}

interface RecordItem {
  id: string;
  user_id: string;
  visit_date: string;
  doctor_notes: string;
  prescription: string;
}

interface PharmacyStockItem {
  id: string;
  medicine_name: string;
  quantity: number;
  last_updated: string;
}

interface SymptomEntry {
  id: string;
  user_id: string;
  input_text: string;
  output_text: string;
  created_at: string;
}

const mockUser: User = {
  id: 'user-1',
  phone: '+91 98765 43210',
  name: 'Sita Devi',
  age: 42,
  language: 'Hindi',
  village: 'Bhagwanpur',
  chronicIssues: ['Diabetes', 'Hypertension'],
  lastVisit: '10 Nov 2025',
  nextVisit: '24 Nov 2025',
};

const mockRecords: RecordItem[] = [
  {
    id: 'rec-1',
    user_id: mockUser.id,
    visit_date: '2025-11-10',
    doctor_notes: 'Follow-up for blood pressure check. BP improved.',
    prescription: 'Continue tablets once daily for 1 month.',
  },
  {
    id: 'rec-2',
    user_id: mockUser.id,
    visit_date: '2025-10-02',
    doctor_notes: 'Cough and cold, no fever.',
    prescription: 'Cough syrup for 5 days, steam inhalation.',
  },
];

const mockPharmacyStock: PharmacyStockItem[] = [
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
];

const symptomHistory: SymptomEntry[] = [];

function analyseSymptoms(inputText: string): { conditions: string[]; advice: string } {
  const text = inputText.toLowerCase();
  const conditions: string[] = [];

  if (text.includes('fever') || text.includes('cough') || text.includes('cold')) {
    conditions.push('Fever / respiratory infection (such as viral cold or flu)');
  }

  if (
    text.includes('stomach') ||
    text.includes('loose motion') ||
    text.includes('loose motions') ||
    text.includes('diarrhoea') ||
    text.includes('diarrhea')
  ) {
    conditions.push('Stomach infection or food-related illness');
  }

  if (text.includes('headache') || text.includes('dizzy') || text.includes('dizziness')) {
    conditions.push('Headache / possible blood pressure or dehydration issue');
  }

  if (conditions.length === 0) {
    conditions.push('General minor illness or symptoms not clearly identified');
  }

  let advice =
    'This is an early computer-based guess. It is not a medical diagnosis. '; // base disclaimer

  if (conditions.some((c) => c.includes('Fever'))) {
    advice +=
      'You may have a fever or respiratory infection. Drink plenty of fluids, rest, and monitor your temperature. If you have trouble breathing, chest pain, or the fever lasts more than 3 days, please see a doctor immediately. ';
  }

  if (conditions.some((c) => c.includes('Stomach'))) {
    advice +=
      'Your symptoms may be related to a stomach infection. Sip ORS or clean water frequently to avoid dehydration. If there is blood in stool, severe pain, or you cannot drink fluids, visit a clinic or hospital urgently. ';
  }

  if (conditions.some((c) => c.includes('Headache'))) {
    advice +=
      'Headache and dizziness can be from tiredness, dehydration, or blood pressure changes. Drink water, rest in a cool place, and avoid sudden standing. If symptoms are severe, repeated, or you faint, you should check your blood pressure and speak to a doctor. ';
  }

  advice +=
    'For any serious worry, pregnancy, chest pain, difficulty breathing, or confusion, do not rely on this app—seek immediate medical help.';

  return { conditions, advice };
}

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
  // In a real implementation, this would use the authenticated user
  res.json(mockUser);
});

app.get('/records', (_req: Request, res: Response) => {
  // Returns records for the current user. For now, always mockUser.
  res.json({ records: mockRecords });
});

app.get('/pharmacy/stock', (_req: Request, res: Response) => {
  // Simple in-memory pharmacy stock list.
  res.json({ items: mockPharmacyStock });
});

app.post('/symptoms/check', (req: Request, res: Response) => {
  const inputText: string | undefined = req.body?.inputText;

  if (!inputText || typeof inputText !== 'string') {
    return res.status(400).json({ message: 'inputText is required' });
  }

  const { conditions, advice } = analyseSymptoms(inputText);

  const entry: SymptomEntry = {
    id: `sym-${symptomHistory.length + 1}`,
    user_id: mockUser.id,
    input_text: inputText,
    output_text: advice,
    created_at: new Date().toISOString(),
  };

  symptomHistory.push(entry);

  res.json({ conditions, advice });
});

app.post('/teleconsult/token', (_req: Request, res: Response) => {
  // In a real app we would create a short-lived token tied to a specific room and user.
  const token = `stub-call-token-${Date.now()}`;

  res.json({
    token,
    roomId: 'lifeline-demo-room',
    expiresInSeconds: 600,
  });
});

app.listen(PORT, () => {
  console.log(`Lifeline backend running on port ${PORT}`);
});
