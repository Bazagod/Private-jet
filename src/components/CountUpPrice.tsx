"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface CountUpPriceProps {
  value: number;
  prefix?: string;
  className?: string;
}

function Animated({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 60, damping: 25, mass: 0.8 });
  useEffect(() => { spring.set(value); }, [spring, value]);
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString("en-US"));
  return <motion.span>{display}</motion.span>;
}

export default function CountUpPrice({ value, prefix = "$", className = "" }: CountUpPriceProps) {
  const [ok, setOk] = useState(false);
  useEffect(() => { setOk(true); }, []);
  if (!ok) return <span className={className}>{prefix}0</span>;
  return (
    <motion.span className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {prefix}<Animated value={value} />
    </motion.span>
  );
}
