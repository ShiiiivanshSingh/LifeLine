const API_BASE_URL = 'http://localhost:4000';

export type HttpMethod = 'GET' | 'POST';

async function request<T>(path: string, options: { method?: HttpMethod; body?: unknown } = {}): Promise<T> {
  const { method = 'GET', body } = options;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}

export function getHealth() {
  return request<{ status: string; service: string }>('/health');
}

export function getRecords() {
  return request<{ records: unknown[] }>('/records');
}

export function getPharmacyStock() {
  return request<{ items: unknown[] }>('/pharmacy/stock');
}

export function checkSymptoms(inputText: string) {
  return request<{ conditions: unknown[]; advice: string }>('/symptoms/check', {
    method: 'POST',
    body: { inputText },
  });
}

export function requestOtp(phone: string) {
  return request<{ success: boolean; message: string }>('/auth/otp/request', {
    method: 'POST',
    body: { phone },
  });
}
