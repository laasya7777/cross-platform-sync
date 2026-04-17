import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Banner } from "@/components/Banner";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import { Eye, Microscope, Droplet, Activity, Globe, Baby, Glasses } from "lucide-react";

const STRIP = [
  { Icon: Eye, label: "Cataract Surgery" },
  { Icon: Microscope, label: "LASIK / SMILE" },
  { Icon: Droplet, label: "Glaucoma" },
  { Icon: Activity, label: "Retina Surgeries" },
  { Icon: Globe, label: "Cornea Transplant" },
  { Icon: Baby, label: "Paediatric Eye" },
  { Icon: Glasses, label: "Squint Correction" },
];

const Index = () => {
  const [open, setOpen] = useState(false);
  return (
    <main className="min-h-screen bg-background">
      <Header onBookClick={() => setOpen(true)} />
      <Hero onBookClick={() => setOpen(true)} />

      {/* Services strip */}
      <div className="bg-navy py-5 px-5 sm:px-10">
        <div className="max-w-6xl mx-auto flex gap-8 overflow-x-auto no-scrollbar justify-start lg:justify-center flex-nowrap">
          {STRIP.map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/70 whitespace-nowrap text-sm">
              <Icon className="h-4 w-4 text-accent" /> {label}
            </div>
          ))}
        </div>
      </div>

      <About />
      <Services />

      {/* Gallery placeholder section id for nav */}
      <section id="gallery" className="py-20 px-5 sm:px-10 bg-background">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block bg-pale text-sky text-[11px] tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-3">
            Gallery
          </span>
          <h2 className="font-display text-[clamp(28px,4vw,42px)] text-navy mb-3">Eye Care in Action</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            A glimpse into our state-of-the-art clinic and the precision of modern eye care.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-[4/3] gradient-card rounded-2xl shadow-soft flex items-center justify-center text-6xl"
              >
                👁
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <Contact />
      <Banner onBookClick={() => setOpen(true)} />

      <footer className="bg-navy-deep px-5 sm:px-10 py-8 text-center text-white/40 text-sm">
        <p>
          © 2024 <strong className="text-white/70">Dr J Sumanth Reddy</strong> – Eye Specialist
          &amp; Surgeon. All rights reserved.
        </p>
        <p className="mt-2">Hyderabad, Telangana | Designed with ❤ for better vision</p>
      </footer>

      <AppointmentDialog open={open} onOpenChange={setOpen} />
    </main>
  );
};

export default Index;
