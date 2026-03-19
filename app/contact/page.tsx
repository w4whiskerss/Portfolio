import ContactForm from "@/components/ContactForm";
import SiteNavbar from "@/components/SiteNavbar";

const contactCards = [
  {
    eyebrow: "GitHub",
    title: "@w4whiskerss",
    description: "Projects, code, and public updates.",
    href: "https://github.com/w4whiskerss",
    action: "Open GitHub",
  },
  {
    eyebrow: "Personal Discord",
    title: "Catio",
    description: "Best place for direct contact and quick replies.",
    href: "https://discord.gg/NjZg46TRmf",
    action: "Join Server",
  },
  {
    eyebrow: "DeluxeSMP",
    title: "Project Server",
    description: "Reach out through the community around my main server project.",
    href: "https://discord.gg/gnmR3D5Yxk",
    action: "Open Server",
  },
  {
    eyebrow: "YouTube",
    title: "@W4Whiskers1",
    description: "Follow the creator side of the portfolio and future updates.",
    href: "https://www.youtube.com/@W4Whiskers1",
    action: "Visit Channel",
  },
] as const;

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-5 text-white sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center gap-6">
        <SiteNavbar currentPage="contact" />

        <section className="glass-surface glass-panel animate-pop-up rounded-[2.2rem] border border-white/15 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="space-y-5">
              <p className="text-sm font-medium tracking-[0.35em] text-white/45 uppercase">
                Contact
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Reach Out
              </h1>
              <p className="max-w-xl text-base leading-8 text-white/72 sm:text-lg">
                If you want to talk about frontend work, Minecraft stuff,
                collabs, or anything else, these are the best places to reach me.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-white/70">
                <span className="glass-chip rounded-full border border-white/12 px-4 py-2">
                  Fastest reply: Discord
                </span>
                <span className="glass-chip rounded-full border border-white/12 px-4 py-2">
                  Open to collabs
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <ContactForm />

              <div className="grid gap-4 sm:grid-cols-2">
                {contactCards.map((card, index) => (
                  <a
                    key={card.href}
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`glass-chip group rounded-[1.6rem] border border-white/12 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 animate-pop-up-delay-${Math.min(index + 2, 5)}`}
                  >
                    <p className="text-xs tracking-[0.24em] text-white/45 uppercase">
                      {card.eyebrow}
                    </p>
                    <p className="mt-3 text-xl font-semibold text-white">
                      {card.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/62">
                      {card.description}
                    </p>
                    <span className="mt-4 inline-flex text-sm font-medium text-orange-200 transition-colors duration-300 group-hover:text-orange-100">
                      {card.action}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
