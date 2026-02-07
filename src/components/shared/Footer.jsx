import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer className="bg-navy-blue text-cream-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-vintage text-xl font-bold mb-4 text-vintage-gold">NanoEdge</h3>
            <p className="text-light-beige text-sm leading-relaxed">
              Connecting brands with influencers for meaningful collaborations
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-vintage-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-vintage-gold transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-vintage-gold transition">About</Link></li>
              <li><Link to="/influencers" className="hover:text-vintage-gold transition">Influencers</Link></li>
              <li><Link to="/contact" className="hover:text-vintage-gold transition">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-vintage-gold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="hover:text-vintage-gold transition">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-vintage-gold transition">Privacy Policy</Link></li>
              <li><a href="#" className="hover:text-vintage-gold transition">Cookies</a></li>
              <li><a href="#" className="hover:text-vintage-gold transition">Disclaimer</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4 text-vintage-gold">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-vintage-gold transition text-xl"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="#" className="hover:text-vintage-gold transition text-xl"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#" className="hover:text-vintage-gold transition text-xl"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#" className="hover:text-vintage-gold transition text-xl"><FontAwesomeIcon icon={faLinkedin} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-muted-taupe pt-8">
          <p className="text-center text-light-beige text-sm">
            © 2026 NanoEdge. All rights reserved. Built with ❤️ for influencer marketing.
          </p>
        </div>
      </div>
    </footer>
  )
}
