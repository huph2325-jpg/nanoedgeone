import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import InfluencerCard from '../components/shared/InfluencerCard'
import Button from '../components/shared/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSliders, faTimes, faFilter } from '@fortawesome/free-solid-svg-icons'

export default function Influencers() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNiche, setSelectedNiche] = useState('')
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [minEngagement, setMinEngagement] = useState(0)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('popularity')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [isLoading] = useState(false)

  // Extended mock data with more influencers
  const allInfluencers = [
    { id: 1, name: 'Sarah Johnson', niche: 'Fashion & Lifestyle', followers: '250K', engagement: 8.5, rating: 4.8, price: 500, image: 'https://via.placeholder.com/300x200?text=Sarah', verified: true, posts: 1240 },
    { id: 2, name: 'Alex Chen', niche: 'Tech & Gadgets', followers: '180K', engagement: 7.2, rating: 4.7, price: 450, image: 'https://via.placeholder.com/300x200?text=Alex', verified: true, posts: 856 },
    { id: 3, name: 'Emma Davis', niche: 'Beauty & Wellness', followers: '320K', engagement: 9.1, rating: 4.9, price: 600, image: 'https://via.placeholder.com/300x200?text=Emma', verified: true, posts: 1520 },
    { id: 4, name: 'John Smith', niche: 'Sports & Fitness', followers: '150K', engagement: 8.8, rating: 4.6, price: 550, image: 'https://via.placeholder.com/300x200?text=John', verified: false, posts: 728 },
    { id: 5, name: 'Lisa Chen', niche: 'Food & Travel', followers: '280K', engagement: 7.9, rating: 4.8, price: 650, image: 'https://via.placeholder.com/300x200?text=Lisa', verified: true, posts: 1089 },
    { id: 6, name: 'Mike Johnson', niche: 'Fashion & Lifestyle', followers: '190K', engagement: 8.2, rating: 4.7, price: 480, image: 'https://via.placeholder.com/300x200?text=Mike', verified: true, posts: 945 },
    { id: 7, name: 'Rachel Lee', niche: 'Beauty & Wellness', followers: '210K', engagement: 8.6, rating: 4.8, price: 520, image: 'https://via.placeholder.com/300x200?text=Rachel', verified: true, posts: 1102 },
    { id: 8, name: 'David Brown', niche: 'Tech & Gadgets', followers: '175K', engagement: 7.8, rating: 4.6, price: 420, image: 'https://via.placeholder.com/300x200?text=David', verified: false, posts: 632 },
    { id: 9, name: 'Jessica White', niche: 'Food & Travel', followers: '295K', engagement: 8.3, rating: 4.9, price: 680, image: 'https://via.placeholder.com/300x200?text=Jessica', verified: true, posts: 1456 },
    { id: 10, name: 'Tom Anderson', niche: 'Sports & Fitness', followers: '220K', engagement: 8.9, rating: 4.7, price: 580, image: 'https://via.placeholder.com/300x200?text=Tom', verified: true, posts: 1123 },
    { id: 11, name: 'Nina Patel', niche: 'Fashion & Lifestyle', followers: '305K', engagement: 7.5, rating: 4.8, price: 720, image: 'https://via.placeholder.com/300x200?text=Nina', verified: true, posts: 1789 },
    { id: 12, name: 'Chris Green', niche: 'Tech & Gadgets', followers: '195K', engagement: 8.1, rating: 4.8, price: 490, image: 'https://via.placeholder.com/300x200?text=Chris', verified: true, posts: 876 },
  ]

  // Filter and sort logic
  const filteredInfluencers = useMemo(() => {
    let result = allInfluencers.filter(inf => {
      const matchesSearch = inf.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           inf.niche.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesNiche = !selectedNiche || inf.niche === selectedNiche
      const matchesPrice = inf.price >= priceRange[0] && inf.price <= priceRange[1]
      const matchesEngagement = inf.engagement >= minEngagement
      const matchesRating = inf.rating >= minRating
      
      return matchesSearch && matchesNiche && matchesPrice && matchesEngagement && matchesRating
    })

    // Apply sorting
    switch(sortBy) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price_high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'engagement':
        result.sort((a, b) => b.engagement - a.engagement)
        break
      case 'followers':
        result.sort((a, b) => {
          const aFollowers = parseInt(a.followers)
          const bFollowers = parseInt(b.followers)
          return bFollowers - aFollowers
        })
        break
      case 'popularity':
      default:
        result.sort((a, b) => b.followers.localeCompare(a.followers))
    }

    return result
  }, [searchTerm, selectedNiche, priceRange, minEngagement, minRating, sortBy])

  const niches = [...new Set(allInfluencers.map(inf => inf.niche))]

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedNiche('')
    setPriceRange([0, 2000])
    setMinEngagement(0)
    setMinRating(0)
    setSortBy('popularity')
  }

  const hasActiveFilters = searchTerm || selectedNiche || priceRange[0] > 0 || priceRange[1] < 2000 || minEngagement > 0 || minRating > 0

  return (
    <div className="min-h-screen bg-cream-white py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-vintage font-bold text-navy-blue mb-3">
            Find Your Perfect Influencer
          </h1>
          <p className="text-muted-taupe text-lg">
            Browse and connect with {allInfluencers.length}+ verified influencers across different niches
          </p>
        </div>

        {/* Main Filter Section */}
        <div className="bg-white rounded-lg shadow-sm mb-8 border border-light-beige overflow-hidden">
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <div>
                <label className="block text-xs font-semibold text-navy-blue mb-2 uppercase tracking-wide">
                  <FontAwesomeIcon icon={faSearch} className="mr-2 text-vintage-gold" />
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Name or niche..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2.5 border border-light-beige rounded-lg focus:outline-none focus:border-vintage-gold focus:ring-1 focus:ring-vintage-gold transition-all"
                />
              </div>

              {/* Niche Filter */}
              <div>
                <label className="block text-xs font-semibold text-navy-blue mb-2 uppercase tracking-wide">
                  Niche Category
                </label>
                <select
                  value={selectedNiche}
                  onChange={(e) => setSelectedNiche(e.target.value)}
                  className="w-full px-3 py-2.5 border border-light-beige rounded-lg focus:outline-none focus:border-vintage-gold focus:ring-1 focus:ring-vintage-gold transition-all bg-white"
                >
                  <option value="">All Niches</option>
                  {niches.map(niche => (
                    <option key={niche} value={niche}>{niche}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-semibold text-navy-blue mb-2 uppercase tracking-wide">
                  Price Range (${priceRange[0]} - ${priceRange[1]})
                </label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full cursor-pointer"
                />
              </div>

              {/* Sort */}
              <div>
                <label className="block text-xs font-semibold text-navy-blue mb-2 uppercase tracking-wide">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2.5 border border-light-beige rounded-lg focus:outline-none focus:border-vintage-gold focus:ring-1 focus:ring-vintage-gold transition-all bg-white"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                  <option value="engagement">Best Engagement</option>
                  <option value="followers">Most Followers</option>
                </select>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-light-beige">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2 text-vintage-gold hover:text-vintage-gold/80 font-semibold transition-colors"
              >
                <FontAwesomeIcon icon={faFilter} />
                {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
              </button>
              
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-2 text-muted-taupe hover:text-navy-blue font-semibold transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} />
                  Reset All
                </button>
              )}
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="mt-4 pt-4 border-t border-light-beige grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-blue mb-2">
                    Min. Engagement Rate: {minEngagement}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={minEngagement}
                    onChange={(e) => setMinEngagement(Number(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-blue mb-2">
                    Min. Rating: {minRating}/5
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-muted-taupe">
              Showing <span className="font-bold text-navy-blue text-lg">{filteredInfluencers.length}</span> result{filteredInfluencers.length !== 1 ? 's' : ''} from <span className="font-bold text-navy-blue">{allInfluencers.length}</span> influencers
            </p>
          </div>
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              onClick={handleResetFilters}
              className="w-full sm:w-auto"
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-light-beige rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        )}

        {/* Grid */}
        {!isLoading && filteredInfluencers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredInfluencers.map(influencer => (
              <InfluencerCard 
                key={influencer.id}
                influencer={influencer}
                onBook={(id) => navigate(`/booking?influencer=${id}`)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredInfluencers.length === 0 && (
          <div className="bg-light-beige rounded-lg p-12 text-center">
            <div className="mb-4">
              <FontAwesomeIcon icon={faSliders} className="text-5xl text-muted-taupe mb-4" />
            </div>
            <h2 className="text-2xl font-vintage font-bold text-navy-blue mb-2">
              No influencers found
            </h2>
            <p className="text-muted-taupe mb-6">
              Try adjusting your filters to find the perfect influencer for your campaign
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="primary"
                onClick={handleResetFilters}
              >
                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                Reset All Filters
              </Button>
              <Button 
                variant="secondary"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </div>
        )}

        {/* Footer Info */}
        {!isLoading && filteredInfluencers.length > 0 && (
          <div className="mt-12 p-6 bg-light-beige rounded-lg border border-vintage-gold/20">
            <h3 className="font-semibold text-navy-blue mb-2">💡 Tip</h3>
            <p className="text-muted-taupe">
              Use our advanced filters to narrow down by engagement rate and minimum rating. Higher engagement rates typically mean more authentic interactions with the audience.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
