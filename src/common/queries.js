import { conn } from "./database.js";

export const fetchPlaysCount = async () => {
  let res = await genericQuery(
    "SELECT COUNT(*)::INTEGER AS plays_count FROM read_parquet('plays_file')"
  );
  return res[0].plays_count;
};

export const searchPlayers = async (searchTerm) => {
  let res = await genericQuery(`
    SELECT id, first, last, bat, throw, STRING_AGG(team, ', ' ORDER BY team) AS team, STRING_AGG(DISTINCT pos, ', ' ORDER BY pos) AS pos
    FROM read_parquet('players_file')
    WHERE (last ILIKE '%${searchTerm}%' OR first ILIKE '%${searchTerm}%')
      AND team NOT IN ('ALS', 'NLS')
    GROUP BY id, first, last, bat, throw
    ORDER BY last, first
  `);
  return res;
};

export const playerByID = async (playerID) => {
  let res = await genericQuery(`
    SELECT id, first, last, bat, throw, ARRAY_AGG(team ORDER BY team) AS team, STRING_AGG(DISTINCT pos, ', ' ORDER BY pos) AS pos
    FROM read_parquet('players_file')
    WHERE id = '${playerID}'
      AND team NOT IN ('ALS', 'NLS')
    GROUP BY id, first, last, bat, throw
  `);
  return res;
};

export const playerStatsByID = async (playerID) => {
  let res = await genericQuery(`
    WITH regular_season_games AS (
      SELECT gid FROM read_parquet('gameinfo_file') WHERE gametype = 'regular'
    )

    SELECT
      COUNT(DISTINCT gid)::int AS GP,
      SUM(b_ab)::int AS AB,
      SUM(b_r)::int AS R,
      SUM(b_h)::int AS H,
      SUM(b_d)::int AS "2B",
      SUM(b_t)::int AS "3B",
      SUM(b_hr)::int AS HR,
      SUM(b_rbi)::int AS RBI,
      SUM(b_w)::int AS BB,
      SUM(b_hbp)::int AS HBP,
      SUM(b_k)::int AS SO,
      SUM(b_sb)::int AS SB,
      SUM(b_cs)::int AS CS,
      ROUND(SUM(b_h)::int / SUM(b_ab)::int, 3) AS AVG,
      ROUND(SUM(b_h + b_w + b_hbp)::int / SUM(b_ab + b_w + b_hbp + b_sf)::int, 3) AS OBP,
      ROUND(SUM(b_h + b_d + (b_t * 2) + (b_hr * 3))::int / SUM(b_ab)::int, 3) AS SLG,
      ROUND(
        SUM(b_h + b_w + b_hbp)::int / SUM(b_ab + b_w + b_hbp + b_sf)::int
        + SUM(b_h + b_d + (b_t * 2) + (b_hr * 3))::int / SUM(b_ab)::int, 3) AS OPS,
      NULL AS WAR
    FROM read_parquet('batting_file')
    WHERE id = '${playerID}'
    AND gid IN (
      SELECT gid FROM regular_season_games
    )
  `);
  return res;
}

const genericQuery = async (sql) => {
  let q = await conn.query(sql);
  let results = await q.toArray().map((row) => row.toJSON());
  return results;
};
