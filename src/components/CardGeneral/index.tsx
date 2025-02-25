import IconItem from '../Icon';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import IosShareIcon from '@mui/icons-material/IosShare';
import styles from './cardGeneral.module.scss';

interface CardGeneralProps {
    synopsis?: string
}

export default function CardGeneral({ synopsis }: CardGeneralProps) {
    return (
        <div className={styles.group}>
            <div className={styles.cardGeneral}>
                <IconItem icon={<AddCircleOutlineIcon />} label="Mi Lista" />
                <IconItem icon={<SentimentVeryDissatisfiedIcon />} label="Evaluar" />
                <IconItem icon={<RadioButtonCheckedIcon />} label="Grabar" />
                <IconItem icon={<IosShareIcon />} label="Compartir" />
            </div>
            <div className={styles.synopsisContainer}>
                <h3 className={styles.synopsisTitle}>SINOPSE</h3>
                <p className={styles.synopsisText}>{synopsis}</p>
            </div>
        </div>
    )
}