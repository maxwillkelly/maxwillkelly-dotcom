import z from "zod";

export const contactMessageSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email({ error: "Invalid email address" }),
  subtitle: z.string().min(1, "Subtitle is required"),
  message: z.string().min(1, "Message is required"),
});

export type ContactMessage = z.infer<typeof contactMessageSchema>;
