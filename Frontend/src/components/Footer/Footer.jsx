import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  GraduationCap
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/abhishek-kalme-289a7430a/", color: "hover:text-[#0077B5]" },
    { icon: Github, href: "https://github.com/abhishekkalme", color: "hover:text-gray-900 dark:hover:text-white" },
    { icon: Twitter, href: "https://x.com/Abhishek_kalme", color: "hover:text-[#1DA1F2]" },
    { icon: Facebook, href: "https://www.facebook.com/", color: "hover:text-[#1877F2]" },
    { icon: Instagram, href: "https://www.instagram.com/", color: "hover:text-[#E1306C]" },
  ];

  return (
    <footer className="relative  border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B0F1A] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <motion.div {...fadeUp} className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-600 dark:bg-white/10">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Learnify<span className="text-indigo-600 dark:text-indigo-400">System</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-indigo-100/60 text-sm leading-relaxed">
              Empowering RGPV students with unit-wise notes, exam-focused preparation, and verified syllabus. Study with clarity, not chaos.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className={`p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-400 transition-colors ${social.color}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Explore
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "Syllabus", path: "/syllabus" },
                { name: "Notes", path: "/notes" },
                { name: "About Us", path: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="text-sm text-gray-600 dark:text-indigo-100/60 hover:text-indigo-600 dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-indigo-500 mt-0.5" />
                <a href="mailto:abhishekkalme0@gmail.com" className="text-sm text-gray-600 dark:text-indigo-100/60 hover:text-indigo-600 dark:hover:text-white transition-colors">
                  abhishekkalme0@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-indigo-500 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-indigo-100/60">
                  Update Soon
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-indigo-500 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-indigo-100/60">
                  Update Soon
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Newsletter
            </h3>
            <p className="text-sm text-gray-600 dark:text-indigo-100/60">
              Get updates on new study materials and exam tips.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 focus:outline-none dark:text-white text-sm transition-all"
              />
              <button className="absolute right-2 top-2 p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                <Send size={18} />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-indigo-100/40">
            &copy; {currentYear} Learnify System. All rights reserved.
          </p>
          <div className="flex gap-6">
            <NavLink to="/privacy-policy" className="text-xs text-gray-500 dark:text-indigo-100/40 hover:text-indigo-600 dark:hover:text-white transition-colors">Privacy Policy</NavLink>
            <NavLink to="/terms-of-service" className="text-xs text-gray-500 dark:text-indigo-100/40 hover:text-indigo-600 dark:hover:text-white transition-colors">Terms of Service</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

