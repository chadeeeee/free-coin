"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login
        setTimeout(() => setLoading(false), 1500);
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/view-game-gambling-table-casino 1.png"
                    alt="Casino Background"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Light overlay */}
            <div className="absolute inset-0 z-[1] pointer-events-none" style={{ animation: "lightSweep 4s ease-in-out infinite" }}>
                <Image
                    src="/ligth copy.png"
                    alt="Light Effect"
                    fill
                    className="object-cover opacity-30 mix-blend-screen"
                />
            </div>

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-[40] pointer-events-auto flex items-center justify-between px-6 md:px-12 py-4">
                <Link
                    href="/"
                    className="absolute block transition-transform hover:scale-105"
                    style={{
                        top: '29px',
                        left: '0px',
                        width: '128.39px',
                        height: '87.64px',
                    }}
                >
                    <Image
                        src="/Gemini_Generated_Image_76yuuh76yuuh76yu-depositphotos-bgremover 1.png"
                        alt="Back to Home"
                        width={128}
                        height={88}
                        className="h-full w-full object-contain drop-shadow-[0_0_20px_rgba(201,168,76,0.5)] rotate-90"
                        priority
                    />
                </Link>
                <div
                    className="absolute flex items-center gap-6"
                    style={{
                        top: '40px',
                        right: '35px',
                    }}
                >
                    <Link
                        href="/login"
                        className="login-join-button group relative flex h-[38px] w-[110px] items-center justify-center rounded-full border border-[#b58a3f]/80 bg-[#170f05]/80 md:h-[44px] md:w-[136px] xl:h-[48px] xl:w-[160px] overflow-hidden transition-all hover:scale-105 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffd700]/20 to-transparent translate-x-[-150%] transition-transform duration-700 group-hover:translate-x-[150%] z-10" />
                        <span className="relative z-20 font-cinzel text-xs font-bold tracking-widest text-[#f5e6c8] md:text-sm">
                            LOGIN
                        </span>
                    </Link>

                    <Link
                        href="/join"
                        className="login-join-button group relative flex h-[38px] w-[110px] items-center justify-center rounded-full border border-[#d7b062] bg-gradient-to-b from-[#fcd34d] to-[#b45309] md:h-[44px] md:w-[136px] xl:h-[48px] xl:w-[160px] overflow-hidden shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] active:scale-95"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <span className="relative z-20 font-cinzel text-xs font-bold tracking-widest text-[#2a1805] md:text-sm">
                            JOIN
                        </span>
                    </Link>
                </div>
            </header>

            {/* Login Form */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <div
                    className="rounded-2xl p-8 md:p-10 border border-[#c9a84c]/30"
                    style={{
                        background: "linear-gradient(135deg, rgba(42,31,14,0.9), rgba(20,14,6,0.95))",
                        boxShadow: "0 0 60px rgba(201,168,76,0.15), 0 25px 50px rgba(0,0,0,0.5)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1
                            className="text-3xl font-bold mb-2 text-[#f5d77a]"
                            style={{ fontFamily: "var(--font-cinzel)", textShadow: "0 0 30px rgba(201,168,76,0.3)", marginTop: 20 }}
                        >
                            Welcome Back
                        </h1>
                        <p className="text-[#f5e6c8]/60 text-sm">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-xs uppercase tracking-[0.2em] text-[#c9a84c] mb-3 font-semibold"
                                style={{ fontFamily: "var(--font-cinzel)", margin: "10px 20px 0 10px" }}>
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-4 rounded-lg text-[#f5e6c8] placeholder-[#f5e6c8]/30 border border-[#c9a84c]/20 focus:border-[#c9a84c]/60 focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(201,168,76,0.15)]"
                                style={{ background: "rgba(26,18,8,0.8)", margin: "0px 0px 0 10px", width: "95%", padding: "5px 0px 5px 5px" }}
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs uppercase tracking-[0.2em] text-[#c9a84c] mb-3 font-semibold"
                                style={{ fontFamily: "var(--font-cinzel)", margin: "10px 20px 0 10px" }}>
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-4 rounded-lg text-[#f5e6c8] placeholder-[#f5e6c8]/30 border border-[#c9a84c]/20 focus:border-[#c9a84c]/60 focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(201,168,76,0.15)]"
                                style={{ background: "rgba(26,18,8,0.8)", margin: "0px 0px 0 10px", width: "95%", padding: "5px 0px 5px 5px" }}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Forgot password */}
                        <div className="text-right" style={{ margin: "10px 20px 0 10px" }}>
                            <a href="#" className="text-xs text-[#c9a84c]/70 hover:text-[#f5d77a] transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-lg text-[#1a1208] font-bold uppercase tracking-[0.2em] text-sm bg-gradient-to-r from-[#f5d77a] to-[#c9a84c] hover:from-[#ffe599] hover:to-[#d4b35a] transition-all duration-300 cursor-pointer shadow-[0_0_25px_rgba(201,168,76,0.3)] hover:shadow-[0_0_35px_rgba(201,168,76,0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{ fontFamily: "var(--font-cinzel)", width: "95%", margin: "20px 0px 20px 10px", padding: "10px 0px 10px 0px" }}
                        >
                            {loading ? "Signing in..." : "Login"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a84c]/30" />
                        <span className="px-4 text-xs text-[#c9a84c]/50 uppercase tracking-widest"
                            style={{ fontFamily: "var(--font-cinzel)" }}>or</span>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a84c]/30" />
                    </div>

                    {/* Join link */}
                    <p className="text-center text-sm text-[#f5e6c8]/60" style={{ margin: "20px 0px 10px 0px" }}>
                        Don&apos;t have an account?{" "}
                        <Link href="/join" className="text-[#f5d77a] hover:text-[#ffe599] transition-colors font-semibold">
                            Join Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
