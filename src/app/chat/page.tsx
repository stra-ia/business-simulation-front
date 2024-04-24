import React from "react";
import ChatBox from "./components/chatbox/Chatbox";
import style from "./page.module.css";
import Brief from "./components/brief/Brief";

export default function Page() {
  return (
    <div className={style.main}>
      <ChatBox />
      <Brief />
    </div>
  );
}
