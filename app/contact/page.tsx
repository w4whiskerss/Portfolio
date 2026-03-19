import ContactForm from "@/components/ContactForm";
import SiteNavbar from "@/components/SiteNavbar";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-5 text-white sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center gap-6">
        <SiteNavbar currentPage="contact" />

        <section className="glass-surface glass-panel animate-pop-up rounded-[2.2rem] border border-white/15 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10">
          <div className="mx-auto w-full max-w-2xl">
            <ContactForm />
          </div>
        </section>
      </div>
    </main>
  );
}
