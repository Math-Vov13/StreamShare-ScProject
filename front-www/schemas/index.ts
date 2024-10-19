import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  name: z.string()
  .min(1, {message: "Name is required"})
  .max(50, {message: "Name is too long"}),
  
  email: z.string()
  .email({message: "Invalid email"}),
  
  password: z.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  /*.regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/\d/, { message: "Password must contain at least one number" })
  .regex(/[\W_]/, { message: "Password must contain at least one special character" }), */
});
