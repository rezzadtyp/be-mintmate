import Moralis, { initializeMoralis } from "../../utils/moralis-client";

interface getNFTParams {
  token_id: string;
  address: string;
}

export const getNFTService = async (params: getNFTParams) => {
  try {
    await initializeMoralis();

    const response = await Moralis.EvmApi.nft.getNFTMetadata({
      chain: "0xaa36a7",
      format: "decimal",
      normalizeMetadata: true,
      mediaItems: false,
      address: params.address,
      tokenId: params.token_id,
    });

    if(!response) {
      throw new Error("NFT metadata not found!")
    }

    return response.raw
  } catch (error) {
    throw error;
  }
};
