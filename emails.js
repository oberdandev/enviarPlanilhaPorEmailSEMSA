import pool from "./server.js";

const emails = async () => {
  try {
    const q = await pool.query(`
    SELECT * 
    from "TAB_CONTATO_UNIDADES" 
    `)
    return q.rows;

  } catch (err) {
    console.log("Erro ao tentar pegar emails dos diretores no banco de dados: ", err)
  }
}

export const buscaEmail = async (cnes) => {
  try{
    const q = await pool.query(`
    SELECT *
    from "TAB_CONTATO_UNIDADES" tcu
    where tcu.cnes = '${cnes}';
    `)
    return q.rows;
  } catch(err) {
    console.log(`Erro ao tentar solicitar email do CNES ${cnes}: `, err)
  }
}

const diretorEmails = emails();

export default diretorEmails;