import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InfluencerCard from '../components/shared/InfluencerCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSliders } from '@fortawesome/free-solid-svg-icons'

export default function Influencers() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNiche, setSelectedNiche] = useState('')
  const [priceRange, setPriceRange] = useState([0, 1000])

  // Mock data
  const allInfluencers = [
    { id: 1, name: 'Sarah Johnson', niche: 'Fashion & Lifestyle', followers: '250K', engagement: 8.5, rating: 4.8, price: 500, image: 'https://via.placeholder.com/300x200?text=Sarah' },
    { id: 2, name: 'Alex Chen', niche: 'Tech & Gadgets', followers: '180K', engagement: 7.2, rating: 4.7, price: 450, image: 'https://via.placeholder.com/300x200?text=Alex' },
    { id: 3, name: 'Emma Davis', niche: 'Beauty & Wellness', followers: '320K', engagement: 9.1, rating: 4.9, price: 600, image: 'https://via.placeholder.com/300x200?text=Emma' },
    { id: 4, name: 'John Smith', niche: 'Sports & Fitness', followers: '150K', engagement: 8.8, rating: 4.6, price: 550, image: 'https://via.placeholder.com/300x200?text=John' },
    { id: 5, name: 'Lisa Chen', niche: 'Food & Travel', followers: '280K', engagement: 7.9, rating: 4.8, price: 650, image: 'https://via.placeholder.com/300x200?text=Lisa' },
    { id: 6, name: 'Mike Johnson', niche: 'Fashion & Lifestyle', followers: '190K', engagement: 8.2, rating: 4.7, price: 480, image: 'https://via.placeholder.com/300x200?text=Mike' },
  ]

  const filteredInfluencers = allInfluencers.filter(inf => {
    const matchesSearch = inf.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         inf.niche.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesNiche = !selectedNiche || inf.niche === selectedNiche
    const matchesPrice = inf.price >= priceRange[0] && inf.price <= priceRange[1]
    return matchesSearch && matchesNiche && matchesPrice
  })

  const niches = [...new Set(allInfluencers.map(inf => inf.niche))]

  return (
    <div className="min-h-screen bg-cream-white py-12">
      <div className="container-custom">
        <h1 className="text-5xl font-vintage font-bold text-navy-blue mb-4">Find Your Perfect Influencer</h1>
        <p className="text-muted-taupe mb-12 text-lg">Browse our collection of verified influencers</p>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-navy-blue mb-2">Search</label>
              <div className="relative">
                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-muted-taupe" />
                <input
                  type="text"
                  placeholder="Search influencers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-light-beige rounded-lg focus:outline-none focus:border-vintage-gold"
                />
              </div>
            </div>

            {/* Niche Filter */}
            <div>
              <label className="block text-sm font-semibold text-navy-blue mb-2">Niche</label>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="w-full px-4 py-2 border border-light-beige rounded-lg focus:outline-none focus:border-vintage-gold"
              >
                <option value="">All Niches</option>
                {niches.map(niche => (
                  <option key={niche} value={niche}>{niche}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold text-navy-blue mb-2">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-20 px-2 py-2 border border-light-beige rounded-lg focus:outline-none focus:border-vintage-gold"
                  placeholder="Min"
                />
                <input
                  type="number"
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-20 px-2 py-2 border border-light-beige rounded-lg focus:outline-none focus:border-vintage-gold"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-taupe">Showing <span className="font-bold text-navy-blue">{filteredInfluencers.length}</span> influencers</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInfluencers.map(influencer => (
            <InfluencerCard 
              key={influencer.id}
              influencer={influencer}
              onBook={(id) => navigate(`/booking?influencer=${id}`)}
            />
          ))}
        </div>

        {filteredInfluencers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-taupe mb-4">No influencers found matching your criteria</p>
            <button 
              onClick={() => {
                setSearchTerm('')
                setSelectedNiche('')
                setPriceRange([0, 1000])
              }}
              className="text-vintage-gold hover:underline font-semibold"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
