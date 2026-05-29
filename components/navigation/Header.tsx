"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type HeaderProps = {
  logoUrl?: string | null;
  contactEmail?: string | null;
};

export default function Header({ logoUrl, contactEmail }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  const email = contactEmail || "hello@tritone.com";
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const showHeaderBackground = scrolled || menuOpen;

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full">
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: showHeaderBackground ? 1 : 0,
            backgroundColor: "rgba(20, 20, 20, 0.28)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        />

        <div className="relative z-10 flex items-center justify-between px-[30px] py-[30px] md:items-start md:px-[60px] md:py-[40px]">
          {/* Logo */}
          <Link href="/" onClick={closeMenu} className="relative z-50 block">
            <Image
            src={logoUrl || "/tritone-logo.svg"}
              alt="Tritone"
              width={220}
              height={40}
              priority
              className="h-4 w-auto md:h-auto md:w-[220px]"
              style={{ height: "16px"  }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/our-story"
              className={`font-mono text-[10pt] tracking-[0.02em] text-white transition-opacity hover:opacity-60 ${
                pathname === "/our-story"
                  ? "underline underline-offset-[4px]"
                  : ""
              }`}
            >
              Our Story
            </Link>

            <Link
              href="/services"
              className={`font-mono text-[10pt] tracking-[0.02em] text-white transition-opacity hover:opacity-60 ${
                pathname === "/services"
                  ? "underline underline-offset-[4px]"
                  : ""
              }`}
            >
              Services
            </Link>

            <a
              href={`mailto:${email}`}
              className="font-mono text-[10pt] tracking-[0.02em] text-white transition-opacity hover:opacity-60"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="relative z-50 h-5 w-8 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`absolute left-0 top-[6px] h-[1px] w-full bg-white transition-transform duration-300 ${
                menuOpen ? "translate-y-[4px] rotate-45" : ""
              }`}
            />

            <span
              className={`absolute left-0 top-[14px] h-[1px] w-full bg-white transition-transform duration-300 ${
                menuOpen ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 flex bg-[#141414] transition-opacity duration-300 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-[22px]">
          <Link
            href="/our-story"
            onClick={closeMenu}
            className="font-founders text-[40px] leading-[0.95] tracking-[-0.03em] text-white"
          >
            Our Story
          </Link>

          <Link
            href="/services"
            onClick={closeMenu}
            className="font-founders text-[40px] leading-[0.95] tracking-[-0.03em] text-white"
          >
            Services
          </Link>

          <a
            href={`mailto:${email}`}
            onClick={closeMenu}
            className="font-founders text-[40px] leading-[0.95] tracking-[-0.03em] text-white"
          >
            Contact
          </a>
        </nav>
      </div>
    </>
  );
}