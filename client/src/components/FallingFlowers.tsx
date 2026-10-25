import type { CSSProperties } from "react";

type FlowerStyle = CSSProperties & {
  "--flower-left": string;
  "--flower-drift": string;
  "--flower-size": string;
  "--flower-duration": string;
  "--flower-delay": string;
  "--flower-color": string;
  "--flower-spin": string;
  "--flower-static-top": string;
};

const flowers: { glyph: string; left: string; drift: string; size: string; duration: string; delay: string; color: string; spin: string; staticTop: string }[] = [
  { glyph: "✿", left: "7%", drift: "25px", size: "19px", duration: "10s", delay: "-4.2s", color: "#b49b6c", spin: "245deg", staticTop: "18%" },
  { glyph: "❀", left: "18%", drift: "-18px", size: "15px", duration: "8.5s", delay: "-1.3s", color: "#c39e94", spin: "-210deg", staticTop: "43%" },
  { glyph: "✽", left: "30%", drift: "19px", size: "14px", duration: "11s", delay: "-7.1s", color: "#879581", spin: "270deg", staticTop: "66%" },
  { glyph: "✿", left: "43%", drift: "-22px", size: "17px", duration: "9.5s", delay: "-2.8s", color: "#b49b6c", spin: "-250deg", staticTop: "30%" },
  { glyph: "❀", left: "56%", drift: "16px", size: "13px", duration: "8s", delay: "-5.5s", color: "#c39e94", spin: "210deg", staticTop: "74%" },
  { glyph: "✽", left: "69%", drift: "-24px", size: "18px", duration: "10.5s", delay: "-3.6s", color: "#879581", spin: "-280deg", staticTop: "12%" },
  { glyph: "✿", left: "82%", drift: "21px", size: "16px", duration: "9s", delay: "-6.2s", color: "#b49b6c", spin: "235deg", staticTop: "53%" },
  { glyph: "❀", left: "93%", drift: "-17px", size: "14px", duration: "11.5s", delay: "-8s", color: "#c39e94", spin: "-225deg", staticTop: "82%" },
  { glyph: "✽", left: "12%", drift: "-20px", size: "12px", duration: "12s", delay: "-9.3s", color: "#879581", spin: "260deg", staticTop: "58%" },
  { glyph: "✿", left: "88%", drift: "18px", size: "12px", duration: "8.2s", delay: "-1.9s", color: "#b49b6c", spin: "-230deg", staticTop: "35%" },
];

export default function FallingFlowers() {
  return (
    <div className="falling-flowers" aria-hidden="true">
      {flowers.map((flower, index) => (
        <span
          className="falling-flower"
          key={`${flower.glyph}-${index}`}
          style={{
            "--flower-left": flower.left,
            "--flower-drift": flower.drift,
            "--flower-size": flower.size,
            "--flower-duration": flower.duration,
            "--flower-delay": flower.delay,
            "--flower-color": flower.color,
            "--flower-spin": flower.spin,
            "--flower-static-top": flower.staticTop,
          } as FlowerStyle}
        >
          {flower.glyph}
        </span>
      ))}
    </div>
  );
}
