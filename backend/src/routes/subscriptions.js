const express = require('express');
const router = express.Router();
const service = require('../services/subscriptionService');
const { requireAuth } = require('../middleware/auth');

// All subscription routes require authentication
router.use(requireAuth);

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Subscription management (requires Bearer token)
 */

/**
 * @swagger
 * /api/subscriptions/summary:
 *   get:
 *     summary: Monthly summary and upcoming renewals
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary returned successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/summary', (req, res) => {
  try {
    const summary = service.getSummary(req.userId);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve summary.' });
  }
});

/**
 * @swagger
 * /api/subscriptions:
 *   get:
 *     summary: List all subscriptions for the logged-in user
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, cancelled]
 *     responses:
 *       200:
 *         description: List of subscriptions
 *       401:
 *         description: Unauthorized
 */
router.get('/', (req, res) => {
  try {
    const { search, category_id, status } = req.query;
    const subscriptions = service.getAllSubscriptions({ search, category_id, status }, req.userId);
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subscriptions.' });
  }
});

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   get:
 *     summary: Get a single subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Subscription found
 *       404:
 *         description: Subscription not found
 */
router.get('/:id', (req, res) => {
  try {
    const sub = service.getSubscriptionById(Number(req.params.id), req.userId);
    if (!sub) return res.status(404).json({ error: 'Subscription not found.' });
    res.json(sub);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subscription.' });
  }
});

/**
 * @swagger
 * /api/subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, billing_cycle, start_date]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Netflix
 *               price:
 *                 type: number
 *                 example: 14.99
 *               billing_cycle:
 *                 type: string
 *                 enum: [monthly, annual, weekly]
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-01"
 *               category_id:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [active, cancelled]
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subscription created
 *       400:
 *         description: Validation error
 */
router.post('/', (req, res) => {
  const errors = service.validateSubscription(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const created = service.createSubscription(req.body, req.userId);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create subscription.' });
  }
});

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   put:
 *     summary: Update a subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Subscription updated
 *       404:
 *         description: Subscription not found
 */
router.put('/:id', (req, res) => {
  const errors = service.validateSubscription({
    name: req.body.name || 'placeholder',
    price: req.body.price !== undefined ? req.body.price : 0,
    billing_cycle: req.body.billing_cycle || 'monthly',
    start_date: req.body.start_date || '2026-01-01',
    ...req.body,
  });
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const updated = service.updateSubscription(Number(req.params.id), req.body, req.userId);
    if (!updated) return res.status(404).json({ error: 'Subscription not found.' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update subscription.' });
  }
});

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Subscription deleted
 *       404:
 *         description: Subscription not found
 */
router.delete('/:id', (req, res) => {
  try {
    const deleted = service.deleteSubscription(Number(req.params.id), req.userId);
    if (!deleted) return res.status(404).json({ error: 'Subscription not found.' });
    res.json({ message: 'Subscription deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete subscription.' });
  }
});

/**
 * @swagger
 * /api/subscriptions/{id}/review:
 *   patch:
 *     summary: Submit a usage review for a subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usage_frequency:
 *                 type: string
 *                 enum: [daily, weekly, monthly, rarely, never, unknown]
 *                 example: weekly
 *               value_rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               review_notes:
 *                 type: string
 *                 example: "Great value, use it every day"
 *     responses:
 *       200:
 *         description: Review saved, returns updated subscription
 *       400:
 *         description: Validation error (invalid frequency or rating)
 *       404:
 *         description: Subscription not found
 */
router.patch('/:id/review', (req, res) => {
  try {
    const updated = service.reviewSubscription(Number(req.params.id), req.body, req.userId);
    if (!updated) return res.status(404).json({ error: 'Subscription not found.' });
    res.json(updated);
  } catch (err) {
    if (err.code === 'VALIDATION') return res.status(400).json({ error: err.message });
    res.status(500).json({ error: 'Failed to save review.' });
  }
});

module.exports = router;
