import { createAuthClient } from "better-auth/react";
import { emailOTPClient, organizationClient } from "better-auth/client/plugins";
import { env } from "@/env";

export const authClient = createAuthClient({
    baseURL: env.NEXT_PUBLIC_BASE_URL,
    plugins: [emailOTPClient(), organizationClient()],
});

export const {
    signIn,
    signUp,
    signOut,
    getSession,
    useSession,
    emailOtp,
    verifyEmail,
    changeEmail,
    changePassword,
    resetPassword,
    updateUser,
    deleteUser,
} = authClient;
