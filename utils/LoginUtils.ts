import { prisma } from "./prismaClient";
import bcrypt from "bcrypt";

export const handleLogin = async (mailchainAddr: string, password: string) => {
  try {
    const user = await prisma.user_accounts.findUnique({
      where: {
        mailchain_address: mailchainAddr,
      },
      select: {
        name: true,
        mailchain_address: true,
        password: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    return {
      name: user.name,
      mailchainAddr: user.mailchain_address,
    };

    // Redirect to dashboard or home page
  } catch (error) {
    throw error;
  }
};
