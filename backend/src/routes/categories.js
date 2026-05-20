const express = require('express');
const router = express.Router();
const service = require('../services/categoryService');
const { requireAuth } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: List all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories with subscription counts
 */
router.get('/', requireAuth, (req, res) => {
  try {
    res.json(service.getAllCategories(req.userId));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories.' });
  }
});

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gaming
 *               color:
 *                 type: string
 *                 example: "#8b5cf6"
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Validation error
 */
router.post('/', requireAuth, (req, res) => {
  const errors = service.validateCategory(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const created = service.createCategory(req.body);
    res.status(201).json(created);
  } catch (err) {
    if (err.code === 'DUPLICATE' || (err.message && err.message.includes('UNIQUE'))) {
      return res.status(400).json({ errors: ['A category with this name already exists.'] });
    }
    res.status(500).json({ error: 'Failed to create category.' });
  }
});

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
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
 *               name:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Category not found
 */
router.put('/:id', requireAuth, (req, res) => {
  const errors = service.validateCategory({ name: req.body.name || 'placeholder', ...req.body });
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const updated = service.updateCategory(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ error: 'Category not found.' });
    res.json(updated);
  } catch (err) {
    if (err.code === 'SYSTEM_PROTECTED') return res.status(403).json({ error: 'Default categories cannot be edited.' });
    if (err.code === 'DUPLICATE' || (err.message && err.message.includes('UNIQUE'))) {
      return res.status(400).json({ errors: ['A category with this name already exists.'] });
    }
    res.status(500).json({ error: 'Failed to update category.' });
  }
});

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
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
 *         description: Category deleted
 *       400:
 *         description: Category has subscriptions, cannot be deleted
 *       404:
 *         description: Category not found
 */
router.delete('/:id', requireAuth, (req, res) => {
  try {
    const result = service.deleteCategory(Number(req.params.id));
    if (!result.deleted && result.reason) return res.status(400).json({ error: result.reason });
    if (!result.deleted) return res.status(404).json({ error: 'Category not found.' });
    res.json({ message: 'Category deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete category.' });
  }
});

module.exports = router;
