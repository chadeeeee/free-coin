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

      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        {/* Left top card */}
        <div
          className="absolute"
          style={{
            width: '18.35vw',
            height: '21.73vw', // 417.21 / 1920
            top: '11.02%',
            left: '-5.15%',
            transform: 'rotate(0deg)',
          }}
        >
          <Image
            src="/image 249.png"
            alt="Left top card"
            fill
            className="object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.45)]"
          />
        </div>

        {/* Left poker chip */}
        <div
          className="absolute"
          style={{
            width: '13.18vw',
            height: '11.09vw', // 213 / 1920
            top: '45.24%',
            left: '10.69%',
            transform: 'rotate(11.56deg)',
          }}
        >
          <Image
            src="/image10.png"
            alt="Left poker chip"
            fill
            className="object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.46)]"
          />
        </div>

        {/* Left bottom card */}
        <div
          className="absolute"
          style={{
            width: '30.92vw',
            height: '37.66vw', // 722.97 / 1920
            top: '66.74%',
            left: '-7.19%',
            transform: 'rotate(0deg)',
          }}
        >
          <Image
            src="/image 250.png"
            alt="Left bottom card"
            fill
            className="object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,0.52)]"
          />
        </div>

        {/* Right top card */}
        <div
          className="absolute"
          style={{
            width: '25.01vw',
            height: '35.42vw', // 680 / 1920
            top: '2.41%',
            left: '70.73%',
            transform: 'rotate(40.92deg)',
          }}
        >
          <Image
            src="/image 251.png"
            alt="Right top card"
            fill
            className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Right poker chip */}
        <div
          className="absolute"
          style={{
            width: '34.88vw',
            height: '34.88vw', // 669.62 / 1920
            top: '72.31%',
            left: '80.62%',
            transform: 'rotate(-178.84deg)',
          }}
        >
          <Image
            src="/Group 135 1.png"
            alt="Right poker chip"
            fill
            className="object-contain drop-shadow-[0_22px_36px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>

      <header className="relative z-[40] flex items-center justify-between px-4 pt-4 md:px-8 md:pt-5 xl:px-12 xl:pt-6 pointer-events-auto">
        <Link href="/" className="block w-[100px] md:w-[130px] xl:w-[160px]">
          <Image
            src="/Group 137.png"
            alt="FreeCoins Logo"
            width={131}
            height={90}
            className="h-auto w-full object-contain drop-shadow-[0_0_18px_rgba(201,168,76,0.35)]"
            priority
          />
        </Link>

        <div className="relative z-[41] flex items-center gap-3 md:gap-4 xl:gap-6 pointer-events-auto">
          <Link
            href="/login"
            className="group relative z-[42] inline-flex h-[38px] w-[110px] items-center justify-center overflow-hidden rounded-full border border-[#b58a3f]/80 bg-[#170f05]/75 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] md:h-[44px] md:w-[136px] xl:h-[48px] xl:w-[160px]"
          >
            <span
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(115deg, rgba(78,53,17,0.55) 0%, rgba(37,23,7,0.72) 55%, rgba(15,10,4,0.92) 100%)',
              }}
            />
            <span
              className="absolute inset-[1px] rounded-full transition-opacity duration-200 group-hover:opacity-95"
              style={{
                background:
                  'linear-gradient(120deg, rgba(95,66,24,0.35) 0%, rgba(40,25,7,0.45) 58%, rgba(17,10,3,0.7) 100%)',
              }}
            />
            <span
              className="relative z-[1] select-none text-[11px] font-semibold tracking-[0.17em] uppercase text-[#faf6eb] md:text-[12px] xl:text-[13px]"
              style={{
                fontFamily: 'var(--font-cinzel)',
                textShadow: '0 1px 4px rgba(0,0,0,0.7)',
              }}
            >
              LOGIN
            </span>
          </Link>
          <Link
            href="/join"
            className="group relative z-[42] inline-flex h-[38px] w-[110px] items-center justify-center overflow-hidden rounded-full border border-[#d7b062]/90 bg-[#2a1907]/40 shadow-[0_0_18px_rgba(241,194,96,0.25)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] md:h-[44px] md:w-[136px] xl:h-[48px] xl:w-[160px]"
          >
            <span
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(112deg, rgba(252,241,195,0.98) 0%, rgba(237,200,109,0.95) 38%, rgba(191,133,46,0.93) 100%)',
              }}
            />
            <span
              className="absolute inset-[1px] rounded-full transition-opacity duration-200 group-hover:opacity-95"
              style={{
                background:
                  'linear-gradient(116deg, rgba(255,249,220,0.95) 0%, rgba(241,204,118,0.9) 45%, rgba(182,124,41,0.88) 100%)',
              }}
            />
            <span
              className="relative z-[1] select-none text-[11px] font-semibold tracking-[0.17em] uppercase text-[#241707] md:text-[12px] xl:text-[13px]"
              style={{
                fontFamily: 'var(--font-cinzel)',
                textShadow: '0 1px 3px rgba(255,246,220,0.4)',
              }}
            >
              JOIN
            </span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-6 md:pt-8 xl:pt-14">
        <h1
          className="mb-4 text-center text-[clamp(1.7rem,4.5vw,4.2rem)] font-semibold leading-[1.08] tracking-[0.02em] md:mb-5 xl:mb-7"
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
          style={{
            width: 'clamp(340px, min(65vw, 70vh), 900px)',
            height: 'clamp(340px, min(65vw, 70vh), 900px)',
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 z-[4] h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              boxShadow: '0 0 72px rgba(255,248,223,0.76), 0 0 132px rgba(255,248,223,0.26)',
            }}
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
            className="absolute z-[15] flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:scale-[1.015] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-90"
            style={{
              width: '20.5%',
              height: '20.5%',
              top: '39.75%',
              left: '39.75%',
              border: 'none',
              background: 'transparent',
              padding: 0,
            }}
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 42% 32%, #fffbe8 0%, #ffe18f 26%, #ffc14b 58%, #b35a0f 100%)',
                boxShadow: spinning
                  ? '0 0 12px rgba(255,166,52,0.48), inset 0 1px 5px rgba(255,255,255,0.4)'
                  : '0 0 16px rgba(255,180,75,0.52), 0 0 32px rgba(255,102,8,0.35), inset 0 1px 5px rgba(255,255,255,0.44)',
              }}
            />
            <span
              className="absolute inset-[-7%] rounded-full pointer-events-none"
              style={{
                background:
                  'conic-gradient(from 0deg, rgba(255,214,122,0) 0deg, rgba(255,124,19,0.9) 52deg, rgba(255,212,109,0.62) 122deg, rgba(255,84,0,0.9) 196deg, rgba(255,212,109,0.64) 270deg, rgba(255,214,122,0) 360deg)',
                filter: 'blur(1.6px)',
                opacity: spinning ? 0.42 : 0.74,
              }}
            />
            <span
              className="absolute inset-[14%] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 35% 26%, rgba(255,255,255,0.94), rgba(255,223,145,0.84) 36%, rgba(255,173,66,0.52) 72%, rgba(0,0,0,0) 100%)',
                mixBlendMode: 'screen',
                opacity: spinning ? 0.56 : 0.84,
              }}
            />
            <span
              className="relative z-[1] select-none text-[clamp(0.88rem,1.75vw,1.36rem)] font-black tracking-[0.02em] text-[#f3e7c8]"
              style={{
                fontFamily: 'var(--font-cinzel)',
                textShadow: '0 1px 5px rgba(55,23,0,0.75), 0 0 8px rgba(255,220,125,0.45)',
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
