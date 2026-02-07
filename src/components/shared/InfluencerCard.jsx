import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function InfluencerCard({ influencer, onBook }) {
  return (
    <div className="card group">
      {/* Image */}
      <div className="mb-4 overflow-hidden rounded-lg h-48 bg-light-beige">
        <img 
          src={influencer.image || '/placeholder.jpg'} 
          alt={influencer.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div>
        <h3 className="font-bold text-lg text-navy-blue mb-1">{influencer.name}</h3>
        <p className="text-muted-taupe text-sm mb-3">{influencer.niche}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <p className="font-bold text-vintage-gold">{influencer.followers}</p>
            <p className="text-xs text-muted-taupe">Followers</p>
          </div>
          <div>
            <p className="font-bold text-vintage-gold">{influencer.engagement}%</p>
            <p className="text-xs text-muted-taupe">Engagement</p>
          </div>
          <div className="flex items-center justify-center gap-1">
            <FontAwesomeIcon icon={faStar} className="text-vintage-gold" />
            <span className="font-bold text-navy-blue">{influencer.rating}</span>
          </div>
        </div>

        {/* Price */}
        <p className="text-center text-2xl font-bold text-vintage-gold mb-4">${influencer.price}</p>

        {/* Button */}
        <button 
          onClick={() => onBook(influencer.id)}
          className="w-full btn-primary text-center"
        >
          Book Now
        </button>
      </div>
    </div>
  )
}
