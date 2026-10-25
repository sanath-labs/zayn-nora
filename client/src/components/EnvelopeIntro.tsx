import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";

const floralLeft = "/manus-storage/async-images/fiP209AXKnSu5YGIVZvKAe/image-1.webp";
const floralRight = "/manus-storage/async-images/fiP209AXKnSu5YGIVZvKAe/image-2.webp";

type EnvelopeIntroProps = {
  onOpen: () => void;
};

export default function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const [opening, setOpening] = useState(false);

  const openInvitation = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 1050);
  };

  return (
    <section className={`opening-page${opening ? " is-opening" : ""}`} aria-label="Wedding invitation envelope">
      <img className="opening-floral opening-floral-left" src={floralLeft} alt="" />
      <img className="opening-floral opening-floral-right" src={floralRight} alt="" />
      <div className="opening-copy">
        <p className="eyebrow opening-eyebrow"><span /> A little note for you <span /></p>
        <h1 className="opening-title">A day to remember</h1>
        <p className="opening-subtitle">Zayn <span>&</span> Nora · November 30, 2026</p>
      </div>

      <div className={`envelope-scene${opening ? " envelope-scene-open" : ""}`}>
        <div className="envelope-shadow" />
        <div className="envelope-letter">
          <span className="letter-monogram">Z <i>&</i> N</span>
          <span className="letter-rule" />
          <span className="letter-caption">You are invited</span>
        </div>
        <div className="envelope-back" />
        <div className="envelope-pocket envelope-pocket-left" />
        <div className="envelope-pocket envelope-pocket-right" />
        <div className="envelope-pocket envelope-pocket-bottom" />
        <div className="envelope-flap" />
        <button
          className="wax-seal"
          type="button"
          onClick={openInvitation}
          aria-label="Tap to open Zayn and Nora's wedding invitation"
          disabled={opening}
        >
          <span className="seal-inner"><Heart size={25} strokeWidth={1.4} fill="currentColor" /></span>
          <span className="seal-sparkle"><Sparkles size={14} /></span>
        </button>
      </div>

      <button className="open-prompt" type="button" onClick={openInvitation} disabled={opening}>
        <span className="prompt-dot" /> {opening ? "Opening your invitation" : "Tap the seal to open"} <span className="prompt-dot" />
      </button>
      <p className="opening-date">With love · With joy · With you</p>
    </section>
  );
}
