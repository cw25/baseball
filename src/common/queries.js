import { conn } from "./database.js";

export const fetchPlaysCount = async () => {
  let res = await genericQuery(
    "SELECT COUNT(*)::INTEGER AS plays_count FROM read_parquet('plays_file')"
  );
  return res[0].plays_count;
};

export const searchPlayers = async (searchTerm) => {
  let res = await genericQuery("SELECT * FROM read_parquet('players_file') WHERE last ILIKE '%" + searchTerm + "%' OR first LIKE '%" + searchTerm + "%'");
  return res;
};

export const freddie = async () => {
  let res = await genericQuery(`
    WITH regular_season_games AS (
      SELECT gid FROM read_parquet('gameinfo_file') WHERE gametype = 'regular'
    )

    SELECT
      COUNT(DISTINCT gid)::int AS GP,
      SUM(ab)::int AS AB,
      (
        SELECT COUNT(*)
        FROM read_parquet('plays_file')
        WHERE
          gid IN (SELECT gid FROM regular_season_games)
          AND (run_b = 'freef001' OR run1 = 'freef001' OR run2 = 'freef001' OR run3 = 'freef001')
      )::int AS R,
      SUM(single + double + triple + hr)::int AS H,
      SUM(double)::int AS "2B",
      SUM(triple)::int AS "3B",
      SUM(hr)::int AS HR,
      SUM(rbi)::int AS RBI,
      SUM(walk)::int AS BB,
      SUM(hbp)::int AS HBP,
      SUM(k)::int AS SO,
      NULL AS SB, -- player is not the batter here, sim to runs
      NULL AS CS, -- player is not the batter here, sim to runs
      SUM(single + double + triple + hr)::int / SUM(ab)::int AS AVG,
      SUM(single + double + triple + hr + walk)::int / SUM(ab)::int AS OBP,
      SUM(single + (double * 2) + (triple * 3) + (hr * 4))::int / SUM(ab)::int AS SLG,
      OBP + SLG AS OPS,
      NULL AS WAR -- ???????
    FROM read_parquet('plays_file')
    WHERE batter = 'freef001'
    AND gid IN (
      SELECT gid FROM regular_season_games
    )
  `);
  return res;
}

const genericQuery = async (sql) => {
  console.log(sql);
  let q = await conn.query(sql);
  let results = await q.toArray().map((row) => row.toJSON());
  return results;
};
