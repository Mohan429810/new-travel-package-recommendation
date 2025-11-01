import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css' 

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Brand / About */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Voyage</h2>
            <p className="text-sm leading-relaxed">
              Explore beautiful destinations, plan your trips easily, 
              and enjoy affordable packages with us.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-all"><i className="bi bi-house-door mr-2"></i>Home</a></li>
              <li><a href="/packages" className="hover:text-white transition-all"><i className="bi bi-bag-heart mr-2"></i>Packages</a></li>
              <li><a href="/about" className="hover:text-white transition-all"><i className="bi bi-info-circle mr-2"></i>About</a></li>
              <li><a href="/contact" className="hover:text-white transition-all"><i className="bi bi-envelope mr-2"></i>Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li><i className="bi bi-geo-alt mr-2"></i> Hyderabad, India</li>
              <li><i className="bi bi-telephone mr-2"></i> +91 98765 43210</li>
              <li><i className="bi bi-envelope-at mr-2"></i> info@voyage.com</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-blue-500"><i className="bi bi-facebook"></i></a>
              <a href="#" className="hover:text-sky-400"><i className="bi bi-twitter"></i></a>
              <a href="#" className="hover:text-pink-500"><i className="bi bi-instagram"></i></a>
              <a href="#" className="hover:text-blue-600"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} <span className="font-semibold text-white">Voyage</span>. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
