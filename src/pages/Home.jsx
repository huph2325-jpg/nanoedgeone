import { useNavigate } from 'react-router-dom'
import Button from '../components/shared/Button'
import InfluencerCard from '../components/shared/InfluencerCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default function HomePage() {
  const navigate = useNavigate()

  // Mock data
  const featuredInfluencers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      niche: 'Fashion & Lifestyle',
      followers: '250K',
      engagement: 8.5,
      rating: 4.8,
      price: 500,
      image: 'https://via.placeholder.com/300x200?text=Influencer+1'
    },
    {
      id: 2,
      name: 'Alex Chen',
      niche: 'Tech & Gadgets',
      followers: '180K',
      engagement: 7.2,
      rating: 4.7,
      price: 450,
      image: 'https://via.placeholder.com/300x200?text=Influencer+2'
    },
    {
      id: 3,
      name: 'Emma Davis',
      niche: 'Beauty & Wellness',
      followers: '320K',
      engagement: 9.1,
      rating: 4.9,
      price: 600,
      image: 'https://via.placeholder.com/300x200?text=Influencer+3'
    },
  ]

  const handleBooking = (id) => {
    navigate(`/booking?influencer=${id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-white via-white to-light-beige">
      {/* Hero Section */}
      <section className="container-custom py-20 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-vintage font-bold text-navy-blue mb-6 leading-tight">
            Connect with Influencers, Grow Your Brand
          </h1>
          <p className="text-xl text-muted-taupe mb-8">
            NanoEdge brings together SMEs and influencers for authentic collaborations that drive real results
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/influencers')}
              variant="primary"
              className="text-lg"
            >
              Browse Influencers
            </Button>
            <Button 
              onClick={() => navigate('/auth/signup')}
              variant="secondary"
              className="text-lg"
            >
              Join as Influencer
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container-custom py-16">
        <h2 className="section-title text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: 1, title: 'Browse', desc: 'Explore our curated influencer marketplace' },
            { step: 2, title: 'Connect', desc: 'Find the perfect match for your campaign' },
            { step: 3, title: 'Collaborate', desc: 'Work together on authentic content' },
            { step: 4, title: 'Measure', desc: 'Track results and ROI' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="bg-vintage-gold text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {item.step}
              </div>
              <h3 className="font-bold text-lg text-navy-blue mb-2">{item.title}</h3>
              <p className="text-muted-taupe">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Influencers */}
      <section className="container-custom py-16">
        <h2 className="section-title text-center">Featured Influencers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredInfluencers.map((influencer) => (
            <InfluencerCard 
              key={influencer.id} 
              influencer={influencer}
              onBook={handleBooking}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button 
            onClick={() => navigate('/influencers')}
            variant="outline"
          >
            View All Influencers
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-navy-blue text-cream-white py-16 my-16">
        <div className="container-custom">
          <h2 className="section-title text-center text-cream-white">Why Choose NanoEdge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Verified Influencers', desc: 'All influencers are vetted and authentic' },
              { title: 'Transparent Pricing', desc: 'No hidden fees, fair rates for everyone' },
              { title: 'Seamless Booking', desc: 'Easy-to-use platform for hassle-free collaboration' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <FontAwesomeIcon icon={faCheckCircle} className="text-vintage-gold text-2xl flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-light-beige">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-20 text-center">
        <h2 className="text-4xl font-vintage font-bold text-navy-blue mb-6">Ready to Start?</h2>
        <p className="text-lg text-muted-taupe mb-8 max-w-2xl mx-auto">
          Join thousands of brands and influencers using NanoEdge to create authentic partnerships
        </p>
        <Button 
          onClick={() => navigate('/auth/signup')}
          variant="primary"
          className="text-lg"
        >
          Get Started Today
        </Button>
      </section>
    </div>
  )
}
