import pg from 'pg'

export const client = new pg.Client({
    host: process.env.PG_HOST || "localhost",
    port: process.env.PG_PORT || "5432",
    database: process.env.PG_DATABASE || "crossfit",
    user: process.env.PG_USER || "postgres",
    password: process.env.PG_PASSWORD || "El16330520"
})