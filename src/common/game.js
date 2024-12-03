import { pitchingOutcomesByPlayerID, battingOutcomesByPlayerID } from "./queries";
import { simulateMatchup } from "./simulator";

export function newGame() {
  return {
    homeTeam: 'LAN',
    visitorTeam: 'CIN',
    homeLineup: {
      "P": { id: 'sheee001' },
      "C": { id: 'smitw003' },
      "1B": { id: 'freef001' },
      "2B": { id: 'taylc001' },
      "3B": { id: 'muncm001' },
      "SS": { id: 'rojam002'},
      "LF": { id: 'perad001' },
      "CF": { id: 'outmj002' },
      "RF": { id: 'heywj001' },
      "DH": { id: 'martj006' },
      battingOrder: [ 'perad001', 'freef001', 'smitw003', 'muncm001', 'martj006', 'heywj001', 'outmj002', 'taylc001', 'rojam002' ],
    },
    visitorLineup: {
      "P": { id: 'weavl001' },
      "C": { id: 'maill001' },
      "1B": { id: 'vottj001' },
      "2B": { id: 'mclam001' },
      "3B": { id: 'stees001' },
      "SS": { id: 'delae003' },
      "LF": { id: 'senzn001' },
      "CF": { id: 'friet001' },
      "RF": { id: 'fralj001' },
      "DH": { id: 'encac001' },
      battingOrder: [ 'delae003', 'friet001', 'mclam001', 'fralj001', 'stees001', 'vottj001', 'encac001', 'senzn001', 'maill001' ],
    },
    status: {
      "1Brunner": {},
      "2Brunner": {},
      "3Brunner": {},
      inning: 1,
      bottomInning: false,
      outs: 0,
      visitorScoring: [],
      homeScoring: [],
      visitorScore: 0,
      homeScore: 0,
      visitorBattingOrderIndex: 0,
      homeBattingOrderIndex: 0,
    },
    simulateAtBat: async function(pitcher, batter) {
      console.log("simulating", pitcher, batter);
      return simulateMatchup(pitcher, batter);
    },
    simulateHalfInning: async function() {
      let pID, bID, pitcher, batter, outcome;
      let resultsLog = [];

      while (this.status.inning < 2) {
        while (this.status.outs < 3) {
          if (this.status.bottomInning) {
            pID = this.visitorLineup.P.id;
            bID = this.homeLineup.battingOrder[this.status.homeBattingOrderIndex];
          } else {
            console.log("visitors batter", this.status.visitorBattingOrderIndex);
            pID = this.homeLineup.P.id;
            bID = this.visitorLineup.battingOrder[this.status.visitorBattingOrderIndex];
          }
          console.log("pitcher", pID, "batter", bID);

          pitcher = await pitchingOutcomesByPlayerID(pID);
          batter = await battingOutcomesByPlayerID(bID);
          outcome = await this.simulateAtBat(pitcher, batter);

          let result = [this.status.inning, this.status.outs, this.status.bottomInning, bID, outcome];
          let resultID = result.join('-');
          resultsLog.push([resultID, ...result]);

          if (['fo', 'go', 'lo', 'k'].includes(outcome)) {
            this.status.outs += 1;
          } else if (outcome === "bk") {
            // this.advanceAllBaseRunners()
            // ['hbp', 'walk', 'hr', 'single', 'double', 'triple',
            // Advance on-base runners only +1 each
          }

          if (this.status.bottomInning) {
            this.status.homeBattingOrderIndex = (this.status.homeBattingOrderIndex + 1) % 9;
          } else {
            this.status.visitorBattingOrderIndex = (this.status.visitorBattingOrderIndex + 1) %9;
          }
        }

        if (this.status.bottomInning) {
          this.status.inning++;
        }
        this.status.bottomInning = !this.status.bottomInning;
        this.status.outs = 0;

        return resultsLog;
      }
    },
  };
}
