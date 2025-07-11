import Image from "next/image";

export function LogoBeforce({ isDark }: { isDark?: boolean }) {
  return (
    <div className="relative w-[125px] h-[66px]">
      <Image
        src={isDark ? "/logo-dark.png" : "/logo.png"}
        alt="logo da Beforce"
        className="absolute"
        fill
        priority
        sizes="(max-width: 768px) 125px, 125px"
      />
    </div>
  )
}