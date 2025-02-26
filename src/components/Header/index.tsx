import { ShowProps } from "../../libs/types";
import styles from "./header.module.scss";

const Header: React.FC<ShowProps> = ({ show }) => {
    return (
        <header className={styles.header}>
            <h1>{show?.Title}</h1>
            <p className={styles.metadata}>
                80% INDICADO /{" "}
                {show?.Genres.map((g) => g.Title)
                    .join(", ")
                    .toUpperCase()}{" "}
                / {show?.Year} / EUA
            </p>
        </header>
    )
}
export default Header