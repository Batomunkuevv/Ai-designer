import classNames from 'classnames';
import styles from './furniture-style.module.scss';

export const FurnitureStyle = ({ currentStyle, setStyle, name, image, type, isAvailable }) => {
    const handleStyleClick = () => {
        setStyle(type);
    }

    return (
        <li onClick={handleStyleClick} className={classNames(styles['furniture-style'], { [styles['is-active']]: currentStyle === type }, { [styles['not-available']]: !isAvailable })}>
            <div className={styles['furniture-style__image']}>
                <img src={image} alt={name} title={name} />
            </div>
            <span className={styles['furniture-style__name']}>{name}</span>
        </li>
    )
}