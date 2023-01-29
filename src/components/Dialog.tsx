import { useEffect, useState } from "react";
import styles from "./Dialog.module.scss";

interface Props {
  confirmCallback: () => void;
  confirmText: string;
  title: string;
  body: string;
}
export default function Dialog(props: Props) {
  const [exitAnimationClass, setExitAnimationClass] = useState("");
  const [entryAnimationClass, setEntryAnimationClass] = useState("");

  useEffect(() => {
    const entryTimeout = setTimeout(() => {
      setEntryAnimationClass(styles.entryAnimation);
    }, 10);
    return () => {
      clearTimeout(entryTimeout);
    };
  }, []);
  function close() {
    setExitAnimationClass(styles.exitAnimation);
    setTimeout(() => {
      props.confirmCallback();
    }, 200);
  }

  return (
    <div
      className={
        styles.masterContainer +
        " " +
        entryAnimationClass +
        " " +
        exitAnimationClass
      }
    >
      <div className={styles.wrapper}>
        <h2>{props.title}</h2>
        <p>{props.body}</p>
        <button onClick={close}>{props.confirmText}</button>
      </div>
    </div>
  );
}
