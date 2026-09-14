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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ticking = useRef(false);

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
    active ? "text-on-dark" : "text-on-dark-dim hover:text-on-dark";
  const menuClass = "text-on-dark";

  return (
    <>
      <header
        className={clsx(
          "fixed left-0 right-0 top-0 z-[9999] transition-[background,backdrop-filter,border,padding] duration-300",
          scrolled ? "border-b py-3" : "py-4"
        )}
        style={{
          background: "color-mix(in srgb, var(--dark-bg) 97%, transparent)",
          backdropFilter: "blur(12px)",
          borderColor: "var(--dark-border)",
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link
            href="/"
            aria-label="SYLVA SOUNDS — home"
            className="inline-flex items-center transition-opacity hover:opacity-85"
            style={{ background: "transparent" }}
          >
            <Image
              src="/logos/sylva-logo.png"
              alt="SYLVA SOUNDS"
              width={34}
              height={44}
              priority
              className="site-logo-img h-10 w-auto object-contain md:h-11"
              style={{ background: "transparent" }}
            />
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
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-champagne" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="/contact"
              className="hidden rounded-full bg-champagne px-7 py-3 text-sm font-semibold tracking-wide text-[#0b0b0b] transition-colors hover:bg-champagne-light sm:inline-flex md:text-base"
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
            className="mt-14 rounded-full bg-champagne px-8 py-3.5 text-sm font-semibold text-[#0b0b0b]"
          >
            Start a Project
          </a>
        </div>
      )}
    </>
  );
}
