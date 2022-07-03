import { Position } from 'geojson';
import { createPlotEdgesFromPolygonCoordinates, Plot } from '../../src/services/plot/plot';

let plotId = 0;

export const createPlotFromPoints = (points: Position[], subdivision: string = 'Subdivision 1'): Plot => {
  plotId += 1;

  return { id: plotId, uuid: plotId.toString(), subdivision, edges: createPlotEdgesFromPolygonCoordinates([points]) };
};
