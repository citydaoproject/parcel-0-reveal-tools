import { uploadPlotsAndImagesToIPFS } from '../actions/ipfs';
import { program, ProgramSubCommand } from './cmd';

const ipfsCommand = program.command('ipfs').description('Commands to work with IPFS');

interface UploadToIPFSParams {
  plotsFile: string;
  imagesDir: string;
  network: string;
}

ipfsCommand
  .command('upload-plots')
  .description('Upload plot data and images to IPFS')
  .requiredOption('--plots-file <file>', 'The geojson file that includes all plot data')
  .requiredOption('--images-dir <directory>', 'The directory with the plot images')
  .option('--network <network>', 'The Ethereum network', 'development')
  .action(({ plotsFile, imagesDir, network }: UploadToIPFSParams, cmd: ProgramSubCommand) =>
    uploadPlotsAndImagesToIPFS(plotsFile, imagesDir, { ethereumNetwork: network }),
  );
