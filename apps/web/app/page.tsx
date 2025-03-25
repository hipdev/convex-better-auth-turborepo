"use client";
import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "../lib/auth-client";

type FormErrors = {
  email?: string[];
  password?: string[];
  repeatPassword?: string[];
  name?: string[];
  _form?: string[];
};

export default function Home() {
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const repeatPassword = formData.get("repeatPassword") as string;
    const name = formData.get("name") as string;

    // Reset errors
    setErrors({});

    // Validate fields
    if (!email || !password || !repeatPassword || !name) {
      setErrors({
        _form: ["Please complete all fields"],
      });
      return;
    }

    if (password !== repeatPassword) {
      setErrors({
        repeatPassword: ["Passwords do not match"],
      });
      return;
    }

    try {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard",
      });

      if (error) {
        setErrors({
          _form: [error.message || "Error registering user"],
        });
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setErrors({
        _form: ["An error occurred while registering the user"],
      });
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="w-80">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email.join(", ")}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password.join(", ")}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="repeatPassword"
                  className="block text-sm font-medium"
                >
                  Repeat Password
                </label>
                <input
                  id="repeatPassword"
                  name="repeatPassword"
                  type="password"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.repeatPassword && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.repeatPassword.join(", ")}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.name && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.name.join(", ")}
                  </div>
                )}
              </div>
              {errors._form && (
                <div className="text-red-500 text-sm">
                  {errors._form.join(", ")}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition-colors"
              >
                Sign up
              </button>
            </div>
          </form>

          <Link href="/login" className="mt-10 block hover:underline">
            Already have an account?
          </Link>

          <div className="my-10 text-center"> ---- </div>
          <div>
            <button
              type="button"
              onClick={async () => {
                const data = await authClient.signIn.social({
                  provider: "google",
                  callbackURL: "/dashboard",
                });
                console.log(data, "res from google");
              }}
              className="w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition-colors"
            >
              Login with Google
            </button>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          By{" "}
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
        </a>
      </footer>
    </div>
  );
}
