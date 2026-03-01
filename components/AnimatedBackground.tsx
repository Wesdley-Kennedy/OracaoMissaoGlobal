"use client";

import React from "react";
import { motion } from "framer-motion";
import { backgroundShapes, shapeVariants } from "@/store/animations/variantes";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 transition-colors duration-500">
      {backgroundShapes.map((shape: any, i: number) => (
        <motion.div
          key={i}
          custom={i}
          initial="initial"
          animate="animate"
          variants={shapeVariants}
          className="absolute rounded-full bg-black dark:bg-white filter blur-3xl"
          style={{
            width: shape.width,
            height: shape.height,
            left: shape.left,
            top: shape.top,
            opacity: shape.opacity,
          }}
        />
      ))}
    </div>
  );
}