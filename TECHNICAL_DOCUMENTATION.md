# TECHNICAL DOCUMENTATION FOR MOBILE APP (EXPO DEV)

**Project Name**: Lifeline Telemedicine Platform

---

# 1. System Overview

Lifeline is a mobile healthcare solution designed for rural communities where internet access, digital literacy and medical availability are limited. The app supports multilingual use, QR based patient records, offline data storage, AI driven symptom checks and real time teleconsultation.

**Real world example:**
A farmer in a remote village scans his health card through the app, checks previous prescriptions stored offline, and connects to a doctor through an audio call even if the network speed is poor.

---

# 2. System Objectives

1. Provide doctor consultations without physical travel
2. Maintain digital health records accessible through QR scanning
3. Allow offline use with automatic background sync
4. Offer AI based preliminary symptom assessment
5. Present pharmacy stock in real time to avoid unnecessary travel
6. Support multiple Indian languages and voice assistance

---

# 3. System Features

## 3.1 Teleconsultation

Supports video and audio calling using WebRTC compatible SDKs.

**Example:** If the network drops, the app switches from video to audio to maintain continuity.

## 3.2 Offline First Architecture

User data is stored locally using Async Storage and Secure Store. All changes queue for sync.

**Example:** A nurse logs patient vitals in offline mode and the data syncs once 4G returns.

## 3.3 QR Based Digital Health Card

Each patient receives a QR code that gives quick access to records.

## 3.4 AI Symptom Checker

User inputs symptoms in any supported language. The backend model returns suggested next steps.

## 3.5 Pharmacy Stock Viewer

Pharmacies update medicine availability. The app fetches the updated list when online and caches it.

## 3.6 Multilingual Support

UI text is loaded from separate language folders using i18next.

## 3.7 Voice Guidance

Screen instructions can be spoken using Expo Speech API.

---

# 4. System Architecture

## 4.1 Architecture Layers

1. **Presentation Layer**  
   Expo React Native based screens and components.

2. **Logic Layer**  
   State management using Context API and custom hooks.

3. **Data Layer**  
   Local data: Async Storage  
   Remote data: REST APIs on Node.js server  
   Background sync service

4. **Service Layer**  
   QR scanning service  
   Teleconsult service (Agora or Daily)  
   AI symptom assessment service

**Example:** When a user clicks Consult Doctor, the presentation layer triggers the logic which calls the teleconsult service.

---

# 5. Detailed Module Description

## 5.1 Authentication Module

Supports phone based OTP login.

Flow:

1. User enters phone
2. Server sends OTP
3. User enters OTP
4. Server returns auth token
5. Token stored securely

## 5.2 User Profile Module

Stores name, age, gender, village and chronic issues.  
Data is stored locally for quick access.

## 5.3 Teleconsultation Module

Handles real time communication.

Components:

- Call Screen  
- Mute and Switch Camera buttons  
- Connection strength indicator

## 5.4 Health Record Module

Allows viewing and editing.

Functions:

- Fetch remote records  
- Cache records offline  
- Encrypt local data  
- Update backend when online

## 5.5 QR Management Module

- Generates QR for patient ID  
- Scans QR to fetch data  
- Uses local cache if offline

## 5.6 AI Symptom Checker Module

- User enters symptoms  
- Text sent to backend AI model  
- Model returns possible conditions and advice

## 5.7 Pharmacy Module

- Displays medicine name, stock and expiry  
- Shows last updated timestamp  
- Uses offline cache when the network is unavailable

## 5.8 Language and Accessibility Module

- Loads selected language from JSON files  
- Supports voice instructions for each screen

---

# 6. Technology Stack

## 6.1 Frontend

- Expo SDK  
- React Native  
- React Navigation  
- Async Storage  
- Secure Store  
- i18next  
- Expo Camera and Barcode Scanner  
- Expo Speech

## 6.2 Backend

- Node.js  
- Express  
- PostgreSQL  
- Prisma ORM  
- Redis for queueing offline sync  
- Python based AI microservice if needed

## 6.3 Integration

- Agora or Daily for calls  
- Twilio or Firebase for OTP

---

# 7. Data Flow Explanation

## Example Data Flow for Doctor Consultation

1. User opens Consult Screen
2. App checks local internet status
3. If connection is good the app requests a call token from the backend
4. SDK joins the call
5. Call begins
6. After consultation the prescription is saved locally and syncs when online

---

# 8. Database Schema (Simplified)

## Tables

### Users

- id  
- phone  
- name  
- age  
- language

### Records

- id  
- user_id  
- visit_date  
- doctor_notes  
- prescription

### PharmacyStock

- id  
- medicine_name  
- quantity  
- last_updated

### Symptoms

- id  
- user_id  
- input_text  
- output_text  
- created_at

---

# 9. Offline Sync Mechanism

1. User performs action offline
2. Action is added to a local queue
3. Background job checks for internet
4. When online the app syncs each item to the server
5. Server confirms and client clears the queue

**Example:**  
If a nurse records temperature for five patients in offline mode, all five entries sync once the network returns.

---

# 10. Security Measures

1. JWT based authentication
2. All sensitive data encrypted locally
3. HTTPS for communication
4. Role based access offered in the server
5. QR codes contain only IDs, not personal data
6. Database follows NDHM privacy principles

---

# 11. Testing Strategy

## 11.1 Unit Testing

Jest for components, functions and services.

## 11.2 Integration Testing

Check data sync from device to server.

## 11.3 Stress Testing

Simulate poor network and switch from 4G to offline mode.

## 11.4 Device Testing

Test low end phones for performance.

---

# 12. Deployment Plan

## 12.1 Mobile Build

Use EAS build to generate Android APK and iOS IPA.

## 12.2 Backend Deployment

Use a Linux server or cloud provider.  
Node.js and PostgreSQL are hosted in a secure environment.

## 12.3 Pilot Rollout

- Deploy the app to a set of villages  
- Train ASHA and ANM workers  
- Collect feedback  
- Release updated version

---

# 13. Future Enhancements

- AI voice based symptom collection  
- Digital prescription QR verification  
- Chat based doctor support  
- Local Bluetooth sync between workers  
- Appointment scheduler  
- Integration with government health systems
