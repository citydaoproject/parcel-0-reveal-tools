import { fetchNFTOwners } from '../actions/snapshot';
import { program, ProgramSubCommand } from './cmd';

const snapshotCommand = program.command('snapshot').description('Commands to fetch data from the Ethereum network');

interface NFTOwnersParams {
  address: string;
  outputFile: string;
  network: string;
}

snapshotCommand
  .command('nft-owners')
  .description('Snapshot NFT owner data')
  .requiredOption('--address <address>', 'The NFT address')
  .requiredOption('--output-file <file>', 'The file to store the NFT owner addresses per ID')
  .option('--network <network>', 'The Ethereum network', 'mainnet')
  .action(({ address, outputFile, network }: NFTOwnersParams, cmd: ProgramSubCommand) =>
    fetchNFTOwners(address, outputFile, { ethereumNetwork: network }),
  );
