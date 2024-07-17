'use server'

import { CreateAdminParams, GetAllUsersParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Admin from "../database/models/admin.model"
import Order from "../database/models/order.model"
import event from "../database/models/event.model"
import { Query } from "mongoose"

export const createAdmin = async (user: CreateAdminParams) => {
    try {
        await connectToDatabase();

        const newAdmin = await Admin.create(user);

        return JSON.parse(JSON.stringify(newAdmin))
    } catch (error) {
        handleError(error)
    }

}
export async function getUserById(userId: string) {
    try {
      await connectToDatabase()
  
      const admin = await Admin.findById(userId)
  
      if (!admin) throw new Error('User not found')
      return JSON.parse(JSON.stringify(admin))
    } catch (error) {
      handleError(error)
    }
  }

  import User from '../database/models/user.model'; // Adjust import based on your project structure
  
  
  export async function getAllUsers() {
    try {
      await connectToDatabase();
  
      const users = await User.find(); // Fetch all users
  
      return users.map(user => ({
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        photo: user.photo,
      }));
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      throw new Error('Failed to fetch users');
    }
  }
  

function getCategoryByName(category: string) {
  throw new Error("Function not implemented.")
}
function populateAdmin(eventsQuery: Query<any[], any, {}, any, "find", {}>) {
  throw new Error("Function not implemented.")
}

