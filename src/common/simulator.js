
import { getRandomInt } from '../common/utils.js';

export const A_WHOLE_LOT = 50000;
const BATTING_OUTCOMES = ['walk', 'hbp', 'k', 'out', 'single', 'double', 'triple', 'hr'];
const PITCHING_OUTCOMES = ['gb', 'fb', 'hbp', 'k', 'lo', 'walk', 'hr', 'single', 'double', 'triple', 'wp', 'pb', 'bk'];
const FIELDING_OUTCOMES = ['out'];

export function simulateOutcomes(history, style, iterations) {
  let simulatedOutcomes = {};
  for (let i=0; i<iterations; i++) {
    let o = simulateOutcome(history, style);
    if (!simulatedOutcomes[o]) {
      simulatedOutcomes[o] = 1;
    } else {
      simulatedOutcomes[o]++;
    }
  }

  return simulatedOutcomes;
};

export function simulateOutcome(history, style) {
  let outcomeTypes;
  if (style === "batting") {
    outcomeTypes = BATTING_OUTCOMES;
  } else if (style === "pitching") {
    outcomeTypes = PITCHING_OUTCOMES;
  } else if (style === "fielding") {
    outcomeTypes = FIELDING_OUTCOMES;
  } else {
    throw new "Invalid outcome type";
  }

  let ceiling = 0;
  outcomeTypes.forEach((x) => {
    ceiling += history[`${x}_pcg`] * Math.pow(10,6);
  });

  let o;
  let threshold = 0;
  let rando = getRandomInt(ceiling);
  outcomeTypes.forEach((x) => {
    let upper = history[`${x}_pcg`] * Math.pow(10,6);
    if (rando >= threshold && rando < upper + threshold + 1) {
      o = x;
    }
    threshold += upper;
  });

  return o || 'err';
};
