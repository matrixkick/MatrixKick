import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { PricingSection } from '@/features/pricing/components/pricing-section';

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-12 lg:gap-32">
      <HeroSection />
      <ExamplesSection />
      <PricingSection />
      <FooterCTA />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <Container className="relative z-10 py-20 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-block rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 px-5 py-2 mb-6 backdrop-blur-sm border border-white/10">
            <span className="text-sm font-medium text-white/90">
              Generate stunning Twitter banners with DALL·E in seconds
            </span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Instantly craft stunning Twitter banners
          </h1>

          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Beautiful, on-brand banners for your profile — no design skills required. Powered by AI.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg px-10 py-6 shadow-xl" asChild>
              <Link href="/signup">Get started for free</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-10 py-6" asChild>
              <Link href="/examples">See examples</Link>
            </Button>
          </div>
        </div>
      </Container>

      {/* Decorative shape */}
      <Image
        src="/hero-shape.png"
        width={867}
        height={790}
        alt=""
        className="absolute right-0 top-0 w-1/2 lg:w-auto opacity-40 lg:opacity-60 pointer-events-none"
        priority
        quality={90}
      />
    </section>
  );
}

function ExamplesSection() {
  const examples = [
    '/example1.png',
    '/example2.png',
    '/example3.png',
    '/example4.png',
    '/example5.png',
    '/example6.png',
    '/example7.png',
    '/example8.png',
    '/example9.png',
  ];

  return (
    <section className="bg-black py-16 lg:py-24">
      <Container>
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Real banners generated in seconds
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {examples.map((src, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-indigo-500/20"
            >
              <Image
                src={src}
                width={600}
                height={200}
                alt={`Example banner ${i + 1}`}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
            <Link href="/gallery">View full gallery →</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

function FooterCTA() {
  return (
    <section className="bg-gradient-to-br from-indigo-600 to-purple-700 py-20 lg:py-32 text-white">
      <Container className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to create your perfect banner?
        </h2>
        <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
          Join thousands of creators using AI to make stunning Twitter banners in seconds.
        </p>
        <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 text-xl px-12 py-7 shadow-2xl" asChild>
          <Link href="/signup">Start Creating Free</Link>
        </Button>
      </Container>
    </section>
  );
}
