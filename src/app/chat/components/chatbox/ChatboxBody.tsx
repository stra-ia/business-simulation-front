import React, { useEffect, useMemo, useRef } from "react";
import style from "./ChatboxBody.module.css";
import { AreaType, Messages, authorType } from "./utils/enums";
import Image from "next/image";
import Markdown from "react-markdown";

interface ChatboxBodyProps {
  messages: Messages[];
  type: AreaType;
}

export default function ChatboxBody({ messages, type }: ChatboxBodyProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    //3️⃣ bring the last item into view
    bodyRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  const groupMessagesByDateAndSender = (messages: any) => {
    return messages.reduce((groups: any, message: any) => {
      const dayWeek = message.date.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const dayMonth = message.date.getDate();
      const monthName = message.date.toLocaleDateString("en-US", {
        month: "long",
      });
      const formattedDate = `${dayWeek}, ${dayMonth} ${monthName}`;

      if (!groups[formattedDate]) {
        groups[formattedDate] = [];
      }
      groups[formattedDate].push([message]);
      return groups;
    }, {});
  };

  const groups = useMemo(
    () => Object.entries(groupMessagesByDateAndSender(messages)),
    [messages]
  );

  return (
    <>
      {type == AreaType.MARKETING && (
        <div className={style.briefDisclaimer}>
          <span>
            Definiendo Brief. Puedes iniciar la conversación para construir tu
            campaña.
          </span>
        </div>
      )}
      <hr className={style.hr} />
      <div ref={bodyRef} className={style.body}>
        {groups.map(([date, messagesGroups], index) => (
          <React.Fragment key={index}>
            <p className={style.dateSpan}>{date}</p>
            {messagesGroups.length > 0 &&
              messages.map((item, i) => (
                <div key={i}>
                  {item.role == authorType.BOT ? (
                    <div className={style.messageContainer}>
                      <div className={style.iconContainer}>
                        <Image
                          priority
                          src="/robot.svg"
                          alt="Vercel Logo"
                          width={100}
                          height={24}
                          className={style.iconRobot}
                        />
                      </div>
                      <div className={style.messageForMe}>
                        <Markdown>{item.message}</Markdown>
                      </div>
                    </div>
                  ) : (
                    <div key={i}>
                      <div className={style.messageByMe}>{item.message}</div>
                      {item.file && item.file.fileData && (
                        <div className={style.fileByMe}>
                          {/* <Image
                                                    priority
                                                    src={item.file.fileData}
                                                    alt="Image"
                                                    width={200}
                                                    height={200}
                                                    className={style.file}
                                                /> */}
                          {/* <object
                                                    className={style.file}
                                                    data={item.file.fileData}
                                                    type="application/pdf"
                                                    width="300px"
                                                    height="350px"
                                                >
                                                    <embed width='200px' height="300px" src={item.file.fileData} type="application/pdf" />
                                                </object> */}

                          <iframe
                            style={{ overflow: "hidden;" }}
                            className={style.file}
                            src={`${item.file.fileData}`}
                          ></iframe>
                          {/* <embed
                                                    className={style.file}
                                                    src={`${item.file.fileData}`}
                                                    width={200}
                                                    height={300}
                                                        type="application/pdf">
                                                </embed> */}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
