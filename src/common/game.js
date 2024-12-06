import { pitchingOutcomesByPlayerIDs, battingOutcomesByPlayerIDs } from "./queries";
import { OUT_TYPES, simulateMatchup } from "./simulator";

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
      runner1: null,
      runner2: null,
      runner3: null,
      inning: 1,
      bottomInning: false,
      outs: 0,
      visitorScoring: [],
      homeScoring: [],
      visitorScore: 0,
      homeScore: 0,
      visitorBattingOrderIndex: 0,
      homeBattingOrderIndex: 0,
      gameOver: false,
    },
    simulateAtBat: async function(pitcher, batter) {
      return simulateMatchup(pitcher, batter);
    },
    simulateGame: async function() {
      let pID, bID, pitcher, batter, outcome;
      let resultsLog = [];

      let pitchers = await pitchingOutcomesByPlayerIDs([this.visitorLineup.P.id, this.homeLineup.P.id]);
      let batters = await battingOutcomesByPlayerIDs([...this.visitorLineup.battingOrder, ...this.homeLineup.battingOrder]);

      // TODO: Extra innings, (incl ghost runners)
      // TODO: Walk-off conditions
      while (this.status.inning <= 9) {
        while (this.status.outs < 3) {
          if (this.status.bottomInning) {
            pID = this.visitorLineup.P.id;
            bID = this.homeLineup.battingOrder[this.status.homeBattingOrderIndex];
          } else {
            pID = this.homeLineup.P.id;
            bID = this.visitorLineup.battingOrder[this.status.visitorBattingOrderIndex];
          }

          pitcher = pitchers[pID];
          batter = batters[bID];

          outcome = await this.simulateAtBat(pitcher, batter);
          // TODO: These sometimes produce balks and WPs, which shouldn't advance batting order

          let result = [this.status.inning, this.status.outs, this.status.bottomInning, bID, outcome];
          let resultID = result.join('-');
          resultsLog.push([resultID, ...result]);

          if (OUT_TYPES.includes(outcome)) {
            this.status.outs += 1;
          } else {
            this.advanceRunners(bID, outcome);
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
        this.status.runner1 = null;
        this.status.runner2 = null;
        this.status.runner3 = null;
      }

      this.gameOver = true;
      return resultsLog;
    },
    advanceRunners: function(bID, outcome) {
      console.log(bID, outcome);
      let runsOnPlay = 0;

      // TODO: Running rules for non-force plays, taking into account ball locations, etc
      // TODO: Manager-called steals

      if (outcome === 'hbp' || outcome === 'walk') {
        if (this.status.runner3 !== null && this.status.runner2 !== null && this.status.runner1 !== null) {
          runsOnPlay = 1;
          this.status.runner3 = this.status.runner2;
          this.status.runner2 = this.status.runner1;
          this.status.runner1 = bID;
        } else if (this.status.runner2 !== null && this.status.runner1 !== null) {
          this.status.runner3 = this.status.runner2;
          this.status.runner2 = this.status.runner1;
          this.status.runner1 = bID;
        } else if (this.status.runner1 !== null) {
          this.status.runner2 = this.status.runner1;
          this.status.runner1 = bID;
        } else {
          this.status.runner1 = bID;
        }
      } else if (outcome === 'single') {
        if (this.status.runner3 !== null) {
          runsOnPlay++;
          this.status.runner3 = null;
        }

        if (this.status.runner2 !== null) {
          this.status.runner3 = this.status.runner2;
          this.status.runner2 = null;
        }

        if (this.status.runner1 !== null) {
          this.status.runner2 = this.status.runner1;
          this.status.runner1 = null;
        }

        this.status.runner1 = bID;
      } else if (outcome === 'double') {
        runsOnPlay = Number(this.status.runner2 !== null) + Number(this.status.runner3 !== null);
        this.status.runner3 = this.status.runner1;
        this.status.runner2 = bID;
      } else if (outcome === 'triple') {
        runsOnPlay = Number(this.status.runner1 !== null) + Number(this.status.runner2 !== null) + Number(this.status.runner3 !== null);
        this.status.runner3 = bID;
      } else if (outcome === 'hr') {
        runsOnPlay = 1 + Number(this.status.runner1 !== null) + Number(this.status.runner2 !== null) + Number(this.status.runner3 !== null);
        this.status.runner1 = null;
        this.status.runner2 = null;
        this.status.runner3 = null;
      } else if (outcome === 'bk') {
        console.log("unsupported bk");
      } else if (outcome === 'wp') {
        console.log("unsupported wp");
      }

      if (runsOnPlay > 0) console.log('Scored', runsOnPlay);
      if (this.status.bottomInning) {
        this.status.homeScore += runsOnPlay;
      } else {
        this.status.visitorScore += runsOnPlay;
      }
    },
  };
}
