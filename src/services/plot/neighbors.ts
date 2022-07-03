import { hasOverlappingEdges, NormalizedPlotEdgeData, Plot } from './plot';

export interface PlotNeighborsGraph {
  nodeFromPlot: (plot: Plot) => PlotNeighborsGraphNode;
  nodeFromPlotId: (plotId: number) => PlotNeighborsGraphNode | undefined;
}

export interface PlotNeighborsGraphNode {
  plot: Plot;
  neighbors: Set<Plot>;
}

export const buildPlotNeighborsGraph = (plots: Plot[]): PlotNeighborsGraph => {
  const graph = createEmptyPlotNeighborsGraph();
  const plotsByEdgeSlope = getPlotsByNormalizedEdgeData(plots);

  // go through all the plots and find any neighbors using the edge
  plots.forEach((plot) => {
    plot.edges.forEach((edge) =>
      (plotsByEdgeSlope.get(normalizedEdgeToString(edge.normalized)) ?? [])
        .filter(
          (otherPlot) =>
            otherPlot.id !== plot.id &&
            plot.subdivision == otherPlot.subdivision &&
            hasOverlappingEdges(plot, otherPlot),
        )
        .forEach((otherPlot) => graph.addNeighbor(plot, otherPlot)),
    );
  });

  return graph;
};

const getPlotsByNormalizedEdgeData = (plots: Plot[]) => {
  const plotsByEdgeSlope = new Map<string, Plot[]>();

  // map the plots by its normalized edge data
  plots.forEach((plot) => {
    plot.edges.forEach((edge) => {
      if (plotsByEdgeSlope.has(normalizedEdgeToString(edge.normalized))) {
        plotsByEdgeSlope.get(normalizedEdgeToString(edge.normalized))!.push(plot);
      } else {
        plotsByEdgeSlope.set(normalizedEdgeToString(edge.normalized), [plot]);
      }
    });
  });

  return plotsByEdgeSlope;
};

const normalizedEdgeToString = (slope: NormalizedPlotEdgeData) =>
  `${slope.longitudeShift}@${slope.latitudeAtLongitudeOrigin}`;

interface ModifiablePlotNeighborsGraph extends PlotNeighborsGraph {
  addNeighbor: (plot: Plot, neighborPlot) => void;
}

const createEmptyPlotNeighborsGraph = (): ModifiablePlotNeighborsGraph => {
  const nodes = new Map<number, PlotNeighborsGraphNode>();
  const nodeFromPlot = (plot: Plot) => {
    const node = nodeFromPlotId(plot.id);
    if (node !== undefined) {
      return node;
    }

    const newNode = { plot: plot, neighbors: new Set<Plot>() };
    nodes.set(plot.id, newNode);
    return newNode;
  };
  const nodeFromPlotId = (plotId: number) => nodes.get(plotId);

  const addNeighbor = (plot: Plot, neighborPlot) => {
    nodeFromPlot(plot).neighbors.add(neighborPlot);
    nodeFromPlot(neighborPlot).neighbors.add(plot);
  };

  return { nodeFromPlot, nodeFromPlotId, addNeighbor };
};
