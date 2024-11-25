export function teamName(teamCode) {
  console.log(teamCode);
  const teamNameMap = {
    "BOS": "Red Sox",
    "LAN": "Dodgers",
  };

  if (!teamNameMap[teamCode]) {
    return teamCode;
  }

  console.log(teamNameMap[teamCode]);
  return teamNameMap[teamCode];
};
