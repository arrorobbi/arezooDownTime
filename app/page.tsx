"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function DowntimePage() {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const fetchTimeLeft = async () => {
      try {
        const res = await fetch("/api/downtime");
        const data = await res.json();
        setTimeLeft(data.timeLeft);
      } catch (error) {
        console.error("Error fetching downtime:", error);
      }
    };

    fetchTimeLeft(); // Fetch initial countdown time from the server

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes: number = Math.floor(timeLeft / 60);
  const seconds: number = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#053F74] text-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/arezoo.png"
          alt="Logo"
          width={120}
          height={120}
          className="mb-6 drop-shadow-lg"
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold tracking-wide drop-shadow-md"
      >
        We’ll be back soon!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="mt-3 text-lg opacity-80"
      >
        Our site is down for maintenance. Stay tuned!
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-8 text-6xl font-bold tracking-wide flex space-x-2"
      >
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
          className="bg-[#00ADEF] text-white px-4 py-2 rounded-lg shadow-lg"
        >
          {minutes}
        </motion.span>
        <span className="text-6xl font-extrabold">:</span>
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.2,
          }}
          className="bg-[#00ADEF] text-white px-4 py-2 rounded-lg shadow-lg"
        >
          {seconds < 10 ? `0${seconds}` : seconds}
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="mt-5 text-sm opacity-75 tracking-widest"
      >
        Thank you for your patience!
      </motion.div>
    </div>
  );
}
