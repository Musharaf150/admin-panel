"use server"

import Stripe from 'stripe';
import { GetOrdersByEventParams } from "@/types"
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';
import {ObjectId} from 'mongodb';



// GET ALL ORDERS
export async function getAllOrders() {
  try {
    await connectToDatabase();

    const orders = await Order.find(); // Fetch all orders

    return orders.map(order => ({
      createdAt: {
        type: Date,
        default: Date.now,
      },
      stripeId: {
        type: String,
        required: true,
        unique: true,
      },
      totalAmount: {
        type: String,
      },
      event: {
        eventTitle: '$event.title',
        eventId: '$event._id',
      },
      buyerId: {
        $concat: ['$buyer.id','$buyer.firstName', ' ', '$buyer.lastName'],
        },
    }));
  } catch (error) {
    console.error('Error in getAllOrders:', error);
    throw new Error('Failed to fetch Orders');
  }
}



export async function getOrdersByEvent({ searchString = '', eventId }: GetOrdersByEventParams) {
  try {
    await connectToDatabase()

    const matchStage: any = {}
    if (eventId) {
      const eventObjectId = new ObjectId(eventId)
      matchStage.event = eventObjectId
    }
    if (searchString) {
      matchStage['buyer'] = { $regex: RegExp(searchString, 'i') }
    }

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'events',
          localField: 'event',
          foreignField: '_id',
          as: 'event',
        },
      },
      {
        $unwind: '$event',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: '$event.title',
          eventId: '$event._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
        },
      },
      {
        $match: matchStage,
      },
    ])

    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch orders')
  }
}


