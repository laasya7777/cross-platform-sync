DROP POLICY "Anyone can create appointments" ON public.appointments;

CREATE POLICY "Anyone can create appointments"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 100
  AND length(phone) BETWEEN 5 AND 30
  AND length(email) BETWEEN 3 AND 255
  AND email ~* '^.+@.+\..+$'
  AND (reason IS NULL OR length(reason) <= 1000)
);