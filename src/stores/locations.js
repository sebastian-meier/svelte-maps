import { writable, derived } from "svelte/store";

/**
 * @typedef {Object} BathLocation
 * @prop {string} Name
 * @prop {string} description 
 * @prop {string} lastMeasurementDate
 * @prop {string} temperature
 * @prop {string} visibilityDepth
 * @prop {string} remarks
 * @prop {string} district
 * @prop {string} smiley
 * @prop {string} bodyOfWater
 * @prop {string} onr
 * @prop {string} bacteriology
 * @prop {string} lavatory
 * @prop {string} wasteDisposal
 * @prop {string} gastronomy
 * @prop {string} lifeguard
 * @prop {string} beachCharacter
 * @prop {string} picture
 * @prop {string} licensee
 * @prop {string} licenseeUrl
 * @prop {string} parkingArea
 * @prop {string} sunbathingArea
 * @prop {string} fishingAllowed
 * @prop {string} campingAllowed
 * @prop {string} playground
 * @prop {string} barbecueArea
 * @prop {string} aquaticsAllowed
 * @prop {string} miscellaneous
 * @prop {string} profile
 * @prop {string} detailDescription
 * @prop {string} rating
 * @prop {string} bnr
 * @prop {number[]} coordinates
 */

/**
 * @typedef {Object} Geom
 * @prop {string} type
 * @prop {number[]} coordinates
 */

/**
 * @typedef {Object} Feature
 * @prop {string} type
 * @prop {object} properties
 * @prop {Geom} geometry
 */

/**
 * @typedef {Object} FeatureCollection
 * @prop {string} type
 * @prop {Feature[]} features
 */

/**
 * writeable store for the loading status of the JSON file
 * @type {import('svelte/store').Writable<boolean>} loading
 */
export const loaded = writable(false);

/**
 * writeable store for the loading status of the JSON file
 * @type {import('svelte/store').Writable<?BathLocation[]>} loading
 */
export const locations = writable(null);

fetch("http://localhost:5173/src/lib/data/bathing-spots.geojson")
  .then((res) => res.json())
  .then((data) => {
    locations.set(data);
    loaded.set(true);
  })
  .catch((e) => {
    throw e;
  });

/**
 * writeable store for the loading status of the JSON file
 * @type {import('svelte/store').Writable<?number>} loading
 */
export const currentLocationID = writable(null);

/**
 * writeable store for the loading status of the JSON file
 * @type {import('svelte/store').Readable<?BathLocation>} loading
 */
export const currentLocation = derived([currentLocationID, locations], ([$id, $locations]) => {
  if ($id && $locations) {
    return $locations[$id];
  } else {
    return null;
  }
});

/**
 * writeable store for the loading status of the JSON file
 * @type {import('svelte/store').Readable<?FeatureCollection>} loading
 */
export const geojsonLocations = derived([locations], ([$locations]) => {
  if ($locations) {
    return {
      type: "FeatureCollection",
      features: $locations.map(l => {
        return {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: l.coordinates
          }
        }
      })
    };
  } else {
    return null;
  }
});