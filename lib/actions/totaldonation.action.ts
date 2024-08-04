import { connectToDatabase } from "../database";
import Totaldonation from "../database/models/totaldonation.model";
import { handleError } from "../utils";

// GET ALL donations
export async function getAllTotalDonations() {
    try {
      await connectToDatabase();
  
      const donation = await Totaldonation.find(); // Fetch all donations
  
      return donation.map(donation => ({
        createdAt: {
          type: Date,
          default: Date.now,
        },
        stripeId: {
          type: String,
          required: true,
          unique: true,
        },
        amount: {
          type: String,
        },
        donorId: {
          $concat: ['$donor.id','$donor.firstName', ' ', '$donor.lastName'],
          },
      }));
    } catch (error) {
      console.error('Error in getAllDonations:', error);
      throw new Error('Failed to fetch All Donations');
    }
  }


  //GET ALL DONATIONS FOR GRAPHVIEW

  export async function getDonationForGraph() {
    try {
      await connectToDatabase();

      const data = await Totaldonation.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            totalDonation: { $sum: { $toDouble: "$amount" } }
          }
        },
        {
          $sort: { _id: 1 } // Sort by month
        },
        {
          $project: {
            month: "$_id",
            donation: "$totalDonation",
            _id: 0
          }
        }
      ]);

      return JSON.parse(JSON.stringify(data))
    } catch (error) {
      handleError(error)
    }
  }