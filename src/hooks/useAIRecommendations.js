import { useState } from 'react'
import {
  generateInfluencerRecommendations,
  generateAnalysisPrompt,
  customRecommendationRequest
} from '../services/aiRecommendationService'

export const useAIRecommendations = () => {
  const [recommendations, setRecommendations] = useState([])
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getRecommendations = async (campaignDetails, availableInfluencers) => {
    setLoading(true)
    setError(null)
    try {
      const results = await generateInfluencerRecommendations(campaignDetails, availableInfluencers)
      setRecommendations(results)

      // Generate analysis untuk top 3
      const topInfluencers = results.slice(0, 3)
      const analysisResults = generateAnalysisPrompt(campaignDetails, topInfluencers)
      setAnalysis(analysisResults)

      return results
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const customRequest = async (query, availableInfluencers) => {
    setLoading(true)
    setError(null)
    try {
      const results = await customRecommendationRequest(query, availableInfluencers)
      setRecommendations(results)
      return results
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearRecommendations = () => {
    setRecommendations([])
    setAnalysis(null)
    setError(null)
  }

  return {
    recommendations,
    analysis,
    loading,
    error,
    getRecommendations,
    customRequest,
    clearRecommendations
  }
}
