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
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [currentRotation, setCurrentRotation] = useState(0)
  const wheelRef = useRef<HTMLDivElement>(null)

  const getWinningSegmentIndex = useCallback((rotation: number) => {
    const wheelAngleAtPointer = normalizeAngle(POINTER_OFFSET_ANGLE - normalizeAngle(rotation))
    return Math.floor((wheelAngleAtPointer + SEGMENT_ANGLE / 2) / SEGMENT_ANGLE) % SEGMENTS.length
  }, [])

  const spinWheel = useCallback(() => {
    if (spinning) return

    setSpinning(true)
    setShowResult(false)
    setResult(null)

    const targetSegmentIndex = Math.floor(Math.random() * SEGMENTS.length)
    const targetSegmentAngle = targetSegmentIndex * SEGMENT_ANGLE
    const fullSpins = 5 + Math.floor(Math.random() * 5)
    const totalRotation =
      currentRotation + fullSpins * 360 + (360 + POINTER_OFFSET_ANGLE - targetSegmentAngle)

    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 6s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
      wheelRef.current.style.transform = `rotate(${totalRotation}deg)`
    }

    setCurrentRotation(totalRotation)

    setTimeout(() => {
      const resolvedSegmentIndex = getWinningSegmentIndex(totalRotation)
      setSpinning(false)
      setResult(SEGMENTS[resolvedSegmentIndex])
      setShowResult(true)
    }, SPIN_DURATION_MS)
  }, [spinning, currentRotation, getWinningSegmentIndex])

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/view-game-gambling-table-casino 1.png"
          alt="Casino Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/42 via-black/24 to-black/64" />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <Image
          src="/ligth copy.png"
          alt="Light Effect"
          fill
          className="object-cover mix-blend-screen"
          style={{ objectPosition: 'center top', opacity: 0.62 }}
        />
        <div
          className="absolute left-1/2 -top-[33%] h-[76%] w-[98%] -translate-x-1/2"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,245,193,0.72) 0%, rgba(255,205,110,0.44) 36%, rgba(255,143,50,0.18) 58%, rgba(0,0,0,0) 82%)',
            filter: 'blur(2px)',
          }}
        />
      </div>

      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <div
          className="absolute left-1/2 -bottom-[20%] h-[42%] w-[132%] -translate-x-1/2"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(248,220,146,0.24) 0%, rgba(214,159,52,0.1) 42%, rgba(0,0,0,0) 84%)',
            filter: 'blur(10px)',
          }}
        />
        <div
          className="absolute left-0 top-0 h-full w-[24%]"
          style={{
            background:
              'linear-gradient(108deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.22) 58%, rgba(0,0,0,0) 100%)',
          }}
        />
        <div
          className="absolute right-0 top-0 h-full w-[24%]"
          style={{
            background:
              'linear-gradient(252deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.22) 58%, rgba(0,0,0,0) 100%)',
          }}
        />
      </div>

      <header className="relative z-[40] flex items-start justify-between px-4 pt-5 md:px-12 md:pt-6 pointer-events-auto">
        <Link
          href="/"
          className="ml-1 block w-[84px] md:ml-0 md:w-[110px] transform translate-x-[30px] translate-y-[30px]"
        >
          <Image
            src="/Group 137.png"
            alt="FreeCoins Logo"
            width={131}
            height={90}
            className="h-auto w-full object-contain drop-shadow-[0_0_18px_rgba(201,168,76,0.35)]"
            priority
          />
        </Link>

        <div className="relative z-[41] flex items-center gap-2 pr-1 md:gap-4 md:pr-2 pointer-events-auto">
          <Link
            href="/login"
            className="group relative z-[42] block w-[132px] md:w-[188px] pointer-events-auto transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Image
              src="/New Button-Login.png"
              alt="Login Button"
              width={188}
              height={47}
              className="h-auto w-full object-contain"
            />
            <span
              className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold tracking-[0.2em] uppercase text-[#f4f1e8] group-hover:brightness-110 md:text-[13px]"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              LOGIN
            </span>
          </Link>
          <Link
            href="/join"
            className="group relative z-[42] block w-[132px] md:w-[188px] pointer-events-auto transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Image
              src="/New Button.png"
              alt="Join Button"
              width={188}
              height={47}
              className="h-auto w-full object-contain"
            />
            <span
              className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2a1f0e] group-hover:brightness-95 md:text-[13px]"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              JOIN
            </span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-10 md:pt-14">
        <div
          className="pointer-events-none fixed left-[-2%] top-[21%] z-[3] w-[22vw] min-w-[120px] max-w-[245px]"
          style={{ animation: 'cardDriftTop 8.8s ease-in-out infinite' }}
        >
          <Image
            src="/image 249.png"
            alt="Left top card"
            width={245}
            height={370}
            className="h-auto w-full object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.45)]"
          />
        </div>

        <div
          className="pointer-events-none fixed left-[7%] top-[49%] z-[3] w-[16vw] min-w-[118px] max-w-[218px]"
          style={{ animation: 'chipFloatLeft 8.1s ease-in-out infinite 0.2s' }}
        >
          <Image
            src="/Group 135 1.png"
            alt="Left poker chip"
            width={218}
            height={218}
            className="h-auto w-full object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.46)]"
          />
        </div>

        <div
          className="pointer-events-none fixed -left-[4%] bottom-[-8%] z-[3] w-[34vw] min-w-[220px] max-w-[430px]"
          style={{ animation: 'cardDriftLeft 9.1s ease-in-out infinite 0.25s' }}
        >
          <Image
            src="/image 250.png"
            alt="Left bottom card"
            width={430}
            height={430}
            className="h-auto w-full object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,0.52)]"
          />
        </div>

        <div
          className="pointer-events-none fixed -right-[4%] top-[24%] z-[3] w-[30vw] min-w-[182px] max-w-[375px]"
          style={{ animation: 'cardDriftRight 8.7s ease-in-out infinite 0.35s' }}
        >
          <Image
            src="/image 251.png"
            alt="Right top card"
            width={375}
            height={365}
            className="h-auto w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
          />
        </div>

        <div
          className="pointer-events-none fixed -right-[5%] bottom-[-6%] z-[3] w-[28vw] min-w-[180px] max-w-[360px]"
          style={{ animation: 'chipFloatRight 9.4s ease-in-out infinite 0.4s' }}
        >
          <Image
            src="/Group 135 1.png"
            alt="Right poker chip"
            width={360}
            height={360}
            className="h-auto w-full object-contain drop-shadow-[0_22px_36px_rgba(0,0,0,0.5)]"
            style={{ transform: 'rotate(12deg)' }}
          />
        </div>

        <h1
          className="mb-5 text-center text-[clamp(2.1rem,5.1vw,4rem)] font-semibold leading-[1.08] tracking-[0.02em] md:mb-7"
          style={{
            fontFamily: 'var(--font-cinzel)',
            color: '#f1ead4',
            textShadow: '0 0 22px rgba(214,176,85,0.34), 0 2px 10px rgba(0,0,0,0.78)',
          }}
        >
          HOW MANY COINS
          <br />
          <span className="text-[#e6c56e]">WILL YOU START WITH?</span>
        </h1>

        <div
          className="relative flex items-center justify-center"
          style={{ width: 'min(52vw, 420px)', height: 'min(52vw, 420px)' }}
        >
          <div
            className="absolute left-1/2 top-1/2 z-[4] h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{ boxShadow: '0 0 60px rgba(255,248,223,0.7), 0 0 120px rgba(255,248,223,0.2)' }}
          />

          <div className="absolute left-1/2 top-[8.5%] z-[14] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Image
              src="/Gemini_Generated_Image_76yuuh76yuuh76yu-depositphotos-bgremover 1.png"
              alt="Pointer Choice"
              width={265}
              height={116}
              className="h-auto w-[clamp(88px,16vw,136px)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
            />
          </div>

          <div className="absolute inset-0 z-10 pointer-events-none">
            <Image
              src="/Ободок золотой.png"
              alt="Gold Ring"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(201,168,76,0.4)]"
            />
          </div>

          <div
            ref={wheelRef}
            className="absolute z-[5]"
            style={{
              width: '96%',
              height: '96%',
              top: '2%',
              left: '2%',
            }}
          >
            <Image src="/Колесо.png" alt="Spinning Wheel" fill className="object-contain" />
          </div>

          <div
            className="absolute z-[11] pointer-events-none"
            style={{ width: '38%', height: '38%', top: '31%', left: '31%' }}
          >
            <Image
              src="/Ободок центральный.png"
              alt="Center Ring"
              fill
              className="object-contain"
            />
          </div>

          <div
            className="absolute z-[12] pointer-events-none"
            style={{ width: '30%', height: '30%', top: '35%', left: '35%' }}
          >
            <Image src="/Внутреность колеса.png" alt="Inner Glow" fill className="object-contain" />
          </div>

          <button
            onClick={spinWheel}
            disabled={spinning}
            className="absolute z-[15] flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-90"
            style={{
              width: '23%',
              height: '23%',
              top: '38.5%',
              left: '38.5%',
              border: 'none',
              background: 'transparent',
              padding: 0,
            }}
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 42% 30%, #fff6d5 0%, #ffd56f 24%, #ff9f32 56%, #9c3d06 100%)',
                boxShadow: spinning
                  ? '0 0 22px rgba(255,167,56,0.5), inset 0 1px 6px rgba(255,255,255,0.45)'
                  : '0 0 26px rgba(255,176,64,0.64), 0 0 56px rgba(255,118,18,0.42), inset 0 1px 6px rgba(255,255,255,0.46)',
              }}
            />
            <span
              className="absolute inset-[-8%] rounded-full pointer-events-none"
              style={{
                background:
                  'conic-gradient(from 0deg, rgba(255,212,113,0.0) 0deg, rgba(255,122,22,0.96) 54deg, rgba(255,219,122,0.66) 126deg, rgba(255,88,0,0.92) 198deg, rgba(255,216,118,0.64) 270deg, rgba(255,212,113,0.0) 360deg)',
                filter: 'blur(2px)',
                opacity: spinning ? 0.45 : 0.76,
              }}
            />
            <span
              className="absolute inset-[11%] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 35% 26%, rgba(255,255,255,0.96), rgba(255,214,120,0.86) 38%, rgba(255,168,55,0.64) 70%, rgba(0,0,0,0) 100%)',
                mixBlendMode: 'screen',
                opacity: spinning ? 0.62 : 0.9,
              }}
            />
            <span
              className="relative z-[1] select-none text-[clamp(0.95rem,2.2vw,1.65rem)] font-black tracking-[0.06em] text-white"
              style={{
                fontFamily: 'var(--font-cinzel)',
                textShadow: '0 2px 8px rgba(56,24,0,0.8), 0 0 14px rgba(255,225,136,0.62)',
              }}
            >
              SPIN
            </span>
          </button>
        </div>
      </main>

      {showResult && result !== null && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close result popup"
            className="absolute inset-0 bg-black/72 backdrop-blur-[6px]"
            onClick={() => setShowResult(false)}
          />
          <div
            className="relative z-[91] w-full max-w-[760px] rounded-[24px] border border-[#9f7a2f] px-10 py-8 text-center"
            style={{
              animation: 'resultPopup 0.4s ease-out forwards',
              background: 'linear-gradient(140deg, rgba(42,26,7,0.88), rgba(17,11,3,0.9))',
              boxShadow: '0 12px 44px rgba(0,0,0,0.58)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setShowResult(false)}
              className="absolute right-7 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#9f7a2f] text-[#cfa85f] transition-colors hover:bg-[#9f7a2f]/15"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              &times;
            </button>
            <p
              className="mb-1 text-[clamp(0.8rem,1.4vw,1.1rem)] tracking-[0.34em] uppercase text-[#cfa85f]"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              You won
            </p>
            <p
              className="text-[clamp(4rem,9vw,7.6rem)] font-black leading-none"
              style={{
                fontFamily: 'var(--font-cinzel)',
                background: 'linear-gradient(to right, #f4d884, #d5af58, #f4d884)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 3s linear infinite',
              }}
            >
              {result}
            </p>
            <p
              className="mt-0 text-[clamp(1.6rem,3vw,2.2rem)] tracking-[0.22em] uppercase text-[#bfa26f]"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              coins
            </p>
            <button
              type="button"
              onClick={() => setShowResult(false)}
              className="mt-2 inline-flex rounded-md border border-[#a07c33] px-2 py-[1px] text-[clamp(1rem,1.8vw,1.45rem)] font-semibold leading-none tracking-[0.1em] uppercase text-[#e3c676] transition-colors hover:bg-[#a07c33]/12"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-[5] pointer-events-none" />
    </div>
  )
}
