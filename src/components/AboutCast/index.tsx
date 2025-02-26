import { ShowProps } from '../../libs/types'
import styles from './aboutCast.module.scss'


const AboutCast: React.FC<ShowProps> = ({ show }) => {
    return (
        <div className={styles.cast}>
            <div className={styles.castList}>
                {show?.Cast.map((actor) => (
                    <div key={actor.ID} className={styles.castMember}>
                        {actor.Name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AboutCast