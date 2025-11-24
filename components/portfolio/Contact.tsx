'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');

      toast.success('Message sent successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden bg-[#111111]">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-lg text-gray-400">
            Have a project in mind? Let’s work together to create something amazing.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-400  font-bold">Name</Label>                            
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-transparent border-gray-700  focus:border-cyan-500 text-white rounded-2xl"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-400">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-transparent border-gray-700 focus:border-cyan-500 text-white rounded-2xl"
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-400">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-transparent border-gray-700 focus:border-cyan-500 text-white rounded-2xl resize-none"
                  placeholder="Your message"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full  bg-gray-800/20 border border-gray-700/50 hover:text-green-500 transition-colors rounded-xl  py-3"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 w-full max-w-md"
          >
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 bg-gray-800/20 border border-gray-700/50" />
                  </div>
                  <span className="text-gray-300">j.jaswanth@icloud.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 bg-gray-800/20 border border-gray-700/50" />
                  </div>
                  <span className="text-gray-300">+919701445846</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 bg-gray-800/20 border border-gray-700/50" />
                  </div>
                  <span className="text-gray-300">Kothagudem</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}