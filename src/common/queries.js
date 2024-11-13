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

const genericQuery = async (sql) => {
  console.log(sql);
  let q = await conn.query(sql);
  let results = await q.toArray().map((row) => row.toJSON());
  return results;
};
