// Mock AI Recommendation Service
// NOTE: Untuk production, gunakan backend API yang aman untuk OpenAI API calls

export const generateInfluencerRecommendations = async (campaignDetails, availableInfluencers) => {
  // Mock AI recommendations berdasarkan campaign details
  // Di production, ini akan memanggil backend API
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const {
      campaignType = 'general',
      targetAudience = 'general',
      budget = 'medium',
      engagement = 'high',
      niches = []
    } = campaignDetails

    // AI scoring logic untuk rekomendasi
    const scoredInfluencers = availableInfluencers.map(influencer => {
      let score = 0

      // Scoring berdasarkan engagement
      if (engagement === 'high' && influencer.engagement >= 8) score += 30
      else if (engagement === 'medium' && influencer.engagement >= 7) score += 25
      else if (engagement === 'low') score += 20

      // Scoring berdasarkan rating
      score += (influencer.rating / 5) * 25

      // Scoring berdasarkan followers
      const followerCount = parseInt(influencer.followers)
      if (followerCount >= 200000) score += 20
      else if (followerCount >= 150000) score += 15
      else score += 10

      // Scoring berdasarkan price vs budget
      if (budget === 'low' && influencer.price <= 400) score += 15
      else if (budget === 'medium' && influencer.price >= 400 && influencer.price <= 600) score += 15
      else if (budget === 'high' && influencer.price >= 600) score += 15

      // Scoring berdasarkan niche
      if (niches.length > 0) {
        if (niches.some(niche => influencer.niche.includes(niche))) score += 20
      }

      return {
        ...influencer,
        recommendationScore: Math.min(100, score),
        matchReason: generateMatchReason(influencer, campaignDetails)
      }
    })

    // Sort by score descending
    return scoredInfluencers.sort((a, b) => b.recommendationScore - a.recommendationScore)
  } catch (error) {
    console.error('Error generating recommendations:', error)
    throw error
  }
}

export const generateAnalysisPrompt = (campaignDetails, topInfluencers) => {
  // Generate detailed AI analysis untuk top influencers
  return topInfluencers.map((influencer, idx) => ({
    position: idx + 1,
    influencer: influencer.name,
    niche: influencer.niche,
    analysis: {
      strengths: getStrengths(influencer),
      reasons: getReasonsForMatch(influencer, campaignDetails),
      expectedROI: calculateExpectedROI(influencer, campaignDetails),
      riskFactors: identifyRisks(influencer),
      suggestions: generateSuggestions(influencer, campaignDetails)
    }
  }))
}

const generateMatchReason = (influencer, campaignDetails) => {
  const reasons = []
  
  if (influencer.engagement >= 8.5) reasons.push('Excellent engagement rate')
  if (influencer.rating >= 4.8) reasons.push('Highly rated by clients')
  if (influencer.followers.includes('K') && parseInt(influencer.followers) >= 250)
    reasons.push('Large, engaged audience')
  
  return reasons.join(', ') || 'Good match for your campaign'
}

const getStrengths = (influencer) => {
  const strengths = []
  
  if (influencer.engagement >= 8) strengths.push('High audience engagement')
  if (influencer.rating >= 4.8) strengths.push('Excellent client satisfaction')
  if (parseInt(influencer.followers) >= 250000) strengths.push('Large reach')
  if (influencer.verified) strengths.push('Verified profile')
  
  return strengths
}

const getReasonsForMatch = (influencer, campaignDetails) => {
  const reasons = []
  
  if (campaignDetails.niches?.some(n => influencer.niche.includes(n))) {
    reasons.push(`Expert in ${influencer.niche}`)
  }
  
  if (influencer.engagement >= 8) {
    reasons.push('High audience engagement ensures maximum reach')
  }
  
  reasons.push(`${Math.round(influencer.rating * 20)}% success rate with past campaigns`)
  
  return reasons
}

const calculateExpectedROI = (influencer, campaignDetails) => {
  const baseROI = 150
  const engagementMultiplier = (influencer.engagement / 10) * 100
  const ratingMultiplier = (influencer.rating / 5) * 50
  
  return Math.round(baseROI + engagementMultiplier + ratingMultiplier) + '%'
}

const identifyRisks = (influencer) => {
  const risks = []
  
  if (influencer.engagement < 7) risks.push('Lower engagement rate may limit reach')
  if (influencer.rating < 4.5) risks.push('Mixed client feedback')
  if (!influencer.verified) risks.push('Unverified account - conduct additional due diligence')
  
  return risks.length > 0 ? risks : ['Low risk profile']
}

const generateSuggestions = (influencer, campaignDetails) => {
  return [
    'Start with a small pilot campaign to establish working relationship',
    'Use influencer\'s existing audience insights for content optimization',
    'Consider bundling with complementary influencers for wider reach',
    'Schedule content during peak engagement times for maximum impact'
  ]
}

export const customRecommendationRequest = async (query, availableInfluencers) => {
  // Handle custom AI requests from users
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const queryLower = query.toLowerCase()
    
    if (queryLower.includes('budget') || queryLower.includes('cheap') || queryLower.includes('affordable')) {
      return availableInfluencers
        .filter(i => i.price <= 500)
        .sort((a, b) => a.price - b.price)
        .slice(0, 5)
    }
    
    if (queryLower.includes('follower') || queryLower.includes('reach')) {
      return availableInfluencers
        .sort((a, b) => parseInt(b.followers) - parseInt(a.followers))
        .slice(0, 5)
    }
    
    if (queryLower.includes('engagement') || queryLower.includes('active')) {
      return availableInfluencers
        .filter(i => i.engagement >= 8)
        .sort((a, b) => b.engagement - a.engagement)
        .slice(0, 5)
    }
    
    if (queryLower.includes('fashion') || queryLower.includes('beauty') || queryLower.includes('lifestyle')) {
      return availableInfluencers
        .filter(i => i.niche.includes('Fashion') || i.niche.includes('Beauty'))
        .slice(0, 5)
    }
    
    if (queryLower.includes('tech') || queryLower.includes('gadget')) {
      return availableInfluencers
        .filter(i => i.niche.includes('Tech'))
        .slice(0, 5)
    }

    // Default: return top rated
    return availableInfluencers
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5)
  } catch (error) {
    console.error('Error processing custom request:', error)
    throw error
  }
}
