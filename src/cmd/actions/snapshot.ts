import { print } from '../commands/cmd';

export interface FetchNFTOwnersOptions {
  ethereumNetwork: string;
}

export const fetchNFTOwners = (address: string, outputFile: string, { ethereumNetwork }: FetchNFTOwnersOptions) => {
  print(`Fetching NFT ${address} data into '${outputFile}' on ${ethereumNetwork}...`);

  // todo: fetch the NFT data

  print('Done.');
};
