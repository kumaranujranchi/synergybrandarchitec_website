import { useState, useEffect, useRef } from "react";

interface CountUpProps {
  start?: number;
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export default function CountUp({ start = 0, end, duration = 2, prefix = "", suffix = "" }: CountUpProps) {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const [hasStarted, setHasStarted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Handle the animation of counting up
  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;
    
    const animateCount = () => {
      const now = Date.now();
      const progress = Math.min(1, (now - startTime) / (duration * 1000));
      const currentCount = Math.floor(start + (end - start) * progress);
      
      if (countRef.current !== currentCount) {
        countRef.current = currentCount;
        setCount(currentCount);
      }
      
      if (now < endTime) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animateCount);
    
    return () => {
      countRef.current = start;
    };
  }, [start, end, duration, hasStarted]);

  // Set up the IntersectionObserver to trigger the animation when in view
  useEffect(() => {
    if (!elementRef.current) return;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    
    observerRef.current.observe(elementRef.current);
    
    return () => {
      if (observerRef.current && elementRef.current) {
        observerRef.current.unobserve(elementRef.current);
      }
    };
  }, [hasStarted]);

  return <span ref={elementRef}>{prefix}{count}{suffix}</span>;
}