import { supabase } from "@/integrations/supabase/client";
import { blogPosts as staticPosts, type BlogPost, type BlogSection } from "@/data/blogPosts";

export type { BlogPost, BlogSection };

export type UnifiedBlogPost = BlogPost & {
  source: "static" | "db";
  coverImageUrl?: string | null;
  id?: string;
};

const SIGNED_URL_TTL = 60 * 60 * 24 * 365; // 1 year

async function withSignedCover<T extends { coverImagePath?: string | null }>(
  rows: T[],
): Promise<Record<string, string>> {
  const paths = rows.map((r) => r.coverImagePath).filter((p): p is string => !!p);
  if (paths.length === 0) return {};
  const map: Record<string, string> = {};
  // createSignedUrls signs many at once
  const { data } = await supabase.storage
    .from("blog-assets")
    .createSignedUrls(paths, SIGNED_URL_TTL);
  data?.forEach((d) => {
    if (d.path && d.signedUrl) map[d.path] = d.signedUrl;
  });
  return map;
}

function formatDate(d: string): string {
  try {
    return new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

export async function fetchAllPosts(): Promise<UnifiedBlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch blog posts", error);
    return staticPosts.map((p) => ({ ...p, source: "static" as const }));
  }

  const rows = (data ?? []).map((r) => ({
    ...r,
    coverImagePath: r.cover_image_url as string | null,
  }));
  const signed = await withSignedCover(rows);

  const dbPosts: UnifiedBlogPost[] = rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    category: r.category,
    icon: r.icon,
    gradient: r.gradient,
    readTime: r.read_time,
    date: formatDate(r.published_at),
    sections: (r.content as unknown as BlogSection[]) ?? [],
    coverImageUrl: r.coverImagePath ? signed[r.coverImagePath] ?? null : null,
    source: "db",
  }));

  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  const fallback: UnifiedBlogPost[] = staticPosts
    .filter((p) => !dbSlugs.has(p.slug))
    .map((p) => ({ ...p, source: "static" as const }));

  return [...dbPosts, ...fallback];
}

export async function fetchPostBySlug(slug: string): Promise<UnifiedBlogPost | null> {
  const all = await fetchAllPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}