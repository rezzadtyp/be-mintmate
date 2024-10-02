import Moralis, { initializeMoralis } from "../../utils/moralis-client";

export const getNFTsService = async () => {
  try {
    await initializeMoralis();

    const response = await Moralis.EvmApi.nft.getContractNFTs({
      chain: "0xaa36a7",
      format: "decimal",
      address: "0xA895a9b5882DBa287CF359b6a722C5be46aCb675",
      limit: 40
    });

    return response.raw;
  } catch (error) {
    throw error;
  }
};
