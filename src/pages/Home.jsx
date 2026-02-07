import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../components/shared/Button'
import InfluencerCard from '../components/shared/InfluencerCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default function HomePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

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
            {t('hero.title')}
          </h1>
          <p className="text-xl text-muted-taupe mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/influencers')}
              variant="primary"
              className="text-lg"
            >
              {t('hero.browse')}
            </Button>
            <Button 
              onClick={() => navigate('/auth/signup')}
              variant="secondary"
              className="text-lg"
            >
              {t('hero.join')}
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container-custom py-16">
        <h2 className="section-title text-center">{t('howItWorks.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: 1, title: t('howItWorks.step1'), desc: t('howItWorks.step1_desc') },
            { step: 2, title: t('howItWorks.step2'), desc: t('howItWorks.step2_desc') },
            { step: 3, title: t('howItWorks.step3'), desc: t('howItWorks.step3_desc') },
            { step: 4, title: t('howItWorks.step4'), desc: t('howItWorks.step4_desc') },
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
        <h2 className="section-title text-center">{t('featured.title')}</h2>
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
            {t('featured.viewAll')}
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-navy-blue text-cream-white py-16 my-16">
        <div className="container-custom">
          <h2 className="section-title text-center text-cream-white">{t('whyChoose.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t('whyChoose.verified'), desc: t('whyChoose.verified_desc') },
              { title: t('whyChoose.transparent'), desc: t('whyChoose.transparent_desc') },
              { title: t('whyChoose.seamless'), desc: t('whyChoose.seamless_desc') },
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
        <h2 className="text-4xl font-vintage font-bold text-navy-blue mb-6">{t('cta.title')}</h2>
        <p className="text-lg text-muted-taupe mb-8 max-w-2xl mx-auto">
          {t('cta.subtitle')}
        </p>
        <Button 
          onClick={() => navigate('/auth/signup')}
          variant="primary"
          className="text-lg"
        >
          {t('cta.button')}
        </Button>
      </section>
    </div>
  )
}
