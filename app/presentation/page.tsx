 "use client";

import { useEffect, useRef, useState } from "react";
import BackgroundShowcase from "@/components/BackgroundShowcase";
import SiteNavbar from "@/components/SiteNavbar";

const accordionSections = [
  {
    title: "Drop down to see Button Showcase!",
    content: (
      <div className="grid gap-5 lg:grid-cols-2">
        <article className="glass-surface glass-panel-strong rounded-[1.8rem] border border-white/10 p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-medium text-white">Storm Button</h3>
            <span className="glass-chip rounded-full border border-white/12 px-4 py-2 text-xs text-white/65">
              Motion
            </span>
          </div>
          <p className="mt-3 text-sm leading-7 text-white/68">
            Shaky hover feedback with a shine pass for energetic CTA moments.
          </p>
          <div className="mt-6 flex justify-center">
            <button type="button" className="button-demo-storm button-demo-storm--shine">
              <span>Click Me!</span>
            </button>
          </div>
        </article>

        <article className="glass-surface glass-panel-strong rounded-[1.8rem] border border-white/10 p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-medium text-white">Icon Reveal</h3>
            <span className="glass-chip rounded-full border border-white/12 px-4 py-2 text-xs text-white/65">
              Hover
            </span>
          </div>
          <p className="mt-3 text-sm leading-7 text-white/68">
            Hidden icons slide into focus and the label fades away on hover.
          </p>
          <div className="mt-6 flex justify-center">
            <button type="button" className="button-demo-icons">
              <span>Click Me!</span>
              <span className="button-demo-icons__container" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2 14.9 8.2 22 9.3l-5 4.9 1.2 6.9L12 17.8 5.8 21.1 7 14.2 2 9.3l7.1-1.1L12 2Z" />
                </svg>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3a9 9 0 1 0 9 9" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </button>
          </div>
        </article>

        <article className="glass-surface glass-panel-strong rounded-[1.8rem] border border-white/10 p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-medium text-white">3D Capsule</h3>
            <span className="glass-chip rounded-full border border-white/12 px-4 py-2 text-xs text-white/65">
              Depth
            </span>
          </div>
          <p className="mt-3 text-sm leading-7 text-white/68">
            Premium-looking depth with layered lighting and a hover text swap.
          </p>
          <div className="mt-6 flex justify-center">
            <button type="button" className="button-demo-capsule">
              <span className="button-demo-capsule__wrap">
                <span className="button-demo-capsule__text button-demo-capsule__text--front">
                  Click Me!
                </span>
                <span className="button-demo-capsule__text button-demo-capsule__text--back">
                  Click Me!
                </span>
              </span>
            </button>
          </div>
        </article>

        <article className="glass-surface glass-panel-strong rounded-[1.8rem] border border-white/10 p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-medium text-white">Split Sweep</h3>
            <span className="glass-chip rounded-full border border-white/12 px-4 py-2 text-xs text-white/65">
              Contrast
            </span>
          </div>
          <p className="mt-3 text-sm leading-7 text-white/68">
            Bold monochrome button with opposing sweeps and animated text.
          </p>
          <div className="mt-6 flex justify-center">
            <button type="button" className="button-demo-sweep">
              <span className="button-demo-sweep__text-container">
                <span className="button-demo-sweep__text">Click Me!</span>
              </span>
            </button>
          </div>
        </article>
      </div>
    ),
  },
  {
    title: "Drop down to see Background Showcase!",
    content: <BackgroundShowcase />,
  },
  {
    title: "Drop down to see Forms Showcase!",
    content: (
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="form-demo-card form-demo-card--green">
          <form className="form-demo-auth-green">
            <span className="form-demo-auth-green__input-span">
              <label htmlFor="green-email" className="form-demo-auth-green__label">Email</label>
              <input id="green-email" type="email" placeholder="Enter your email" />
            </span>
            <span className="form-demo-auth-green__input-span">
              <label htmlFor="green-password" className="form-demo-auth-green__label">Password</label>
              <input id="green-password" type="password" placeholder="Enter your password" />
            </span>
            <span className="form-demo-auth-green__meta"><a href="#">Forgot password?</a></span>
            <input className="form-demo-auth-green__submit" type="submit" value="Log in" />
            <span className="form-demo-auth-green__meta">
              Don&apos;t have an account? <a href="#">Sign up</a>
            </span>
          </form>
        </div>

        <div className="form-demo-card form-demo-card--white">
          <form className="form-demo-signin-white">
            <div className="form-demo-signin-white__column">
              <label>Email</label>
            </div>
            <div className="form-demo-signin-white__input-form">
              <svg height={20} viewBox="0 0 32 32" width={20} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
              </svg>
              <input type="text" className="form-demo-signin-white__input" placeholder="Enter your Email" />
            </div>
            <div className="form-demo-signin-white__column">
              <label>Password</label>
            </div>
            <div className="form-demo-signin-white__input-form">
              <svg height={20} viewBox="-64 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
              </svg>
              <input type="password" className="form-demo-signin-white__input" placeholder="Enter your Password" />
              <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32z" />
              </svg>
            </div>
            <div className="form-demo-signin-white__row">
              <div>
                <input type="checkbox" id="remember-demo" />
                <label htmlFor="remember-demo">Remember me</label>
              </div>
              <span className="form-demo-signin-white__link">Forgot password?</span>
            </div>
            <button type="button" className="form-demo-signin-white__submit">Sign In</button>
            <p className="form-demo-signin-white__text">
              Don&apos;t have an account? <span>Sign Up</span>
            </p>
            <p className="form-demo-signin-white__text form-demo-signin-white__text--line">Or With</p>
            <div className="form-demo-signin-white__socials">
              <button type="button" className="form-demo-signin-white__social-btn">Google</button>
              <button type="button" className="form-demo-signin-white__social-btn">Apple</button>
            </div>
          </form>
        </div>

        <div className="form-demo-card form-demo-card--retro">
          <form className="form-demo-retro">
            <p>
              Welcome,<span>sign in to continue</span>
            </p>
            <button type="button" className="form-demo-retro__oauth">
              <span>Continue with Google</span>
            </button>
            <button type="button" className="form-demo-retro__oauth">
              <span>Continue with Github</span>
            </button>
            <div className="form-demo-retro__separator">
              <div />
              <span>OR</span>
              <div />
            </div>
            <input type="email" placeholder="Email" />
            <button type="button" className="form-demo-retro__oauth">
              <span>Continue</span>
            </button>
          </form>
        </div>

        <div className="form-demo-card form-demo-card--blue">
          <div className="form-demo-blue">
            <div className="form-demo-blue__heading">Sign In</div>
            <form className="form-demo-blue__form">
              <input required className="form-demo-blue__input" type="email" placeholder="E-mail" />
              <input required className="form-demo-blue__input" type="password" placeholder="Password" />
              <span className="form-demo-blue__forgot"><a href="#">Forgot Password?</a></span>
              <input className="form-demo-blue__login-button" type="submit" value="Sign In" />
            </form>
            <div className="form-demo-blue__socials">
              <span className="form-demo-blue__title">Or Sign in with</span>
              <div className="form-demo-blue__social-buttons">
                <button type="button" className="form-demo-blue__social-button">G</button>
                <button type="button" className="form-demo-blue__social-button">A</button>
                <button type="button" className="form-demo-blue__social-button">X</button>
              </div>
            </div>
            <span className="form-demo-blue__agreement"><a href="#">Learn user licence agreement</a></span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Drop down to see Loader's Showcase!",
    content: (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div className="loader-demo-card">
          <div className="loader-word">
            <span className="loader-word__letter">L</span>
            <span className="loader-word__letter">O</span>
            <span className="loader-word__letter">A</span>
            <span className="loader-word__letter">D</span>
            <span className="loader-word__letter loader-word__letter--i">I</span>
            <span className="loader-word__letter">N</span>
            <span className="loader-word__letter">G</span>
          </div>
          <span>Letter Loader</span>
        </div>
        <div className="loader-demo-card">
          <div className="loader-hourglass-bg">
            <div className="loader-hourglass">
              <div className="loader-hourglass__curves" />
              <div className="loader-hourglass__cap loader-hourglass__cap--top" />
              <div className="loader-hourglass__glass-top" />
              <div className="loader-hourglass__sand" />
              <div className="loader-hourglass__stream" />
              <div className="loader-hourglass__cap loader-hourglass__cap--bottom" />
              <div className="loader-hourglass__glass" />
            </div>
          </div>
          <span>Hourglass Loader</span>
        </div>
        <div className="loader-demo-card">
          <div className="loader-three-body">
            <div className="loader-three-body__dot" />
            <div className="loader-three-body__dot" />
            <div className="loader-three-body__dot" />
          </div>
          <span>Three Body Loader</span>
        </div>
        <div className="loader-demo-card">
          <div className="loader-bounce">
            <div className="loader-bounce__circle" />
            <div className="loader-bounce__circle" />
            <div className="loader-bounce__circle" />
            <div className="loader-bounce__shadow" />
            <div className="loader-bounce__shadow" />
            <div className="loader-bounce__shadow" />
          </div>
          <span>Bounce Loader</span>
        </div>
        <div className="loader-demo-card">
          <div className="loader-bars-blue">
            <div className="loader-bars-blue__bar" />
          </div>
          <span>Bar Loader</span>
        </div>
        <div className="loader-demo-card">
          <div className="loader-liquid">
            <div className="loader-liquid__text">
              Loading<span className="loader-liquid__dot">.</span><span className="loader-liquid__dot">.</span><span className="loader-liquid__dot">.</span>
            </div>
            <div className="loader-liquid__track">
              <div className="loader-liquid__fill" />
            </div>
          </div>
          <span>Liquid Loader</span>
        </div>
      </div>
    ),
  },
] as const;

function ShowcaseAccordionItem({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = contentInnerRef.current;

    if (!element) {
      return;
    }

    const updateHeight = () => {
      setContentHeight(element.scrollHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`showcase-accordion group ${isOpen ? "showcase-accordion--open" : ""}`}
    >
      <button
        type="button"
        className="showcase-accordion__summary"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className="showcase-accordion__icon">+</span>
      </button>
      <div
        className={`showcase-accordion__content-wrap ${
          isOpen ? "showcase-accordion__content-wrap--open" : ""
        }`}
        style={{ height: isOpen ? `${contentHeight}px` : "0px" }}
      >
        <div
          ref={contentInnerRef}
          className={`showcase-accordion__content ${
            isOpen ? "showcase-accordion__content--open" : ""
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

export default function PresentationPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-5 text-white sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center gap-6">
        <SiteNavbar currentPage="presentation" />

        <section className="glass-surface glass-panel animate-pop-up rounded-[2.2rem] border border-white/15 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-medium tracking-[0.35em] text-white/45 uppercase">
                Presentation
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Interactive Showcase
              </h1>
              <p className="max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                Open each section to see different kinds of UI work I can build.
              </p>
            </div>

            <div className="space-y-4">
              {accordionSections.map((section) => (
                <ShowcaseAccordionItem
                  key={section.title}
                  title={section.title}
                  content={section.content}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
