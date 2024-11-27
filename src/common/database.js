import * as duckdb from "@duckdb/duckdb-wasm";
import duckdb_wasm_eh from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url";
import eh_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url";

const initDB = async () => {
  try {
    const bundle = await duckdb.selectBundle({
      eh: {
        mainModule: duckdb_wasm_eh,
        mainWorker: eh_worker,
      },
    });

    const worker = new Worker(bundle.mainWorker);
    const logger = new duckdb.ConsoleLogger(3); // WARN
    const db = new duckdb.AsyncDuckDB(logger, worker);
    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    return db;
  } catch(e) {
    console.log("Error while instantiating db:", e);
  }
};


const initConn = async (db) => {
  try {
    const conn = await db.connect();
    return conn;
  } catch (e) {
    console.log("Error while getting db connection:", e);
  }
};

const initDBSchema = async(db) => {
  try {
    const battingRes = await fetch('/db/batting.parquet');
    await db.registerFileBuffer('batting_file', new Uint8Array(await battingRes.arrayBuffer()));

    // const fieldingRes = await fetch('/db/fielding.parquet');
    // await db.registerFileBuffer('fielding_file', new Uint8Array(await fieldingRes.arrayBuffer()));

    const gameinfoRes = await fetch('/db/gameinfo.parquet');
    await db.registerFileBuffer('gameinfo_file', new Uint8Array(await gameinfoRes.arrayBuffer()));

    const pitchingRes = await fetch('/db/pitching.parquet');
    await db.registerFileBuffer('pitching_file', new Uint8Array(await pitchingRes.arrayBuffer()));

    const playersRes = await fetch('/db/players.parquet');
    await db.registerFileBuffer('players_file', new Uint8Array(await playersRes.arrayBuffer()));

    const playsRes = await fetch('/db/plays.parquet');
    await db.registerFileBuffer('plays_file', new Uint8Array(await playsRes.arrayBuffer()));

  } catch(e) {
    console.log("Error while building local database:", e);
  }
}

export const db = await initDB();
export const conn = await initConn(db);
await initDBSchema(db, conn);
