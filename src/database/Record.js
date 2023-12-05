import { createRequire } from 'node:module';
import { saveToDatabase } from './utils.js';
const require = createRequire(import.meta.url);
const DB = require('./db.json')
import { client } from '../config/database.js';

export const getRecordForWorkout = (workoutId) => {
    try {
        const record = DB.records.filter((record) => record.workout === workoutId);
        if (!record) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`
            }
        }
        return record;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}


export const testPgDb = async() => {
    await client.connect()
    const result = await client.query('SELECT NOW()')
    console.log(result)
    await client.end();
}