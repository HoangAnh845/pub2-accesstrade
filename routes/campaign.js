import express from "express";
import { getCampaign } from "../controllers/campaignControllers.js";
const router = express.Router()

router.get('/database/campaign',getCampaign)

export default router;