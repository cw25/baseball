import * as duckdb from "@duckdb/duckdb-wasm";
import duckdb_wasm from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url";
import mvp_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url";
import duckdb_wasm_eh from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url";
import eh_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url";

const initDB = async () => {
  try {
    // Select a bundle based on browser checks
    const bundle = await duckdb.selectBundle({
      mvp: {
        mainModule: duckdb_wasm,
        mainWorker: mvp_worker,
      },
      eh: {
        mainModule: duckdb_wasm_eh,
        mainWorker: eh_worker,
      },
    });

    // Instantiate the asynchronus version of DuckDB-wasm
    // Log level is set to 3 because default lvl 2 is INFO and prints
    // all queries to console. Do not want.
    const worker = new Worker(bundle.mainWorker);
    const logger = new duckdb.ConsoleLogger(3);
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

const initDBSchema = async(db, conn) => {
  try {
    const playsRes = await fetch('/db/plays.parquet');
    await db.registerFileBuffer('plays_file', new Uint8Array(await playsRes.arrayBuffer()));
  } catch(e) {
    console.log("Error while building local database:", e);
  }
}

export const db = await initDB();
export const conn = await initConn(db);
await initDBSchema(db, conn);
