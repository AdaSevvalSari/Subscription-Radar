const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const authRouter = require('./routes/auth');
const subscriptionsRouter = require('./routes/subscriptions');
const categoriesRouter = require('./routes/categories');
const usageRouter = require('./routes/usage');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Subscription Radar API',
      version: '1.0.0',
      description: 'Personal subscription tracking system REST API. Use /api/auth/register or /api/auth/login to get a JWT token, then click Authorize.',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [path.join(__dirname, 'routes/*.js')],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Auth routes (public — no token required)
app.use('/api/auth', authRouter);

// Protected routes — usage must be registered before subscriptions (prefix conflict fix)
app.use('/api/subscriptions/:id/usage', usageRouter);
app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/categories', categoriesRouter);

// Frontend (static files)
app.use(express.static(path.join(__dirname, '../../frontend')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Subscription Radar running at: http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});

module.exports = app;
