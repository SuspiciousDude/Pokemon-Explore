import styles from "/src/styles/Invalid.module.css";

const Invalid = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Oops!</h1>
        <p className={styles.subtitle}>It seems you entered the wrong username or password.</p>
        <p className={styles.subtitle}>The Gym Masters can't verify if you are a trainer</p>
        <p className={styles.hint}>Remember to check your credentials and try again.</p>
        <button className={styles.retryButton} onClick={() => window.location.reload()}  >Retry</button>
      </div>
    </div>
  )
}

export default Invalid