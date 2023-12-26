# MERN Stack Authentication with OTP

![Project Logo](https://github.com/GM-Frost/OTPAuthProject/assets/110303752/4da6f24a-35d6-46bf-b715-d5a904ccb436)
![Project Logo](https://github.com/GM-Frost/OTPAuthProject/assets/110303752/9ef2d26c-ea5b-4ee1-8626-5f7752cc106e)
![Project Logo](https://github.com/GM-Frost/OTPAuthProject/assets/110303752/7ebe0109-4103-48e3-8792-c5e38a067a3a)

Welcome to the MERN Stack Authentication with OTP ! This project provides a robust authentication system using the MERN (MongoDB, Express.js, React, Node.js) stack, with a focus on user registration, password reset, and enhanced security using OTP (One-Time Password).

## Features

1. **User Registration:** Register on the site, and a welcome message is sent to your email address.

2. **Password Reset with OTP:** Forget your password? Request a reset, receive a six-digit OTP via email, and reset your password securely.

3. **OTP Security:** Emphasizing the importance of OTP for enhanced authentication.

## Technologies Used

- **Frontend:**
  - React
  - Typescript
  - Vite
  - Zustand (state management)
  - Tailwind CSS (styling)
  - Formik (forms)
  - Axios (HTTP client)
  - JWT (JSON Web Token) decoding

- **Backend:**
  - Node.js
  - Express.js
  - Mongoose (ODM for MongoDB)
  - MongoDB (Database)
  - Bcrypt (password hashing)
  - Cors (Cross-Origin Resource Sharing)
  - JSON Web Token (JWT)
  - Mailgen (email template)
  - Morgan (HTTP request logger)
  - Multer (file upload handling)
  - Nodemailer (sending emails)
  - OTP-generator (OTP generation)

## Getting Started

1. **Clone the repository:**
2. **Update the .env files:**
  - Server .env: 
```javascript
JWT_SECRET=
EMAIL=
APP_PASSWORD=
ATLAS_URI=
CLIENT_URL=
PORT=
```

 - Client .env:
 ```javascript
   VITE_REACT_APP_DOMAIN=
   ```
3. Start Client server `npm run dev`
4. Start node server `npm start`
