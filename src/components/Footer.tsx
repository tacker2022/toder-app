"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-left">
                    <Link href="/" className="logo">
                        TODER<span className="accent">.</span>
                    </Link>
                    <p>© {new Date().getFullYear()} TODER Project – All Rights Reserved</p>
                </div>
                <div className="footer-links">
                    <a href="#">Hakkımızda</a>
                    <a href="#">Üyelik</a>
                    <a href="#">İletişim</a>
                    <Link href="/kvkk">Gizlilik ve KVKK</Link>
                </div>
            </div>
        </footer>
    );
}
