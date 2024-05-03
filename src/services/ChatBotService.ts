import { AreaType } from '@/app/[lng]/chat/components/chatbox/utils/enums'

export const ChatbotService = {
  async sendMessage(message: string, history: any, type: AreaType) {
    return fetch('http://127.0.0.1:8000/chatbot/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, history, type })
    })
  },
  async sendMessageVoice(formData: FormData) {
    return fetch('http://127.0.0.1:8000/chatbot/voice', {
      method: 'POST',
      body: formData
    })
  }
}
