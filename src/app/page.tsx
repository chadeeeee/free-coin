"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useRef } from "react";

// The wheel segments in order (matching the wheel image clockwise from top)
const SEGMENTS = [1000, 50, 100, 150, 200, 250, 300, 200, 150, 100, 50, 300, 250, 200, 150, 100, 300, 250, 200, 150, 100, 50, 300, 250];
const SEGMENT_ANGLE = 360 / SEGMENTS.length; // 15 degrees each

export default function Home() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = useCallback(() => {
    if (spinning) return;

    setSpinning(true);
    setShowResult(false);
    setResult(null);

    // Random segment index
    const segmentIndex = Math.floor(Math.random() * SEGMENTS.length);
    const segmentValue = SEGMENTS[segmentIndex];

    // Calculate the target angle: segment center from top
    // The pointer is at the top (0°), so we need the segment to land there
    const segmentCenterAngle = segmentIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;

    // Total rotation: multiple full spins + offset to land on target segment
    const fullSpins = 5 + Math.floor(Math.random() * 5); // 5-9 full rotations
    const totalRotation = currentRotation + (fullSpins * 360) + (360 - segmentCenterAngle);

    // Apply the rotation
    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 6s cubic-bezier(0.17, 0.67, 0.12, 0.99)";
      wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
    }

    setCurrentRotation(totalRotation);

    // Show result after spin
    setTimeout(() => {
      setSpinning(false);
      setResult(segmentValue);
      setShowResult(true);
    }, 6200);
  }, [spinning, currentRotation]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Light overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ animation: "lightSweep 4s ease-in-out infinite" }}>
        <Image
          src="/ligth copy.png"
          alt="Light Effect"
          fill
          className="object-cover opacity-50 mix-blend-screen"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-end px-6 md:px-12 py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-10 py-3.5 text-sm font-semibold tracking-widest uppercase border border-[#f5d77a]/80 rounded-sm text-[#f5d77a] bg-gradient-to-b from-[#3a2f1e]/90 to-[#2a1f0e]/90 shadow-[0_0_25px_rgba(201,168,76,0.3)] transition-all duration-300"
            style={{ fontFamily: "var(--font-cinzel)", cursor: "pointer", marginTop: 20 }}
          >
            <p className="login-join-button">LOGIN</p>
          </Link>
          <Link
            href="/join"
            className="px-10 py-3.5 text-sm font-semibold tracking-widest uppercase rounded-sm text-[#1a1208] bg-gradient-to-b from-[#f5d77a] to-[#c9a84c] hover:from-[#ffe599] hover:to-[#d4b35a] transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.3)]"
            style={{ fontFamily: "var(--font-cinzel)", cursor: "pointer", marginTop: 20, marginRight: 20 }}
          >
            <p className="login-join-button">JOIN</p>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-12 md:pt-20">
        {/* Heading */}
        <h1
          className="text-center text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-wide mb-12 md:mb-16"
          style={{
            fontFamily: "var(--font-cinzel)",
            color: "#f5e6c8",
            textShadow: "0 0 40px rgba(201,168,76,0.5), 0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          HOW MANY COINS
          <br />
          <span className="text-[#f5d77a]">WILL YOU START WITH?</span>
        </h1>

        {/* Wheel Section */}
        <div className="relative flex items-center justify-center" style={{ width: "min(80vw, 550px)", height: "min(80vw, 550px)" }}>
          {/* Decorative cards - left bottom */}
          <div
            className="fixed -bottom-[5%] -left-[5%] w-[35vw] max-w-[400px] z-[1] pointer-events-none"
            style={{ animation: "floatLeft 6s ease-in-out infinite" }}
          >
            <Image
              src="/image 250.png"
              alt="Casino Cards"
              width={450}
              height={450}
              className="drop-shadow-2xl object-contain"
            />
          </div>

          {/* Decorative cards - right bottom */}
          <div
            className="fixed -bottom-[5%] -right-[5%] w-[35vw] max-w-[400px] z-[1] pointer-events-none"
            style={{ animation: "floatRight 6s ease-in-out infinite 0.5s" }}
          >
            <Image
              src="/image 251.png"
              alt="Casino Cards"
              width={450}
              height={450}
              className="drop-shadow-2xl object-contain"
            />
          </div>

          {/* Decorative chips - hidden for cleaner look or moved */}
          {/* <div ... /> (Optimized out for edge layout request) */}

          {/* Pointer / Logo at top */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
            <Image
              src="/Gemini_Generated_Image_76yuuh76yuuh76yu-depositphotos-bgremover 1.png"
              alt="Pointer Choice"
              width={100}
              height={80}
              className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Gold outer ring (static) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <Image
              src="/Ободок золотой.png"
              alt="Gold Ring"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(201,168,76,0.4)]"
            />
          </div>

          {/* Spinning wheel */}
          <div
            ref={wheelRef}
            className="absolute z-[5]"
            style={{
              width: "82%",
              height: "82%",
              top: "9%",
              left: "9%",
            }}
          >
            <Image
              src="/Колесо.png"
              alt="Spinning Wheel"
              fill
              className="object-contain"
            />
          </div>

          {/* Center ring (static) */}
          <div className="absolute z-[11] pointer-events-none" style={{ width: "38%", height: "38%", top: "31%", left: "31%" }}>
            <Image
              src="/Ободок центральный.png"
              alt="Center Ring"
              fill
              className="object-contain"
            />
          </div>

          {/* Inner glow (static) */}
          <div className="absolute z-[12] pointer-events-none" style={{ width: "30%", height: "30%", top: "35%", left: "35%" }}>
            <Image
              src="/Внутреность колеса.png"
              alt="Inner Glow"
              fill
              className="object-contain"
            />
          </div>

          {/* SPIN Button */}
          <button
            onClick={spinWheel}
            disabled={spinning}
            className="absolute z-[15] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-80"
            style={{
              width: "22%",
              height: "22%",
              top: "39%",
              left: "39%",
              fontFamily: "var(--font-cinzel)",
              fontSize: "clamp(1rem, 2.5vw, 1.8rem)",
              fontWeight: 900,
              letterSpacing: "0.15em",
              color: "#1a1208",
              textShadow: "0 1px 2px rgba(201,168,76,0.3)",
              background: "radial-gradient(circle at 40% 35%, #f5e6c8, #c9a84c 60%, #8b6914)",
              animation: spinning ? "none" : "pulseGlow 2s ease-in-out infinite",
              boxShadow: "0 0 20px rgba(201,168,76,0.4), inset 0 2px 4px rgba(255,255,255,0.3)",
            }}
          >
            SPIN
          </button>
        </div>

        {/* Result Display */}
        {showResult && result !== null && (
          <div
            className="mt-8 md:mt-12 text-center"
            style={{ animation: "resultPopup 0.6s ease-out forwards" }}
          >
            <div
              className="inline-block px-14 py-8 rounded-xl border-2 border-[#c9a84c]/60"
              style={{
                background: "linear-gradient(135deg, rgba(42,31,14,0.95), rgba(26,18,8,0.95))",
                boxShadow: "0 0 40px rgba(201,168,76,0.3), 0 0 80px rgba(201,168,76,0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <p
                className="text-sm tracking-[0.3em] uppercase mb-4 text-[#c9a84c]"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                You won
              </p>
              <p
                className="text-5xl md:text-7xl font-black"
                style={{
                  fontFamily: "var(--font-cinzel)",
                  background: "linear-gradient(to right, #f5d77a, #c9a84c, #f5d77a)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 3s linear infinite",
                }}
              >
                {result}
              </p>
              <p
                className="text-lg tracking-[0.2em] uppercase mt-3 text-[#f5e6c8]/70"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                coins
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-[5] pointer-events-none" />
    </div>
  );
}
