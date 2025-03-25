"use client";
import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  };

  if (isPending) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Name:</span> {session?.user.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {session?.user.email}
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700 transition-colors"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
