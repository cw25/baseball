export function teamName(teamCode) {
  const teamNameMap = {
    "BOS": "Red Sox",
    "LAN": "Dodgers", // #02319b / #ffffff
  };

  if (!teamNameMap[teamCode]) {
    return teamCode;
  }

  return teamNameMap[teamCode];
};
