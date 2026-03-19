import Image from "next/image";
import CopyButton from "@/components/CopyButton";
import SiteNavbar from "@/components/SiteNavbar";

const projects = [
  {
    title: "DeluxeSMP",
    type: "Website + Minecraft Server",
    logo: "/deluxesmp.png",
    banner: "/deluxesmpbanner.png",
    logoAlt: "DeluxeSMP logo",
    logoClassName: "object-contain p-1.5",
    actions: "deluxe",
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

function renderDescription(project: (typeof projects)[number]) {
  if (project.actions === "deluxe") {
    return (
      <>
        <p>
          Am working on a minecraft server called <strong>DeluxeSMP</strong>,
          with my friend <strong>Yaobi</strong>.
        </p>
        <p>
          Am trying to make it <strong>one of the best minecraft servers</strong>
          , its main pvp aspect is <strong>MacePVP</strong>, and i have poured
          my <strong>hard work and heart</strong> into it.
        </p>
      </>
    );
  }

  if (project.actions === "portfolio") {
    return (
      <>
        <p>
          This website is the <strong>pure representiation</strong> of this
          project this is literally just it :D
        </p>
        <p>
          Am using <strong>Vercel</strong> to host this website, This
          website has took <strong>2 weeks</strong> and am still making
          changes <strong>every day</strong> in it
        </p>
      </>
    );
  }

  return (
    <p>
      Player batch is a mod that is a <strong>extenstion</strong> to a mod
      named <strong>Carpet</strong> that helps <strong>spawn 100+ Fake Players
      at once</strong> without needing to type the commands again and again
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
                  {"banner" in project ? (
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
                        {project.actions === "playerbatch" ? (
                          <span className="glass-chip rounded-full border border-amber-300/20 px-4 py-2 text-xs text-amber-100/80">
                            Under Review
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="project-description space-y-3 text-sm leading-7 text-white/72 sm:text-base">
                      {renderDescription(project)}
                    </div>

                    {project.actions === "deluxe" ? (
                      <div className="flex flex-wrap gap-3">
                        <a
                          href="https://discord.gg/gnmR3D5Yxk"
                          target="_blank"
                          rel="noreferrer"
                          className="project-action-button project-action-button-orange"
                        >
                          Join Discord Server
                        </a>
                        <CopyButton
                          value="mc.deluxesmp.xyz"
                          label="Copy IP"
                        />
                        <a href="#" className="project-action-button">
                          More about this Project!
                        </a>
                      </div>
                    ) : null}

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
                        <a href="#" className="project-action-button project-action-button-orange">
                          Download Mod
                        </a>
                        <a href="#" className="project-action-button">
                          Know more about this Project
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
