"use server"

import { CreateComCategoryParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import ComCategory from "../database/models/comcategory.model"

export const createComCategory = async ({ comCategoryName }: CreateComCategoryParams) => {
  try {
    await connectToDatabase();

    const newComCategory = await ComCategory.create({ name: comCategoryName});

    return JSON.parse(JSON.stringify(newComCategory));
  } catch (error) {
    handleError(error)
  }
}

export const getAllComCategories = async () => {
  try {
    await connectToDatabase();

    const comCategories = await ComCategory.find();

    return JSON.parse(JSON.stringify(comCategories));
  } catch (error) {
    handleError(error)
  }
}