import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import AboutSection from '../components/AboutSection';
import ArticlesSection from '../components/ArticlesSection';
import BoardSection from '../components/BoardSection';
import UpcomingEvents from '../components/UpcomingEvents';
import PastEventsSection from '../components/PastEventsSection';
import ActionButtons from '../components/ActionButtons';
import PartnerForm from '../components/PartnerForm';
import Navbar from '../components/Navbar';
import { useScroll } from '../components/ScrollContext';

function Home() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // ✅ Scroll to anchor section on page load (when navigated via "/#about" etc.)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100); // allow rendering first
      }
    }
  }, []);

  const { targetId, setTargetId } = useScroll();

useEffect(() => {
  if (targetId) {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setTargetId(null); // reset after scrolling
    }
  }
}, [targetId, setTargetId]);


  return (
    <div className="font-sans text-gray-800">
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Imarika Foundation - Empowering communities through education, health, environmental conservation, agribusiness, and disaster response." />
        <meta name="author" content="Imarika Foundation" />
        <meta name="keywords" content="Imarika Foundation, Imarika, Foundation, Scholarships" />
        <title>Imarika Foundation</title>
      </Helmet>

      <Navbar toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />

      {/* Hero Section */}
      <section className="bg-blue-50 text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">Empowering Communities</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Together we can build a better future through education, health, and sustainability.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#get-involved"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Get Involved
            </a>
            <a
              href="#programs"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100 transition"
            >
              Our Programs
            </a>
          </div>
        </div>
      </section>

      <AboutSection />
      <BoardSection />

      {/* Programs */}
      <section id="programs" className="py-16 px-6 bg-gray-50 scroll-mt-20">
        <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">Our Foundation</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { title: "Our Mission", desc: "To partner with individuals, communities, and organizations to enhance access to equitable opportunities for the disadvantaged." },
            { title: "Our Vision", desc: "Secure, empowered, resilient, and transformed communities." },
            { title: "Our Goal", desc: "To provide access to sustainable development for people from disadvantaged backgrounds." },
          ].map((prog, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-blue-700">{prog.title}</h3>
              <p className="text-gray-600">{prog.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <ArticlesSection />
      <UpcomingEvents />
      <PastEventsSection />
      <ActionButtons />
      <PartnerForm />

      {/* Contact */}
        <section
          id="contact"
          className="py-16 px-6 bg-white scroll-mt-[100px]"
          >

        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Contact Us</h2>

        <div className="max-w-4xl mx-auto text-center text-gray-600 space-y-6">
          {/* Google Map Embed */}
          <div className="w-full h-64 rounded overflow-hidden shadow-lg">
            <iframe
              title="Imarika Foundation Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.312996912001!2d39.8518343152642!3d-3.631753299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x183fdd7a32997dad%3A0xc18694330c9212fa!2sImarika%20Sacco!5e0!3m2!1sen!2ske!4v1685205123456!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact details */}
          <p>Get in touch with us to learn more about our initiatives and how you can help.</p>
          <p><strong>Imarika DT Sacco Plaza, Kilifi</strong></p>

          <div className="mt-10 text-center space-y-4">
            <p className="text-lg text-gray-700 flex items-center justify-center gap-2">
              <FaPhoneAlt className="text-blue-600" />
              <span>
                Phone: <a href="tel:+254790289989" className="text-blue-600 hover:underline">0790 289 989</a>
              </span>
            </p>

            <p className="text-lg text-gray-700 flex items-center justify-center gap-2">
              <FaEnvelope className="text-orange-500" />
              <span>
                Email: <a href="mailto:info@imarikafoundation.org" className="text-blue-600 hover:underline">info@imarikafoundation.org</a>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-6 text-2xl">
              <a href="https://www.facebook.com/profile.php?id=100081154223367" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500"><FaFacebookF /></a>
              <a href="https://x.com/ImarikaF2023" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><FaXTwitter /></a>
              <a href="https://www.instagram.com/foundation_imarika_" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/imarika-foundation-88a645253/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300"><FaLinkedin /></a>
              <a href="https://www.youtube.com/@imarikafoundation" target="_blank" rel="noopener noreferrer" className="hover:text-red-500"><FaYoutube /></a>
            </div>
          </div>

          <hr className="border-gray-600 my-4" />
          <p className="text-sm">&copy; {new Date().getFullYear()} Imarika Foundation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
