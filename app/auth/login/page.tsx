"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {createClient} from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const supabase = createClient();

        try {
            const {error} = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // user now has a valid session → middleware will allow /admin
            router.push("/admin");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-sm bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Admin Login</h1>
                <p className="mb-4 text-sm text-gray-500">Enter your mail below to login to your accounr</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                    </div>

                    <div>
                        <div className="flex items-center">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <Link href="/auth/forgot-password" className="ml-auto inline-block font-medium text-gray-700 text-sm underline-offset-4 hover:underline">
                                Forgot your password
                            </Link>
                        </div>
                        <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                    </div>

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <button type="submit" disabled={isLoading} className="w-full rounded-md bg-black text-white py-2 text-sm font-medium hover:bg-gray-900 transition disabled:opacity-50">
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-4 text-center text-xs text-gray-500">Admin access only</p>
            </div>
        </div>
    );
}
