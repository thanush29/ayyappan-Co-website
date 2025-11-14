import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Building2, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { sendNotificationEmail } from '../lib/emailjs';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from('form_submissions').insert({
      form_type: 'contact',
      ...formData,
    });

    if (!error) {
      await sendNotificationEmail({
        to_name: 'Admin',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
        form_type: 'Contact Form',
        submitted_at: new Date().toLocaleString(),
      });
    }

    setSubmitting(false);

    if (!error) {
      setSubmitted(true);
      
      // Auto-send WhatsApp message
      const whatsappNumber = '919962056262'; // +91 99620 56262
      const whatsappMessage = `Hello! I'm ${formData.name} from ${formData.company || 'N/A'}.

📧 Email: ${formData.email}
📱 Phone: ${formData.phone || 'N/A'}

Message:
${formData.message}

---
Sent via Ayyappan & Co Contact Form`;

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappURL, '_blank');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Building2,
      title: 'Registered Office',
      details: [
        'No:5/255-G, E.B Colony',
        'A.Salaipudur, Kovilpatti',
        'Tamilnadu 628502, India',
        '+91 9442152528'
      ],
      color: '#0047FF',
    },
    {
      icon: MapPin,
      title: 'Office Address',
      details: [
        'No:5/107-D1, Meenakshi Nagar',
        '4th Street, A.Salaipudur',
        'Kovilpatti, Tamilnadu 628502',
        '04632-242528'
      ],
      color: '#7A00FF',
    },
    {
      icon: Building2,
      title: 'Chennai Headquarters',
      details: [
        'Old No.45, New No. 95',
        'Ground Floor, Poes Main Road',
        'Teynampet, Chennai - 600 018',
        '+91 99620 56262'
      ],
      color: '#00C853',
    },
    {
      icon: Mail,
      title: 'Email & Support',
      details: [
        'info@ayyappanco.com',
        'support@ayyappanco.com'
      ],
      color: '#FF6B00',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as any
      }
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Get In Touch
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Have a project in mind? Let's discuss how we can help power your infrastructure needs
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  transition: { duration: 0.3 }
                }}
                className="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300"
              >
                <motion.div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ 
                    backgroundColor: `${info.color}15`,
                    boxShadow: `0 4px 12px ${info.color}20`
                  }}
                >
                  <info.icon size={26} style={{ color: info.color }} />
                </motion.div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors">
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p 
                      key={idx} 
                      className="text-sm text-gray-600 leading-relaxed"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form and Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-2">We'll respond within 24 hours</p>
              <div className="flex items-center gap-2 mb-8 text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                <MessageCircle size={16} />
                <span className="font-medium">Form submission will auto-open WhatsApp</span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <div className="text-green-600 text-xl font-semibold mb-2">Message Sent Successfully!</div>
                  <p className="text-green-700 mb-3">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                    <MessageCircle size={16} />
                    <span>WhatsApp opened in new tab</span>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all duration-300"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting || !formData.name || !formData.email || !formData.message}
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,71,255,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message & Open WhatsApp
                        <MessageCircle size={18} />
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-full min-h-[600px] lg:sticky lg:top-24"
            >
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200 bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31511.274362337303!2d77.847878!3d9.162655!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06b3993a3f6e67%3A0x76c5001d524bff58!2sAyyappan%20%26%20Co!5e0!3m2!1sen!2sin!4v1762699277803!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ayyappan & Co Location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg text-white p-12 md:p-16 rounded-3xl border border-white/10 shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Our team is ready to discuss your power infrastructure needs and provide customized solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:+919442152528"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 50px rgba(0,71,255,0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300"
              >
                <Phone size={24} />
                Call Us Now
              </motion.a>
              <motion.a
                href="https://wa.me/919962056262"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 50px rgba(37,211,102,0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300"
              >
                <MessageCircle size={24} />
                WhatsApp Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}