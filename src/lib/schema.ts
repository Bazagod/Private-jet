import { z } from "zod";

export const bookingSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(8, "Phone number must be at least 8 digits")
    .regex(/^[+]?[\d\s()-]+$/, "Please enter a valid phone number"),
  passengers: z
    .number()
    .min(1, "At least 1 passenger is required")
    .max(18, "Maximum 18 passengers"),
  date: z.string().min(1, "Please select a departure date"),
  specialRequests: z.string().max(500, "Maximum 500 characters").optional(),
});

export type BookingSchema = z.infer<typeof bookingSchema>;
