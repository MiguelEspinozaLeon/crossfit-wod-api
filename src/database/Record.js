import { createRequire } from 'node:module';
import { saveToDatabase } from './utils.js';
const require = createRequire(import.meta.url);
const DB = require('./db.json')

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