import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";
import { z } from "https://esm.sh/zod@3.23.8";

const ADMIN_EMAIL = "kbob981975@gmail.com";

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(5).max(30),
  email: z.string().trim().email().max(255),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
  reason: z.string().trim().max(1000).optional(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const a = parsed.data;
    const subject = `New appointment request — ${a.name}`;
    const dateLine = a.preferred_date
      ? `${a.preferred_date}${a.preferred_time ? " at " + a.preferred_time : ""}`
      : "Not specified";

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <h2 style="color:#0a1f44; font-family: Georgia, serif; margin: 0 0 16px;">
          New Appointment Request
        </h2>
        <p style="color:#475569; margin: 0 0 20px;">A new appointment has been submitted on the website.</p>
        <table style="width:100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding:8px 0; color:#64748b;">Name</td><td style="padding:8px 0; color:#0f172a;"><strong>${escape(a.name)}</strong></td></tr>
          <tr><td style="padding:8px 0; color:#64748b;">Phone</td><td style="padding:8px 0; color:#0f172a;">${escape(a.phone)}</td></tr>
          <tr><td style="padding:8px 0; color:#64748b;">Email</td><td style="padding:8px 0; color:#0f172a;">${escape(a.email)}</td></tr>
          <tr><td style="padding:8px 0; color:#64748b;">Preferred</td><td style="padding:8px 0; color:#0f172a;">${escape(dateLine)}</td></tr>
          ${a.reason ? `<tr><td style="padding:8px 0; color:#64748b; vertical-align:top;">Reason</td><td style="padding:8px 0; color:#0f172a;">${escape(a.reason)}</td></tr>` : ""}
        </table>
        <p style="color:#94a3b8; font-size:12px; margin-top:24px;">
          This message was sent from the Dr J Sumanth Reddy website appointment form.
        </p>
      </div>
    `;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.warn("LOVABLE_API_KEY missing — skipping email send");
      return new Response(JSON.stringify({ success: true, emailed: false }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Try to send via Lovable Email API
    const res = await fetch("https://api.lovable.dev/v1/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        to: ADMIN_EMAIL,
        subject,
        html,
        reply_to: a.email,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`Email send failed [${res.status}]: ${errText}`);
      // Don't fail the whole request — appointment is already saved in DB
      return new Response(
        JSON.stringify({ success: true, emailed: false, reason: "email_provider_error" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ success: true, emailed: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("notify-admin-appointment error:", err);
    const msg = err instanceof Error ? err.message : "unknown";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
