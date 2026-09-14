"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ticking = useRef(false);

  const overHero = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 48);
          ticking.current = false;
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkClass = (active: boolean) =>
    overHero
      ? active
        ? "text-olive-dark"
        : "text-text-primary/85 hover:text-text-primary"
      : active
        ? "text-on-dark"
        : "text-on-dark-dim hover:text-on-dark";
  const menuClass = overHero ? "text-text-primary" : "text-on-dark";

  return (
    <>
      <header
        className={clsx(
          "fixed left-0 right-0 top-0 z-[9999] transition-[background,backdrop-filter,border,padding] duration-300",
          overHero ? "py-5" : "border-b py-3"
        )}
        style={{
          background: overHero
            ? "linear-gradient(to bottom, rgba(244,239,230,0.9), rgba(244,239,230,0.56), transparent)"
            : "color-mix(in srgb, var(--dark-bg) 97%, transparent)",
          backdropFilter: overHero ? "none" : "blur(12px)",
          borderColor: overHero ? "transparent" : "var(--dark-border)",
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link
            href="/"
            aria-label="SYLVA SOUNDS — home"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
            style={{ background: "transparent" }}
          >
            <Image
              src={overHero ? "/logos/sylva-mark-on-light.png" : "/logos/sylva-mark-on-dark.png"}
              alt="SYLVA SOUNDS"
              width={32}
              height={42}
              priority
              className="h-8 w-auto object-contain md:h-9"
              style={{ background: "transparent" }}
            />
            <span
              className={clsx(
                "font-display text-xl font-semibold tracking-tight md:text-2xl",
                overHero ? "text-text-primary" : "text-on-dark"
              )}
            >
              SYLVA SOUNDS
            </span>
          </Link>

          <ul className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    "relative font-body text-base font-medium tracking-wide transition-colors md:text-lg",
                    linkClass(pathname === link.href)
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-olive-core" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="/contact"
              className="hidden rounded-full bg-olive-core px-7 py-3 text-sm font-semibold tracking-wide text-surface-01 transition-colors hover:bg-olive-dark sm:inline-flex md:text-base"
            >
              Start a Project
            </a>
            <button
              type="button"
              className={clsx("p-1 transition-opacity hover:opacity-70 lg:hidden", menuClass)}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center lg:hidden"
          style={{
            background: "var(--dark-bg)",
          }}
        >
          <ul className="flex flex-col items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    "font-display text-4xl font-medium",
                    pathname === link.href ? "text-on-dark-accent" : "text-on-dark"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="/contact"
            className="mt-14 rounded-full bg-olive-core px-8 py-3.5 text-sm font-semibold text-surface-01"
          >
            Start a Project
          </a>
        </div>
      )}
    </>
  );
}
