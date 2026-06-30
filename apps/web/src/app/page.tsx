'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/events/EventCard';
import type { Event } from '@/types';
import { ArrowRight, Sparkles, MapPin, IndianRupee, Users, Star, TrendingUp, Globe, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, useScroll, useTransform, useSpring, MotionValue, useMotionValue } from 'framer-motion';

/* ─── EVENT DATA ─── */

/* ─── ANIMATION COMPONENTS ─── */

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [distance, -distance]);
}

function useMousePosition() {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const ref = useRef<HTMLDivElement>(null);
  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };
  return { x, y, ref, handleMouse };
}

function TextReveal({ children, delay = 0, className = '' }: { children: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function StaggerText({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: '100%', opacity: 0, rotateX: 40 }}
            whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function AnimatedGradient({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      animate={{
        background: [
          'radial-gradient(600px circle at 0% 0%, rgba(74,222,128,0.15), transparent)',
          'radial-gradient(600px circle at 100% 100%, rgba(56,189,248,0.15), transparent)',
          'radial-gradient(600px circle at 50% 50%, rgba(74,222,128,0.1), transparent)',
          'radial-gradient(600px circle at 0% 100%, rgba(56,189,248,0.15), transparent)',
          'radial-gradient(600px circle at 0% 0%, rgba(74,222,128,0.15), transparent)',
        ],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
    />
  );
}

function FloatingOrb({ size, color, x, y, delay = 0 }: { size: number; color: string; x: number; y: number; delay?: number }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={{ width: size, height: size, background: color, left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [-30, 30, -30],
        x: [-20, 20, -20],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 8 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { x, y, ref, handleMouse } = useMousePosition();
  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImage({ children, speed = 0.5, className = '' }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useParallax(scrollYProgress, speed * 200);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

function SectionReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParallaxSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── SCROLL PROGRESS BAR ─── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-accent z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}

/* ─── CURSOR FOLLOWER ─── */
function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const handleMouse = (e: MouseEvent) => { x.set(e.clientX - 16); y.set(e.clientY - 16); };
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', handleMouse);
  }
  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-primary/40 rounded-full pointer-events-none z-[100] mix-blend-difference hidden lg:block"
      style={{ x, y, transition: 'width 0.2s, height 0.2s' }}
    />
  );
}

/* ─── HOME PAGE ─── */
export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.2], ['blur(0px)', 'blur(8px)']);

  useEffect(() => {
    fetch('/api/events').then(r => r.json()).then(setEvents).catch(() => {});
  }, []);

  return (
    <>
      <ScrollProgress />
      <div className="space-y-0 overflow-x-hidden">
        {/* ── HERO ── */}
        <motion.section
          style={{ opacity: heroOpacity, scale: heroScale, filter: heroBlur }}
          className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
        >
          <AnimatedGradient className="z-0" />

          <FloatingOrb size={600} color="rgba(74,222,128,0.12)" x={-10} y={-10} delay={0} />
          <FloatingOrb size={500} color="rgba(56,189,248,0.1)" x={70} y={60} delay={2} />
          <FloatingOrb size={400} color="rgba(74,222,128,0.08)" x={80} y={-5} delay={4} />
          <FloatingOrb size={300} color="rgba(56,189,248,0.08)" x={10} y={80} delay={1} />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
              transform: 'perspective(600px) rotateX(50deg)',
              transformOrigin: 'center top',
            }}
          />

          {/* 3D floating elements */}
          <motion.div
            className="absolute w-20 h-20 border border-primary/20 rounded-2xl -rotate-12"
            style={{ top: '15%', left: '10%' }}
            animate={{ y: [-20, 20, -20], rotate: [-12, 12, -12] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-14 h-14 border border-secondary/20 rounded-full"
            style={{ bottom: '20%', right: '12%' }}
            animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div
            className="absolute w-10 h-10 bg-primary/10 rounded-lg rotate-45"
            style={{ top: '30%', right: '20%' }}
            animate={{ y: [0, 25, 0], rotate: [45, 90, 45] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md text-sm text-primary mb-8 group hover:border-primary/30 transition-all cursor-default">
                <motion.span
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="inline-block"
                >
                  <Sparkles className="h-4 w-4" />
                </motion.span>
                India&apos;s #1 Web3 Events Platform
              </div>
            </motion.div>

            <TiltCard>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.85] mb-8">
                <StaggerText text="Rew3vent" className="shimmer-text" />
                <br />
                <motion.span
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground/70 inline-block mt-4"
                  style={{ fontFamily: 'var(--font-calligraphy)' }}
                  initial={{ opacity: 0, y: 40, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                >
                  India&apos;s Web3 Hub
                </motion.span>
              </h1>
            </TiltCard>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              From Mumbai to Delhi, Bengaluru to Kolkata &mdash; discover, connect, and host Web3 events in your city.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-5 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton>
                <Button asChild size="xl" className="button-neon-glow text-lg px-10 py-7 rounded-2xl relative overflow-hidden group">
                  <Link href="/events">
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 1 }}
                    />
                    Events Dhundho <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild variant="secondary" size="xl" className="text-lg px-10 py-7 rounded-2xl bg-secondary/10 hover:bg-secondary/20 backdrop-blur-sm border border-secondary/30 group">
                  <Link href="/create-event">
                    Host an Event <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-45 transition-transform" />
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {[
                { icon: MapPin, label: 'Cities Covered', value: '15+' },
                { icon: Users, label: 'Community', value: '50K+' },
                { icon: Star, label: 'Events Hosted', value: '200+' },
                { icon: TrendingUp, label: 'Active Daily', value: '5K+' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center rounded-2xl p-4 bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm hover:bg-white/[0.04] transition-all"
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <stat.icon className="h-6 w-6 mx-auto text-primary mb-2" />
                  <div className="text-2xl font-bold text-gradient-neon">{stat.value}</div>
                  <div className="text-xs text-muted-foreground/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-6 w-6 text-muted-foreground/40" />
          </motion.div>
        </motion.section>

        {/* ── TRENDING EVENTS ── */}
        <ParallaxSection className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
          <div className="relative max-w-6xl mx-auto px-4">
            <SectionReveal>
              <div className="text-center mb-16">
                <TextReveal className="text-sm text-primary tracking-widest uppercase mb-4">Trending Now</TextReveal>
                <h2 className="text-4xl md:text-6xl text-gradient-neon mb-4 leading-tight">
                  <StaggerText text="Featured Events This Week" />
                </h2>
                <p className="text-muted-foreground/70 text-lg max-w-xl mx-auto">
                  <TextReveal delay={0.3}>Hurry &mdash; limited seats available!</TextReveal>
                </p>
              </div>
            </SectionReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.slice(0, 3).map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-5%' }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8 }}
                >
                  <TiltCard>
                    <EventCard event={event} />
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            <SectionReveal>
              <div className="text-center mt-12">
                <MagneticButton>
                  <Button asChild variant="outline" size="lg" className="rounded-xl px-8 group">
                    <Link href="/events">
                      Browse All Events <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>
            </SectionReveal>
          </div>
        </ParallaxSection>

        {/* ── FEATURES ── */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-secondary/[0.02] to-accent/[0.02]" />
          <div className="relative max-w-6xl mx-auto px-4">
            <SectionReveal>
              <div className="text-center mb-20">
                <TextReveal className="text-sm text-primary tracking-widest uppercase mb-4">Why Rew3vent</TextReveal>
                <h2 className="text-4xl md:text-6xl text-gradient-neon mb-4 leading-tight">
                  <StaggerText text="Why Build on Rew3vent?" />
                </h2>
              </div>
            </SectionReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: MapPin, title: 'Every City', color: 'from-primary/20 to-primary/5', border: 'border-primary/20',
                  desc: 'Mumbai, Delhi, Bengaluru, Hyderabad, Pune, Chennai, Kolkata — and growing! Find events in your city.',
                },
                {
                  icon: IndianRupee, title: 'Free to Host', color: 'from-secondary/20 to-secondary/5', border: 'border-secondary/20',
                  desc: 'Create events at zero cost. NFTs, tickets, rewards — all in one place. Free for every creator in India.',
                },
                {
                  icon: Globe, title: 'Indian Web3 Community', color: 'from-accent/20 to-accent/5', border: 'border-accent/20',
                  desc: '50,000+ Indian Web3 enthusiasts. Builders, artists, traders, gamers — all in one place.',
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-5%' }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <TiltCard className={`relative overflow-hidden h-full ${feature.border} bg-gradient-to-br ${feature.color} backdrop-blur-sm rounded-2xl`}>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Card className="bg-transparent border-0 shadow-none h-full">
                      <CardHeader className="items-center text-center pt-10">
                        <motion.div
                          className="p-5 rounded-2xl bg-background/40 ring-1 ring-white/[0.06] mb-4"
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <feature.icon className="h-10 w-10 text-primary" />
                        </motion.div>
                        <CardTitle className="text-2xl text-gradient-neon">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground/80 text-center leading-relaxed">{feature.desc}</p>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <ParallaxSection className="py-32">
          <div className="max-w-5xl mx-auto px-4">
            <SectionReveal>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.08] via-secondary/[0.08] to-accent/[0.08] border border-white/[0.06]">
                <AnimatedGradient className="opacity-30" />
                <FloatingOrb size={400} color="rgba(74,222,128,0.1)" x={-10} y={-10} delay={0} />
                <FloatingOrb size={300} color="rgba(56,189,248,0.08)" x={80} y={80} delay={2} />

                <div className="relative p-12 md:p-20 text-center">
                  <TextReveal className="text-sm text-primary tracking-widest uppercase mb-4">Join Now</TextReveal>
                  <h2 className="text-4xl md:text-7xl mb-6 text-gradient-neon leading-tight">
                    <StaggerText text="Ready to Begin?" />
                  </h2>
                  <motion.p
                    className="text-xl text-muted-foreground/70 mb-10 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    India&apos;s Web3 revolution starts here. Host your own event or join someone else&apos;s. Either way, do it on Rew3vent.
                  </motion.p>
                  <div className="flex flex-col sm:flex-row gap-5 justify-center">
                    <MagneticButton>
                      <Button asChild size="xl" className="button-neon-glow text-lg px-10 py-7 rounded-2xl relative overflow-hidden group">
                        <Link href="/create-event">
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 1 }}
                          />
                          Create Event <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-45 transition-transform" />
                        </Link>
                      </Button>
                    </MagneticButton>
                    <MagneticButton>
                      <Button asChild variant="outline" size="xl" className="text-lg px-10 py-7 rounded-2xl border-2 group">
                        <Link href="/events">
                          Browse Events <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </ParallaxSection>

        <div className="h-16" />
      </div>
    </>
  );
}
