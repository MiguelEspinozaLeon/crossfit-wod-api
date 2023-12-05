import { client } from "../config/database.js";
import data from '../database/db.json'

const insertMembers = async() => {
    await client.connect()

    data.members.forEach((member) => {
        
    })


}