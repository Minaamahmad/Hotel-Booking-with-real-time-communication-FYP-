import {
  createRoom,
  getRoomsByHotel,
  getRoom,
  updateRoom,
  deleteRoom,
} from "../Controllers/RoomsController.js";
import express from "express";
import { protect, authorizeRoles } from "../Middlewares/auth.js";

const router = express.Router();

// Create a new room for a hotel
router.post("/:id", protect, authorizeRoles("Owner"), createRoom);

// Get all rooms for a specific hotel
router.get("/:id", protect, authorizeRoles("Owner"), getRoomsByHotel);

// Get a single room by ID
router.get("/:id/:roomId", protect, authorizeRoles("Owner"), getRoom);

// Update a room
router.put("/:id/:roomId", protect, authorizeRoles("Owner"), updateRoom);

// Delete a room
router.delete("/:id/:roomId", protect, authorizeRoles("Owner"), deleteRoom);

export default router;
