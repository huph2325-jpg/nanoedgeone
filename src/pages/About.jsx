import Button from '../components/shared/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faTrophy, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'

export default function About() {
  return (
    <div className="min-h-screen bg-cream-white py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-vintage font-bold text-navy-blue mb-4">About NanoEdge</h1>
          <p className="text-xl text-muted-taupe">Empowering SMEs and Influencers to make meaningful connections</p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="card">
            <h2 className="text-3xl font-bold text-navy-blue mb-4">Our Mission</h2>
            <p className="text-muted-taupe leading-relaxed">
              To simplify influencer marketing by creating a transparent, efficient platform that connects SMEs with authentic influencers. We believe in fostering genuine partnerships that benefit both brands and content creators.
            </p>
          </div>
          <div className="card">
            <h2 className="text-3xl font-bold text-navy-blue mb-4">Our Vision</h2>
            <p className="text-muted-taupe leading-relaxed">
              To become the leading marketplace for influencer collaborations in Southeast Asia, where businesses of all sizes can access verified influencers and create campaigns that truly resonate with their audiences.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-navy-blue text-cream-white rounded-lg p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-vintage-gold mb-2">5K+</p>
              <p className="text-light-beige">Active Influencers</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-vintage-gold mb-2">2K+</p>
              <p className="text-light-beige">Happy Brands</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-vintage-gold mb-2">$50M+</p>
              <p className="text-light-beige">Total Campaigns</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="section-title text-center">Why Choose NanoEdge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-vintage-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-navy-blue mb-2">Verified Community</h3>
              <p className="text-muted-taupe">All influencers are thoroughly verified and authentic</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-vintage-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faTrophy} className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-navy-blue mb-2">Award-Winning Platform</h3>
              <p className="text-muted-taupe">Recognized for innovation in influencer marketing</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-vintage-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faGlobeAmericas} className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-navy-blue mb-2">Global Reach</h3>
              <p className="text-muted-taupe">Connect with influencers across multiple regions</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-light-beige rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-navy-blue mb-4">Have Questions?</h2>
          <p className="text-muted-taupe mb-6 text-lg">Get in touch with our support team</p>
          <Button variant="primary">Contact Us</Button>
        </div>
      </div>
    </div>
  )
}
