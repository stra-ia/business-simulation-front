"use client";
import React from "react";
import style from "./ModalResult.module.css";

export default function ModalResult() {

  return (
    <div id="myModal" className={style.modal}>
        <div className={style.modalContent}>
            <div className={style.modalHeader}>
                <span className={style.close}>&times;</span>
                <h2>Modal Header</h2>
            </div>
            <div className={style.modalBody}>
              <p>Some text in the Modal Body</p>
              <p>Some other text...</p>
            </div>
            <div className={style.modalFooter}>
              <h3>Modal Footer</h3>
            </div>
        </div>
    </div>
  );
}
