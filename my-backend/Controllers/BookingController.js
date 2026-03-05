import Rooms from "../Models/Rooms.js";
import Bookings from "../Models/Bookings.js";
import Hotels from "../Models/Hotels.js";

const createBooking =async (req,res) => {

    try{
    const {room_id,check_In,check_out}=req.body;
    const user_id=req.user._id
const room= await Rooms.findbyid({room_id})
if(!room) return res.status(404).json({ message: "Room not found" });

const nights = Math.ceil((new Date(check_out) - new Date(check_in)) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return res.status(400).json({ message: "Invalid dates" });

    // 3. Final Price Calculation
    const total_price = nights * room.price_per_night;

    const newBooking= new Bookings({
     user_id,
     room_id,
     hotel_id:room.hotel._id,
     check_In,
     check_out,
     total_price,
     status:"pending",
    })

await newBooking.save()
res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Booking error", error });
  }

}

