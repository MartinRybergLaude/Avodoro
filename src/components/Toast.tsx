import { useEffect, useState } from "react";
import styles from "./Toast.module.scss";

interface Props {
  message: string;
  callback: () => void;
}
export default function Toast(props: Props) {
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
      props.callback();
    }, 200);
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={
          styles.masterContainer +
          " " +
          entryAnimationClass +
          " " +
          exitAnimationClass
        }
      >
        <p>{props.message}</p>
        <button onClick={close}>✖</button>
      </div>
    </div>
  );
}
