import * as Workout from '../database/Workout.js'
import { v4 as uuidv4 } from 'uuid';

export const getAllWorkouts = async(filterParams) => {
  try {
    const allWorkouts = await Workout.getAllWorkouts(filterParams);
    return allWorkouts;  
  } catch (error) {
    throw error;
  }
  
};

export const getOneWorkout = (workoutId) => {
  try {
    const workout = Workout.getOneWorkout(workoutId);
    return workout;  
  } catch (error) {
    throw error;
  }
  
};

export const createNewWorkout = (newWorkout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuidv4(),
    createdAt: new Date().toLocaleString('en-US', {timeZone: 'UTC'}),
    updatedAT: new Date().toLocaleString('en-US', {timeZone: 'UTC'})    
  }
  try {
    const createdWorkout = Workout.createNewWorkout(workoutToInsert);
    return;  
  } catch (error) {
    throw error;
  }
  
};

export const updateOneWorkout = (workoutId, changes) => {
  try {
    const updatedWorkout = Workout.updateOneWorkout()
    return updatedWorkout;
    
  } catch (error) {
    throw error;
  }
};

export const deleteOneWorkout = (workoutId) => {
  try {
    Workout.deleteOneWorkout(workoutId);
    
  } catch (error) {
    throw error;
  }
};
