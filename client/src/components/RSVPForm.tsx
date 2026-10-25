import { useState, type FormEvent } from "react";
import { Check, Heart } from "lucide-react";

type RSVPDetails = {
  name: string;
  email: string;
  attendance: string;
  message: string;
};

const emptyDetails: RSVPDetails = { name: "", email: "", attendance: "", message: "" };

export default function RSVPForm() {
  const [details, setDetails] = useState<RSVPDetails>(emptyDetails);
  const [saved, setSaved] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);

  const update = (field: keyof RSVPDetails, value: string) => {
    setDetails((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedDetails = { ...details, name: details.name.trim(), email: details.email.trim() };
    if (normalizedDetails.name.length < 2) {
      const nameInput = event.currentTarget.elements.namedItem("name");
      if (nameInput instanceof HTMLInputElement) {
        nameInput.setCustomValidity("Please enter a name with at least two non-space characters.");
        nameInput.reportValidity();
      }
      return;
    }
    try {
      const responses = JSON.parse(window.localStorage.getItem("zayn-nora-rsvps") || "[]") as RSVPDetails[];
      responses.push({ ...normalizedDetails, submittedAt: new Date().toISOString() } as RSVPDetails);
      window.localStorage.setItem("zayn-nora-rsvps", JSON.stringify(responses));
    } catch {
      setStorageAvailable(false);
    }
    setDetails(normalizedDetails);
    setSaved(true);
  };

  if (saved) {
    return (
      <div className="rsvp-success" role="status" aria-live="polite">
        <span className="success-icon"><Check size={21} /></span>
        <p className="eyebrow">With thanks</p>
        <h3>We’ve saved your reply, {details.name.split(" ")[0]}.</h3>
        <p>{details.attendance === "yes" ? "We can’t wait to celebrate with you." : "Thank you for letting us know. You’ll be with us in spirit."}</p>
        <p className="local-note">{storageAvailable ? "Your response is saved on this device." : "Your response is noted here for this visit."} This invitation does not send it to the couple.</p>
        <button className="text-button edit-response" type="button" onClick={() => setSaved(false)}>Edit my response</button>
      </div>
    );
  }

  return (
    <form className="rsvp-form" onSubmit={submit}>
      <div className="form-row">
        <label className="form-field">
          <span>Your name <b aria-hidden="true">*</b></span>
          <input autoComplete="name" name="name" value={details.name} onChange={(event) => { event.currentTarget.setCustomValidity(""); update("name", event.target.value); }} onBlur={(event) => update("name", event.currentTarget.value.trim())} placeholder="Full name" required minLength={2} />
        </label>
        <label className="form-field">
          <span>Email address <b aria-hidden="true">*</b></span>
          <input autoComplete="email" name="email" type="email" value={details.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" required />
        </label>
      </div>
      <label className="form-field">
        <span>Will you join us? <b aria-hidden="true">*</b></span>
        <select name="attendance" value={details.attendance} onChange={(event) => update("attendance", event.target.value)} required>
          <option value="" disabled>Select your response</option>
          <option value="yes">Joyfully accepts</option>
          <option value="no">Regretfully declines</option>
        </select>
      </label>
      <label className="form-field">
        <span>A note for the couple <em>optional</em></span>
        <textarea name="message" rows={4} value={details.message} onChange={(event) => update("message", event.target.value)} placeholder="Share a wish, a song request, or a note…" maxLength={500} />
      </label>
      <button className="submit-rsvp" type="submit"><Heart size={16} strokeWidth={1.5} /> Send my reply</button>
      <p className="form-footnote">Your reply is saved on this device only; it is not sent to the couple.</p>
    </form>
  );
}
