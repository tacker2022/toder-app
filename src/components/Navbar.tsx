"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Navbar() {
    useEffect(() => {
        // Smooth scroll for anchor links
        const handleScroll = (e: MouseEvent) => {
            const target = e.target as HTMLAnchorElement;
            if (target.hash && target.origin === window.location.origin) {
                e.preventDefault();
                const element = document.querySelector(target.hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        };

        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach((link) => {
            link.addEventListener("click", handleScroll as any);
        });

        return () => {
            links.forEach((link) => {
                link.removeEventListener("click", handleScroll as any);
            });
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link href="/" className="logo">
                    TODER<span className="accent">.</span>
                </Link>
                <div className="nav-links hidden md:flex">
                    <a href="#vizyon">Vizyon</a>
                    <a href="#yonetim">Yönetim</a>
                    <a href="#komisyonlar">Komisyonlar</a>
                    <a href="#etkinlikler">Etkinlikler</a>
                    <a href="#iletisim" className="btn btn-primary">
                        Üye Ol
                    </a>
                </div>
            </div>
        </nav>
    );
}
