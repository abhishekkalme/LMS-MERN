import React from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "../Common/Breadcrumbs";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

function TermsOfService() {
  return (
    <div className="flex flex-col min-h-[100dvh] overflow-hidden text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-4 relative z-10">
        <Breadcrumbs items={[{ label: "Terms of Service" }]} />
      </div>

      <section className="relative max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Background Glows */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

        <motion.div {...fadeUp} className="relative z-10 space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Terms of Service</h1>
            <p className="text-gray-500 dark:text-indigo-100/60">Last updated: January 30, 2026</p>
          </div>

          <div className="space-y-12 text-gray-700 dark:text-indigo-100/80 leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Learnify System ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use the Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Description of Service</h2>
              <p>
                Learnify System provides academic resources, including notes, syllabus, and exam preparation materials for RGPV students. We reserve the right to modify or discontinue the Service at any time without notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. User Conduct</h2>
              <p>
                You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, or impair the Service. Prohibited activities include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Uploading malicious code or spam</li>
                <li>Harassing or bullying other users</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Using the Service for unauthorized commercial purposes</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. User Content</h2>
              <p>
                You retain ownership of any content you upload to the Service. However, by uploading content, you grant us a non-exclusive, worldwide, royalty-free license to use, store, and display that content in connection with the Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Intellectual Property</h2>
              <p>
                The Service and its original content (excluding user-provided content), features, and functionality are owned by Learnify System and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Termination</h2>
              <p>
                We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">7. Limitation of Liability</h2>
              <p>
                In no event shall Learnify System be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">8. Disclaimer</h2>
              <p>
                The materials on the Service are provided on an 'as is' basis. We make no warranties, expressed or implied, regarding the accuracy or reliability of the materials.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">9. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. By continuing to use the Service after changes are made, you agree to the updated Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">11. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
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

export default TermsOfService;
