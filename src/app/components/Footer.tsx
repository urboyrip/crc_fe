import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
      <footer className="w-full">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            {/* Logo */}
            <div className="mb-6 md:mb-0">
              <Image src="/Logo.png" alt="CRC Logo" width={120} height={40} />
            </div>
  
            {/* About */}
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="/about-us" className="text-gray-600 hover:text-teal-500">About us</a></li>
                <li><a href="/creators" className="text-gray-600 hover:text-teal-500">Creators</a></li>
                <li><a href="/philosophy" className="text-gray-600 hover:text-teal-500">Philosophy</a></li>
                <li><a href="/contact" className="text-gray-600 hover:text-teal-500">Contact us</a></li>
              </ul>
            </div>
  
            {/* Company */}
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/team" className="text-gray-600 hover:text-teal-500">Our team</a></li>
                <li><a href="/partners" className="text-gray-600 hover:text-teal-500">Partners</a></li>
                <li><a href="/faq" className="text-gray-600 hover:text-teal-500">FAQ</a></li>
                <li><a href="/blog" className="text-gray-600 hover:text-teal-500">Blog</a></li>
              </ul>
            </div>
  
            {/* Support */}
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="/email" className="text-gray-600 hover:text-teal-500">Email</a></li>
                <li><a href="/phone" className="text-gray-600 hover:text-teal-500">Phone</a></li>
                <li><a href="/address" className="text-gray-600 hover:text-teal-500">Address</a></li>
              </ul>
            </div>
  
            {/* Social Media */}
            <div>
  <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Media</h3>
  <div className="flex space-x-4">
    <a href="#" className="text-gray-600 hover:text-teal-500 text-xl">
      <FaFacebookF />
    </a>
    <a href="#" className="text-gray-600 hover:text-teal-500 text-xl">
      <FaInstagram />
    </a>
    <a href="#" className="text-gray-600 hover:text-teal-500 text-xl">
      <FaLinkedinIn />
    </a>
  </div>
</div>
          </div>
  
          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>
  
          {/* Copyright */}
          <div className="text-center text-gray-600">
            <p>Made by Bank Syariah Indonesia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;