import { AreaType } from '@/app/[lng]/chat/components/chatbox/utils/enums'

export const ChatbotService = {
  async sendMessage(message: string, history: any, type: AreaType) {
    return fetch(`${process.env.MS_SIMULATION_API}/chatbot/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, history, type })
    })
  },
  async sendMessageVoice(formData: FormData) {
    return fetch(`${process.env.MS_SIMULATION_API}/chatbot/voice`, {
      method: 'POST',
      body: formData
    })
  }
}
