import React from 'react';
import { geoCentroid } from 'd3-geo';
import allStates, { MAP_STROKE, MAP_FILL } from 'constants/auditDashboard';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  // Annotation
} from 'react-simple-maps';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const MapChart = () => (
  <ComposableMap projection="geoAlbersUsa">
    <Geographies geography={geoUrl}>
      {({ geographies }) => (
        <>
          {geographies.map(geo => (
            <Geography key={geo.rsmKey} stroke={MAP_STROKE} geography={geo} fill={MAP_FILL} />
          ))}
          {geographies.map(geo => {
            const centroid = geoCentroid(geo);
            const cur = allStates.find(s => s.val === geo.id);
            return (
              <g key={`${geo.rsmKey}-name`}>
                {centroid[0] > -160 && centroid[0] < -67 && (
                  <Marker coordinates={centroid}>
                    <text y="2" fontSize={14} textAnchor="middle">
                      {cur.id}
                    </text>
                  </Marker>
                )}
              </g>
            );
          })}
        </>
      )}
    </Geographies>
  </ComposableMap>
);

export default MapChart;
