import { useState, useRef } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Bus,
  CalendarDays,
  Clock3,
  Flower2,
  Gift,
  Heart,
  Hotel,
  MapPin,
  Navigation,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import FallingFlowers from "@/components/FallingFlowers";
import RSVPForm from "@/components/RSVPForm";
import ScratchReveal from "@/components/ScratchReveal";
import WeddingCountdown from "@/components/WeddingCountdown";

const floralLeft = "/manus-storage/async-images/fiP209AXKnSu5YGIVZvKAe/image-1.webp";
const floralRight = "/manus-storage/async-images/fiP209AXKnSu5YGIVZvKAe/image-2.webp";
const mapQuery = "Grand Palace Hall, City Centre, London";
const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

function saveDateToCalendar() {
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Zayn and Nora//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    "UID:zayn-nora-wedding-20261130",
    "DTSTAMP:20261020T000000Z",
    "DTSTART;TZID=Europe/London:20261130T103000",
    "DTEND;TZID=Europe/London:20261130T120000",
    "SUMMARY:Wedding ceremony — Zayn & Nora",
    "LOCATION:Grand Palace Hall, City centre, London",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([calendar], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "zayn-and-nora-wedding.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <span className="heading-flourish" aria-hidden="true"><i /><span>✦</span><i /></span>
    </div>
  );
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [dressTab, setDressTab] = useState<"women" | "men">("women");
  const [isMuted, setIsMuted] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const toggleAudio = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !heroVideoRef.current.muted;
      setIsMuted(heroVideoRef.current.muted);
    }
  };

  if (!opened) return <EnvelopeIntro onOpen={() => setOpened(true)} />;

  return (
    <div className="wedding-site">
      <header className="site-header">
        <a className="brand-lockup" href="#home" aria-label="Zayn and Nora, home">
          <span className="brand-mark">Z<span>&</span>N</span>
          <span className="brand-caption">30 · 11 · 26</span>
        </a>
        <nav className="site-nav" aria-label="Invitation sections">
          <a href="#home">The invitation</a>
          <a href="#events">The day</a>
          <a href="#venue">The place</a>
          <a href="#rsvp">RSVP</a>
        </nav>
        <a className="header-rsvp" href="#rsvp">Kindly reply <ArrowUpRight size={14} /></a>
      </header>

      <main id="invitation">
        <section className="hero-section paper-section" id="home">
          <div className="hero-card botanical-frame animated-courtyard-hero">
            {/* Living 9:16 South Indian Courtyard Animation Backdrop */}
            <div className="courtyard-video-backdrop">
              <video
                ref={heroVideoRef}
                src="/wedding-intro.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="courtyard-video-media"
              />
              <div className="courtyard-video-overlay" />
            </div>

            {/* Ambient Sound Toggle */}
            <button
              type="button"
              className="courtyard-sound-pill"
              onClick={toggleAudio}
              aria-label={isMuted ? "Unmute temple music" : "Mute music"}
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              <span>{isMuted ? "Sound on" : "Sound off"}</span>
            </button>

            <FallingFlowers />

            {/* Floating Wedding Typography & Details */}
            <div className="courtyard-hero-content">
              <div className="hero-topline"><span /> Together with our families <span /></div>
              <p className="script-kicker">With full hearts</p>
              <h1 className="couple-names"><span>Zayn</span><i>&</i><span>Nora</span></h1>
              <div className="name-details"><span>Data Scientist</span><b>·</b><span>Pediatrician</span></div>
              <p className="hero-message">invite you to celebrate the beginning<br className="desktop-break" /> of their forever</p>
              <div className="hero-date-block">
                <span className="date-line" />
                <div><span>Monday</span><strong>30 November 2026</strong><span>at half past ten in the morning</span></div>
                <span className="date-line" />
              </div>
            </div>

            <a className="hero-scroll" href="#welcome"><span>Discover our day</span><ArrowDown size={14} /></a>
            <span className="hero-corner-note">Z <i>✦</i> N</span>
          </div>
          <div className="hero-footnote"><span>London, England</span><span>·</span><span>A celebration of love & family</span></div>
        </section>

        <section className="welcome-section paper-section" id="welcome">
          <div className="welcome-ornament" aria-hidden="true"><Flower2 size={23} strokeWidth={1.1} /></div>
          <p className="script-kicker">Dear family & friends</p>
          <h2>Love brought us here.<br /><em>Your presence makes it whole.</em></h2>
          <p className="welcome-copy">We’re so grateful for the people who have filled our lives with laughter, kindness, and care. Please join us as we gather the ones we love most and begin this next chapter together.</p>
          <span className="signature-line">With love, Zayn & Nora</span>
        </section>

        <section className="date-section paper-section" id="date">
          <div className="date-section-copy">
            <p className="eyebrow">A little something to uncover</p>
            <h2>Our date is<br /><em>in your hands.</em></h2>
            <p>Give the heart a gentle rub to discover the day we say “I do.”</p>
            <button className="save-date-button" type="button" onClick={saveDateToCalendar}><CalendarDays size={15} /> Save the date</button>
          </div>
          <ScratchReveal />
        </section>

        <section className="countdown-section forest-section" id="countdown">
          <div className="countdown-copy">
            <p className="eyebrow eyebrow-light">The moment is getting closer</p>
            <h2>Counting down<br /><em>to forever</em></h2>
            <p>Until we see you at the ceremony.</p>
          </div>
          <WeddingCountdown />
          <div className="countdown-date"><CalendarDays size={15} /> Monday, November 30 <span>·</span> 10:30 AM</div>
        </section>

        <section className="events-section paper-section" id="events">
          <SectionHeading eyebrow="Gather with us" title="The day, in moments" subtitle="Three little chapters in one great celebration." />
          <div className="timeline">
            <article className="timeline-item">
              <div className="timeline-marker"><span>01</span><i /></div>
              <div className="timeline-card">
                <p className="timeline-time"><Clock3 size={14} /> 10:00 AM <span>·</span> Monday, November 30</p>
                <h3>Guest arrival</h3>
                <p>Come in, settle down, and let the day begin. We can’t wait to greet you.</p>
              </div>
            </article>
            <article className="timeline-item timeline-highlight">
              <div className="timeline-marker"><span>02</span><i /></div>
              <div className="timeline-card">
                <p className="timeline-time"><Clock3 size={14} /> 10:30 AM <span>·</span> Monday, November 30</p>
                <h3>The wedding ceremony</h3>
                <p>The promise, the people we love, and the beginning of our forever.</p>
                <span className="timeline-tag">The “I do” moment</span>
              </div>
            </article>
            <article className="timeline-item">
              <div className="timeline-marker"><span>03</span><i /></div>
              <div className="timeline-card">
                <p className="timeline-time"><Clock3 size={14} /> 7:30 PM <span>·</span> Wednesday, December 2</p>
                <h3>Reception</h3>
                <p>A joyful evening of dinner, music, and making memories together.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="venue-section" id="venue">
          <div className="venue-copy">
            <p className="eyebrow eyebrow-light">Meet us in London</p>
            <h2>A place for<br /><em>our people.</em></h2>
            <p className="venue-name">Grand Palace Hall</p>
            <p className="venue-address"><MapPin size={15} /> City centre, London</p>
            <a className="venue-link" href={mapHref} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={15} /></a>
            <p className="venue-note">We look forward to welcoming you there.</p>
          </div>
          <div className="map-card">
            <iframe title="Map search for Grand Palace Hall, City centre, London" src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <a className="map-chip" href={mapHref} target="_blank" rel="noreferrer"><Navigation size={13} /> View directions</a>
          </div>
        </section>

        <section className="dress-section paper-section" id="dress-code">
          <SectionHeading eyebrow="A note on what to wear" title="Dress for the joy" subtitle="A little guidance for feeling your most lovely." />
          <div className="dress-card">
            <div className="dress-tablist" role="tablist" aria-label="Dress-code guidance">
              <button type="button" role="tab" id="tab-women" aria-selected={dressTab === "women"} aria-controls="dress-panel" onClick={() => setDressTab("women")}><span>For</span> Women</button>
              <button type="button" role="tab" id="tab-men" aria-selected={dressTab === "men"} aria-controls="dress-panel" onClick={() => setDressTab("men")}><span>For</span> Men</button>
            </div>
            <div className="dress-content" id="dress-panel" role="tabpanel" aria-labelledby={dressTab === "women" ? "tab-women" : "tab-men"}>
              <div className={`dress-swatch dress-swatch-${dressTab}`} aria-hidden="true"><span /><span /><span /><span /></div>
              <p className="dress-note-title">{dressTab === "women" ? "Soft, graceful, and ready to celebrate" : "Classic, comfortable, and celebration-ready"}</p>
              <h3>{dressTab === "women" ? "Elegant formal attire in pastel colors" : "Suit or traditional wear"}</h3>
              <p>{dressTab === "women" ? "Think gentle shades, flowing fabrics, and the colors of a spring garden." : "Choose the style that feels most like you; traditional attire is every bit as welcome."}</p>
            </div>
            <div className="dress-card-footer"><Sparkles size={14} /> Wear what lets you celebrate comfortably <Sparkles size={14} /></div>
          </div>
        </section>

        <section className="celebrations-section paper-section" id="celebrations">
          <SectionHeading eyebrow="Before the big day" title="The celebrations begin" subtitle="Two family traditions, and a little more time together." />
          <div className="celebration-cards">
            <article className="celebration-card">
              <div className="celebration-icon"><Flower2 size={22} strokeWidth={1.25} /></div>
              <p className="eyebrow">Saturday · November 28, 2026</p>
              <h3>Mahendi</h3>
              <p className="celebration-location"><MapPin size={14} /> At the bride’s house</p>
              <p className="celebration-copy">A joyful gathering filled with colour, music, and the people closest to us.</p>
            </article>
            <article className="celebration-card">
              <div className="celebration-icon"><Sparkles size={21} strokeWidth={1.25} /></div>
              <p className="eyebrow">Sunday · November 29, 2026</p>
              <h3>Haldi</h3>
              <p className="celebration-location"><MapPin size={14} /> At the groom’s house</p>
              <p className="celebration-copy">One more warm day with family before we meet you at the ceremony.</p>
            </article>
          </div>
        </section>

        <section className="logistics-section paper-section" id="travel">
          <SectionHeading eyebrow="We’ve thought of the little things" title="A smoother way to join us" subtitle="A few helpful notes for your time in London." />
          <div className="logistics-grid">
            <article className="logistics-card">
              <div className="logistics-icon"><Bus size={21} strokeWidth={1.4} /></div>
              <p className="eyebrow">Getting there</p>
              <h3>Guest shuttle</h3>
              <p>Shuttle-service details and pickup times will be shared with guests ahead of the celebration. If you need transport assistance, please mention it in your RSVP.</p>
              <a href="#rsvp" className="subtle-link">Let us know <ArrowUpRight size={13} /></a>
            </article>
            <article className="logistics-card hotel-card">
              <div className="logistics-icon"><Hotel size={21} strokeWidth={1.4} /></div>
              <p className="eyebrow">Stay a little longer</p>
              <h3>Grand Palace Hotel</h3>
              <p>Ask the hotel about its special wedding rates. Use our celebration code when arranging your stay.</p>
              <div className="discount-code"><span>Wedding code</span><strong>WEDDING</strong><button type="button" onClick={() => navigator.clipboard?.writeText("WEDDING")} aria-label="Copy wedding discount code">Copy</button></div>
            </article>
          </div>
        </section>

        <section className="rsvp-section forest-section" id="rsvp">
          <div className="rsvp-intro">
            <p className="eyebrow eyebrow-light">A little reply means a lot</p>
            <h2>Will you be<br /><em>there with us?</em></h2>
            <p>Let us know by November 10, 2026. We’re saving you a place in our hearts.</p>
            <div className="rsvp-sparkle"><Gift size={29} strokeWidth={1.15} /><span><i /> <Heart size={13} fill="currentColor" /> <i /></span></div>
          </div>
          <div className="rsvp-panel">
            <div className="rsvp-panel-heading"><span className="eyebrow">Kindly reply</span><span className="rsvp-flower">✿</span></div>
            <RSVPForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-monogram" href="#home">Z <i>&</i> N</a>
        <p>Thank you for being part of our story.</p>
        <p className="footer-date">30 November 2026 <span>·</span> London</p>
        <a className="back-to-top" href="#home" aria-label="Back to top"><ArrowDown size={15} /></a>
      </footer>
    </div>
  );
}
