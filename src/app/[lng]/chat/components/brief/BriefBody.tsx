import React, { use, useEffect, useMemo, useRef } from 'react'
import style from './BriefBody.module.css'
import BriefCard from './BriefCard'
import BriefResume from './BriefResume'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { useAtomValue, useSetAtom } from 'jotai'
import { BriefPoints, briefPoints, briefResumeAtom } from '@/atoms/briefPoints'
import {
  feedbackAtom,
  isFeedbackShowAtom,
  isLoadingFeedbackAtom,
  messagesAtom
} from '@/atoms/chatBot'
import { AreaType, authorType } from '../chatbox/utils/enums'
import { FeedbackService } from '@/services/FeedbackServices'

const otherMessages = [
  {
    role: 'model',
    message:
      "**Welcome to the Sales Training Simulator!** I'm here to help you create a customer profile for your practice session. First, tell me, what type of customer would you like to practice with? CEO, Product Manager, or Sales?",
    error: false,
    date: '2024-05-02T22:56:11.042Z'
  },
  {
    role: 'user',
    message: 'A CEO',
    error: false,
    date: '2024-05-02T22:56:14.029Z'
  },
  {
    role: 'model',
    message:
      "Excellent choice. Be aware that CEOs typically involve more challenging negotiations due to their strategic focus and decision-making power. Now, let's talk about the company size. Is it a small startup, a medium-sized company, or a large enterprise? \n",
    error: false,
    date: '2024-05-02T22:56:19.826Z'
  },
  {
    role: 'user',
    message: 'A medium-sized company',
    error: false,
    date: '2024-05-02T22:58:52.387Z'
  },
  {
    role: 'model',
    message:
      'Got it. Medium-sized companies often have some established processes but can still be flexible. Now, which sales approach would you like to practice? \n\n1. **Discovery:** Gather initial information about the potential needs and interests of the client.\n2. **Demo:** Pitch and identify a specific need that your product or service can fulfill.\n3. **Closer:** Make a detailed proposal to seal the deal. \n',
    error: false,
    date: '2024-05-02T22:58:59.140Z'
  },
  {
    role: 'user',
    message: 'The sales approach would be discovery',
    error: false,
    date: '2024-05-02T22:59:14.165Z'
  },
  {
    role: 'model',
    message:
      "Okay, so you'll be practicing gathering initial information and exploring potential needs. Are you ready to create the sales client profile with the information you've provided? \n",
    error: false,
    date: '2024-05-02T22:59:18.892Z'
  },
  {
    role: 'user',
    message: 'Yes, im ready',
    error: false,
    date: '2024-05-02T22:59:26.250Z'
  },
  {
    role: 'separator',
    message: '',
    error: false,
    date: '2024-05-02T22:59:39.547Z'
  },
  {
    role: 'model',
    message:
      "Alright, I'm ready to roleplay as the CEO of a mid-sized company in the chemical sector. We're interested in optimizing production and reducing costs, but I need to understand what you offer first. Tell me, how can your company help us achieve our goals? \n",
    error: false,
    date: '2024-05-02T22:59:39.546Z'
  },
  {
    role: 'user',
    message:
      'Hello, I hope this message finds you well. I’m Jesus, reaching out from Lapzo, where we specialize in talent development and training solutions. I understand that Acme Corp is in the tech sector and is currently exploring ways to streamline operations and boost customer satisfaction. Is this a good time to talk?',
    error: false,
    date: '2024-05-02T22:59:59.138Z'
  },
  {
    role: 'model',
    message:
      "(Smiling politely) Yes, it is. Talent development and training are always areas of interest. However, as the CEO, my primary focus is on strategic initiatives that directly impact our bottom line. So, while I appreciate the outreach, you'll need to demonstrate how your services translate into tangible benefits for Acme Corp, particularly in terms of cost reduction and production optimization. \n",
    error: false,
    date: '2024-05-02T23:00:05.547Z'
  },
  {
    role: 'user',
    message:
      'Absolutely, I appreciate your focus on strategic impacts. Our training programs are tailored to boost efficiency and cut costs significantly. For example, clients similar to Acme Corp have seen a reduction in operational costs by up to 20% within the first year. Can we set up a quick call to dive into how we can achieve these results for you?',
    error: false,
    date: '2024-05-02T23:01:16.018Z'
  },
  {
    role: 'model',
    message:
      "A 20% reduction is certainly intriguing. However, I'd need more than just figures. Can you elaborate on the specific strategies you employ to achieve such cost savings? \n",
    error: false,
    date: '2024-05-02T23:01:21.739Z'
  },
  {
    role: 'user',
    message:
      'Certainly! We achieve cost reductions primarily through two strategies: process optimization and skill enhancement. Our programs focus on implementing lean processes that eliminate inefficiencies and streamline operations. Additionally, we enhance team skills in areas like automation tools and project management, reducing time and resources needed for tasks. Would a detailed case study of a similar implementation be helpful for our next discussion?',
    error: false,
    date: '2024-05-02T23:01:38.598Z'
  },
  {
    role: 'model',
    message:
      "A case study would be beneficial. However, I'd also need to understand how your approach would integrate with our existing systems and workflows. We've invested heavily in custom software and automation, so compatibility is crucial. We also have a strong internal training team, so demonstrating the added value you bring is essential. \n",
    error: false,
    date: '2024-05-02T23:01:44.117Z'
  },
  {
    role: 'user',
    message:
      "I completely understand your concerns about integration and added value. Our approach includes a preliminary assessment to fully understand your existing systems and workflows, ensuring our training complements and enhances what you've already established. Additionally, we can work alongside your internal team, bringing advanced methodologies and fresh perspectives that might be new to your team. How about we schedule a meeting to go over our assessment process and discuss potential collaboration areas? This way, we can ensure our solutions are perfectly aligned with your needs.",
    error: false,
    date: '2024-05-02T23:02:37.425Z'
  },
  {
    role: 'model',
    message:
      "That sounds promising. Let's schedule a follow-up meeting. I'm particularly interested in understanding how your programs can help us reduce waste and improve production efficiency. Let's aim for next week, perhaps on Tuesday afternoon? My assistant will confirm the time with you. In the meantime, please send over that case study you mentioned.\n",
    error: false,
    date: '2024-05-02T23:02:43.305Z'
  },
  {
    role: 'user',
    message:
      "Excellent, I'll prepare the case study and send it over before our meeting. Tuesday afternoon works for me. I'll look out for the confirmation from your assistant. Thank you for the opportunity to discuss how Lapzo can contribute to Acme Corp’s goals. Looking forward to our conversation next week!",
    error: false,
    date: '2024-05-02T23:03:05.353Z'
  },
  {
    role: 'model',
    message: 'Thank you. I look forward to it as well. \n',
    error: false,
    date: '2024-05-02T23:03:09.914Z'
  }
]

export default function BriefBody() {
  const { lng } = useParams()
  const { t } = useTranslation(lng, 'salesBrief')
  const messages = useAtomValue(messagesAtom)
  const briefResume = useAtomValue(briefResumeAtom)
  const campaignDone = useMemo(() => briefResume, [briefResume])
  const themes: any = useAtomValue(briefPoints)
  const setIsFeedbackShow = useSetAtom(isFeedbackShowAtom)
  const setIsLoading = useSetAtom(isLoadingFeedbackAtom)
  const setFeedback = useSetAtom(feedbackAtom)

  const gettingFeedback = async () => {
    setIsFeedbackShow(true)
    const historyModified: any = otherMessages
      .filter((message) => message.message !== null && message.message !== '')
      .map((item: any) => {
        if (
          item.message &&
          (item.role === authorType.BOT || item.role === authorType.USER)
        )
          return {
            role: item.role,
            content: item.message
          }
      })
    historyModified.unshift({
      role: authorType.USER,
      content: 'Dame un mensaje de bienvenida'
    })

    const response = await FeedbackService.getSalesFeedback(
      historyModified,
      "Alright, let's begin!  I'm Sarah Jones, CEO of NovaTech. We're a medium-sized company in the technology industry. I'm always open to exploring ways to improve our operations and stay competitive. Tell me, what brings you here today? \n"
    )
    const data = await response.json()
    setIsLoading(false)
    setFeedback(data.feedback)
  }

  return (
    <>
      <hr className={style.hr} />
      <div className={style.body}>
        {campaignDone ? (
          <BriefResume />
        ) : (
          <div className={style.cardsContainer}>
            {themes.length > 0 &&
              themes.map((item: BriefPoints, index: any) => (
                <BriefCard key={index} {...item} />
              ))}
          </div>
        )}
      </div>
      <div className={style.briefFooter}>
        <button
          onClick={gettingFeedback}
          // disabled={campaignDone ? false : true}
          className={
            campaignDone
              ? `${style.closeCampaignButtonActive}`
              : `${style.closeCampaignButton}`
          }
        >
          <p>{t(`buttons.closeCampaign`)}</p>
        </button>
      </div>
    </>
  )
}
