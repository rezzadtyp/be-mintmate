import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { client } from "../../utils/client";
import fs from "fs";

interface createIpfsBody {
  name: string;
  description: string;
  address: string;
  image: string;
}

const storage = new ThirdwebStorage({
  clientId: client.clientId,
  secretKey: client.secretKey,
});

export const createIpfsService = async (
  body: createIpfsBody,
  file: Express.Multer.File
) => {
  try {
    const { name, description, address } = body;

    const fileData = fs.readFileSync(file.path);

    const uri = await storage.upload(fileData);

    const NFTsMetadata = {
      name: name,
      description: description,
      image: uri,
    };

    const tokenURI = await storage.upload(NFTsMetadata);

    return {
      message: "Image Uploaded to IPFS!",
      tokenURI,
    };
  } catch (error) {
    throw error;
  }
};
