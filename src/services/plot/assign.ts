import { randomInt } from 'crypto';
import { groupNFTsWithOwners, NFTOwner, OwnerWithNFTs } from '../owners';
import { buildPlotNeighborsGraph } from './neighbors';
import { convertPlotsFileToPlots, Plot, PlotsFile, PlotWithFeature } from './plot';

export interface NFTPlot {
  ownerAddress: string;
  nftId: string;
  plotId: number;
}

export const assignPlotsToNFTsFromFile = (plotsFile: PlotsFile, nftOwners: NFTOwner[]): NFTPlot[] =>
  assignPlotsToNFTs(convertPlotsFileToPlots(plotsFile), nftOwners);

export const assignPlotsToNFTs = (plots: Plot[], nftOwners: NFTOwner[]): NFTPlot[] => {
  const neighborsGraph = buildPlotNeighborsGraph(plots);
  const ownersWithNFTs = groupNFTsWithOwners(nftOwners);

  console.log(`Total plots: ${plots.length}`);
  console.log(`Total NFTs: ${nftOwners.length}`);
  console.log('Top 10 owners:');
  for (let i = 0; i < Math.min(10, ownersWithNFTs.length); i++) {
    console.log(`${ownersWithNFTs[i].ownerAddress}: ${ownersWithNFTs[i].nftIds.length}`);
  }

  if (plots.length < nftOwners.length) {
    throw new Error(`Not enough plots for NFTs: ${plots.length} < ${nftOwners.length}`);
  }

  const nftIdsByPlotId = new Map<number, NFTPlot>();

  let nonNeighboring = 0;

  const assignPlotsForOwner = ({ ownerAddress, nftIds }: OwnerWithNFTs) => {
    let ownerPlotsForNeighbors: Plot[] = [];
    let ownerPlots = 0;

    const setPlotForNFT = (plot: Plot, nftId: string) => {
      nftIdsByPlotId.set(plot.id, { ownerAddress, nftId, plotId: plot.id });
      ownerPlotsForNeighbors.push(plot);
      ownerPlots += 1;
    };

    nftIds.forEach((nftId, index) => {
      while (ownerPlotsForNeighbors.length > 0) {
        const currentPlot = ownerPlotsForNeighbors[0];
        const neighborPlot = findNeighboringPlot(currentPlot);
        if (neighborPlot !== undefined) {
          setPlotForNFT(neighborPlot, nftId);
          return;
        }

        // console.debug(`Couldn't find neighboring plot after ${ownerPlots}, ${ownerPlotsForNeighbors.length - 1} left`);
        ownerPlotsForNeighbors = ownerPlotsForNeighbors.slice(1, ownerPlotsForNeighbors.length);
      }

      // no other plots – just pick another one (or the first one) at random
      if (index > 0) {
        console.debug(`Getting random (non-neighboring) plot for ${ownerAddress} (${nftId}) after ${ownerPlots} plots`);
        nonNeighboring += 1;
      }
      const plot = findAvailablePlot();
      setPlotForNFT(plot, nftId);
    });
  };

  const findNeighboringPlot = (plot: Plot): Plot | undefined => {
    const { neighbors } = neighborsGraph.nodeFromPlot(plot);
    return findAvailablePlotFromPlots([...neighbors]);
  };

  const findAvailablePlot = (): Plot => findAvailablePlotFromPlots(plots)!;

  let extraAttempts = 0;
  const findAvailablePlotFromPlots = (thePlots: Plot[]): Plot | undefined => {
    if (thePlots.length === 0) {
      return undefined;
    }

    const plotsIdsChecked = new Set<number>();
    do {
      const randomPlotIndex = randomInt(thePlots.length);
      const plot = thePlots[randomPlotIndex];
      if (!nftIdsByPlotId.has(plot.id)) {
        return plot;
      }
      plotsIdsChecked.add(plot.id);
      extraAttempts += 1;
    } while (plotsIdsChecked.size < thePlots.length);

    return undefined;
  };

  ownersWithNFTs.forEach(assignPlotsForOwner);

  console.debug('Non-neighboring attempts:', nonNeighboring);
  console.debug('Extra attempts:', extraAttempts);

  return [...nftIdsByPlotId.values()];
};

export interface NFTOwnerAssignment {
  ownerAddress: string;
  plots: PlotWithFeature[];
}

export const buildOwnerAssignmentsWithPlots = (plots: PlotsFile, nftPlots: NFTPlot[]): NFTOwnerAssignment[] => {
  const plotsById = convertPlotsFileToPlots(plots).reduce((plots, currentValue) => {
    plots.set(currentValue.id, currentValue);
    return plots;
  }, new Map<number, PlotWithFeature>());

  const plotsByOwner = nftPlots.reduce((plots, { ownerAddress, plotId }) => {
    if (!plots.has(ownerAddress)) {
      plots.set(ownerAddress, { ownerAddress: ownerAddress, plots: [] });
    }
    plots.get(ownerAddress)!.plots.push(plotsById.get(plotId)!);
    return plots;
  }, new Map<string, NFTOwnerAssignment>());
  return [...plotsByOwner.values()];
};
