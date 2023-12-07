import pg from 'pg'

const pool = new pg.Pool({
    host: process.env.PG_HOST || "localhost",
    port: process.env.PG_PORT || "5432",
    database: process.env.PG_DATABASE || "crossfit",
    user: process.env.PG_USER || "postgres",
    password: process.env.PG_PASSWORD || "El16330520"
})

export const query = async(text, params, callback) => {
    try {
        const start = Date.now()
        const res = await pool.query(text, params);
        const duration = Date.now() - start
        console.log('executed query', {text, duration, rows: res.rowCount})  
    return res  
    } catch (error) {
        console.log(error);
    }
}