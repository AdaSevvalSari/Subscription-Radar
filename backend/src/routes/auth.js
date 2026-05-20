const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../services/authService');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User registration and login
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: alice
 *               email:
 *                 type: string
 *                 example: alice@example.com
 *               password:
 *                 type: string
 *                 example: mypassword123
 *     responses:
 *       201:
 *         description: User registered successfully, returns JWT token
 *       400:
 *         description: Validation error or duplicate user
 */
router.post('/register', (req, res) => {
  try {
    const result = registerUser(req.body);
    if (result.errors) return res.status(400).json({ errors: result.errors });
    res.status(201).json({ token: result.token, username: result.username });
  } catch (err) {
    if (err.message && err.message.includes('UNIQUE')) {
      return res.status(400).json({ errors: ['Username or email already in use.'] });
    }
    res.status(500).json({ errors: ['Registration failed.'] });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with username and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: alice
 *               password:
 *                 type: string
 *                 example: mypassword123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', (req, res) => {
  const result = loginUser(req.body);
  if (result.errors) return res.status(400).json({ errors: result.errors });
  res.json({ token: result.token, username: result.username });
});

module.exports = router;
