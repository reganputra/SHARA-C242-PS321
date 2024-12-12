const express = require('express');
const router = express.Router();
const { auth, db } = require('../firebaseConfig');
const axios = require('axios');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Email, password, dan name wajib diisi." });
  }

  try {
    // 1. Buat user di Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // 2. Simpan data user ke Firestore
    await db.collection('users').doc(userRecord.uid).set({
      email,
      name,
      createdAt: new Date().toISOString(),
    });

    // 3. Buat Custom Token
    const customToken = await auth.createCustomToken(userRecord.uid);

    // 4. Login menggunakan Custom Token untuk mendapatkan ID Token (Bearer Token)
    const idToken = await loginAndGetIdToken(customToken);

    // Response sukses
    res.status(201).json({
      message: "User berhasil mendaftar",
      userId: userRecord.uid,
      idToken,
    });
  } catch (error) {
    console.error("Error creating user:", error.code, error.message);
    res.status(500).json({ error: error.message });
  }
});

// Fungsi tambahan untuk login menggunakan custom token
const loginAndGetIdToken = async (customToken) => {
  try {
    const FIREBASE_AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_API_KEY}`;

    const response = await axios.post(FIREBASE_AUTH_URL, {
      token: customToken,
      returnSecureToken: true,
    });

    return response.data.idToken;
  } catch (error) {
    console.error("Error during custom token login:", error.response?.data || error.message);
    throw new Error("Failed to login with custom token");
  }
};

module.exports = router;
