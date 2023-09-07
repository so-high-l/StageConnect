import Offer from "../models/Offer.js";

// SEARCH BY KEYWORD

export const search = async (req, res) => {
  const { searchQuery } = req.params;
  try {
    const results = await Offer.aggregate([
      {
        $lookup: {
          from: "users", // Use the name of the User collection here
          localField: "companyId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $match: {
          $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { description: { $regex: searchQuery, $options: "i" } },
            { "user.firstName": { $regex: searchQuery, $options: "i" } },
            { "user.lastName": { $regex: searchQuery, $options: "i" } },
          ],
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          startDate: 1,
          endDate: 1,
          "user._id": 1,
          "user.firstName": 1,
          "user.lastName": 1,
          "user.email": 1,
          "user.picturePath": 1,
          "user.location": 1,
          "user.occupation": 1,
          "user.role": 1,
        },
      },
    ]);
    console.log(results);
    res.status(201).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
