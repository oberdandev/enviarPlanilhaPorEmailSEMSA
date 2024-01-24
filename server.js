import pkg from 'pg';
const {Pool} = pkg;

const pool = new Pool({
    host: '10.50.0.175',
    port: 5432,
    database: 'esus',
    user: 'postgres',
    password: 'admin',
  });

export default pool;