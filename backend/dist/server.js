"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'lifeline-backend' });
});
// Placeholder routes for core modules
app.post('/auth/otp/request', (_req, res) => {
    // TODO: integrate with OTP provider (e.g., Twilio/Firebase)
    res.json({ success: true, message: 'OTP requested (stub)' });
});
app.post('/auth/otp/verify', (_req, res) => {
    // TODO: verify OTP and return JWT
    res.json({ token: 'stub-jwt-token' });
});
app.get('/users/me', (_req, res) => {
    // TODO: fetch user profile from DB
    res.json({
        id: 'stub-user-id',
        name: 'Demo User',
        age: 30,
        language: 'en',
    });
});
app.get('/records', (_req, res) => {
    // TODO: fetch records for authenticated user
    res.json({ records: [] });
});
app.get('/pharmacy/stock', (_req, res) => {
    // TODO: fetch pharmacy stock
    res.json({ items: [] });
});
app.post('/symptoms/check', (_req, res) => {
    // TODO: forward to AI microservice
    res.json({
        conditions: [],
        advice: 'This is a stub response from the AI symptom checker.',
    });
});
app.post('/teleconsult/token', (_req, res) => {
    // TODO: integrate with Agora/Daily to create call token
    res.json({ token: 'stub-call-token' });
});
app.listen(PORT, () => {
    console.log(`Lifeline backend running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map