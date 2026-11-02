import { UserRound } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { TEAM_COPY, TEAM_MEMBERS } from '@/data/team';

/**
 * Team grid: split header (title left, intro right) over a 4-column grid of
 * portrait cards — photo, name, designation, credentials.
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

      <ul className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM_MEMBERS.map((member, idx) => (
          <li key={member.id}>
            <ScrollReveal direction="up" delay={(idx % 4) * 0.06}>
              <article className="flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-alt">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-text-ghost" aria-hidden>
                      <UserRound className="h-16 w-16" strokeWidth={1} />
                    </div>
                  )}
                </div>
                <h3 className="heading-3 mt-4">{member.name}</h3>
                <p className="eyebrow mt-1.5">{member.role}</p>
                <p className="mt-1 text-[13px] leading-snug text-text-dim">{member.credentials}</p>
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
