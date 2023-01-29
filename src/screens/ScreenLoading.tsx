import { useEffect, useState } from "react";
import Dialog from "../components/Dialog";
import Toast from "../components/Toast";
import * as serviceWorkerRegistration from "../serviceWorkerRegistration";
import styles from "./ScreenLoading.module.scss";

let serviceWorker: ServiceWorker | null;
export default function ScreenLoading() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  function onSWUpdate(registration: ServiceWorkerRegistration) {
    setShowUpdate(true);
    serviceWorker = registration.waiting;
  }

  function onSWSuccess() {
    setShowSuccess(true);
  }

  function updateSW() {
    setShowLoading(true);
    if (!serviceWorker) return;
    // Add listener for state change of service worker
    serviceWorker.onstatechange = () => {
      if (
        serviceWorker?.state === "activated" &&
        navigator.serviceWorker.controller
      ) {
        // Reload page if waiting was successfully skipped
        window.location.reload();
      }
    };
    serviceWorker.postMessage({ type: "SKIP_WAITING" });
    setShowUpdate(false);
  }

  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: onSWUpdate,
      onSuccess: onSWSuccess,
    });
  }, []);

  return (
    <div className={styles.masterContainer}>
      {showSuccess && (
        <Toast
          message="Content cached, this app works offline!"
          callback={() => setShowSuccess(false)}
        />
      )}
      {showUpdate && (
        <Dialog
          title="Update available"
          body="Please update the app."
          confirmText="Update"
          confirmCallback={updateSW}
        />
      )}
      {showLoading && (
        <div className={styles.loadingContainer}>
          <h2>Updating...</h2>
        </div>
      )}
    </div>
  );
}
