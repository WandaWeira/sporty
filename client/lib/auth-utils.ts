import { User } from "next-auth";

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        id: data.user.id.toString(),
        email: data.user.email,
        name: `${data.user.firstName} ${data.user.lastName}`,
        role: data.user.role,
        token: data.token,
      };
    }
  } catch (error) {
    console.error("Authentication error:", error);
  }
  return null;
}

export async function registerUser(userData: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string;
}): Promise<User | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        id: data.user.id.toString(),
        email: data.user.email,
        name: `${data.user.firstName} ${data.user.lastName}`,
        role: data.user.role,
        token: data.token,
      };
    } else {
      const errorData = await res.json();
      console.error('Registration error:', errorData);
      throw new Error(errorData.message || 'Registration failed');
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}