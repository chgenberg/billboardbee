'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Billboard } from '../types/billboard';

const MapWithBees = dynamic(() => import('../components/MapWithBees'), { ssr: false });

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [billboards, setBillboards] = useState<Billboard[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    { icon: '📍', label: 'ADRESS', value: 'Drottninggatan 12, Stockholm' },
    { icon: '✉️', label: 'E-POST', value: 'info@billboardbee.se' },
    { icon: '📱', label: 'TELEFON', value: '08-123 45 67' },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.65 0-1.29-.04-1.92-.11A12.13 12.13 0 0 0 7.29 21.5c8.07 0 12.5-6.68 12.5-12.48 0-.19 0-.37-.01-.56A8.8 8.8 0 0 0 24 4.59a8.5 8.5 0 0 1-2.54.7z' },
    { name: 'LinkedIn', icon: 'M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z' },
    { name: 'Instagram', icon: 'M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.212 15.634 2.2 15.25 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07 5.77.128 4.87.312 4.13.54c-.82.25-1.5.58-2.18 1.26-.68.68-1.01 1.36-1.26 2.18-.228.74-.412 1.64-.47 2.92C.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.28.242 2.18.47 2.92.25.82.58 1.5 1.26 2.18.68.68 1.36 1.01 2.18 1.26.74.228 1.64.412 2.92.47C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.28-.058 2.18-.242 2.92-.47.82-.25 1.5-.58 2.18-1.26.68-.68 1.01-1.36 1.26-2.18.228-.74.412-1.64.47-2.92.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.28-.242-2.18-.47-2.92-.25-.82-.58-1.5-1.26-2.18-.68-.68-1.36-1.01-2.18-1.26-.74-.228-1.64-.412-2.92-.47C15.668.012 15.264 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.844-10.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z' },
    { name: 'Facebook', icon: 'M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0' }
  ];

  useEffect(() => {
    const fetchBillboards = async () => {
      try {
        const response = await fetch('/api/billboards');
        const data = await response.json();
        const billboards: Billboard[] = Array.isArray(data) ? data : data.billboards || [];
        const mapped = billboards
          .filter(b => typeof b.latitude === 'number' && typeof b.longitude === 'number')
          .map(b => ({ ...b, lat: b.latitude, lng: b.longitude }));
        // Lägg till kontorsmarkör
        mapped.push({
          id: 'office',
          title: 'BillboardBee HQ',
          location: 'Drottninggatan 12, Stockholm',
          latitude: 59.3325806,
          longitude: 18.0649031,
          lat: 59.3325806,
          lng: 18.0649031,
          isOffice: true
        });
        setBillboards(mapped);
      } catch (e) {
        setBillboards([]);
      }
    };
    fetchBillboards();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-light text-gray-900 mb-4 tracking-tight uppercase"
          >
            KONTAKTA OSS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 font-light"
          >
            Vi finns här för att hjälpa dig hitta den perfekta reklamplatsen
          </motion.p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-light text-gray-900 mb-8 uppercase tracking-wide">
              KONTAKTINFORMATION
            </h2>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="text-2xl">{info.icon}</span>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      {info.label}
                    </p>
                    <p className="text-gray-900">
                      {info.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <h3 className="text-lg font-light text-gray-900 mb-4 uppercase tracking-wide">
                FÖLJ OSS
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-white transition-all duration-300 text-gray-600"
                    aria-label={social.name}
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-light text-gray-900 mb-8 uppercase tracking-wide">
              SKICKA ETT MEDDELANDE
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Ditt namn"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-gray-900"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Din e-postadress"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-gray-900"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  placeholder="Ditt meddelande..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 resize-none text-gray-900"
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
              >
                {isSubmitting ? 'SKICKAR...' : 'SKICKA MEDDELANDE'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 uppercase tracking-wide">
              KARTA
            </h2>
            <p className="text-base text-gray-600 mb-6">Se alla lediga skyltar på kartan – klicka på en bi-symbol för mer info</p>
          </motion.div>
          <div className="rounded-3xl shadow-2xl overflow-hidden border-4 border-orange-100 bg-white" style={{ minHeight: 480, height: '60vh' }}>
            <MapWithBees billboards={billboards} />
          </div>
        </div>
      </section>
    </div>
  );
} 