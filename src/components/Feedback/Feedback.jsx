import styles from './Feedback.module.scss'

const Feedback = () => {
  return (
    <div className={styles.feedback}>
        <div className={styles.wrapper}>
          <div className={styles.text}>
            <h1>Сомневаетесь в выборе?</h1>
            <p>Выслушаем, порекомендуем и поможем выбрать направление обучения</p>
          </div>
          <div className={styles.button}>
            <button>Получить консультацию</button>
          </div>
        </div>
      </div>
  )
}

export default Feedback