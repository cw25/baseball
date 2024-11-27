
import { getRandomInt } from '../common/utils.js';

export const ITERATIONS = 10000;

export function simulateLotsOfOutcomes(history) {
  let simulatedOutcomes = {};
  for (let i=0; i<ITERATIONS; i++) {
    let o = simulateOutcome(history);
    if (!simulatedOutcomes[o]) {
      simulatedOutcomes[o] = 1;
    } else {
      simulatedOutcomes[o]++;
    }
  }

  return simulatedOutcomes;
};

export function simulateOutcome(history) {
  let ceiling = 0;
  ['walk', 'hbp', 'k', 'out', 'single', 'double', 'triple', 'hr'].forEach((x) => {
    ceiling += history[`${x}_pcg`] * Math.pow(10,6);
  });

  let o;
  let threshold = 0;
  let rando = getRandomInt(ceiling);
  ['walk', 'hbp', 'k', 'out', 'single', 'double', 'triple', 'hr'].forEach((x) => {
    let upper = history[`${x}_pcg`] * Math.pow(10,6);
    if (rando >= threshold && rando < upper + threshold + 1) {
      o = x;
    }
    threshold += upper;
  });

  return o || 'err';
};
