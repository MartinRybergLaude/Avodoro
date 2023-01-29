import styles from "./ProgressBar.module.scss";

interface Props {
  stage: number;
}
export default function ProgressBar(props: Props) {
  return (
    <div className={styles.container}>
      {[...Array(4)].map((index) => {
        const name = index < props.stage ? styles.active : "";
        return <div key={index} className={name} />;
      })}
    </div>
  );
}
