
import { getRandomInt } from '../common/utils.js';

export const A_WHOLE_LOT = 50000;
const BATTING_OUTCOMES = ['walk', 'hbp', 'k', 'go', 'fo', 'lo', 'single', 'double', 'triple', 'hr'];
const PITCHING_OUTCOMES = ['go', 'fo', 'hbp', 'k', 'lo', 'walk', 'hr', 'single', 'double', 'triple', 'wp', 'bk'];
const FIELDING_OUTCOMES = ['out'];

export function simulateOutcomes(history, style, iterations) {
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

  // Initialize all outcomes
  let simulatedOutcomes = {};
  outcomeTypes.forEach((x) => simulatedOutcomes[x] = 0);

  for (let i=0; i<iterations; i++) {
    let o = simulateOutcome(history, style);
    simulatedOutcomes[o]++;
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
    // Leave small chance for any outcome, even if it's not in the history
    if (history[`${x}_pcg`] === 0) {
      history[`${x}_pcg`] = 0.000100;
    }

    ceiling += history[`${x}_pcg`] * Math.pow(10,6);
  });
  let rando = getRandomInt(ceiling);

  let o;
  let threshold = 0;
  outcomeTypes.forEach((x) => {
    let upper = history[`${x}_pcg`] * Math.pow(10,6);
    if (rando >= threshold && rando < upper + threshold + 1) {
      o = x;
    }
    threshold += upper;
  });

  return o || 'err';
};

export function simulateMatchup(pitcher, batter) {
  let rando = getRandomInt(100);
  if (rando < 50) {
    return simulateOutcome(pitcher, 'pitching');
  } else {
    return simulateOutcome(batter, 'batting');
  }
};

export function simulateMatchupOutcomes(pitcher, batter, iterations) {
  // Initialize all outcomes
  let simulatedOutcomes = {};
  PITCHING_OUTCOMES.forEach((x) => simulatedOutcomes[x] = 0);

  for (let i=0; i<iterations; i++) {
    let o;
    let rando = getRandomInt(100);
    if (rando < 50) {
      o = simulateOutcome(pitcher, 'pitching');
    } else {
      o = simulateOutcome(batter, 'batting');
    }

    simulatedOutcomes[o]++;
  }

  return simulatedOutcomes;
};
