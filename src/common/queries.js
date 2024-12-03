import { conn } from "./database.js";

export const searchPlayers = async (searchTerm) => {
  let res = await genericQuery(`
    SELECT id, first, last, bat, throw, STRING_AGG(team, ',' ORDER BY team) AS team, STRING_AGG(DISTINCT pos, ',' ORDER BY pos) AS pos
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
    SELECT id, first, last, bat, throw,
      ARRAY_AGG(team ORDER BY team) AS team,
      STRING_AGG(DISTINCT pos, ', ' ORDER BY pos) AS pos,
      BIT_OR((pos = 'P')::BIT)::int AS is_pitcher,
      BIT_OR((pos != 'P')::BIT)::int AS is_batter
    FROM read_parquet('players_file')
    WHERE id = '${playerID}'
      AND team NOT IN ('ALS', 'NLS')
    GROUP BY id, first, last, bat, throw
    LIMIT 1
  `);
  return res?.at(0);
};

export const battingStatsByPlayerID = async (playerID) => {
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
        + SUM(b_h + b_d + (b_t * 2) + (b_hr * 3))::int / SUM(b_ab)::int, 3) AS OPS
    FROM read_parquet('batting_file')
    WHERE id = '${playerID}'
    AND gid IN ( SELECT gid FROM regular_season_games )
    LIMIT 1
  `);
  return res?.at(0);
}

export const battingOutcomesByPlayerIDs = async (playerIDs) => {
  let res = await queryToHash(`
    WITH regular_season_games AS (
      SELECT gid FROM read_parquet('gameinfo_file') WHERE gametype = 'regular'
    )

    SELECT
      batter,
      ROUND(SUM(walk) / SUM(pa), 6) AS walk_pcg,
      ROUND(SUM(hbp) / SUM(pa), 6) AS hbp_pcg,
      ROUND(SUM((k AND NOT k_safe)::int) / SUM(pa), 6) AS k_pcg,
      ROUND(SUM(single) / SUM(pa), 6) AS single_pcg,
      ROUND(SUM(double) / SUM(pa), 6) AS double_pcg,
      ROUND(SUM(triple) / SUM(pa), 6) AS triple_pcg,
      ROUND(SUM(hr) / SUM(pa), 6) AS hr_pcg,
      ROUND(SUM((ground AND othout)::int) / SUM(pa), 6) AS go_pcg,
      ROUND(SUM((fly AND othout)::int) / SUM(pa), 6) AS fo_pcg,
      ROUND(SUM((line AND othout)::int) / SUM(pa), 6) AS lo_pcg,
      ROUND(SUM(k_safe) / SUM(pa), 6) AS k_safe_pcg,
    FROM read_parquet('plays_file')
    WHERE
      pa = 1
      AND batter IN ('${ playerIDs.join("', '") }')
      AND gid IN ( SELECT gid FROM regular_season_games )
      AND NOT (di OR oa OR sh OR xi OR e1 OR e2 OR e3 OR e4 OR e5 OR e6 OR e7 OR e8 OR e9)
    GROUP BY batter
  `, 'batter');
  return res;
}

export const pitchingStatsByPlayerID = async (playerID) => {
  let res = await genericQuery(`
    WITH regular_season_games AS (
      SELECT gid FROM read_parquet('gameinfo_file') WHERE gametype = 'regular'
    )

    SELECT
      COUNT(DISTINCT gid)::int AS GP,
      SUM(p_gs)::int AS GS,
      SUM(p_cg)::int AS CG,
      SUM((p_er = 0 AND p_cg = 1)::int)::int AS SHO,
      ((SUM(p_ipouts)::int - (SUM(p_ipouts)::int % 3)) / 3) + (0.1 * (SUM(p_ipouts)::int % 3)) AS IP,
      SUM(p_h)::int AS H,
      SUM(p_r)::int AS R,
      SUM(p_er)::int AS ER,
      SUM(p_hr)::int AS HR,
      SUM(p_w)::int AS BB,
      SUM(p_hbp)::int AS HBP,
      SUM(p_k)::int AS K
    FROM read_parquet('pitching_file')
    WHERE
      id = '${playerID}'
      AND gid IN ( SELECT gid FROM regular_season_games )
    LIMIT 1
  `);
  return res?.at(0);
}

export const pitchingOutcomesByPlayerIDs = async (playerIDs) => {
  let res = await queryToHash(`
    WITH regular_season_games AS (
      SELECT gid FROM read_parquet('gameinfo_file') WHERE gametype = 'regular'
    )

    SELECT
      pitcher,
      SUM((ground AND othout)::int)::int / COUNT(*) AS go_pcg,
      SUM((fly AND othout)::int)::int / COUNT(*) AS fo_pcg,
      SUM(k)::int / COUNT(*) AS k_pcg,
      SUM((line AND othout)::int)::int / COUNT(*) AS lo_pcg,
      SUM(walk)::int / COUNT(*) AS walk_pcg,
      SUM(hbp)::int / COUNT(*) AS hbp_pcg,
      SUM(hr)::int / COUNT(*) AS hr_pcg,
      SUM(single)::int / COUNT(*) AS single_pcg,
      SUM(double)::int / COUNT(*) AS double_pcg,
      SUM(triple)::int / COUNT(*) AS triple_pcg,
      SUM(wp)::int / COUNT(*) AS wp_pcg,
      SUM(bk)::int / COUNT(*) AS bk_pcg,

      SUM((ground AND othout)::int)::int + SUM((fly AND othout)::int)::int + SUM(k)::int + SUM((line AND othout)::int)::int
        + SUM(walk)::int + SUM(hbp)::int + SUM(hr)::int + SUM(single)::int + SUM(double)::int + SUM(triple)::int
        + SUM(wp)::int + SUM(bk)::int AS all_outcomes,
      COUNT(*) AS denom
    FROM read_parquet('plays_file')
    WHERE
      pitcher IN ('${ playerIDs.join("', '") }')
      AND pa = 1
      AND gid IN ( SELECT gid FROM regular_season_games )
      AND NOT (pb OR di OR oa OR xi OR e1 OR e2 OR e3 OR e4 OR e5 OR e6 OR e7 OR e8 OR e9)
    GROUP BY pitcher
  `, 'pitcher');
  return res;
}

export const waitOnDB = async () => {
  let res = await genericQuery(`SELECT gid FROM read_parquet('plays_file') LIMIT 1`);
  return res;
};

const genericQuery = async (sql) => {
  let q = await conn.query(sql);
  let results = await q.toArray().map((row) => row.toJSON());
  return results;
};

const queryToHash = async (sql, hashCol) => {
  let q = await conn.query(sql);
  let results = {};
  await q.toArray().forEach((row) => results[row[hashCol]] = row.toJSON() );
  return results;
};
