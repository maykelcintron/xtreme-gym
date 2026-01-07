import { z } from "zod";

export const UserAuthSchema = z
    .object({ 
        email: z.string().email(), 
        password: z.string().min(6) 
    })
    