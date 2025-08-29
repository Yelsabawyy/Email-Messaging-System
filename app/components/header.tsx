import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-6 bg-[#1A1A5D]">
      <div className="text-2xl md:text-4xl font-bold text-white">
        <Image width={150} height={0} src="/Sentiomail.png" alt="Sentiomail" />
      </div>
    </div>
  );
}
