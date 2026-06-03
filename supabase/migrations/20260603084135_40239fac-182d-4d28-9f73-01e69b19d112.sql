CREATE POLICY "Anyone can view blog assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-assets');

CREATE POLICY "Admins can upload blog assets"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'blog-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog assets"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'blog-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog assets"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'blog-assets' AND public.has_role(auth.uid(), 'admin'));