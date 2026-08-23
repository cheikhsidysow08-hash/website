/*
 * Direction artistique : pâtisserie éditoriale chaleureuse.
 * Les photos reçues restent la matière principale de la section Menu ;
 * les visuels générés servent uniquement à l’ambiance, à la marque et aux transitions éditoriales.
 */
import { Fragment, useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowDownRight, ArrowRight, CalendarDays, Check, ChevronRight, Instagram, Mail, Menu as MenuIcon, Minus, Phone, Plus, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

const asset = "/manus-storage/";

const menuEditorial = [
  { title: "Gâteau de fête", note: "Pour marquer le jour", group: "Célébrations", groupNote: "Des créations généreuses pour les jours qui comptent." },
  { title: "Douceur chocolatée", note: "Une part généreuse", group: "Gourmandises", groupNote: "Des textures franches et des parfums qui restent." },
  { title: "Création florale", note: "Une finition délicate", group: "Finitions maison", groupNote: "Le détail fait la différence, jusque dans la dernière touche." },
  { title: "Pièce de cérémonie", note: "Pour les grands oui", group: "Grandes occasions", groupNote: "Des formats pensés pour rassembler autour de la table." },
  { title: "Douceur fruitée", note: "Fraîche et lumineuse", group: "Célébrations", groupNote: "Des couleurs et des saveurs pour ouvrir l'appétit." },
  { title: "Gâteau sur mesure", note: "Votre idée, notre geste", group: "Commandes sur mesure", groupNote: "Racontez-nous l'occasion, nous imaginons la suite." },
  { title: "Signature Prince", note: "La maison en une bouchée", group: "Gourmandises", groupNote: "Une sélection de créations qui portent notre façon de faire." },
];

const menuItems = [
  ["IMG-20260719-WA0007_9323dd66.jpg", 7000],
  ["IMG-20260719-WA0008_cca3c8ce.jpg", 10000],
  ["IMG-20260719-WA0009_11228003.jpg", 9000],
  ["IMG-20260719-WA0010_e2b5fc19.jpg", 10000],
  ["IMG-20260719-WA0011_7a8fe708.jpg", 9000],
  ["IMG-20260719-WA0012_73688162.jpg", 8000],
  ["IMG-20260719-WA0014_642de677.jpg", 10000],
  ["IMG-20260719-WA0015_f4712852.jpg", 9500],
  ["IMG-20260719-WA0016_55e25e42.jpg", 7500],
  ["IMG-20260719-WA0017_de1b34be.jpg", 10000],
  ["IMG-20260719-WA0018_e33fc86a.jpg", 8500],
  ["IMG-20260719-WA0019_ca6333ce.jpg", 11000],
  ["IMG-20260719-WA0020_b0d1437c.jpg", 12000],
  ["IMG-20260719-WA0021_20d08fce.jpg", 8000],
  ["IMG-20260719-WA0022_a2ce9fd4.jpg", 9000],
  ["IMG-20260719-WA0023_344f1997.jpg", 7500],
  ["IMG-20260719-WA0024_8dc9dde2.jpg", 10000],
  ["IMG-20260719-WA0025_8b233c08.jpg", null],
  ["IMG-20260719-WA0026_29276adc.jpg", 8000],
  ["IMG-20260719-WA0027_b5eef78d.jpg", 10000],
  ["IMG-20260719-WA0028_9b67d959.jpg", 10000],
  ["IMG-20260719-WA0029_e1847042.jpg", 9000],
  ["IMG-20260719-WA0030_1ef13feb.jpg", 9000],
  ["IMG-20260719-WA0031_e72b3af8.jpg", null],
  ["IMG-20260719-WA0032_c88c99eb.jpg", 8500],
  ["IMG-20260719-WA0033_e87e93a8.jpg", 8000],
  ["IMG-20260719-WA0034_2cdacb13.jpg", 10000],
  ["IMG-20260719-WA0035_0eb82551.jpg", 9000],
  ["IMG-20260719-WA0036_406e94e3.jpg", 10000],
].map(([file, price], index) => {
  const editorial = menuEditorial[index % menuEditorial.length];
  return {
    id: index + 1,
    file: file as string,
    price: price as number | null,
    label: `Création ${String(index + 1).padStart(2, "0")}`,
    ...editorial,
  };
});

const filters = [
  { label: "Toutes les créations", value: "all" },
  { label: "Petits prix", value: "small" },
  { label: "Pièces signature", value: "signature" },
];

function formatPrice(price: number | null) {
  return price ? `${price.toLocaleString("fr-FR")} FCFA` : "Sur devis";
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<(typeof menuItems)[number] | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const filteredItems = useMemo(() => {
    if (activeFilter === "small") return menuItems.filter((item) => item.price !== null && item.price <= 9000);
    if (activeFilter === "signature") return menuItems.filter((item) => item.price !== null && item.price >= 10000);
    return menuItems;
  }, [activeFilter]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleReservation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Votre demande est prête à être traitée.", {
      description: "Nous vous recontacterons pour confirmer les détails de votre création.",
    });
    event.currentTarget.reset();
  };

  return (
    <div className="site-shell">
      <header className={`site-header ${isMobileMenuOpen ? "site-header--open" : ""}`}>
        <a className="brand" href="#accueil" onClick={closeMobileMenu} aria-label="Prince Gâteaux, retour à l'accueil">
          <img className="brand-mark" src={`${asset}prince-gateaux-mark_05158b24.png`} alt="" />
          <span className="brand-copy"><strong>Prince</strong><em>Gâteaux</em></span>
        </a>

        <button className="mobile-menu-button" type="button" aria-label="Ouvrir le menu" aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((open) => !open)}>
          {isMobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
        </button>

        <nav className={`main-nav ${isMobileMenuOpen ? "main-nav--open" : ""}`} aria-label="Navigation principale">
          <a href="#accueil" onClick={closeMobileMenu}>Accueil</a>
          <a href="#apropos" onClick={closeMobileMenu}>À propos</a>
          <a href="#menu" onClick={closeMobileMenu}>Menu</a>
          <a href="#reservation" onClick={closeMobileMenu}>Contact</a>
          <a className="nav-cta" href="#reservation" onClick={closeMobileMenu}>Réserver <ArrowUpRight /></a>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="accueil">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Maison de douceurs · Yaoundé</p>
            <h1>Des créations qui <em>font rester</em> le moment.</h1>
            <p className="hero-intro">Gâteaux, glaces et desserts préparés avec patience pour les anniversaires, les fêtes et les envies qui méritent une vraie pause.</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#menu">Découvrir le Menu <ArrowRight size={17} /></a>
              <a className="text-link" href="#apropos">Notre savoir-faire <ArrowDownRight size={17} /></a>
            </div>
            <div className="hero-meta">
              <span><strong>01</strong> ingrédients choisis</span>
              <span><strong>02</strong> finitions soignées</span>
              <span><strong>03</strong> moments sur mesure</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-frame">
              <img src={`${asset}prince-gateaux-hero_62f36308.jpg`} alt="Sélection de desserts Prince Gâteaux posée sur une table ivoire" />
              <div className="hero-stamp"><Sparkles size={15} /><span>Fait avec soin</span></div>
            </div>
            <div className="hero-side-note"><span>Maison</span><strong>PG</strong><span>depuis 2020</span></div>
          </div>
          <a href="#menu" className="scroll-cue" aria-label="Voir le menu"><span>Faire défiler</span><Minus size={18} /></a>
        </section>

        <section className="about-section section-shell" id="apropos">
          <div className="section-heading section-heading--split">
            <p className="eyebrow"><span className="eyebrow-dot" /> L'intention</p>
            <div>
              <div className="section-kicker-row"><span className="section-mark section-mark--small"><img src={`${asset}prince-gateaux-mark_05158b24.png`} alt="" /></span><p className="section-kicker">01 — À propos</p></div>
              <h2>La gourmandise, <em>avec une attention en plus.</em></h2>
            </div>
          </div>
          <div className="about-layout">
            <div className="about-main-photo photo-card">
              <img src={`${asset}IMG-20260719-WA0013_0e3a1078.jpg`} alt="Création pâtissière réalisée par Prince Gâteaux" loading="lazy" />
              <span className="photo-caption">Une création, un souvenir.</span>
            </div>
            <div className="about-copy">
              <p className="lead">Chez Prince Gâteaux, chaque commande commence par une intention : faire plaisir avec une création aussi belle que délicieuse.</p>
              <p>Nous travaillons des recettes généreuses, des textures franches et des finitions délicates. Pour un anniversaire, un mariage, un baptême ou simplement pour marquer le coup, nous adaptons chaque détail à votre moment.</p>
              <a className="text-link" href="#reservation">Parler de votre occasion <ArrowRight size={17} /></a>
              <div className="about-signature"><span className="signature-line" /><span>La maison Prince Gâteaux</span></div>
            </div>
            <div className="craft-card">
              <img src={`${asset}prince-gateaux-about_9da0f1c5.jpg`} alt="Détails d'une préparation pâtissière artisanale" loading="lazy" />
              <div className="craft-card-copy"><span>Dans l'atelier</span><strong>Des gestes simples.<br />Un goût précis.</strong></div>
            </div>
          </div>
        </section>

        <section className="menu-section section-shell" id="menu">
          <div className="menu-intro">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" /> La vitrine</p>
              <div className="section-kicker-row"><span className="section-mark section-mark--small"><img src={`${asset}prince-gateaux-mark_05158b24.png`} alt="" /></span><p className="section-kicker">02 — Le Menu</p></div>
              <h2>Choisissez votre <em>prochaine douceur.</em></h2>
            </div>
            <div className="menu-intro-copy">
              <p>Une sélection de créations photographiées dans notre univers. Les formats et finitions peuvent évoluer selon votre occasion.</p>
              <span className="menu-count">{menuItems.length} créations présentées</span>
            </div>
          </div>

          <div className="menu-toolbar">
            <div className="filter-list" role="group" aria-label="Filtrer les créations">
              {filters.map((filter) => (
                <button key={filter.value} className={`filter-button ${activeFilter === filter.value ? "filter-button--active" : ""}`} type="button" onClick={() => setActiveFilter(filter.value)}>
                  {filter.label}
                </button>
              ))}
            </div>
            <span className="menu-note">Cliquez sur une photo pour l'agrandir</span>
          </div>

          <div className="menu-grid">
            {filteredItems.map((item, index) => (
              <Fragment key={item.id}>
                {index % 7 === 0 && <div className="menu-break"><span className="section-mark"><img src={`${asset}prince-gateaux-mark_05158b24.png`} alt="" /></span><span className="menu-break-index">0{Math.floor(index / 7) + 1}</span><p><strong>{item.group}</strong><span>{item.groupNote}</span></p><span className="menu-break-line" /></div>}
                <button type="button" className={`menu-card ${index % 5 === 0 ? "menu-card--wide" : ""}`} onClick={() => setSelectedItem(item)} aria-label={`Voir ${item.title}, ${item.label}`}>
                  <span className="menu-image-wrap">
                    <img src={`${asset}${item.file}`} alt={`${item.title}, création pâtissière Prince Gâteaux`} />
                    <span className="menu-hover-label">Agrandir <ArrowUpRight size={15} /></span>
                  </span>
                  <span className="menu-card-footer"><span><strong className="menu-card-title">{item.title}</strong><small>{item.note}</small></span><strong>{formatPrice(item.price)}</strong></span>
                </button>
              </Fragment>
            ))}
          </div>

          <div className="menu-bottom-note"><span className="eyebrow-dot" /><p>Les créations sont réalisées sur commande. Pour une demande personnalisée, indiquez-nous vos envies et votre date.</p><a className="text-link" href="#reservation">Demander un devis <ArrowRight size={17} /></a></div>
        </section>

        <section className="service-section">
          <div className="service-shell">
            <div className="service-heading"><p className="eyebrow eyebrow--light"><span className="eyebrow-dot" /> La promesse</p><span className="section-mark section-mark--dark"><img src={`${asset}prince-gateaux-mark_05158b24.png`} alt="" /></span><h2>Le détail qui change <em>tout.</em></h2></div>
            <div className="service-list">
              <div className="service-item"><span>01</span><div><h3>Des ingrédients choisis</h3><p>Des bases fraîches et des parfums francs pour garder le plaisir au centre.</p></div></div>
              <div className="service-item"><span>02</span><div><h3>Une finition sur mesure</h3><p>Un format, une couleur ou un message : racontez-nous ce que vous imaginez.</p></div></div>
              <div className="service-item"><span>03</span><div><h3>Un échange simple</h3><p>Votre demande est étudiée avec attention avant chaque confirmation.</p></div></div>
            </div>
          </div>
        </section>

        <section className="reservation-section section-shell" id="reservation">
          <div className="reservation-visual">
            <img src={`${asset}prince-gateaux-reservation_054d38a8.jpg`} alt="Boîte de gâteau emballée avec un ruban terracotta" loading="lazy" />
            <div className="reservation-quote">« Une douceur pensée<br /><em>pour votre moment.</em> »</div>
          </div>
          <div className="reservation-content">
            <p className="eyebrow"><span className="eyebrow-dot" /> Sur commande</p>
            <div className="section-kicker-row"><span className="section-mark section-mark--small"><img src={`${asset}prince-gateaux-mark_05158b24.png`} alt="" /></span><p className="section-kicker">03 — Réservation</p></div>
            <h2>Parlons de ce que vous <em>célébrez.</em></h2>
            <p className="reservation-lead">Décrivez-nous votre occasion, nous reviendrons vers vous pour affiner les détails et confirmer la disponibilité.</p>
            <form className="reservation-form" onSubmit={handleReservation}>
              <label><span>Votre nom</span><input name="name" type="text" placeholder="Ex. Marie Dupont" required /></label>
              <label><span>Téléphone</span><input name="phone" type="tel" placeholder="Ex. 6 90 00 00 00" required /></label>
              <label><span>Type de commande</span><select name="occasion" defaultValue=""><option value="" disabled>Choisir une occasion</option><option>Anniversaire</option><option>Mariage</option><option>Événement privé</option><option>Simple envie</option></select></label>
              <label><span>Date souhaitée</span><input name="date" type="date" /></label>
              <label className="field-full"><span>Votre envie</span><textarea name="message" placeholder="Parlez-nous du gâteau ou dessert imaginé…" rows={4} required /></label>
              <button className="button button--primary button--form" type="submit">Envoyer ma demande <ArrowRight size={17} /></button>
            </form>
            <div className="reservation-details"><span><CalendarDays size={16} /> Anticipez idéalement de 5 à 7 jours</span><span><Check size={16} /> Réponse personnalisée</span></div>
          </div>
        </section>

        <section className="faq-section section-shell">
          <div className="faq-heading"><p className="eyebrow"><span className="eyebrow-dot" /> Bon à savoir</p><h2>Quelques réponses<br /><em>avant de commencer.</em></h2></div>
          <div className="faq-list">
            {["Les créations sont-elles personnalisables ?", "Quel est le délai pour réserver ?", "Comment les tarifs sont-ils définis ?"].map((question, index) => (
              <div key={question} className={`faq-item ${faqOpen === index ? "faq-item--open" : ""}`}>
                <button type="button" onClick={() => setFaqOpen(faqOpen === index ? null : index)} aria-expanded={faqOpen === index}><span>{question}</span>{faqOpen === index ? <Minus size={19} /> : <Plus size={19} />}</button>
                {faqOpen === index && <p>{index === 0 ? "Oui. Les couleurs, formats et intentions peuvent être discutés au moment de votre demande, selon la création choisie." : index === 1 ? "Nous recommandons de nous écrire 5 à 7 jours avant la date souhaitée. Pour les grandes occasions, le plus tôt sera le mieux." : "Le tarif dépend du format, du nombre de parts et du niveau de personnalisation. Nous vous confirmons un prix après échange."}</p>}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="brand brand--footer" href="#accueil"><img className="brand-mark" src={`${asset}prince-gateaux-mark_05158b24.png`} alt="" /><span className="brand-copy"><strong>Prince</strong><em>Gâteaux</em></span></a>
          <p>Des créations douces pour les moments qui comptent.</p>
          <div className="footer-contact"><a href="tel:+237600000000"><Phone size={16} /> Nous appeler</a><a href="mailto:bonjour@princegateaux.com"><Mail size={16} /> Écrire un message</a><a href="#menu"><Instagram size={16} /> Voir la vitrine</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Prince Gâteaux</span><span>Fait avec patience, servi avec le sourire.</span><a href="#accueil">Retour en haut <ChevronRight size={15} /></a></div>
      </footer>

      {selectedItem && (
        <div className="image-dialog-backdrop" role="presentation" onClick={() => setSelectedItem(null)}>
          <div className="image-dialog" role="dialog" aria-modal="true" aria-label={`Aperçu de ${selectedItem.label}`} onClick={(event) => event.stopPropagation()}>
            <button className="dialog-close" type="button" aria-label="Fermer l'aperçu" onClick={() => setSelectedItem(null)}><X size={20} /></button>
            <img src={`${asset}${selectedItem.file}`} alt={`${selectedItem.label}, aperçu agrandi`} />
            <div className="dialog-footer"><span>{selectedItem.label}</span><strong>{formatPrice(selectedItem.price)}</strong><a className="text-link" href="#reservation" onClick={() => setSelectedItem(null)}>Réserver cette création <ArrowRight size={16} /></a></div>
          </div>
        </div>
      )}
    </div>
  );
}

function ArrowUpRight({ size = 17 }: { size?: number }) {
  return <ArrowRight size={size} className="arrow-up-right" />;
}
