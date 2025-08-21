import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password
        ) {
          // Vérif mot de passe avec bcrypt
          const isValid = await compare(
            credentials.password,
            await hashAdminPassword()
          );

          if (isValid) {
            return { id: "1", name: "Admin", email: credentials.email };
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login", // page custom
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// On hash une seule fois le mot de passe admin de l'env
import bcrypt from "bcryptjs";
async function hashAdminPassword() {
  return await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);
}
