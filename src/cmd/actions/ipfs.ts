import { print } from '../commands/cmd';

export interface UploadToIPFSOptions {
  ethereumNetwork: string;
}

export const uploadPlotsAndImagesToIPFS = (
  plotsFile: string,
  inputDir: string,
  { ethereumNetwork }: UploadToIPFSOptions,
) => {
  print(`Uploading plots in '${plotsFile}' and images in '${inputDir}' to IPFS at ${ethereumNetwork}...`);

  // todo: upload plots and images to IPFS

  print('Done.');
};
