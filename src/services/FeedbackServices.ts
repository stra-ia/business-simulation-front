import {
  MarketinProposal,
  MarketingPrediction
} from '@/app/[lng]/chat/components/chatbox/utils/enums'

export const FeedbackService = {
  async getSalesFeedback(history: any, brief: string) {
    return fetch(`${process.env.MS_SIMULATION_API}/feedback/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ chat_history: history, brief })
    })
  },
  async getMarketingFeedback(
    marketingProposal: MarketinProposal,
    prediction: MarketingPrediction,
    brief: string = ''
  ) {
    const payload = {
      ...marketingProposal,
      ...prediction,
      brief
    }
    return fetch(`${process.env.MS_SIMULATION_API}/feedback/marketing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  }
}
