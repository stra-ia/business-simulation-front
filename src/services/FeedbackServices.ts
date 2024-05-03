import {
  MarketinProposal,
  MarketingPrediction
} from '@/app/[lng]/chat/components/chatbox/utils/enums'

export const FeedbackService = {
  async getSalesFeedback(history: any, brief: string) {
    return fetch('http://127.0.0.1:8000/feedback/sales', {
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
    return fetch('http://127.0.0.1:8000/feedback/marketing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  }
}
