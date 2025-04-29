import styles from './styles.module.css';

type ImageProps = {
  url: string;
};

const Image = (props: ImageProps) => {
  const { url } = props;

  return <img className={styles.image} src={url} alt="company" />;
};
export default Image;
