import {
  createBooking,
  getBookingsByUser,
  getBookingsByHotel,
  approveBooking,
  cancelBooking,
} from "../Controllers/BookingController.js";
import express from "express";
import { protect, authorizeRoles } from "../Middlewares/auth.js";

const router = express.Router();

// Create a new booking
router.post("/", protect, authorizeRoles("Guest"), createBooking);

// Get user's bookings
router.get("/", protect, authorizeRoles("Guest"), getBookingsByUser);

// Get hotel's bookings
router.get("/hotel/:hotelId", protect, authorizeRoles("Owner"), getBookingsByHotel);

// Approve a booking
router.put("/:id/approve", protect, authorizeRoles("Owner"), approveBooking);

// Cancel a booking
router.delete("/:id", protect, cancelBooking);

export default router;
