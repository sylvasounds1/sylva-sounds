import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/data";

const footerLinks = {
  Studio: [
    { href: "/portfolio", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/industries", label: "Industries" },
  ],
  Connect: [
    { href: "/contact", label: "Contact" },
    { href: `mailto:${site.email}`, label: site.email, external: true },
  ],
};

export function Footer() {
  return (
    <footer className="dark-zone relative z-10 border-t" style={{ borderColor: "var(--dark-border)" }}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              href="/"
              aria-label="SYLVA SOUNDS — home"
              className="flex items-center gap-2.5"
              style={{ background: "transparent" }}
            >
              <Image
                src="/logos/sylva-mark-on-dark.png"
                alt="SYLVA SOUNDS"
                width={32}
                height={42}
                loading="lazy"
                className="h-9 w-auto object-contain md:h-10"
                style={{ background: "transparent" }}
              />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold tracking-tight text-on-dark md:text-2xl">
                  SYLVA SOUNDS
                </span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-on-dark-dim">
                  {site.tagline}
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-on-dark-dim">
              Music, sound design and audio post-production for film, OTT, brands, and digital media.
              Based in Mumbai, working globally.
            </p>
            <div className="mt-8 flex items-end gap-[4px]" style={{ height: 20 }} aria-hidden>
              {[3, 6, 4, 8, 5, 7, 4, 6, 3, 5, 7, 4].map((h, i) => (
                <div
                  key={i}
                  className="waveform-bar w-[3px] rounded-sm bg-olive-core"
                  style={{
                    height: h * 2,
                    opacity: 0.5,
                    animationDelay: `${i * 0.12}s`,
                    transformOrigin: "bottom",
                  }}
                />
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="label-mono mb-5 text-[10px] text-on-dark-label">{title}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-on-dark-dim transition-colors hover:text-on-dark"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-on-dark-dim transition-colors hover:text-on-dark"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t pt-8 text-center" style={{ borderColor: "var(--dark-border)" }}>
          <p className="text-xs text-on-dark-dim">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
