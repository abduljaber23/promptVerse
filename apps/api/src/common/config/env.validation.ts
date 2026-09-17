import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  // Server configuration
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().port().default(3000),

  API_PREFIX: Joi.string().default('api'),

  // Database configuration
  DB_HOST: Joi.string().required(),

  DB_PORT: Joi.number().port().required(),

  DB_USER: Joi.string().required(),

  DB_PASSWORD: Joi.string().required(),

  DB_NAME: Joi.string().required(),

  // JWT configuration
  JWT_SECRET: Joi.string().min(32).required(),

  JWT_EXPIRES_IN: Joi.string()
    .pattern(/^\d+(s|m|h|d)$/)
    .required(),

  // Client URL for CORS configuration
  CLIENT_URL: Joi.string().uri().required(),

  // App URL for CORS configuration
  APP_URL: Joi.string().uri().required(),

  // Redis configuration
  REDIS_URL: Joi.string().uri().required(),

  // Stripe configuration
  STRIPE_SECRET_KEY: Joi.string().pattern(/^sk_/).required(),

  STRIPE_WEBHOOK_SECRET: Joi.string().required(),

  // SMTP configuration
  SMTP_FROM: Joi.string().email().required(),

  SMTP_HOST: Joi.string().required(),

  SMTP_PORT: Joi.number().port().required(),

  SMTP_USERNAME: Joi.string().required(),

  SMTP_PASSWORD: Joi.string().required(),

  // Swagger configuration
  SWAGGER_ENABLED: Joi.boolean().truthy('true').falsy('false').default(true),
});
