import Image from "next/image";
import SiteNavbar from "@/components/SiteNavbar";

type Project = {
  title: string;
  type: string;
  logo: string;
  banner?: string;
  logoAlt: string;
  logoClassName: string;
  actions: "portfolio" | "playerbatch" | "bloodline";
};

const projects: readonly Project[] = [
  {
    title: "Bloodline SMP",
    type: "Minecraft Server + Plugin",
    logo: "/BloodLine Logo.png",
    banner: "/bloodlinesmp.png",
    logoAlt: "Bloodline SMP logo",
    logoClassName: "object-contain scale-[0.72]",
    actions: "bloodline",
  },
  {
    title: "Personal Portfolio",
    type: "Website",
    logo: "/logo.jpg",
    logoAlt: "Personal Portfolio logo",
    logoClassName: "object-cover",
    actions: "portfolio",
  },
  {
    title: "PlayerBatch",
    type: "Minecraft Mod",
    logo: "/PlayerBatch.jpg",
    logoAlt: "PlayerBatch logo",
    logoClassName: "object-cover",
    actions: "playerbatch",
  },
] as const;

function renderDescription(project: Project) {
  if (project.actions === "bloodline") {
    return (
      <>
        <p>
          <strong>Bloodline SMP</strong> is my own SMP project that I&apos;m
          building from the ground up with custom gameplay ideas, server setup,
          and a matching plugin/mod stack.
        </p>
        <p>
          I&apos;m shaping it into a darker, more original Minecraft world with
          custom systems, active development, and a community-first vibe.
        </p>
      </>
    );
  }

  if (project.actions === "portfolio") {
    return (
      <>
        <p>
          This site is my personal portfolio and the best snapshot of the kind
          of work and style I want to show.
        </p>
        <p>
          It&apos;s hosted on <strong>Vercel</strong>, took around{" "}
          <strong>2 weeks</strong> to build, and I&apos;m still improving it{" "}
          <strong>every day</strong>.
        </p>
      </>
    );
  }

  return (
    <p>
      PlayerBatch is an <strong>extension</strong> for <strong>Carpet</strong>
      that helps <strong>spawn 100+ fake players at once</strong> without
      typing the same commands over and over again.
    </p>
  );
}

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-5 text-white sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center gap-6">
        <SiteNavbar currentPage="projects" />

        <section className="glass-surface glass-panel animate-pop-up rounded-[2.2rem] border border-white/15 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-sm font-medium tracking-[0.35em] text-white/45 uppercase">
                Projects
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Projects
              </h1>
            </div>

            <div className="grid gap-5">
              {projects.map((project, index) => (
                <article
                  key={project.title}
                  className={`glass-surface glass-panel-strong animate-pop-up-delay-${Math.min(index + 2, 5)} relative rounded-[1.9rem] border border-white/10 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]`}
                >
                  {project.banner ? (
                    <>
                      <Image
                        src={project.banner}
                        alt={`${project.title} background banner`}
                        fill
                        className="object-cover brightness-[0.38]"
                        sizes="(min-width: 1024px) 900px, 100vw"
                      />
                      <div className="absolute inset-0 bg-black/90" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.62),rgba(0,0,0,0.96))]" />
                    </>
                  ) : null}

                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="glass-chip flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/12">
                          <Image
                            src={project.logo}
                            alt={project.logoAlt}
                            width={64}
                            height={64}
                            className={`h-full w-full rounded-2xl ${project.logoClassName}`}
                          />
                        </div>
                        <div>
                          <p className="text-xs tracking-[0.28em] text-orange-100/65 uppercase">
                            {project.type}
                          </p>
                          <h2 className="mt-2 text-2xl font-medium text-white">
                            {index + 1}. {project.title}
                          </h2>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="glass-chip rounded-full border border-white/12 px-4 py-2 text-xs text-white/65">
                          {project.type}
                        </span>
                        {project.actions === "bloodline" ? (
                          <div className="group relative">
                            <span className="glass-chip rounded-full border border-amber-300/20 px-4 py-2 text-xs text-amber-100/80">
                              WIP
                            </span>
                            <div className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-20 w-max -translate-x-1/2 rounded-full border border-white/12 bg-black/85 px-3 py-1.5 text-[11px] tracking-[0.2em] text-white/80 opacity-0 shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-200 group-hover:translate-y-[-4px] group-hover:opacity-100">
                              Work In Progress
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="project-description space-y-3 text-sm leading-7 text-white/72 sm:text-base">
                      {renderDescription(project)}
                    </div>

                    {project.actions === "portfolio" ? (
                      <div className="flex flex-wrap gap-3">
                        <a
                          href="https://w4whiskers-portfolio.vercel.app/"
                          target="_blank"
                          rel="noreferrer"
                          className="project-action-button"
                        >
                          Hosted on Vercel
                        </a>
                        <a
                          href="https://github.com/w4whiskerss/Portfolio"
                          target="_blank"
                          rel="noreferrer"
                          className="project-action-button"
                        >
                          View Repository
                        </a>
                        <a
                          href="https://github.com/w4whiskerss"
                          target="_blank"
                          rel="noreferrer"
                          className="project-action-button"
                        >
                          GitHub Profile
                        </a>
                      </div>
                    ) : null}

                    {project.actions === "playerbatch" ? (
                      <div className="flex flex-wrap gap-3">
                        <a
                          href="https://modrinth.com/mod/playerbatch"
                          target="_blank"
                          rel="noreferrer"
                          className="project-action-button project-action-button-orange"
                        >
                          Download Mod
                        </a>
                        <a href="#" className="project-action-button">
                          Learn More About This Project
                        </a>
                      </div>
                    ) : null}

                    {project.actions === "bloodline" ? (
                      <div className="flex flex-wrap gap-3">
                        <a
                          href="https://dsc.gg/blodsmp"
                          target="_blank"
                          rel="noreferrer"
                          className="project-action-button project-action-button-orange"
                        >
                          Join Discord
                        </a>
                        <a
                          href="https://modrinth.com/plugin/bloodlinesmp"
                          target="_blank"
                          rel="noreferrer"
                          className="project-action-button"
                        >
                          Download Plugin/Mod
                        </a>
                        <a
                          href="https://github.com/w4whiskerss/bloodline-smp"
                          target="_blank"
                          rel="noreferrer"
                          className="project-action-button"
                        >
                          View Repository
                        </a>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
