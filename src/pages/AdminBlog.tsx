import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import { toast } from "@/hooks/use-toast";
import { Loader2, Upload, LogOut, Trash2, Plus, X } from "lucide-react";
import type { BlogSection } from "@/data/blogPosts";

type DbPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  published_at: string;
  cover_image_url: string | null;
};

const GRADIENTS = [
  "from-rose-500 via-pink-500 to-red-500",
  "from-blue-500 via-indigo-500 to-purple-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-amber-500 via-orange-500 to-red-500",
  "from-violet-500 via-purple-500 to-fuchsia-500",
  "from-sky-500 via-blue-500 to-indigo-500",
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

const AdminBlog = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [posts, setPosts] = useState<DbPost[]>([]);
  const [saving, setSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Eye Health");
  const [icon, setIcon] = useState("👁️");
  const [gradient, setGradient] = useState(GRADIENTS[0]);
  const [readTime, setReadTime] = useState("5 min read");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [sections, setSections] = useState<BlogSection[]>([
    { heading: "Introduction", paragraphs: [""] },
  ]);

  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        navigate("/auth", { replace: true });
        return;
      }
      setUserEmail(sessionData.session.user.email ?? "");
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sessionData.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      const admin = !!roleData;
      setIsAdmin(admin);
      setChecking(false);
      if (admin) loadPosts();
    };
    init();
  }, [navigate]);

  const loadPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("id, slug, title, category, published_at, cover_image_url")
      .order("published_at", { ascending: false });
    setPosts((data ?? []) as DbPost[]);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const updateSection = (i: number, patch: Partial<BlogSection>) => {
    setSections((s) => s.map((sec, idx) => (idx === i ? { ...sec, ...patch } : sec)));
  };
  const removeSection = (i: number) =>
    setSections((s) => s.filter((_, idx) => idx !== i));
  const addSection = (type: "text" | "list" | "callout") => {
    if (type === "text") setSections((s) => [...s, { heading: "", paragraphs: [""] }]);
    if (type === "list") setSections((s) => [...s, { heading: "", list: [""] }]);
    if (type === "callout")
      setSections((s) => [...s, { callout: { title: "When to see a doctor", items: [""] } }]);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim()) {
      toast({ title: "Missing fields", description: "Title and excerpt are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const finalSlug = slug.trim() || slugify(title);

      // Upload cover image
      let coverPath: string | null = null;
      if (coverFile) {
        const ext = coverFile.name.split(".").pop() ?? "jpg";
        coverPath = `covers/${finalSlug}-${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from("blog-assets")
          .upload(coverPath, coverFile, { upsert: true });
        if (uploadErr) throw uploadErr;
      }

      // Clean sections
      const cleaned = sections
        .map((s) => {
          const out: BlogSection = {};
          if (s.heading?.trim()) out.heading = s.heading.trim();
          if (s.paragraphs) {
            const p = s.paragraphs.map((x) => x.trim()).filter(Boolean);
            if (p.length) out.paragraphs = p;
          }
          if (s.list) {
            const l = s.list.map((x) => x.trim()).filter(Boolean);
            if (l.length) out.list = l;
          }
          if (s.callout) {
            const items = s.callout.items.map((x) => x.trim()).filter(Boolean);
            if (items.length) out.callout = { title: s.callout.title.trim() || "Note", items };
          }
          return out;
        })
        .filter((s) => s.heading || s.paragraphs || s.list || s.callout);

      const { data: userData } = await supabase.auth.getUser();
      const { error } = await supabase.from("blog_posts").insert({
        slug: finalSlug,
        title: title.trim(),
        excerpt: excerpt.trim(),
        category: category.trim() || "General",
        icon: icon || "👁️",
        gradient,
        read_time: readTime || "5 min read",
        cover_image_url: coverPath,
        content: cleaned,
        created_by: userData.user?.id,
      });
      if (error) throw error;

      toast({ title: "Published!", description: `Blog post "${title}" is live.` });
      // Reset
      setTitle("");
      setSlug("");
      setExcerpt("");
      setCoverFile(null);
      setSections([{ heading: "Introduction", paragraphs: [""] }]);
      loadPosts();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to publish";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, coverPath: string | null) => {
    if (!confirm("Delete this blog post?")) return;
    if (coverPath) {
      await supabase.storage.from("blog-assets").remove([coverPath]);
    }
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted" });
    loadPosts();
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-background">
        <Header onBookClick={() => setOpen(true)} />
        <div className="pt-32 px-5 max-w-xl mx-auto text-center">
          <h1 className="font-display text-3xl font-bold mb-3">Access Required</h1>
          <p className="text-muted-foreground mb-4">
            You're signed in as <strong>{userEmail}</strong>, but you don't have admin access yet.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Ask the developer to grant the <code className="bg-muted px-1.5 py-0.5 rounded">admin</code> role to your user in the backend.
          </p>
          <button onClick={handleSignOut} className="text-sm underline text-accent">
            Sign out
          </button>
        </div>
        <AppointmentDialog open={open} onOpenChange={setOpen} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header onBookClick={() => setOpen(true)} />

      <section className="pt-28 pb-10 px-5 sm:px-10 bg-gradient-to-br from-navy to-blue text-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-[11px] tracking-[3px] uppercase text-accent font-semibold">Admin</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mt-1">Manage Blog</h1>
            <p className="text-white/70 text-sm mt-1">Signed in as {userEmail}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-full text-sm self-start"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </section>

      <section className="py-10 px-5 sm:px-10">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-8">
          {/* Form */}
          <form onSubmit={submit} className="bg-card border border-border rounded-2xl p-6 shadow-soft space-y-5">
            <h2 className="font-display text-xl font-bold">New Blog Post</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Title *">
                <input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!slug) setSlug(slugify(e.target.value));
                  }}
                  required
                  className="input"
                />
              </Field>
              <Field label="Slug (URL)">
                <input
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  placeholder="auto-generated"
                  className="input"
                />
              </Field>
            </div>

            <Field label="Excerpt *">
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                required
                rows={2}
                className="input"
              />
            </Field>

            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Category">
                <input value={category} onChange={(e) => setCategory(e.target.value)} className="input" />
              </Field>
              <Field label="Icon (emoji)">
                <input value={icon} onChange={(e) => setIcon(e.target.value)} className="input" />
              </Field>
              <Field label="Read time">
                <input value={readTime} onChange={(e) => setReadTime(e.target.value)} className="input" />
              </Field>
            </div>

            <Field label="Color theme">
              <div className="grid grid-cols-3 gap-2">
                {GRADIENTS.map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => setGradient(g)}
                    className={`h-9 rounded-md bg-gradient-to-r ${g} border-2 ${
                      gradient === g ? "border-foreground" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </Field>

            <Field label="Cover image">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                className="text-sm"
              />
              {coverFile && (
                <p className="text-xs text-muted-foreground mt-1">{coverFile.name}</p>
              )}
            </Field>

            {/* Sections */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Content sections
                </label>
                <div className="flex gap-1">
                  <SmallBtn onClick={() => addSection("text")}>+ Text</SmallBtn>
                  <SmallBtn onClick={() => addSection("list")}>+ List</SmallBtn>
                  <SmallBtn onClick={() => addSection("callout")}>+ Callout</SmallBtn>
                </div>
              </div>

              <div className="space-y-4">
                {sections.map((sec, i) => (
                  <div key={i} className="border border-border rounded-lg p-3 bg-background/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-muted-foreground">
                        Section {i + 1} — {sec.callout ? "Callout" : sec.list ? "List" : "Text"}
                      </span>
                      <button type="button" onClick={() => removeSection(i)} className="text-muted-foreground hover:text-destructive">
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {!sec.callout && (
                      <input
                        placeholder="Heading (optional)"
                        value={sec.heading ?? ""}
                        onChange={(e) => updateSection(i, { heading: e.target.value })}
                        className="input mb-2"
                      />
                    )}

                    {sec.paragraphs && (
                      <textarea
                        rows={4}
                        placeholder="Write paragraphs. Separate paragraphs with a blank line."
                        value={sec.paragraphs.join("\n\n")}
                        onChange={(e) =>
                          updateSection(i, { paragraphs: e.target.value.split(/\n\n+/) })
                        }
                        className="input"
                      />
                    )}

                    {sec.list && (
                      <textarea
                        rows={4}
                        placeholder="One bullet per line"
                        value={sec.list.join("\n")}
                        onChange={(e) =>
                          updateSection(i, { list: e.target.value.split("\n") })
                        }
                        className="input"
                      />
                    )}

                    {sec.callout && (
                      <>
                        <input
                          placeholder="Callout title"
                          value={sec.callout.title}
                          onChange={(e) =>
                            updateSection(i, {
                              callout: { ...sec.callout!, title: e.target.value },
                            })
                          }
                          className="input mb-2"
                        />
                        <textarea
                          rows={3}
                          placeholder="One item per line"
                          value={sec.callout.items.join("\n")}
                          onChange={(e) =>
                            updateSection(i, {
                              callout: { ...sec.callout!, items: e.target.value.split("\n") },
                            })
                          }
                          className="input"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky to-accent text-white py-3 rounded-lg font-semibold shadow-glow disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {saving ? "Publishing..." : "Publish Post"}
            </button>
          </form>

          {/* Existing posts */}
          <aside className="bg-card border border-border rounded-2xl p-6 shadow-soft h-fit">
            <h2 className="font-display text-xl font-bold mb-4">Published Posts ({posts.length})</h2>
            {posts.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No posts in database yet. The 11 existing blog articles on the public site are loaded from code (
                <code className="text-xs">src/data/blogPosts.ts</code>).
              </p>
            )}
            <ul className="space-y-3">
              {posts.map((p) => (
                <li key={p.id} className="flex items-start justify-between gap-3 border-b border-border pb-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">{p.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.category} · /blog/{p.slug}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(p.id, p.cover_image_url)}
                    className="text-muted-foreground hover:text-destructive shrink-0"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <AppointmentDialog open={open} onOpenChange={setOpen} />

      <style>{`
        .input {
          width: 100%;
          padding: 0.55rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus { box-shadow: 0 0 0 2px hsl(var(--accent) / 0.4); }
      `}</style>
    </main>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
      {label}
    </label>
    {children}
  </div>
);

const SmallBtn = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-1 text-xs font-semibold bg-accent/10 text-accent hover:bg-accent/20 px-2.5 py-1.5 rounded-md"
  >
    <Plus className="h-3 w-3" />
    {children}
  </button>
);

export default AdminBlog;