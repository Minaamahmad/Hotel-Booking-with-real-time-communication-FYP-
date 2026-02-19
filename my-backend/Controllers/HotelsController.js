import Hotels from "../Models/Hotels.js";


// Create a new hotel
export const createHotel = async (req, res) => {
  try {
    const { name, description, location } = req.body;
    const owner_id = req.user._id;

    const newHotel = new Hotels({
      owner_id,
      name,
      description,
      location,
    });

    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ message: "Failed to create hotel", error });
  }
};

// Get owner  hotels
export const getHotels = async (req, res) => {
  try {
    const owner_id = req.user._id;
    const hotels = await Hotels.find({owner_id}).populate("owner_id", "name email");
    res.status(200).json(hotels);
  }
    catch (error) {
    res.status(500).json({ message: "Failed to retrieve hotels", error });
  } 
};

export const publicHotels = async (req, res) => {
  try {
    const hotels = await Hotels.find()
    res.status(200).json(hotels);
  }
    catch (error) {
    res.status(500).json({ message: "Failed to retrieve hotels", error });
  } 
};

// Get a single hotel by ID
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotels.findById(req.params.id).populate("owner_id", "name email");
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve hotel", error });
  }
};

// Update a hotel by ID
export const updateHotel = async (req, res) => {
  try {
    const { name, description, location } = req.body;
    const hotel = await Hotels.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    if (hotel.owner_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    hotel.name = name || hotel.name;
    hotel.description = description || hotel.description;
    hotel.location = location || hotel.location;
    await hotel.save();
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Failed to update hotel", error });
  }
};

// Delete a hotel by ID
export const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotels.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    if (hotel.owner_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await hotel.deleteOne();
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete hotel", error });
  }
}