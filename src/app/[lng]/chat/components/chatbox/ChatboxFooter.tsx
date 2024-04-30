import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import style from "./ChatboxFooter.module.css";
import { HandleAdd, authorType, fileType } from "./utils/enums";
import Image from "next/image";
import { validateDocFile, validateImageFile } from "./utils/validations";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
interface ChatboxFooterProps {
  addMessage: HandleAdd;
}

export default function ChatboxFooter({ addMessage }: ChatboxFooterProps) {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any[]>([]);
  const [fileExtension, setFileExtension] = useState("");
  const [previewFile, setPreviewFile] = useState("");
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [isOpenedRecorder, setIsOpenedRecorder] = useState(false);
  const {
    stopRecording,
    togglePauseResume,
    startRecording,
    isPaused,
    recordingBlob,
    isRecording,
    recordingTime,
  } = useAudioRecorder();
  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    console.log(audio, "audio");

    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  const fileToGenerativePart = async (item: any) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      if (reader) {
        reader.onloadend = () => resolve(reader.result?.split(",")[1]);
        reader.readAsDataURL(item);
      }
    });
    let data = await base64EncodedDataPromise;
    return {
      inlineData: {
        data,
        mimeType: item.type,
      },
    };
  };

  const handleCreateMessage = async () => {
    if (!message || message.length < 1) {
      return;
    }
    if (!previewFile) {
      let newMessage = {
        role: authorType.USER,
        message: message,
        date: new Date(),
      };
      addMessage(newMessage);
      setMessage("");
    } else {
      // const imageParts = await Promise.all(
      //     file.map(fileToGenerativePart)
      //   );
      let newMessage = {
        role: authorType.USER,
        message: message,
        file: {
          fileData: previewFile,
          fileType: fileExtension,
        },
        date: new Date(),
      };
      console.log(newMessage, "newMessage");
      // addMessage(newMessage, imageParts)
      addMessage(newMessage);
      setMessage("");
      setPreviewFile("");
      setFileExtension("");
    }
  };

  const getFileExtension = (name: string) => {
    return name.substring(name.lastIndexOf(".")).replace(".", "").toLowerCase();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreateMessage();
    }
  };

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != undefined && event.target.files?.length > 0) {
      if (!validateDocFile(event.target.files)) {
        console.log("not valid format");
        return;
      }
      setShowUploadButton(!showUploadButton);
      setFile([event.target.files[0]]);
      console.log(event.target.files[0], "file");
      setPreviewFile(URL.createObjectURL(event.target.files[0]));
      let filetype = getFileExtension(event.target.files[0].name);
      setFileExtension(filetype);
    }
  };

  const handleDropFile = (selectedFile: FileList) => {
    if (selectedFile && selectedFile.length > 0) {
      if (!validateDocFile(selectedFile)) {
        console.log("not valid format");
        return;
      }
      setShowUploadButton(!showUploadButton);
      const fileList: any = selectedFile[0];
      setFile(fileList);
      setPreviewFile(URL.createObjectURL(fileList));
      let filetype = getFileExtension(fileList.name);
      setFileExtension(filetype);
    }
  };
  const calculateTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}: ${
      remainingSeconds >= 10 ? "" : "0"
    } ${remainingSeconds}`;
  };
  useEffect(() => {
    if (!recordingBlob) return;
    // addMessage({
    //   role: authorType.USER,
    //   message: recordingBlob,
    //   date: new Date(),
    // });
    // console.log(recordingBlob, "recordingBlob");
  }, [recordingBlob]);
  useEffect(() => {}, [file]);

  return (
    <div className={style.footer}>
      {isOpenedRecorder ? (
        <div className={style.recordContainer}>
          <div
            style={{
              width: "30vw",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              gap: "10px",
            }}
          >
            <button className={style.roundButton}>
              <Image
                priority
                src="/button3.svg"
                height={100}
                width={100}
                alt="Upload image"
              />
            </button>
            <button
              style={{
                width: "150px",
                height: "150px",
              }}
              onClick={() => {
                if (isRecording) {
                  stopRecording();
                } else {
                  startRecording();
                }
              }}
              className={
                style.roundButton + " " + (isRecording ? style.recording : "")
              }
            >
              <Image
                priority
                src={isRecording ? "/button4.svg" : "/button1.svg"}
                height={150}
                width={150}
                alt="Upload image"
              />
              <h5>{calculateTime(recordingTime)}</h5>
            </button>

            <button
              onClick={() => {
                togglePauseResume();
              }}
              className={style.roundButton}
            >
              <Image
                priority
                src="/button2.svg"
                height={100}
                width={100}
                alt="Upload image"
              />
            </button>
          </div>
        </div>
      ) : null}
      {showUploadButton && (
        <div className={style.fileContainer}>
          <div
            className={style.form__files}
            onDragOver={(event: React.DragEvent<HTMLDivElement>) => {
              event.preventDefault();
            }}
            onDrop={(event: React.DragEvent<HTMLDivElement>) => {
              event.preventDefault();
              if (
                event.dataTransfer &&
                event.dataTransfer.files &&
                event.dataTransfer.files.length > 0
              ) {
                const fileList: any = Array.from(event.dataTransfer.files);
                handleDropFile(fileList);
              }
            }}
            onClick={(event) => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
            draggable={true}
          >
            <Image
              priority
              src="/upload.svg"
              height={20}
              width={30}
              className={style.iconUpload}
              alt="Upload image"
            />
            <h3>Drag and dop file XLS or PDF here</h3>
            <h3>or</h3>
            <button className={style.uploadButton}>
              <p>Browse file</p>
            </button>
            <input
              type="file"
              onChange={handleChangeFile}
              ref={fileInputRef}
              hidden
            />
          </div>
        </div>
      )}

      <div className={style.footerButtons}>
        <button
          className={style.button}
          name="attach"
          type="button"
          onClick={() => setShowUploadButton(!showUploadButton)}
        >
          <Image
            priority
            src="/clip.svg"
            alt="Attach image"
            width={15}
            height={15}
            className={style.iconFooter}
          />
        </button>

        {!isOpenedRecorder ? (
          <>
            <input
              className={style.input}
              placeholder="Write something..."
              value={message}
              onKeyDown={handleKeyDown}
              onChange={handleChangeMessage}
              type="text"
            />
            <button
              className={style.button}
              onClick={handleCreateMessage}
              name="button"
              type="button"
            >
              <Image
                priority
                src="/paper-plane.svg"
                alt="Send"
                width={15}
                height={15}
                className={style.iconFooter}
              />
            </button>
          </>
        ) : null}
        <button
          onClick={() => setIsOpenedRecorder(!isOpenedRecorder)}
          className={style.buttonVoice}
          name="button"
          type="button"
        >
          <Image
            priority
            src={isOpenedRecorder ? "/mensaje.png" : "/microphone.svg"}
            alt="Voice"
            width={15}
            height={15}
            className={style.iconFooter}
          />
        </button>
      </div>
    </div>
  );
}
