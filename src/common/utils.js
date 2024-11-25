export function teamName(teamCode) {
  const teamNameMap = {
    "BOS": "Red Sox",
    "LAN": "Dodgers",
  };

  if (!teamNameMap[teamCode]) {
    return teamCode;
  }

  return teamNameMap[teamCode];
};
