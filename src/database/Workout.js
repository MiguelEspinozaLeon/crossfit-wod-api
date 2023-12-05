import { saveToDatabase } from './utils.js';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const DB = require('./db.json')

import { client } from '../config/database.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name: 
 *           type: string
 *           example: Tommy V  
 *         mode:
 *           type: string
 *           example: For Time
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt: 
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */

export const getAllWorkouts = (filterParams) => {
    try {
        let workouts = DB.workouts;
        if (filterParams.mode) {
            return DB.workouts.filter((workout) => 
                workout.mode.toLowerCase().includes(filterParams.mode)
            )
        }
        return workouts;
    } catch (error) {
        throw {status: 500, message: error}
    }
}

export const getOneWorkout = (workoutId) => {
    try{
        const workout = DB.workouts.find((workout)=> workout.id === workoutId);
        if (!workout) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`
            }
        }
        return workout;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error}
    }
}

export const createNewWorkout = (newWorkOut) => {
    const isAlreadyAdded = DB.workouts.findIndex((workout) => 
        workout.name === newWorkOut.name) > -1
    if (isAlreadyAdded) {
        throw {
            status: 400,
            message: `Workout with the name '${newWorkOut.name}' already exists`
        }
    }
    try {
        DB.workouts.push(newWorkOut);
        saveToDatabase(DB);
        return newWorkOut;    
    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error}
    }
    
}

export const deleteOneWorkout = (workoutId) => {
    try {
        const indexToDelete = DB.workouts.findIndex(
            (workout) => workout.id === workoutId
        )
        if(indexForDeletion === -1) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`
            }
        }
        DB.workouts.splice(indexForDeletion, 1)
        saveToDatabase(DB);
    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error}
    }
}

export const updateOneWorkout = (workoutId, changes) => {
    try {
        const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === changes.name)

        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Workout with the name '${changes.name}' already exists`
            }
        }

        const indexToUpdate = DB.workouts.findIndex(
            (workout) => 
            workout.id === workout.id)
        if(indexToUpdate === -1) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`
            }
        };
        
        const updatedWorkout = {
            ...DB.workouts[indexToUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString('en-US', {timeZone: 'UTC'})
        }
        DB.workouts[indexToUpdate] = updatedWorkout;
        saveToDatabase(DB);
        return updatedWorkout;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

