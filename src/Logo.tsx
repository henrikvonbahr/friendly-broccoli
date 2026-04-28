interface LogoProps {
  size?: number
  color?: string
  deep?: string
}

export default function Logo({ size = 32, color = 'var(--sage)', deep = 'var(--sage-deep)' }: LogoProps) {
  const s = size / 64
  const gradId = `sage-leaf-grad-${size}`
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ display: 'block' }} aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={color} />
          <stop offset="1" stopColor={deep} />
        </linearGradient>
      </defs>
      <line x1="32" y1="10" x2="32" y2="54" stroke={deep} strokeWidth={2.5 * s} strokeLinecap="round" opacity="0.55" />
      <path d="M32 10 C 48 12, 54 22, 50 30 C 46 36, 38 34, 32 30" fill={`url(#${gradId})`} />
      <path d="M32 54 C 16 52, 10 42, 14 34 C 18 28, 26 30, 32 34" fill={`url(#${gradId})`} opacity="0.92" />
      <circle cx="32" cy="32" r={1.8 * s} fill={deep} />
    </svg>
  )
}
