import styles from './styles.module.css'

export const Legend = () => {
    let rectSize = 30
    return (
        <div className={styles.legend}>
            <div className={styles.fr}>
                <svg width={rectSize} height={rectSize}>
                    <rect x={0} y={0} width={rectSize} height={rectSize} fill="#0f9e56" rx={15} />
                </svg>
                <p>Pokój wolny</p>
            </div>
            <div className={styles.sr}>
                <svg width={rectSize} height={rectSize}>
                    <rect x={0} y={0} width={rectSize} height={rectSize} fill="#ec1f1f" rx={15} />
                </svg>
                <p>Pokój zajęty</p>
            </div>
        </div>
    )
}