import React from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "../Common/Breadcrumbs";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-[100dvh] overflow-hidden text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-4 relative z-10">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      </div>

      <section className="relative max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

        <motion.div {...fadeUp} className="relative z-10 space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Privacy Policy</h1>
            <p className="text-gray-500 dark:text-indigo-100/60">Last updated: January 30, 2026</p>
          </div>

          <div className="space-y-12 text-gray-700 dark:text-indigo-100/80 leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when you create an account, upload content, or communicate with us. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal identifiers (name, email address, username)</li>
                <li>Academic information (college, branch, semester)</li>
                <li>Content you upload (notes, syllabus, comments)</li>
                <li>Log data and usage information</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Personalize your experience and provide relevant content</li>
                <li>Communicate with you about updates, security, and support</li>
                <li>Analyze usage patterns to enhance our platform's functionality</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Information Sharing and Disclosure</h2>
              <p>
                We do not sell your personal information. We may share information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With your consent or at your direction</li>
                <li>With service providers who perform services on our behalf</li>
                <li>To comply with legal obligations or protect our rights</li>
                <li>In connection with a merger, sale, or acquisition</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Your Choices and Rights</h2>
              <p>
                You have the right to access, update, or delete your personal information. You can manage your account settings or contact us directly for assistance. You may also opt-out of receiving promotional communications.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our platform and store certain information. Cookies are small data files that are stored on your device.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">7. Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                <a href="mailto:abhishekkalme0@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  abhishekkalme0@gmail.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
