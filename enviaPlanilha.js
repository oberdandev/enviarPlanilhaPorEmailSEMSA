import fs from 'node:fs';
import path from 'node:path'
import { buscaEmail } from './emails.js';
import enviaEmail from './webmail.js';
import buscaNome from './buscaNome.js'; 
import { logToFile } from './logger.js';

console.log(path.resolve('../'));
const arquivosNaPastaAnterior = fs.readdirSync('../');

const padraoCNES = (str) => /^\d{7}$/.test(str);

const nomeDaPlanilhaEnviadaPorCNES = arquivosNaPastaAnterior.reduce((acc, current) => {
  const sliced = current.slice(0,7);
  if (padraoCNES(sliced)) 
    return {...acc, [sliced]: current}
  else
    return {...acc}
}, {})

const enviarPlanilhasPorEmaiL = async(objeto) => {
  //logToFile(`[${new Date().toLocaleString('pt-BR', {timeZone: 'UTC'})}][INICIO] Início do Processo de Envio de Emails dia`)
  const arrKeys = [];
  Object.keys(nomeDaPlanilhaEnviadaPorCNES).forEach(key => arrKeys.push(key))
  arrKeys.forEach(async (key) => {
    const query = await buscaEmail(key);
    const queryNomeUnidade = await buscaNome(key);
    const nomeUnidade = queryNomeUnidade[0].no_unidade_saude;
    const email = query[0].email;
    const doc = `../${objeto[key]}`
    const body = `Envio anexo planilha de resgastes do Previne.\n\nAtenciosamente,\nEquipe GEIND`

    try{
      await enviaEmail(`Planilha de Resgates Previne - ${nomeUnidade} - ${key}`, body, doc, email)
    } catch(err) {
      logToFile(`[ERROR] ${nomeUnidade} - ${email}: ${err.message}`);
    } finally {
      logToFile(`[SUCESSO] ${nomeUnidade} - ${email}`);
    }
  })
};

enviarPlanilhasPorEmaiL(nomeDaPlanilhaEnviadaPorCNES);

