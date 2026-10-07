import { ArrowDownRight, ArrowUpRight, CalendarDays, HeartHandshake, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { Link } from "wouter";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";

const domains = [
  ["01", "Accueil", "Créer une première impression chaleureuse et fluide."],
  ["02", "Service", "Servir avec précision, attention et élégance."],
  ["03", "Animation", "Faire circuler l’énergie et les rencontres."],
  ["04", "Technique", "Rendre la lumière, le son et le lieu possibles."],
  ["05", "Art", "Ajouter une présence, un geste, une émotion."],
  ["06", "Logistique", "Préparer l’invisible qui fait tenir l’ensemble."],
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      <SiteHeader />
      <main>
        <section className="relative min-h-[640px] overflow-hidden bg-ink md:min-h-[700px]">
          <img src="/manus-storage/soir-lumineux_0af24762.jpg" alt="Guirlandes lumineuses lors d’un rassemblement en soirée" className="absolute inset-0 h-full w-full object-cover opacity-40 md:opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(25,31,18,.96)_0%,rgba(25,31,18,.84)_54%,rgba(25,31,18,.58)_100%)]" />
          <div className="container relative flex min-h-[640px] flex-col justify-between py-8 md:min-h-[700px] md:py-16">
            <div className="rise flex items-center justify-between">
              <span className="rounded-full border border-paper-soft bg-paper-soft px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.12em] text-paper-soft">Événements qui rassemblent</span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[.12em] text-paper/65 md:block">France · Des liens sans étiquette</span>
            </div>
            <div className="max-w-4xl pb-12 md:pb-4">
              <p className="rise font-mono text-[11px] uppercase tracking-[.13em] text-lime">L’art de se reconnecter</p>
              <h1 className="rise mt-5 max-w-5xl font-editorial text-[clamp(3.15rem,15vw,9rem)] leading-[.88] text-paper md:text-[clamp(4rem,10vw,9rem)]">Faire fête.<br /><em className="text-lime">Faire place.</em></h1>
              <p className="rise mt-7 max-w-xl text-base leading-7 text-paper-soft md:mt-8 md:text-lg">Lumière Commune compose des mariages et des événements avec des talents choisis pour leur savoir-faire, rémunérés avec clarté et accompagnés avec respect.</p>
              <div className="rise mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/demande" className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-3.5 font-semibold text-ink transition-transform hover:scale-[1.015]"><ArrowDownRight size={18} /> Imaginer mon événement</Link>
                <Link href="/talents" className="inline-flex items-center justify-center gap-2 rounded-full border border-paper-soft bg-paper-soft px-5 py-3.5 font-semibold text-paper transition hover:bg-paper/15"><ArrowUpRight size={18} /> Mettre mon talent en lumière</Link>
              </div>
            </div>
            <div className="grid gap-3 border-t border-paper-soft pt-5 text-paper-soft sm:grid-cols-3 sm:gap-8">
              <p className="font-mono text-[10px] uppercase tracking-[.1em]">Compétences avant étiquettes</p>
              <p className="font-mono text-[10px] uppercase tracking-[.1em]">Rémunération annoncée</p>
              <p className="font-mono text-[10px] uppercase tracking-[.1em]">Coordination humaine</p>
            </div>
          </div>
        </section>

        <section className="bg-paper py-20 md:py-28">
          <div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">Une autre manière d’organiser</p>
              <h2 className="mt-5 font-editorial text-5xl leading-[.95] md:text-6xl">Un événement tient par les personnes qui le font vivre.</h2>
            </div>
            <div className="max-w-2xl text-base leading-7 text-ink/68 md:text-lg">Nous facilitons une rencontre utile entre un besoin concret et des personnes prêtes à contribuer. Le parcours est simple, mais jamais expéditif : chaque demande est qualifiée, chaque profil est volontaire, et chaque mission est suivie.</div>
          </div>
          <div className="container mt-14 grid gap-px overflow-hidden rounded-[1.5rem] bg-ink/10 md:grid-cols-3">
            <article className="bg-paper p-7 md:p-9"><CalendarDays className="text-coral" /><h3 className="mt-8 font-editorial text-3xl">Vous imaginez</h3><p className="mt-3 leading-6 text-ink/65">Date, lieu, budget et atmosphère : votre demande pose un cadre juste dès le départ.</p><Link href="/demande" className="mt-7 inline-flex items-center gap-1 font-semibold text-sm">Publier une demande <ArrowUpRight size={16} /></Link></article>
            <article className="bg-sand p-7 md:p-9"><UsersRound className="text-coral" /><h3 className="mt-8 font-editorial text-3xl">Nous relions</h3><p className="mt-3 leading-6 text-ink/65">Les talents sont appréciés pour leurs compétences, leur disponibilité et leur engagement.</p><Link href="/annuaire" className="mt-7 inline-flex items-center gap-1 font-semibold text-sm">Explorer l’annuaire <ArrowUpRight size={16} /></Link></article>
            <article className="bg-lime p-7 md:p-9"><HeartHandshake className="text-coral" /><h3 className="mt-8 font-editorial text-3xl">Vous célébrez</h3><p className="mt-3 leading-6 text-ink/65">Une coordination présente, une mission confirmée, une fête qui laisse une trace plus vaste.</p><Link href="/association" className="mt-7 inline-flex items-center gap-1 font-semibold text-sm">Comprendre l’impact <ArrowUpRight size={16} /></Link></article>
          </div>
        </section>

        <section className="relative overflow-hidden bg-sand py-20 md:py-28">
          <div className="glow-orb -left-40 top-24 opacity-45" />
          <div className="container relative grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[2rem] bg-ink shadow-soft"><img src="/manus-storage/rencontre-lumineuse_b8c8ea8d.jpg" alt="Deux personnes échangeant autour d’une table, dans une lumière douce" className="h-[480px] w-full object-cover" /><div className="absolute bottom-4 left-4 max-w-[220px] rounded-2xl bg-paper p-4 text-sm font-medium leading-5">La relation n’est pas un décor : elle est au cœur de la coordination.</div></div>
            <div>
              <p className="eyebrow">Un impact qui protège</p>
              <h2 className="mt-5 font-editorial text-5xl leading-[.95] md:text-6xl">La joie n’exige pas que l’on efface les réalités.</h2>
              <p className="mt-7 max-w-xl leading-7 text-ink/68">Lumière Commune entend ouvrir des occasions de travail et de reconnaissance aux intermittents et aux personnes accompagnées par des structures partenaires. Cette ouverture se fait avec consentement, confidentialité et droit de retrait : personne n’est défini par sa situation.</p>
              <Link href="/protection" className="button-ink mt-8 gap-2"><ShieldCheck size={18} /> Voir notre cadre de protection</Link>
            </div>
          </div>
        </section>

        <section className="bg-paper py-20 md:py-28">
          <div className="container flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="eyebrow">Des métiers qui rendent la fête possible</p><h2 className="mt-5 font-editorial text-5xl leading-[.95] md:text-6xl">Un réseau pour chaque geste.</h2></div><Link href="/annuaire" className="button-light gap-2">Découvrir les profils <ArrowUpRight size={17} /></Link></div>
          <div className="container mt-12 grid overflow-hidden rounded-[1.5rem] border border-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map(([number, label, description]) => <Link href={`/annuaire?categorie=${label.toLowerCase()}`} key={label} className="group border-b border-r border-ink/10 bg-paper p-6 transition hover:bg-ink hover:text-paper md:p-7"><p className="font-mono text-[10px] text-coral group-hover:text-lime">{number}</p><h3 className="mt-8 font-editorial text-3xl">{label}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-ink/60 group-hover:text-paper/65">{description}</p><ArrowUpRight className="mt-6 h-5 w-5 text-coral group-hover:text-lime" /></Link>)}
          </div>
        </section>

        <section className="bg-ink py-20 text-paper md:py-24"><div className="container grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="eyebrow text-lime">Économie lisible</p><h2 className="mt-5 max-w-3xl font-editorial text-5xl leading-[.95] md:text-6xl">La coordination a un prix. Son rôle est expliqué.</h2></div><div><p className="leading-7 text-paper/72">Les frais de coordination sont annoncés avant la mise en relation. Une contribution solidaire, si vous le souhaitez, reste optionnelle. Nous présentons un modèle utile, pas une promesse de résultat.</p><Link href="/demande#budget" className="mt-7 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 font-semibold text-ink">Voir les formules <ArrowUpRight size={17} /></Link></div></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}
