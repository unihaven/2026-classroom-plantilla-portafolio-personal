import React from "react";
import { CertificationCard } from "@/components/certification-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Define interfaces for our translated data types
interface WorkItem {
  company: string;
  href: string;
  title: string;
  location: string;
  start: string;
  end: string;
  description: string;
}

interface EducationItem {
  school: string;
  href: string;
  degree: string;
  start: string;
  end: string;
  description?: string; // Add optional description field
}

interface CertificationItem {
  title: string;
  dates: string;
  location: string;
  description: string;
  certificate: string;
}

const BLUR_FADE_DELAY = 0.04;

type Params = Promise<{ locale: string }>;

// Update to properly await params before using them
export default async function Page(props: { params: Params }) {
  // Await params to get locale
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get translations with the proper namespace pattern
  const tHero = await getTranslations({ locale, namespace: "Hero" });
  const tAbout = await getTranslations({ locale, namespace: "About" });
  const tWork = await getTranslations({ locale, namespace: "Work" });
  const tEducation = await getTranslations({ locale, namespace: "Education" });
  const tSkills = await getTranslations({ locale, namespace: "Skills" });
  const tProjects = await getTranslations({ locale, namespace: "Projects" });
  const tCertifications = await getTranslations({
    locale,
    namespace: "Certifications",
  });
  const tContact = await getTranslations({ locale, namespace: "Contact" });

  // Create a mapping between original projects and their translations
  const translatedProjects = DATA.projects.map((project, index) => {
    const translation = tProjects.raw("items")[index];
    return {
      ...project,
      title: translation?.title || project.title,
      description: translation?.description || project.description,
    };
  });

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero" className="scroll-mt-8">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex justify-between items-start">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={tHero("greeting", { name: DATA.name.split(" ")[0] })}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={tHero("description")}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="flex-shrink-0">
              <LanguageSwitcher currentLocale={locale} />
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-8">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">{tAbout("title")}</h2>
        </BlurFade>
        <BlurFade className="text-base" delay={BLUR_FADE_DELAY * 4}>
          <Markdown>{tAbout("summary")}</Markdown>
        </BlurFade>
      </section>

      <section id="work" className="scroll-mt-8">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">{tWork("title")}</h2>
          </BlurFade>
          {tWork.raw("items").map((work: WorkItem, id: number) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={DATA.work[id]?.logoUrl || ""}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={DATA.work[id]?.badges || []}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="education" className="scroll-mt-8">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">{tEducation("title")}</h2>
          </BlurFade>
          {tEducation
            .raw("items")
            .map((education: EducationItem, id: number) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  key={education.school}
                  href={education.href}
                  logoUrl={DATA.education[id]?.logoUrl || ""}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                  description={education.description} // Add description from translation
                />
              </BlurFade>
            ))}
        </div>
      </section>

      <section id="skills" className="scroll-mt-8">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">{tSkills("title")}</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge className="text-sm" key={skill}>
                  {skill}
                </Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-8">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-base">
                  {tProjects("title")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {tProjects("subtitle")}
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {tProjects("description")}
                </p>
              </div>
            </div>
          </BlurFade>
          <Tabs defaultValue="react" className="w-full">
            <TabsList className="mx-auto w-full max-w-[800px] mb-4">
              <TabsTrigger value="nextjs" className="hover:cursor-pointer">
                Next.JS
              </TabsTrigger>
              <TabsTrigger className="hover:cursor-pointer" value="react">
                React
              </TabsTrigger>
              <TabsTrigger
                className="hover:cursor-pointer"
                value="react-native"
              >
                React Native
              </TabsTrigger>
            </TabsList>
            <TabsContent value="nextjs">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
                {translatedProjects
                  .filter((project) => project.technologies.includes("Next.js"))
                  .map((project) => (
                    <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 12}>
                      <ProjectCard
                        href={project.href}
                        title={project.title}
                        description={project.description}
                        tags={project.technologies}
                        image={project.image}
                        imageAlign={project.imageAlign}
                        video={project.video}
                        links={project.links}
                      />
                    </BlurFade>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="react">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
                {translatedProjects
                  .filter((project) => project.technologies.includes("React"))
                  .map((project) => (
                    <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 12}>
                      <ProjectCard
                        href={project.href}
                        title={project.title}
                        description={project.description}
                        tags={project.technologies}
                        image={project.image}
                        imageAlign={project.imageAlign}
                        video={project.video}
                        links={project.links}
                      />
                    </BlurFade>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="react-native">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
                {translatedProjects
                  .filter((project) =>
                    project.technologies.includes("React Native"),
                  )
                  .map((project) => (
                    <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 12}>
                      <ProjectCard
                        href={project.href}
                        title={project.title}
                        description={project.description}
                        tags={project.technologies}
                        image={project.image}
                        imageAlign={project.imageAlign}
                        video={project.video}
                        links={project.links}
                      />
                    </BlurFade>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="certifications" className="scroll-mt-8">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-base">
                  {tCertifications("title")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {tCertifications("subtitle")}
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {tCertifications("description")}
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {tCertifications
                .raw("items")
                .map((cert: CertificationItem, id: number) => (
                  <BlurFade
                    key={cert.title + cert.dates}
                    delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                  >
                    <CertificationCard
                      title={cert.title}
                      description={cert.description}
                      location={cert.location}
                      dates={cert.dates}
                      image={DATA.certifications[id]?.image || ""}
                      links={DATA.certifications[id]?.links.map((link) => ({
                        ...link,
                        title: cert.certificate,
                      }))}
                    />
                  </BlurFade>
                ))}
            </ul>
          </BlurFade>
        </div>
      </section>

      <section id="contact" className="scroll-mt-8">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-base">
                {tContact("title")}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                {tContact("subtitle")}
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {tContact("description_pre")}
                <span className=" text-foreground">
                  {tContact("twitterText")}
                </span>
                {tContact("description_post")}
              </p>
              <div className="flex justify-center gap-4 mt-6">
                {Object.entries(DATA.contact.social).map(([name, social]) => (
                  <Link
                    key={name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon" }),
                      "size-12",
                    )}
                  >
                    <social.icon className="size-5" />
                    <span className="sr-only">{name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
