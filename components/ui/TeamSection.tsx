import { ScrollReveal } from './ScrollReveal';
import { FOUNDERS, PARTNERS, TEAM_COPY, TEAM_PHOTO, type TeamMember } from '@/data/team';

const IMAGE_ZOOM =
  'transition-transform duration-700 ease-luxury motion-reduce:transition-none group-hover:scale-[1.03]';

/** Founder: tall portrait, name set over the photo (same overlay as the heritage card). */
function FounderCard({ member }: { member: TeamMember }) {
  return (
    <article className="group card relative aspect-[4/5] overflow-hidden">
      <img
        src={member.image}
        alt={`${member.name}, ${member.role} at SYSlight`}
        width={1080}
        height={1350}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover object-top ${IMAGE_ZOOM}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="eyebrow text-white/80">{member.role}</span>
        <h3 className="heading-3 mt-1 text-2xl text-white">{member.name}</h3>
      </div>
    </article>
  );
}

/** Partner: compact horizontal card — portrait left, name and role right. */
function PartnerCard({ member }: { member: TeamMember }) {
  return (
    <article className="group card flex overflow-hidden lg:h-full">
      <div className="relative aspect-[4/5] w-2/5 shrink-0 overflow-hidden bg-surface-alt lg:aspect-auto">
        <img
          src={member.image}
          alt={`${member.name}, ${member.role} at SYSlight`}
          width={1080}
          height={1350}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover object-top ${IMAGE_ZOOM}`}
        />
      </div>
      <div className="flex flex-1 flex-col justify-center p-5">
        <span className="eyebrow">{member.role}</span>
        <h3 className="heading-3 mt-1.5">{member.name}</h3>
      </div>
    </article>
  );
}

/**
 * Team section, ordered by weight. On desktop one 12-column row holds the two
 * founders (4 cols each) and a partner column (4 cols, two stacked cards) at
 * the same height — no empty cells — followed by the full-width group photo.
 */
export function TeamSection() {
  return (
    <section className="container-page section border-t border-border" id="about-team">
      <div className="mb-12 grid grid-cols-1 gap-6 md:mb-16 lg:grid-cols-12 lg:gap-12">
        <ScrollReveal direction="up" className="lg:col-span-5">
          <span className="eyebrow">{TEAM_COPY.eyebrow}</span>
          <h2 className="heading-2 mt-2">{TEAM_COPY.title}</h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.08} className="flex flex-col gap-4 lg:col-span-6 lg:col-start-7">
          <p className="lead">{TEAM_COPY.lead}</p>
          <p className="body">{TEAM_COPY.body}</p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
        {FOUNDERS.map((member, idx) => (
          <ScrollReveal key={member.id} direction="up" delay={idx * 0.08} className="lg:col-span-4">
            <FounderCard member={member} />
          </ScrollReveal>
        ))}

        <div className="grid grid-cols-1 gap-5 sm:col-span-2 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:grid-rows-2">
          {PARTNERS.map((member, idx) => (
            <ScrollReveal key={member.id} direction="up" delay={0.16 + idx * 0.08} className="lg:h-full">
              <PartnerCard member={member} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <ScrollReveal direction="up" className="mt-5">
        <figure className="card relative overflow-hidden">
          {/* 4:3 on mobile trims the black letterbox bars baked into the source image. */}
          <div className="aspect-[4/3] md:aspect-[16/9]">
            <img
              src={TEAM_PHOTO.src}
              alt={TEAM_PHOTO.alt}
              width={TEAM_PHOTO.width}
              height={TEAM_PHOTO.height}
              loading="lazy"
              className="h-full w-full object-cover object-[50%_60%]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <span className="eyebrow text-white/80">{TEAM_COPY.teamLabel}</span>
            <p className="heading-3 mt-1 text-2xl text-white">{TEAM_PHOTO.caption}</p>
          </figcaption>
        </figure>
      </ScrollReveal>
    </section>
  );
}
