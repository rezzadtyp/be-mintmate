import { Router } from "express";
import {
  createIpfs,
  getNFTMetadata,
  getNFTs,
  getNFTsByWallet,
} from "../controllers/nft.controller";
import { uploader } from "../lib/uploader";

const router = Router();

router.get("/", getNFTs);
router.post("/", uploader("IMG", "/").array("image", 1), createIpfs);
router.get("/:address/:token_id", getNFTMetadata);
router.get("/wallet", getNFTsByWallet);

export default router;
