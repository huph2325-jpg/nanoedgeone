import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faSpinner, faTimes, faLightbulb, faChartLine, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useAIRecommendations } from '../../hooks/useAIRecommendations'
import Button from './Button'

export default function AIRecommendationPanel({ availableInfluencers, onSelectInfluencer }) {
  const { t } = useTranslation()
  const [showPanel, setShowPanel] = useState(false)
  const [campaignType, setCampaignType] = useState('general')
  const [targetAudience, setTargetAudience] = useState('general')
  const [budget, setBudget] = useState('medium')
  const [engagement, setEngagement] = useState('high')
  const [selectedNiches, setSelectedNiches] = useState([])
  const [customQuery, setCustomQuery] = useState('')
  const [useCustomQuery, setUseCustomQuery] = useState(false)

  const { recommendations, analysis, loading, error, getRecommendations, customRequest, clearRecommendations } = useAIRecommendations()

  const niches = [...new Set(availableInfluencers.map(i => i.niche))]

  const handleGetRecommendations = async () => {
    try {
      if (useCustomQuery && customQuery.trim()) {
        await customRequest(customQuery, availableInfluencers)
      } else {
        await getRecommendations(
          {
            campaignType,
            targetAudience,
            budget,
            engagement,
            niches: selectedNiches
          },
          availableInfluencers
        )
      }
    } catch (err) {
      console.error('Error getting recommendations:', err)
    }
  }

  const toggleNiche = (niche) => {
    setSelectedNiches(prev =>
      prev.includes(niche)
        ? prev.filter(n => n !== niche)
        : [...prev, niche]
    )
  }

  const handleClear = () => {
    clearRecommendations()
    setCampaignType('general')
    setTargetAudience('general')
    setBudget('medium')
    setEngagement('high')
    setSelectedNiches([])
    setCustomQuery('')
    setUseCustomQuery(false)
  }

  return (
    <div className={`fixed right-0 top-0 h-screen bg-white shadow-2xl transition-all duration-300 z-40 overflow-y-auto ${
      showPanel ? 'w-full sm:w-96' : 'w-0'
    }`}>
      {/* Panel Header */}
      <div className="bg-gradient-to-r from-vintage-gold to-orange-400 text-white p-6 sticky top-0 z-50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faRobot} size="lg" />
            <h2 className="text-xl font-bold">AI Assistant</h2>
          </div>
          <button
            onClick={() => setShowPanel(false)}
            className="hover:bg-white/20 p-2 rounded transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <p className="text-sm opacity-90">Smart influencer recommendations powered by AI</p>
      </div>

      <div className="p-6">
        {recommendations.length === 0 && !loading ? (
          <>
            {/* Mode Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-navy-blue mb-3">Choose Mode</label>
              <div className="flex gap-2">
                <button
                  onClick={() => { setUseCustomQuery(false); clearRecommendations() }}
                  className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-all ${
                    !useCustomQuery
                      ? 'bg-vintage-gold text-white'
                      : 'bg-light-beige text-navy-blue hover:bg-gray-200'
                  }`}
                >
                  Guided Search
                </button>
                <button
                  onClick={() => { setUseCustomQuery(true); clearRecommendations() }}
                  className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-all ${
                    useCustomQuery
                      ? 'bg-vintage-gold text-white'
                      : 'bg-light-beige text-navy-blue hover:bg-gray-200'
                  }`}
                >
                  AI Query
                </button>
              </div>
            </div>

            {useCustomQuery ? (
              // Custom Query Mode
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-navy-blue mb-2">Describe what you need</label>
                  <textarea
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    placeholder="e.g., 'Find me fashion influencers with high engagement under 500 budget'"
                    className="w-full px-3 py-2 border border-light-beige rounded-lg focus:outline-none focus:border-vintage-gold focus:ring-1 focus:ring-vintage-gold resize-none"
                    rows="4"
                  />
                </div>
                <Button
                  onClick={handleGetRecommendations}
                  disabled={loading || !customQuery.trim()}
                  variant="primary"
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    'Get AI Recommendations'
                  )}
                </Button>
              </div>
            ) : (
              // Guided Mode
              <div className="space-y-4">
                {/* Campaign Type */}
                <div>
                  <label className="block text-sm font-semibold text-navy-blue mb-2">Campaign Type</label>
                  <select
                    value={campaignType}
                    onChange={(e) => setCampaignType(e.target.value)}
                    className="w-full px-3 py-2 border border-light-beige rounded-lg focus:outline-none focus:border-vintage-gold"
                  >
                    <option value="general">General Marketing</option>
                    <option value="product">Product Launch</option>
                    <option value="brand">Brand Awareness</option>
                    <option value="sales">Sales Promotion</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-semibold text-navy-blue mb-2">Budget Range</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 border border-light-beige rounded-lg focus:outline-none focus:border-vintage-gold"
                  >
                    <option value="low">Low ($300-400)</option>
                    <option value="medium">Medium ($400-600)</option>
                    <option value="high">High ($600+)</option>
                  </select>
                </div>

                {/* Engagement Level */}
                <div>
                  <label className="block text-sm font-semibold text-navy-blue mb-2">Engagement Level</label>
                  <select
                    value={engagement}
                    onChange={(e) => setEngagement(e.target.value)}
                    className="w-full px-3 py-2 border border-light-beige rounded-lg focus:outline-none focus:border-vintage-gold"
                  >
                    <option value="low">Low (7-8%)</option>
                    <option value="medium">Medium (8-9%)</option>
                    <option value="high">High (9%+)</option>
                  </select>
                </div>

                {/* Niches */}
                <div>
                  <label className="block text-sm font-semibold text-navy-blue mb-2">Preferred Niches</label>
                  <div className="flex flex-wrap gap-2">
                    {niches.map(niche => (
                      <button
                        key={niche}
                        onClick={() => toggleNiche(niche)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                          selectedNiches.includes(niche)
                            ? 'bg-vintage-gold text-white'
                            : 'bg-light-beige text-navy-blue hover:bg-gray-200'
                        }`}
                      >
                        {niche}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGetRecommendations}
                  disabled={loading}
                  variant="primary"
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    'Get AI Recommendations'
                  )}
                </Button>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
                {error}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Results View */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-12">
                  <FontAwesomeIcon icon={faSpinner} spin size="2x" className="text-vintage-gold mb-3" />
                  <p className="text-muted-taupe">Analyzing influencers with AI...</p>
                </div>
              ) : (
                <>
                  {/* Summary Stats */}
                  <div className="bg-gradient-to-r from-light-beige to-cream-white p-4 rounded-lg border border-vintage-gold/20">
                    <p className="text-sm text-navy-blue">
                      Found <span className="font-bold text-vintage-gold">{recommendations.length}</span> perfect matches
                    </p>
                  </div>

                  {/* Top Recommendations */}
                  <div>
                    <h3 className="font-semibold text-navy-blue mb-3 flex items-center gap-2">
                      <FontAwesomeIcon icon={faChartLine} className="text-vintage-gold" />
                      Top Recommendations
                    </h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {recommendations.slice(0, 5).map((influencer, idx) => (
                        <div key={influencer.id} className="bg-white border border-light-beige rounded-lg p-3 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold text-navy-blue flex items-center gap-2">
                                <span className="text-vintage-gold font-bold">#{idx + 1}</span>
                                {influencer.name}
                              </p>
                              <p className="text-xs text-muted-taupe">{influencer.niche}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg bg-gradient-to-r from-vintage-gold to-orange-400 bg-clip-text text-transparent">
                                {influencer.recommendationScore}%
                              </p>
                              <p className="text-xs text-muted-taupe">Match</p>
                            </div>
                          </div>

                          <div className="text-xs text-muted-taupe mb-2 line-clamp-2">
                            {influencer.matchReason}
                          </div>

                          {/* Analysis if available */}
                          {analysis && analysis[idx] && (
                            <div className="bg-light-beige/30 rounded p-2 mb-2 text-xs space-y-1">
                              <div className="flex items-start gap-1">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-navy-blue">{analysis[idx].analysis.expectedROI} expected ROI</span>
                              </div>
                            </div>
                          )}

                          <Button
                            onClick={() => onSelectInfluencer(influencer)}
                            variant="secondary"
                            className="w-full text-xs py-1"
                          >
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-light-beige">
                    <Button
                      onClick={handleClear}
                      variant="outline"
                      className="flex-1"
                    >
                      New Search
                    </Button>
                    <Button
                      onClick={() => setShowPanel(false)}
                      variant="primary"
                      className="flex-1"
                    >
                      Close
                    </Button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {!showPanel && (
        <button
          onClick={() => setShowPanel(true)}
          className="fixed right-6 bottom-24 bg-gradient-to-r from-vintage-gold to-orange-400 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-40"
          title="AI Recommendations"
        >
          <FontAwesomeIcon icon={faRobot} size="lg" />
        </button>
      )}
    </div>
  )
}
