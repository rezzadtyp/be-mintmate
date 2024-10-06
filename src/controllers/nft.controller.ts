import { NextFunction, Request, Response } from "express";
import { createIpfsService } from "../services/nft/create-ipfs.service";
import { getNFTsService } from "../services/nft/get-nfts.service";
import { getNFTService } from "../services/nft/get-nft.service";
import { getNFTsByWalletService } from "../services/nft/get-nfts-by-wallet.service";

export const createIpfs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files?.length) {
      throw new Error("No file uploaded");
    }

    const result = await createIpfsService(req.body, files[0]);

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getNFTs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getNFTsService();

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getNFTMetadata = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = {
      token_id: req.params.token_id,
      address: req.params.address,
    };

    const result = await getNFTService(params);

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getNFTsByWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = {
      address: req.query.address as string,
    };
    const result = await getNFTsByWalletService(query);

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
