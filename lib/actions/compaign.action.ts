"use server"

import { CreateCompaignParams, DeleteCompaignParams, GetAllCompaignsParams, GetRelatedCompaignsByComCategoryParams, UpdateCompaignParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Compaign from "../database/models/compaign.model";
import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import ComCategory from "../database/models/comcategory.model";

const getCategoryByName = async (name: string) => {
  return ComCategory.findOne({ name: { $regex: name, $options: 'i' } })
}


const populateCompaign = (query: any) => {
  return query
    .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
    .populate({ path: 'comCategory', model: ComCategory , select: '_id name' })
}

export const createCompaign = async ({compaign,userId,path}:CreateCompaignParams) => {
    try {
        await connectToDatabase()
    
        const organizer = await User.findById(userId)

        console.log(organizer)
    
        const newCompaign = await Compaign.create({ ...compaign, comCategory: compaign.comCategoryId, organizer: userId })
        revalidatePath(path)

       
    
        return JSON.parse(JSON.stringify(newCompaign))
      } catch (error) {
        console.log(error)
        handleError(error)
      }
}

// UPDATE
export async function updateCompaign({ userId, compaign, path }: UpdateCompaignParams) {
  try {
    await connectToDatabase()

    const compaignToUpdate = await Compaign.findById(compaign._id)

   

    const updatedCompaign = await Compaign.findByIdAndUpdate(
      compaign._id,
      { ...compaign, comCategory: compaign.comCategoryId},
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedCompaign))
  } catch (error) {
    handleError(error)
  }
}

// GET ONE COMPAIGN BY ID
export async function getCompaignById(compaignId: string) {
  try {
    await connectToDatabase()

    const compaign = await populateCompaign(Compaign.findById(compaignId));

    if (!compaign) throw new Error('Compaign not found')

    return JSON.parse(JSON.stringify(compaign))
  } catch (error) {
    handleError(error)
  }
}

export async function getAllCompaigns({ query, limit = 6, page, comCategory }: GetAllCompaignsParams) {
  try {
    await connectToDatabase()

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    const categoryCondition = comCategory ? await getCategoryByName(comCategory) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? { comCategory: categoryCondition._id } : {}],
    }

    const skipAmount = (Number(page) - 1) * limit
    const campaignsQuery = Compaign.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const compaigns = await populateCompaign(campaignsQuery)
    const compaignsCount = await Compaign.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(compaigns)),
      totalPages: Math.ceil(compaignsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteCompaign({ compaignId, path }: DeleteCompaignParams) {
  try {
    await connectToDatabase()

    const deletedEvent = await Compaign.findByIdAndDelete(compaignId)
    if (deletedEvent) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}


// // GET EVENTS BY ORGANIZER
// export async function getEventsByUser({ userId, limit = 6, page }: GetEventsByUserParams) {
//   try {
//     await connectToDatabase()

//     const conditions = { organizer: userId }
//     const skipAmount = (page - 1) * limit

//     const eventsQuery = Event.find(conditions)
//       .sort({ createdAt: 'desc' })
//       .skip(skipAmount)
//       .limit(limit)

//     const events = await populateEvent(eventsQuery)
//     const eventsCount = await Event.countDocuments(conditions)

//     return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
//   } catch (error) {
//     handleError(error)
//   }
// }

// // GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedCompaignByComCategory({
  comCategoryId,
  compaignId,
  limit = 3,
  page = 1,
}: GetRelatedCompaignsByComCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ comCategory: comCategoryId }, { _id: { $ne: compaignId } }] }

    const compaignsQuery = Compaign.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const compaigns = await populateCompaign(compaignsQuery)
    const compaignsCount = await Compaign.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(compaigns)), totalPages: Math.ceil(compaignsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}


