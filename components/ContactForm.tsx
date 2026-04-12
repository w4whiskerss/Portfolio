"use client";

import { FormEvent, useState } from "react";

type SubmitState =
  | {
      type: "idle";
      message: "";
    }
  | {
      type: "success" | "error";
      message: string;
    };

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    type: "idle",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          message,
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setSubmitState({
          type: "error",
          message: data.message ?? "Could not send your message right now.",
        });
        return;
      }

      setSubmitState({
        type: "success",
        message: data.message ?? "Your message has been sent.",
      });
      setEmail("");
      setMessage("");
    } catch {
      setSubmitState({
        type: "error",
        message: "Something went wrong while sending your message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const statusClassName =
    submitState.type === "success"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
      : "border-red-400/20 bg-red-500/10 text-red-100";

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-chip animate-pop-up-delay-2 rounded-[1.8rem] border border-white/12 p-5 sm:p-6"
    >
      <div className="space-y-5">
        <div>
          <p className="text-xs tracking-[0.24em] text-white/45 uppercase">
            Message Form
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Send a Message
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/62">
            Use a real Gmail address and it goes straight to my Discord.
          </p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-white/78">Your Email</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            pattern="^[A-Za-z0-9._%+-]+@gmail\.com$"
            placeholder="you@gmail.com"
            className="w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/28 focus:border-orange-300/40"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-white/78">Message</span>
          <textarea
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            minLength={10}
            rows={7}
            placeholder="Tell me what you want to build, ask, or collaborate on..."
            className="w-full resize-none rounded-[1.4rem] border border-white/12 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/28 focus:border-orange-300/40"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="button-name w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send with Gmail"}
        </button>

        {submitState.type !== "idle" ? (
          <p className={`rounded-2xl border px-4 py-3 text-sm ${statusClassName}`}>
            {submitState.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
