'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'

const SEGMENTS = [
  1000, 50, 100, 150, 200, 250, 300, 50, 100, 150, 200, 250, 300, 50, 100, 150, 200, 250, 300, 50,
  100, 150, 200, 250, 300, 50, 100, 150, 200, 250, 300,
]
const SEGMENT_ANGLE = 360 / SEGMENTS.length
const POINTER_OFFSET_ANGLE = 0
const SPIN_DURATION_MS = 6200
const normalizeAngle = (angle: number) => ((angle % 360) + 360) % 360

export default function Home() {
  /* Logic and State */
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [fireActive, setFireActive] = useState(true)
  const wheelRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)

  // Cleanup on unmount
  useRef(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
  })

  const spinWheel = useCallback(() => {
    if (spinning) return

    setSpinning(true)
    setShowResult(false)
    setResult(null)
    setFireActive(false)

    // 1. Determine Target
    const targetSegmentIndex = Math.floor(Math.random() * SEGMENTS.length)
    const winningValue = SEGMENTS[targetSegmentIndex]

    // Calculate angle to hit the target segment at the top (pointer is at 0 degrees)
    // The wheel rotates clockwise. Segment 0 is at 0 degrees?
    // Let's assume standard layout. If segment 0 is at 0deg, to get it to pointer (0deg), we need rotation 0.
    // If we want segment N, position is N * SEGMENT_ANGLE.
    // To bring it to 0, we rotate by -N * SEGMENT_ANGLE.
    // Adding full spins.

    const segmentAngle = 360 / SEGMENTS.length
    // We want the target segment to end up under the pointer.
    // Using the logic: rotation % 360 => position.
    // Let's stick to the previous logic but refine coordinates.
    // The previous logic: `totalMutation = current + fullSpins*360 + (360 + offset - targetAngle)`
    // Reference: targetSegmentIndex * SEGMENT_ANGLE is the start of the segment.
    // We add random jitter within the segment for realism? "Fixed result" requested implied just hit the value.
    const targetAngleBase = targetSegmentIndex * segmentAngle
    const randomOffset = Math.random() * (segmentAngle * 0.8) - segmentAngle * 0.4 // Center of segment +/- 40%
    const targetAngle = targetAngleBase + randomOffset

    const fullSpins = 5 + Math.floor(Math.random() * 3) // 5 to 7 spins
    const spinDuration = 5000 + Math.random() * 1000 // 5-6 seconds

    // We rotate backwards (clockwise visually if we increase negative? or CSS rotate(Ndeg) is clockwise).
    // Let's just increase degrees for Clockwise.
    // To get targetAngle to 0: Rot = 360 - targetAngle.
    // Current Rotation is `rotation`.
    // Next Rotation = rotation + (360 - (rotation % 360)) + (360 * fullSpins) + (360 - targetAngle)
    // Simplified: Target is absolute.
    // We want final `rotation % 360` to correspond to the target index.
    // Actually, `(rotation % 360)` is the angle of the wheel relative to start.
    // Pointer is static at top.
    // If wheel is at 0, index 0 is at top?
    // Let's assume Index 0 is at 0 degrees (12 o'clock).
    // To win Index i (at i*step degrees), we must rotate the wheel so that i*step is at 12 o'clock.
    // The wheel rotates Clockwise. So we need to rotate `360 - (i*step)` degrees relative to 0.

    const desiredEndRotationMod360 = (360 - targetAngle) % 360

    // Current total rotation
    const currentRot = rotation
    const currentMod = currentRot % 360

    // Distance to next 0
    const distanceToNext0 = 360 - currentMod

    // Total delta
    const totalRotationDelta = distanceToNext0 + 360 * fullSpins + desiredEndRotationMod360

    // Overshoot for recoil (5 degrees)
    const overshoot = 6
    const finalRotation = currentRot + totalRotationDelta
    const overshootRotation = finalRotation + overshoot

    const startTime = performance.now()

    const animate = (time: number) => {
      const elapsed = time - startTime

      if (elapsed < spinDuration) {
        // Phase 1: Main Spin (Ease Out)
        // Custom Ease Out Quint/Expo to simulate friction
        const t = elapsed / spinDuration
        const ease = 1 - Math.pow(1 - t, 4) // Quartic Out

        const currentDeg = currentRot + (overshootRotation - currentRot) * ease
        setRotation(currentDeg)
        if (wheelRef.current) {
          wheelRef.current.style.transform = `rotate(${currentDeg}deg)`
        }
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Phase 2: Recoil (Bounce Back)
        const recoilStartTime = time
        const recoilDuration = 800 // 0.8s for smooth recoil

        const animateRecoil = (rTime: number) => {
          const rElapsed = rTime - recoilStartTime
          if (rElapsed < recoilDuration) {
            const rT = rElapsed / recoilDuration
            // Ease in-out for recoil
            const rEase = rT < 0.5 ? 2 * rT * rT : 1 - Math.pow(-2 * rT + 2, 2) / 2

            const currentDeg = overshootRotation - overshoot * rEase
            setRotation(currentDeg)
            if (wheelRef.current) {
              wheelRef.current.style.transform = `rotate(${currentDeg}deg)`
            }
            animationRef.current = requestAnimationFrame(animateRecoil)
          } else {
            // End
            setRotation(finalRotation) // Snap to exact
            if (wheelRef.current) {
              wheelRef.current.style.transform = `rotate(${finalRotation}deg)`
            }
            setSpinning(false)
            setResult(winningValue)
            setShowResult(true)
            setFireActive(true)
          }
        }
        animationRef.current = requestAnimationFrame(animateRecoil)
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [spinning, rotation])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0604]">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/view-game-gambling-table-casino 1.png"
          alt="Casino Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      </div>

      {/* Lighting Effects */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <Image
          src="/ligth copy.png"
          alt="Light Effect"
          fill
          className="object-cover mix-blend-screen opacity-70"
          style={{ animation: 'topLightPulse 4s ease-in-out infinite' }}
        />
        <div
          className="absolute left-1/2 -top-[20%] h-[60%] w-[100%] -translate-x-1/2"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255,200,100,0.15) 0%, transparent 70%)',
            animation: 'topLightSweep 6s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Floating Elements (Root Level) */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        {/* Left top card */}
        <div
          className="absolute"
          style={{
            width: '18.35vw',
            height: '21.73vw',
            top: '11.02%',
            left: '-5.15%',
            transform: 'rotate(0deg)',
            animation: 'cardDriftTop 8s ease-in-out infinite',
          }}
        >
          <Image
            src="/image 249.png"
            alt="Left top card"
            fill
            className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* Left poker chip */}
        <div
          className="absolute"
          style={{
            width: '13.18vw',
            height: '11.09vw',
            top: '45.24%',
            left: '10.69%',
            transform: 'rotate(11.56deg)',
            animation: 'chipFloatLeft 7s ease-in-out infinite',
          }}
        >
          <Image
            src="/image10.png"
            alt="Left poker chip"
            fill
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Left bottom card */}
        <div
          className="absolute"
          style={{
            width: '30.92vw',
            height: '37.66vw',
            top: '66.74%',
            left: '-7.19%',
            transform: 'rotate(0deg)',
            animation: 'cardDriftLeft 9s ease-in-out infinite',
          }}
        >
          <Image
            src="/image 250.png"
            alt="Left bottom card"
            fill
            className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* Right top card */}
        <div
          className="absolute"
          style={{
            width: '25.01vw',
            height: '35.42vw',
            top: '2.41%',
            left: '70.73%',
            transform: 'rotate(40.92deg)',
            animation: 'cardDriftRight 8.5s ease-in-out infinite',
          }}
        >
          <Image
            src="/image 251.png"
            alt="Right top card"
            fill
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Right poker chip */}
        <div
          className="absolute"
          style={{
            width: '34.88vw',
            height: '34.88vw',
            top: '72.31%',
            left: '80.62%',
            transform: 'rotate(-178.84deg)',
            animation: 'chipFloatRight 9s ease-in-out infinite',
          }}
        >
          <Image
            src="/Group 135 1.png"
            alt="Right poker chip"
            fill
            className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-[40] w-full pointer-events-auto h-[120px]">
        {/* Логотип: 29px зверху, 190.55px зліва */}
        <Link
          href="/"
          className="absolute block transition-transform hover:scale-105"
          style={{
            top: '29px',
            left: '190.55px',
            width: '128.39px',
            height: '87.64px',
          }}
        >
          <Image
            src="/Group 137.png"
            alt="FreeCoins Logo"
            width={128}
            height={88}
            className="h-full w-full object-contain drop-shadow-[0_0_20px_rgba(201,168,76,0.5)]"
            priority
          />
        </Link>

        {/* Блок кнопок: 190.55px справа. 
      Щоб вони були по центру логотипа: 
      (Висота лого 87.64 / 2) + Top лого 29 = 72.82px (це центр).
      Висота кнопок ~48px. Отже (72.82 - (48 / 2)) = 48.82px зверху. */}
        <div
          className="absolute flex items-center gap-3 md:gap-4 xl:gap-6"
          style={{
            top: '48.8px',
            right: '190.55px',
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

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-6 md:pt-8 xl:pt-14 h-[80vh]">
        <h1
          className="mb-8 text-center font-bold text-[#f5e6c8] drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            lineHeight: 1.1,
            textShadow: '0 0 30px rgba(200,150,50,0.5)',
          }}
        >
          HOW MANY COINS
          <br />
          <span className="bg-gradient-to-b from-[#fff7d1] to-[#cca045] bg-clip-text text-transparent">
            WILL YOU START WITH?
          </span>
        </h1>

        {/* Wheel Container */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: 'clamp(340px, min(65vw, 70vh), 900px)',
            height: 'clamp(340px, min(65vw, 70vh), 900px)',
          }}
        >
          {/* Wheel Background Glow */}
          <div className="absolute inset-[-5%] z-0 rounded-full bg-[#ffaa00] opacity-10 blur-[80px]" />

          {/* Wheel Pointer (Fixed) */}
          <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 w-[14%] aspect-[265/116]">
            <Image
              src="/Gemini_Generated_Image_76yuuh76yuuh76yu-depositphotos-bgremover 1.png"
              alt="Pointer"
              fill
              className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            />
          </div>

          {/* Outer Ring (Static) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <Image src="/Ободок золотой.png" alt="Gold Ring" fill className="object-contain" />
          </div>

          {/* The Spinning Wheel */}
          <div
            ref={wheelRef}
            className="absolute inset-[2%] z-0 rounded-full"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <Image
              src="/Колесо.png"
              alt="Spinning Wheel"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Center Decor */}
          <div className="absolute inset-[31%] z-10 pointer-events-none">
            <Image
              src="/Ободок центральный.png"
              alt="Center Ring"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute inset-[35%] z-10 pointer-events-none">
            <Image
              src="/Внутреность колеса.png"
              alt="Inner Glow"
              fill
              className="object-contain mix-blend-screen"
            />
          </div>

          {/* SPIN BUTTON */}
          <button
            onClick={spinWheel}
            disabled={spinning}
            className="absolute z-30 start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-80 disabled:grayscale-[0.5]"
            style={{ width: '22%', height: '22%' }}
          >
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br from-[#ffd700] via-[#ff8c00] to-[#8b0000] p-[2px] ${spinning ? '' : 'animate-[firePulse_2s_infinite]'}`}
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#ca8a04] to-[#451a03] shadow-inner">
                <span className="relative z-10 font-cinzel text-[clamp(1rem,2vw,2rem)] font-black tracking-widest text-[#fffadd] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  SPIN
                </span>
              </div>
            </div>
            {/* Fire Particules/Glow Overlay */}
            {!spinning && fireActive && (
              <div className="absolute inset-[-20%] pointer-events-none z-0 rounded-full mix-blend-screen">
                <div className="absolute inset-0 animate-[fireGlow_3s_infinite] rounded-full bg-gradient-to-t from-orange-600 to-yellow-300 opacity-40 blur-xl" />
              </div>
            )}
          </button>
        </div>
      </main>

      {/* Win Modal / Banner */}
      {showResult && result && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div
            className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-gradient-to-b from-[#1a1105] to-[#0f0802] p-8 text-center shadow-[0_0_100px_rgba(212,175,55,0.4)]"
            style={{ animation: 'modalPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}
          >
            {/* Decorative Corner Glows */}
            <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[#ffaa00] opacity-20 blur-3xl" />
            <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-[#ffaa00] opacity-20 blur-3xl" />

            <h2 className="mb-2 font-cinzel text-xl font-bold tracking-[0.3em] text-[#d4af37] uppercase">
              Congratulations!
            </h2>

            <div className="my-6">
              <span className="block font-cinzel text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#fff] via-[#ffd700] to-[#b8860b] drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] animate-pulse">
                {result.toLocaleString()}
              </span>
              <span className="mt-2 block font-cinzel text-2xl font-bold tracking-widest text-[#f0e6d2]">
                COINS
              </span>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <button
                className="group relative w-full max-w-sm overflow-hidden rounded-lg bg-gradient-to-r from-[#eab308] to-[#a16207] px-8 py-4 font-cinzel text-lg font-bold text-white shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.6)]"
                onClick={() => (window.location.href = '/register')}
              >
                <span className="relative z-10 drop-shadow-md">REGISTER NOW</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>

              <button
                onClick={() => setShowResult(false)}
                className="text-sm text-[#886633] underline hover:text-[#cca045] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
