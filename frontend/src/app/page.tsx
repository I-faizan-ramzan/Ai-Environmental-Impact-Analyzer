import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      
      {/* Additional landing page content could go here in a real implementation */}
      <section id="features" className="py-24 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Transparent Sustainability</h2>
          <p className="text-gray-400 text-xl">Our platform combines the analytical power of AI with the transparency of blockchain to provide trustworthy environmental impact data.</p>
        </div>
      </section>
    </div>
  );
}
