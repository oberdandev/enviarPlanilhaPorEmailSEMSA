import fs from 'node:fs';

export const logToFile = (message) => {
  const logStream = fs.createWriteStream('logs.txt', {flags: 'a'});
  logStream.write(`[${new Date().toISOString()}] - ${message}\n`);
  logStream.end();
}