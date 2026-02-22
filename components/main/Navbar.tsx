"use client";

import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "서비스 소개", href: "#service" },
  { label: "컨설팅 신청", href: "#apply" },
  { label: "자주 묻는 질문", href: "#faq" },
];

export const Navbar = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center px-4 pt-4"
    >
      <nav className="flex items-center gap-8 rounded-full border border-border bg-card/60 backdrop-blur-md px-6 py-3">
        {/* Logo */}
        <span className="text-sm font-bold tracking-widest text-foreground">
          GROOMEET
        </span>

        {/* Divider */}
        <div className="h-4 w-px bg-border" />

        {/* Nav Links */}
        <ul className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="h-4 w-px bg-border" />

        {/* CTA */}
        <a
          href="#apply"
          className="text-sm font-semibold text-foreground border border-foreground/20 rounded-full px-4 py-1.5 transition-colors hover:bg-foreground hover:text-background"
        >
          무료 신청
        </a>
      </nav>
    </motion.header>
  );
};
