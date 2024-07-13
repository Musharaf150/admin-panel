'use server'

import { CreateAdminParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Admin from "../database/models/admin.model"
import Order from "../database/models/order.model"
import event from "../database/models/event.model"

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