import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";


export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword : {
        enabled : true
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema : {
            ...schema,
        }
    }),
})

