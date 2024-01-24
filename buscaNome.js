import pool from "./server.js";

const buscaNome = async (cnes) => {
  const q = await pool.query(`
  SELECT * 
  FROM "TAB_CNES_DISA" tcd
  where tcd.no_disa = '3 OESTE'
  and   tcd.nu_cnes = '${cnes}'
  `)
  return q.rows;
}

export default buscaNome;