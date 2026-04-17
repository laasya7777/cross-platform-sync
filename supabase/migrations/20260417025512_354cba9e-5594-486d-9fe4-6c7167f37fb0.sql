CREATE TABLE public.appointments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  preferred_date date,
  preferred_time text,
  reason text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an appointment (public booking form)
CREATE POLICY "Anyone can create appointments"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users can view appointments
CREATE POLICY "Authenticated users can view appointments"
ON public.appointments
FOR SELECT
TO authenticated
USING (true);