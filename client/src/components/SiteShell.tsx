import { Link, useLocation } from "wouter";
import { HeartHandshake, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";

const navItems = [
  { href: "/annuaire", label: "Découvrir les talents" },
  { href: "/association", label: "Association & partenaires" },
  { href: "/protection", label: "Notre cadre" },
  { href: "/suivi", label: "Suivre une demande" },
];

export function SiteHeader() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { isAuthenticated, loading, user } = useAuth();
  const visibleNavItems = user?.role === "admin" ? [...navItems, { href: "/coordination", label: "Coordination" }] : navItems;

  return (
    <header className="site-header">
      <div className="container flex h-[76px] items-center justify-between gap-4">
        <Link href="/" className="brand" aria-label="Lumière Commune, accueil">
          <span className="brand-mark"><HeartHandshake size={19} strokeWidth={2.2} /></span>
          <span>Lumière<br /><em>Commune</em></span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
          {visibleNavItems.map(item => (
            <Link key={item.href} href={item.href} className={`nav-link ${location === item.href ? "active" : ""}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          {!loading && !isAuthenticated && (
            <Button variant="ghost" className="rounded-full px-4 text-sm" onClick={() => startLogin()}>Connexion</Button>
          )}
          <Link href="/demande" className="button-ink text-sm">Publier une demande</Link>
        </div>
        <button className="rounded-full p-2 text-ink transition hover:bg-lime/60 lg:hidden" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-ink/10 bg-paper px-5 pb-6 pt-4 lg:hidden">
          <nav className="container flex flex-col gap-1" aria-label="Navigation mobile">
            {visibleNavItems.map(item => (
              <Link key={item.href} href={item.href} className="mobile-nav-link" onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
            <Link href="/demande" className="button-ink mt-3 text-center" onClick={() => setOpen(false)}>Publier une demande</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="brand text-paper"><span className="brand-mark bg-coral text-ink"><HeartHandshake size={19} /></span><span>Lumière<br /><em>Commune</em></span></div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-paper/70">Une coordination événementielle qui fait de la place aux compétences, à la juste rémunération et à des liens durables.</p>
        </div>
        <div>
          <p className="footer-kicker">Agir</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-paper/75">
            <Link href="/demande">Publier une demande</Link>
            <Link href="/talents">Rejoindre le réseau</Link>
            <Link href="/annuaire">Explorer les compétences</Link>
          </div>
        </div>
        <div>
          <p className="footer-kicker">Confiance</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-paper/75">
            <Link href="/protection">Charte & signalement</Link>
            <Link href="/association">Association & partenaires</Link>
            <Link href="/suivi">Suivre une demande</Link>
          </div>
        </div>
      </div>
      <div className="container border-t border-paper/15 py-5 text-xs text-paper/55">© 2026 Lumière Commune. Les partenariats et parrainages ne sont annoncés qu’après validation écrite.</div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-sand py-16 md:py-24">
      <div className="glow-orb -right-12 -top-24" />
      <div className="container relative max-w-4xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-editorial text-5xl leading-[0.96] text-ink md:text-7xl">{title}</h1>
        <div className="mt-7 max-w-2xl text-base leading-7 text-ink/70 md:text-lg">{children}</div>
      </div>
    </section>
  );
}

export function AuthGate({ children, title }: { children: React.ReactNode; title: string }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="py-12 text-sm text-ink/60">Vérification de votre espace…</div>;
  if (!isAuthenticated) {
    return (
      <div className="rounded-[1.5rem] border border-ink/10 bg-white p-7 shadow-soft">
        <p className="eyebrow">Espace protégé</p>
        <h2 className="mt-3 font-editorial text-3xl text-ink">{title}</h2>
        <p className="mt-3 max-w-xl leading-6 text-ink/65">La connexion permet de conserver votre demande, de maîtriser vos coordonnées et de retrouver le suivi de mission.</p>
        <Button className="mt-6 rounded-full bg-ink px-6 text-paper hover:bg-ink/90" onClick={() => startLogin()}>Se connecter pour continuer</Button>
      </div>
    );
  }
  return <>{children}</>;
}
