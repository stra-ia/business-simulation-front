'use client'
import React, { useEffect, useState } from 'react'
import style from './Brief.module.css'
import BriefBody from './BriefBody'
import { useAtomValue, useSetAtom } from 'jotai'
import { typeArea } from '@/atoms/type'
import { messagesAtom } from '@/atoms/chatBot'
import { authorType } from '../chatbox/utils/enums'

const messages = [
  {
    role: authorType.BOT,
    message:
      '¡Hola! Soy StraIA, tu chatbot de marketing digital. Estoy aquí para ayudarte a crear estudios de caso realistas para simular y analizar diferentes estrategias de marketing. Primero, cuéntame un poco sobre tu rol en la empresa relacionado con el marketing digital. Esto me ayudará a adaptar los escenarios a tus capacidades y responsabilidades.',
    error: false,
    date: new Date()
  },
  {
    role: authorType.USER,
    message: 'Soy especialista en marketing',
    error: false,
    date: new Date()
  },
  {
    role: authorType.BOT,
    message:
      '¡Excelente! Los especialistas en marketing desempeñan un papel crucial en la ejecución de campañas exitosas. Ahora, háblame de tus objetivos clave de resultados (OKR) relacionados con las campañas de marketing digital en Facebook o Instagram. ¿En qué métricas te enfocas principalmente? \n',
    error: false,
    date: new Date()
  },
  {
    role: authorType.USER,
    message:
      'Incrementar el conocimiento de la marca en un 20%, generar 1000 nuevos leads calificados.',
    error: false,
    date: new Date()
  },
  {
    role: authorType.BOT,
    message:
      'Entendido. Entonces, tu enfoque principal es aumentar el conocimiento de la marca y la generación de leads. Con esto en mente, exploremos diferentes tipos de campañas. ¿En qué tipo de campaña de marketing digital estás interesado?\n\n1. **Campaña de tráfico**: Se enfoca en generar visitas a un sitio web o página de destino específica.\n2. **Campaña de interacción**: Busca aumentar las interacciones, como "me gusta", comentarios y compartidos en las redes sociales.\n3. **Campaña de conversión**: Diseñada para fomentar acciones específicas, como compras o registros. \n',
    error: false,
    date: new Date()
  },
  {
    role: authorType.USER,
    message: 'Campaña de trafico',
    error: false,
    date: new Date()
  },
  {
    role: authorType.BOT,
    message:
      'Perfecto. Aquí tienes tres estudios de caso con diferentes escenarios centrados en campañas de tráfico:\n\n\n\n## Estudio de Caso 1: Lanzamiento de un nuevo producto\n\n**Descripción del escenario**: Estás lanzando un nuevo producto y tu objetivo es generar expectación y tráfico hacia la página del producto. \n\n**Estrategia**: Crear una campaña teaser que genere curiosidad e interés antes del lanzamiento. \n\n**Tácticas**:\n\n*   Publicar una serie de publicaciones con pistas sobre el nuevo producto.\n*   Utilizar anuncios de video cortos para mostrar vistazos del producto.\n*   Ofrecer un descuento exclusivo o un incentivo por registrarse para obtener acceso anticipado.\n\n**Consecuencias**:\n\n*   Mayor conocimiento de la marca y expectación en torno al nuevo producto.\n*   Generación de leads a través de registros de acceso anticipado.\n*   Potencial aumento en las ventas tras el lanzamiento.\n\n\n\n## Estudio de Caso 2: Impulsar el tráfico a un blog\n\n**Descripción del escenario**: Tienes un blog con contenido valioso, pero necesitas más tráfico. \n\n**Estrategia**: Promocionar las publicaciones del blog a través de anuncios en redes sociales. \n\n**Tácticas**:\n\n*   Identificar publicaciones de blog de alto rendimiento. \n*   Crear anuncios atractivos que resalten los puntos clave de las publicaciones.\n*   Dirigirse a una audiencia específica que probablemente esté interesada en el contenido del blog.\n\n**Consecuencias**:\n\n*   Aumento del tráfico al blog.\n*   Mayor participación en las publicaciones del blog (comentarios, compartidos).\n*   Mejora del SEO gracias a un mayor tráfico.\n\n\n\n## Estudio de Caso 3: Promocionar un próximo webinar\n\n**Descripción del escenario**: Estás organizando un webinar y necesitas atraer inscritos.\n\n**Estrategia**: Utilizar anuncios en redes sociales para generar interés y conversiones. \n\n**Tácticas**:\n\n*   Crear anuncios que destaquen los beneficios de asistir al webinar.\n*   Incluir una llamada a la acción clara para registrarse.\n*   Dirigirse a una audiencia específica que probablemente esté interesada en el tema del webinar.\n\n**Consecuencias**:\n\n*   Aumento de los registros para el webinar.\n*   Generación de leads calificados.\n*   Oportunidad de posicionarse como experto en la industria. \n\n\n\n¿Qué estudio de caso te gustaría explorar más a fondo? \n',
    error: false,
    date: new Date()
  },
  {
    role: authorType.USER,
    message: 'El caso 3',
    error: false,
    date: new Date()
  },
  {
    role: authorType.BOT,
    message:
      'Genial. Exploremos el Estudio de Caso 3: Promocionar un próximo webinar. Para simular esta campaña, necesito algunos detalles adicionales:\n\n* **Cuerpo del anuncio**: El texto principal del anuncio.\n* **Título**: El titular principal del anuncio.\n* **Descripción del enlace**: Una breve descripción que aparecerá debajo del título en el anuncio.\n* **Duración**: Número de días que durará la campaña.\n* **Gasto diario**: El gasto estimado diario para la campaña. \n',
    error: false,
    date: new Date()
  },
  {
    role: authorType.USER,
    message:
      'user_creative_body: Immerse yourself in the world of reading with our latest e-reader! Its sleek design and portable size will captivate you, while the extensive library and waterproof capabilities will keep you entertained anywhere, anytime. user_headline: Escape with Books 📚 Waterproof Reader user_link_description: Dive into endless reading adventures with our waterproof 7-inch HD e-reader! Carry your entire library wherever you go. Explore our massive selection now! days_duration: 1, spend_by_day: 100',
    error: false,
    date: new Date()
  },
  {
    role: authorType.BOT,
    message:
      'Gracias por proporcionar los detalles. Confirmemos:\n\n* **Cuerpo del anuncio**: Sumérgete en el mundo de la lectura con nuestro último e-reader. Su diseño elegante y tamaño portátil te cautivarán, mientras que la amplia biblioteca y las capacidades a prueba de agua te mantendrán entretenido en cualquier lugar y en cualquier momento.\n* **Título**: Escapa con Libros 📚 Lector a prueba de agua\n* **Descripción del enlace**: Sumérgete en un sinfín de aventuras de lectura con nuestro e-reader HD de 7 pulgadas a prueba de agua. Lleva toda tu biblioteca dondequiera que vayas. ¡Explora nuestra selección masiva ahora!\n* **Duración**: 1 día\n* **Gasto diario**: 100\n\n¿Estás listo para simular la campaña con los detalles proporcionados? Si todo está listo, confirma y llamaremos a la función `marketing_prediction` para simular tu campaña. \n',
    error: false,
    date: new Date()
  }
]

export default function Brief() {
  const type: any = useAtomValue(typeArea)
  const setMessages = useSetAtom(messagesAtom)

  const handleMessages = () => {
    setMessages(messages)
  }

  return (
    <div className={style.main}>
      <div className={style.briefHeader}>
        <div className={style.briefHeaderTextContainer}>
          <p>
            <span>{type} </span>Brief
          </p>
        </div>
      </div>
      <BriefBody />
      {/* <button onClick={handleMessages}>Modificar</button> */}
    </div>
  )
}
