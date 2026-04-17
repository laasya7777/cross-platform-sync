import { MapPin, Phone, Mail } from "lucide-react";

export const Contact = () => (
  <section id="contact" className="py-20 px-5 sm:px-10 gradient-soft">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <span className="inline-block bg-pale text-sky text-[11px] tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-3">
          Contact Us
        </span>
        <h2 className="font-display text-[clamp(28px,4vw,42px)] text-navy">Find Us & Get in Touch</h2>
        <p className="text-muted-foreground mt-3">We are here to help. Visit our clinic or reach us directly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-card rounded-2xl p-7 text-center shadow-soft">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky to-accent flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-display text-lg text-navy mb-2">Our Location</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Plot No. 45, Road No. 12<br />Banjara Hills, Hyderabad<br />Telangana – 500034
          </p>
        </div>

        <div className="bg-card rounded-2xl p-7 text-center shadow-soft">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky to-accent flex items-center justify-center mx-auto mb-4">
            <Phone className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-display text-lg text-navy mb-2">Call Us</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <a href="tel:+914023456789" className="text-sky hover:underline block">+91 40 2345 6789</a>
            <a href="tel:+919876543210" className="text-sky hover:underline block">+91 98765 43210</a>
            <span className="text-xs">Mon – Sat: 9 AM – 6 PM</span>
          </p>
        </div>

        <div className="bg-card rounded-2xl p-7 text-center shadow-soft">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky to-accent flex items-center justify-center mx-auto mb-4">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-display text-lg text-navy mb-2">Email Us</h3>
          <p className="text-sm text-muted-foreground leading-relaxed break-words">
            <a href="mailto:contact@drsumanthreddy.com" className="text-sky hover:underline block">contact@drsumanthreddy.com</a>
            <a href="mailto:appointments@drsumanthreddy.com" className="text-sky hover:underline block">appointments@drsumanthreddy.com</a>
          </p>
        </div>
      </div>
    </div>
  </section>
);
