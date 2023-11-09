import { useState } from 'react';
import styles from './ai-results.module.scss';

import { ResultPopup } from '../result-popup/result-popup';

export const AiResults = ({ results }) => {
    const [popupImage, setPopupImage] = useState(null);
    const [isShowPopup, setIsShowPopup] = useState(false);

    const handleResultClick = (e) => {
        const { target } = e;
        const targetIndex = target.dataset.index;

        setPopupImage(`data:image/png;base64,${results[targetIndex]}`);
        setIsShowPopup(true);
    }

    return (
        <div className={styles['ai-results']}>
            <ul className={styles['ai-results__list']}>
                {results.map((result, i) => (
                    <li data-index={i} onClick={handleResultClick} key={i} className={styles['ai-results__item']}>
                        <img src={`data:image/png;base64,${result}`} alt="furniture" title='furniture' />
                    </li>
                ))}
            </ul>
            <ResultPopup image={popupImage} setIsShowPopup={setIsShowPopup} isShow={isShowPopup} />
        </div>
    )
}