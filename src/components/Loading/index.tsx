import styles from './style.module.css';
const Loading = ({ height }: { height?: string }) => (
  <div className={styles.wrapper} style={{ height: height }}>
    <div className={styles.loading} />
  </div>
);

export default Loading;
