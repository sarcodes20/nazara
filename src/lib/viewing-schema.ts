import { z } from "zod";

export const PROJECT_TYPES = [
  "Residence",
  "Hospitality",
  "Retail",
  "Yacht",
  "Aviation",
  "Institutional",
] as const;

/**
 * Messages are the copy, not developer strings: every one says what to do
 * rather than what went wrong (Volume Three §01).
 */
export const viewingSchema = z.object({
  name: z.string().min(1, "We need this one."),
  email: z.string().min(1, "We need this one.").email("Check the address — there is no @ in it."),
  practice: z.string().optional(),
  location: z.string().min(1, "We need this one."),
  type: z.enum(PROJECT_TYPES, { message: "Choose the closest one." }),
  area: z
    .string()
    .min(1, "We need this one.")
    .regex(/^\d[\d,\s]*$/, "Enter the area in square metres, as a number."),
  notes: z.string().max(1200).optional(),
  consent: z.literal(true, { message: "We need your permission to write back." }),
  stones: z.array(z.string()).optional(),
});

export type ViewingInput = z.infer<typeof viewingSchema>;
