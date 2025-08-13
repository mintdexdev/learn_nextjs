import Link from "next/link"
import ContainerY from "./Container/ContainerY";
import ContainerX from "./Container/ContainerX";
import { HoverEffect } from "./ui/card-hover-effect";

const featuredWebinars = [
  {
    title: 'Understanding Music Theory',
    description:
      'Dive deep into the fundamentals of music theory and enhance your musical skills.',
    slug: 'understanding-music-theory',
    isFeatured: true,
  },
  {
    title: 'The Art of Songwriting',
    description:
      'Learn the craft of songwriting from experienced musicians and songwriters.',
    slug: 'the-art-of-songwriting',
    isFeatured: true,
  },
  {
    title: 'Mastering Your Instrument',
    description:
      'Advanced techniques to master your musical instrument of choice.',
    slug: 'mastering-your-instrument',
    isFeatured: true,
  },
  {
    title: 'Music Production Essentials',
    description:
      'Get started with music production with this comprehensive overview.',
    slug: 'music-production-essentials',
    isFeatured: true,
  },
  // Added two more webinars
  {
    title: 'Live Performance Techniques',
    description:
      'Enhance your live performance skills with expert tips and strategies.',
    slug: 'live-performance-techniques',
    isFeatured: true,
  },
  {
    title: 'Digital Music Marketing',
    description:
      'Learn how to promote your music effectively in the digital age.',
    slug: 'digital-music-marketing',
    isFeatured: true,
  },
];

const UpcommingWebinars = () => {
  return (

    <section>
      <ContainerY>
        <ContainerX>

          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center">
              <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">FEATURED WEBINARS</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Enhance Your Musical Journey</p>
            </div>

            <div className="mt-10">
              <HoverEffect
                items={featuredWebinars.map(webinar => (
                  {
                    title: webinar.title,
                    description: webinar.description,
                    link: '/'
                  }
                ))}
              />
            </div>

            <div className="pt-10 pb-2 text-center duration-300 active:scale-[0.98]">
              <Link href={"/"}
                className="text-white px-4 py-2 rounded-xl border border-neutral-600 bg-neutral-900 hover:bg-neutral-800 transition duration-300 "
              >
                View All webinars
              </Link>
            </div>
          </div>

        </ContainerX>

      </ContainerY>
    </section>
  )
}

export default UpcommingWebinars