import styles from './error.module.scss';

export interface ErrorProps {
    error: string | null;
}
const ErrorMessage: React.FC<ErrorProps> = ({ error }) => {
    return (
        <div className={styles.errorContainer}>
            <p>Error: {error}</p>
        </div>
    );
}
export default ErrorMessage