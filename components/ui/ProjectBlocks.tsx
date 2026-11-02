import { ScrollReveal } from './ScrollReveal';
import { FactGrid, MediaFrame } from './ProjectMedia';
import type { ProjectBlock } from '@/data/projectDetails';

type BlockOf<T extends ProjectBlock['type']> = Extract<ProjectBlock, { type: T }>;

/** Split header used by the image and gallery blocks: title left, copy right. */
function BlockHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="mb-10 grid grid-cols-1 gap-4 md:mb-12 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="heading-2 mt-2">{title}</h2>
      </div>
      <p className="body lg:col-span-6 lg:col-start-7 lg:self-end">{body}</p>
    </div>
  );
}

/** Landscape image (8 cols, 16:10) beside a portrait image (4 cols, 4:5) — equal heights. */
function ImagePairBlock({ block }: { block: BlockOf<'image-pair'> }) {
  return (
    <section className="container-page section">
      <ScrollReveal direction="up">
        <BlockHeader eyebrow={block.eyebrow} title={block.title} body={block.body} />
      </ScrollReveal>
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-12">
        <ScrollReveal direction="up" className="md:col-span-8">
          <MediaFrame media={block.horizontal} aspect="aspect-[16/10]" />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.08} className="md:col-span-4">
          <MediaFrame media={block.vertical} aspect="aspect-[4/5]" />
        </ScrollReveal>
      </div>
      {block.facts && block.facts.length > 0 && (
        <ScrollReveal direction="up" className="mt-10">
          <FactGrid facts={block.facts} />
        </ScrollReveal>
      )}
    </section>
  );
}

/** Portrait 9:16 video on the left; copy, facts and a landscape 16:9 video on the right. */
function VideoPairBlock({ block }: { block: BlockOf<'video-pair'> }) {
  return (
    <section className="section border-y border-border bg-void-dark">
      <div className="container-page grid grid-cols-1 gap-x-5 gap-y-8 lg:grid-cols-12">
        {/* On desktop the portrait video stretches to the column height so both videos end level. */}
        <ScrollReveal direction="up" className="order-3 lg:order-1 lg:col-span-4 lg:h-full">
          <MediaFrame
            media={block.vertical}
            aspect="aspect-[9/16] lg:aspect-auto lg:flex-1"
            className="mx-auto max-w-sm lg:h-full lg:max-w-none"
          />
        </ScrollReveal>
        <div className="order-1 flex flex-col gap-8 lg:order-2 lg:col-span-8 lg:justify-between">
          <ScrollReveal direction="up">
            <span className="eyebrow">{block.eyebrow}</span>
            <h2 className="heading-2 mt-2">{block.title}</h2>
            <p className="body mt-4 max-w-2xl">{block.body}</p>
            {block.facts && block.facts.length > 0 && (
              <div className="mt-6">
                <FactGrid facts={block.facts} />
              </div>
            )}
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.08}>
            <MediaFrame media={block.horizontal} aspect="aspect-video" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/** Two rows that alternate landscape and portrait: image + video, then image + video. */
function MixedGalleryBlock({ block }: { block: BlockOf<'mixed-gallery'> }) {
  return (
    <section className="container-page section">
      <ScrollReveal direction="up">
        <BlockHeader eyebrow={block.eyebrow} title={block.title} body={block.body} />
      </ScrollReveal>
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-12">
        <ScrollReveal direction="up" className="md:col-span-8">
          <MediaFrame media={block.horizontalImage} aspect="aspect-[16/10]" />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.08} className="md:col-span-4">
          <MediaFrame media={block.verticalVideo} aspect="aspect-[4/5]" />
        </ScrollReveal>
        <ScrollReveal direction="up" className="md:col-span-4">
          <MediaFrame media={block.verticalImage} aspect="aspect-[4/5]" />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.08} className="md:col-span-8">
          <MediaFrame media={block.horizontalVideo} aspect="aspect-[16/10]" />
        </ScrollReveal>
      </div>
      {block.facts && block.facts.length > 0 && (
        <ScrollReveal direction="up" className="mt-10">
          <FactGrid facts={block.facts} />
        </ScrollReveal>
      )}
    </section>
  );
}

export function ProjectBlocks({ blocks }: { blocks: ProjectBlock[] }) {
  return (
    <>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'image-pair':
            return <ImagePairBlock key={idx} block={block} />;
          case 'video-pair':
            return <VideoPairBlock key={idx} block={block} />;
          case 'mixed-gallery':
            return <MixedGalleryBlock key={idx} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
