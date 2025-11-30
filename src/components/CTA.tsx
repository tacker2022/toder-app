"use client";
import Link from "next/link";

export default function CTA() {
    return (
        <section id="uyelik" className="section cta-section">
            <div className="container cta-container">
                <h2>TODER Project'e Katılın</h2>
                <p>Sektörün geleceğini birlikte şekillendirelim.</p>
                <Link href="/apply" className="btn btn-primary btn-large">
                    Başvuru Formu
                </Link>
            </div>
        </section>
    );
}
