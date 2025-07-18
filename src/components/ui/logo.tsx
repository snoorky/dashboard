import Image from "next/image";

export function LogoBeforce({ isDark }: { isDark?: boolean }) {

  if (isDark) {
    return (
      <div className="relative w-[95px] h-[43px]">
        <Image
          src="/logo-dark.png"
          alt="logo da Beforce"
          className="absolute"
          sizes="(max-width: 768px) 95px, 95px"
          fill
          priority
        />
      </div>
    )
  }

  return (
    <div className="relative w-[125px] h-[66px]">
      <Image
        src="/logo.png"
        alt="logo da Beforce"
        className="absolute"
        sizes="(max-width: 768px) 125px, 125px"
        fill
        priority
      />
    </div>
  )
}