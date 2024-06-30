import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  pages: {
    newUser: "/home",
  },
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
};

export default NextAuth(authOptions);
