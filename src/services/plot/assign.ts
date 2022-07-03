import { randomInt } from 'crypto';
import { groupNFTsWithOwners, NFTOwner, OwnerWithNFTs } from '../owners';
import { buildPlotNeighborsGraph } from './neighbors';
import { convertPlotsFileToPlots, Plot, PlotsFile } from './plot';

export interface NFTPlot {
  nftId: string;
  plotId: number;
}

export const assignPlotsToNFTsFromFile = (plotsFile: PlotsFile, nftOwners: NFTOwner[]): NFTPlot[] =>
  assignPlotsToNFTs(convertPlotsFileToPlots(plotsFile), nftOwners);

export const assignPlotsToNFTs = (plots: Plot[], nftOwners: NFTOwner[]): NFTPlot[] => {
  const neighborsGraph = buildPlotNeighborsGraph(plots);
  const ownersWithNFTs = groupNFTsWithOwners(nftOwners);

  if (plots.length < nftOwners.length) {
    throw new Error(`Not enough plots for NFTs: ${plots.length} < ${nftOwners.length}`);
  }

  const nftIdsByPlotId = new Map<number, string>();

  const assignPlotsForOwner = ({ nftIds }: OwnerWithNFTs) => {
    nftIds.forEach((nftId) => {
      const plot = findAvailablePlot();
      nftIdsByPlotId.set(plot.id, nftId);
    });
  };

  let extraAttempts = 0;
  const findAvailablePlot = (): Plot => {
    do {
      const randomPlotIndex = randomInt(0, plots.length);
      const plot = plots[randomPlotIndex];
      if (!nftIdsByPlotId.has(plot.id)) {
        return plot;
      }
      extraAttempts += 1;
    } while (true);
  };

  ownersWithNFTs.forEach(assignPlotsForOwner);

  console.debug('Extra attempts:', extraAttempts);

  return [...nftIdsByPlotId.entries()].map(([plotId, nftId]) => ({ nftId, plotId }));
};
