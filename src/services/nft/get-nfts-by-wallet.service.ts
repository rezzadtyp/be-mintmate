import Moralis, { initializeMoralis } from "../../utils/moralis-client";

interface GetNFTsByWalletQuery {
  address: string;
}

export const getNFTsByWalletService = async (query: GetNFTsByWalletQuery) => {
  try {
    const { address } = query;

    if (!address) {
      throw new Error("Please give address");
    }

    initializeMoralis();

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: "0xaa36a7",
      format: "decimal",
      mediaItems: false,
      address: address,
    });

    return response.raw;
  } catch (error) {
    throw error;
  }
};
