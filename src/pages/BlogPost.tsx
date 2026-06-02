import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import { getPostBySlug, blogPosts } from "@/data/blogPosts";
import { ArrowLeft, Clock, Calendar, AlertCircle } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const [open, setOpen] = useState(false);
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <Header onBookClick={() => setOpen(true)} />

      {/* Hero */}
      <section
        className={`pt-32 pb-16 px-5 sm:px-10 bg-gradient-to-br ${post.gradient} text-white relative overflow-hidden`}
      >
        <div className="max-w-3xl mx-auto relative">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white mb-5"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <span className="inline-block text-[10px] tracking-[3px] uppercase bg-white/20 backdrop-blur px-3 py-1 rounded-full font-semibold mb-4">
            {post.category}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-5">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-5 text-sm text-white/75">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readTime}</span>
          </div>
        </div>
        <div className="absolute -bottom-8 -right-8 text-[180px] opacity-20 select-none">
          {post.icon}
        </div>
      </section>

      {/* Body */}
      <article className="py-14 px-5 sm:px-10">
        <div className="max-w-3xl mx-auto space-y-9">
          {post.sections.map((section, i) => {
            if (section.callout) {
              return (
                <div
                  key={i}
                  className="rounded-2xl border-l-4 border-accent bg-soft-blue/50 p-6 shadow-soft"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <h3 className="font-display text-lg font-bold text-navy">
                      {section.callout.title}
                    </h3>
                  </div>
                  <ul className="space-y-2 ml-8">
                    {section.callout.items.map((item, j) => (
                      <li key={j} className="text-sm text-foreground/80 list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
            return (
              <div key={i}>
                {section.heading && (
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-4">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs?.map((p, j) => (
                  <p key={j} className="text-foreground/80 leading-relaxed mb-3 text-[15px]">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="space-y-2 mt-2">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex gap-3 text-foreground/80 text-[15px]">
                        <span className="text-accent mt-1.5 shrink-0">●</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {/* CTA */}
          <div className="rounded-2xl bg-gradient-to-br from-navy to-blue text-white p-7 sm:p-9 text-center mt-12">
            <h3 className="font-display text-2xl font-bold mb-2">Concerned about your eyes?</h3>
            <p className="text-white/80 mb-5 text-sm">
              Book a consultation with Dr J Sumanth Reddy for an expert evaluation.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-sky to-accent text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition shadow-glow"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="py-14 px-5 sm:px-10 bg-soft-blue/40 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-display text-2xl font-bold text-navy mb-6">
            Related Articles
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group rounded-xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-card transition"
              >
                <div className={`h-28 bg-gradient-to-br ${p.gradient} flex items-center justify-center text-5xl`}>
                  {p.icon}
                </div>
                <div className="p-5">
                  <h4 className="font-display font-bold text-foreground group-hover:text-primary transition leading-snug">
                    {p.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-navy-deep px-5 sm:px-10 py-8 text-center text-white/50 text-sm">
        © 2024 Dr J Sumanth Reddy – Eye Specialist & Surgeon
      </footer>

      <AppointmentDialog open={open} onOpenChange={setOpen} />
    </main>
  );
};

export default BlogPost;