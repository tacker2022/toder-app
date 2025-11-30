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
                    <p>© 2024 TODER Project – All Rights Reserved</p>
                </div>
                <div className="footer-links">
                    <a href="#">Hakkımızda</a>
                    <a href="#">Üyelik</a>
                    <a href="#">İletişim</a>
                    <a href="#">Gizlilik</a>
                </div>
            </div>
        </footer>
    );
}
