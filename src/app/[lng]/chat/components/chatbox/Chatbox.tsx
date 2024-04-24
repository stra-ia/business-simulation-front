"use client";
import React, { useEffect, useState } from "react";
import style from "./Chatbox.module.css";
import ChatboxBody from "./ChatboxBody";
import ChatboxFooter from "./ChatboxFooter";
import { AreaType, Messages, authorType } from "./utils/enums";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
const defaultBotMessage = {
  role: authorType.BOT,
  message: "¡Hola! ¿como puedo ayudarte?",
  image: "",
  date: new Date(),
};

interface ChatBoxProps {
  type?: AreaType;
}

export default function Chatbox({ type = AreaType.MARKETING }: ChatBoxProps) {
  const [messages, setMessages] = useState<Messages[]>([]);
  const genAI = new GoogleGenerativeAI(
    "AIzaSyAszMvafUVl4PJq0XNAm6obfCAe3KF13t4"
  );
  const modelTextOnly = genAI.getGenerativeModel({ model: "gemini-pro" });
  const modelMultimedia = genAI.getGenerativeModel({
    model: "gemini-pro-vision",
  });

  const handleAddMessage = async (message: Messages, image: any = null) => {
    let arr = messages;
    arr.push(message);
    setMessages([...arr]);
    if (image) {
      await handleSendMultimedia(message.message, image);
    } else {
      await handleSend(message.message);
    }
  };

  const handleSend = async (prompt: string) => {
    const result = await modelTextOnly.generateContentStream(prompt);

    let text = "";
    let arr = messages;
    let newMessage = {
      role: authorType.BOT,
      message: "",
      date: new Date(),
    };
    arr.push(newMessage);
    setMessages([...arr]);
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      text += chunkText;
      arr[arr.length - 1].message = text;
      setMessages([...arr]);
    }
  };

  const handleSendMultimedia = async (prompt: string, image: any) => {
    const result = await modelMultimedia.generateContentStream([
      prompt,
      ...image,
    ]);

    let text = "";
    let arr = messages;
    let newMessage = {
      role: authorType.BOT,
      message: "",
      date: new Date(),
    };

    arr.push(newMessage);
    setMessages([...arr]);

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      text += chunkText;
      arr[arr.length - 1].message = text;
      setMessages([...arr]);
    }
  };

  useEffect(() => {
    if (messages.length < 1) {
      let arr = messages;
      arr.push(defaultBotMessage);
      setMessages([...arr]);
    }
  }, []);

  useEffect(() => {}, [messages]);

  return (
    <div className={style.main}>
      <div className={style.chatBotHeader}>
        <div className={style.chatBotHeaderIconContainer}>
          <Image
            priority
            src="/chatBubble.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
          />
        </div>
        <div className={style.chatBotHeaderTextContainer}>
          <p>
            Chat<span>Bot</span>
          </p>
        </div>
      </div>
      <ChatboxBody type={type} messages={messages} />
      <ChatboxFooter addMessage={handleAddMessage} />
    </div>
  );
}
