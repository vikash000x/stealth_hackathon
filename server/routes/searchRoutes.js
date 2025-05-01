// server/routes/searchRoutes.js
import express from 'express';
import { handleSearch } from '../controllers/searchController.js';
const router = express.Router();
router.get('/search', handleSearch);
export default router;
