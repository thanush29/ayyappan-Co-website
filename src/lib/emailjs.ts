import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export interface EmailParams {
  to_name: string;
  from_name: string;
  from_email: string;
  phone?: string;
  company?: string;
  message: string;
  form_type: string;
  service_name?: string;
  budget?: string;
  submitted_at: string;
}

export async function sendNotificationEmail(params: EmailParams): Promise<{ success: boolean; error?: string }> {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.warn('EmailJS not configured. Skipping email notification.');
    return { success: true };
  }

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      params,
      EMAILJS_PUBLIC_KEY
    );
    return { success: true };
  } catch (error: any) {
    console.error('Failed to send email notification:', error);
    return { success: false, error: error.message || 'Email send failed' };
  }
}
