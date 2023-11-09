import classNames from 'classnames';
import styles from './result-popup.module.scss';
import placeholder from '../../assets/images/placeholder.png';

export const ResultPopup = ({ image, setIsShowPopup, isShow }) => {
    const handlePopupCloseClick = () => {
        setIsShowPopup(false);
    }

    return (
        <div className={classNames(styles['result-popup'], { [styles['is-hidden']]: isShow === false })}>
            <button onClick={handlePopupCloseClick} type="button" className={styles['result-popup__close']}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M0.730974 2.6025L19.3976 21.2692C19.6316 21.5265 19.959 21.6668 20.3333 21.6668C21.0585 21.6668 21.6666 21.0586 21.6666 20.3335C21.6666 19.9592 21.5263 19.6317 21.269 19.3978L2.60232 0.731155C2.3684 0.473846 2.04092 0.333496 1.66665 0.333496C0.9415 0.333496 0.333313 0.941683 0.333313 1.66683C0.333313 2.0411 0.473664 2.36858 0.730974 2.6025ZM19.3976 0.731155L0.730974 19.3978C0.473664 19.6317 0.333313 19.9592 0.333313 20.3335C0.333313 21.0586 0.9415 21.6668 1.66665 21.6668C2.04092 21.6668 2.3684 21.5265 2.60232 21.2692L21.269 2.6025C21.5263 2.36858 21.6666 2.0411 21.6666 1.66683C21.6666 0.941683 21.0585 0.333496 20.3333 0.333496C19.959 0.333496 19.6316 0.473846 19.3976 0.731155Z" fill="currentColor"></path>
                </svg>
            </button>
            <div className={styles['result-popup__image']}>
                <img src={image === null ? placeholder : image} alt="Furniture" title="Furniture" />
            </div>
        </div>
    )
}