export const ChatbotService = {
  async sendMessage(message: string, history: any) {
    return fetch("http://127.0.0.1:8000/chatbot/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history }),
    });
  },
  async sendMessageVoice(formData: FormData) {
    return fetch("http://127.0.0.1:8000/chatbot/voice", {
      method: "POST",
      body: formData,
      // body: JSON.stringify({ file: formData, history: history })
    });
  },
};
