import { db, conn } from "./database.js";

export const fetchPlaysCount = async () => {
  let res = await genericQuery(
    "SELECT COUNT(*)::INTEGER AS plays_count FROM read_parquet('plays_file')"
  );
  return res[0].plays_count;
};

const genericQuery = async (sql) => {
  let q = await conn.query(sql);
  let results = await q.toArray().map((row) => row.toJSON());
  return results;
};
