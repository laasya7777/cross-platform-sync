import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import { fetchAllPosts, type UnifiedBlogPost } from "@/lib/blog";
import { ArrowRight, Clock, Calendar, Loader2 } from "lucide-react";

const Blog = () => {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<UnifiedBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Header onBookClick={() => setOpen(true)} />

      {/* Hero */}
      <section className="pt-32 pb-12 px-5 sm:px-10 bg-gradient-to-br from-navy via-blue to-sky text-white">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block text-[11px] tracking-[3px] uppercase text-accent font-semibold mb-3">
            Knowledge Hub
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Eye Health Blog
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-base sm:text-lg">
            Expert insights from Dr J Sumanth Reddy — practical guidance on common eye
            conditions, prevention and modern treatments.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-14 px-5 sm:px-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : (
        <div className="max-w-6xl mx-auto grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all"
            >
              <div
                className={`h-44 bg-gradient-to-br ${post.gradient} flex items-center justify-center text-7xl relative overflow-hidden`}
              >
                {post.coverImageUrl ? (
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <span className="drop-shadow-lg">{post.icon}</span>
                )}
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-white/20 backdrop-blur text-white px-2.5 py-1 rounded-full font-semibold">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                </div>
                <h2 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  Read article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        )}
      </section>

      <footer className="bg-navy-deep px-5 sm:px-10 py-8 text-center text-white/50 text-sm">
        © 2024 Dr J Sumanth Reddy – Eye Specialist & Surgeon
      </footer>

      <AppointmentDialog open={open} onOpenChange={setOpen} />
    </main>
  );
};

export default Blog;