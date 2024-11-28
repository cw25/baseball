export function teamName(teamCode) {
  const teamNameMap = {
    "ALS": "AL All-Stars",
    "ANA": "Angels",
    "ARI": "Diamondbacks",
    "ATL": "Braves",
    "BAL": "Orioles",
    "BOS": "Red Sox",
    "CHA": "White Sox",
    "CHN": "Cubs",
    "CIN": "Reds",
    "CLE": "Guardians",
    "COL": "Rockies",
    "DET": "Tigers",
    "HOU": "Astros",
    "KCA": "Royals",
    "LAN": "Dodgers",
    "MIA": "Marlins",
    "MIL": "Brewers",
    "MIN": "Twins",
    "NLS": "NL All-Stars",
    "NYA": "Yankees",
    "NYN": "Mets",
    "OAK": "A's",
    "PHI": "Phillies",
    "PIT": "Pirates",
    "SDN": "Padres",
    "SEA": "Mariners",
    "SFN": "Giants",
    "SLN": "Cardinals",
    "TBA": "Rays",
    "TEX": "Rangers",
    "TOR": "Blue Jays",
    "WAS": "Nationals",
  };

  if (!teamNameMap[teamCode]) {
    return teamCode;
  }

  return teamNameMap[teamCode];
};

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

