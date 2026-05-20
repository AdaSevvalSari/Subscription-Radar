const express = require('express');
const router = express.Router({ mergeParams: true });
const usageService = require('../services/usageService');
const { getSubscriptionById, calculateMonthlyEquivalent } = require('../services/subscriptionService');
const { calculateCostPerUse, simulateCancellation, detectWaste } = require('../services/usageService');
const { requireAuth } = require('../middleware/auth');

// All usage routes require authentication
router.use(requireAuth);

/**
 * @swagger
 * tags:
 *   name: Usage
 *   description: Usage tracking per subscription (requires Bearer token)
 */

/**
 * @swagger
 * /api/subscriptions/{id}/usage:
 *   get:
 *     summary: Get usage history and analytics for a subscription
 *     tags: [Usage]
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
 *         description: Usage data with analytics
 *       404:
 *         description: Subscription not found
 */
router.get('/', (req, res) => {
  const sub = getSubscriptionById(Number(req.params.id), req.userId);
  if (!sub) return res.status(404).json({ error: 'Subscription not found.' });

  const usage = usageService.getUsageBySubscription(sub.id);
  const monthlyPrice = calculateMonthlyEquivalent(sub.price, sub.billing_cycle);
  const costPerUse = calculateCostPerUse(monthlyPrice, usage.monthlyCount);
  const cancellation = simulateCancellation(monthlyPrice);
  const waste = detectWaste(usage.totalCount, usage.lastUsedDate);

  res.json({
    subscription: sub,
    usage,
    analytics: { costPerUse, cancellation, waste },
  });
});

/**
 * @swagger
 * /api/subscriptions/{id}/usage:
 *   post:
 *     summary: Log a usage for a subscription
 *     tags: [Usage]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *                 example: "Watched a movie"
 *     responses:
 *       201:
 *         description: Usage logged
 *       404:
 *         description: Subscription not found
 */
router.post('/', (req, res) => {
  const sub = getSubscriptionById(Number(req.params.id), req.userId);
  if (!sub) return res.status(404).json({ error: 'Subscription not found.' });

  try {
    const log = usageService.logUsage(sub.id, req.body.notes);
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: 'Failed to log usage.' });
  }
});

/**
 * @swagger
 * /api/subscriptions/{id}/usage/{logId}:
 *   delete:
 *     summary: Delete a usage log entry
 *     tags: [Usage]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: logId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Log deleted
 *       404:
 *         description: Log not found
 */
router.delete('/:logId', (req, res) => {
  try {
    const deleted = usageService.deleteUsageLog(Number(req.params.logId));
    if (!deleted) return res.status(404).json({ error: 'Usage log not found.' });
    res.json({ message: 'Usage log deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete usage log.' });
  }
});

module.exports = router;
