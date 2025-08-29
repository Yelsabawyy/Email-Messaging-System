import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 p-6 bg-[#1A1A5D]">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>
            <div className="font-medium text-white">Youssef Elsabawy</div>
            <div className="text-sm text-gray-100">Full Stack Developer</div>
          </div>
        </div>

        <div className="text-sm text-gray-100">
          <div>Yelsabawyy@gmail.com</div>
          <div>+201283230322</div>
        </div>
      </div>

      <div className="mt-8 pt-4 w-full flex justify-center  items-center border-gray-100  text-xs text-gray-100">
        <div>Copyright © 2025</div>
      </div>
    </footer>
  );
}
