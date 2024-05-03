export const FeedbackService = {
  async getSalesFeedback(history: any, brief: string) {
    return fetch('http://127.0.0.1:8000/feedback/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ chat_history: history, brief })
    })
  }
}
