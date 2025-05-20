import express from 'express';
import { getResponsesByForm, submitResponse,  } from '../controllers/response.controller.js';
import protect from '../middleware/protect.js';

const router = express.Router();

router.post('/forms/:formId/responses', submitResponse);

router.get('/forms/:formId/responses',protect, getResponsesByForm);

export default router;
