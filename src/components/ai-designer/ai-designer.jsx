import { useState, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { ConfiguratorContext } from '../app';
import styles from './ai-designer.module.scss';
import { FURNITURE_STYLES } from '../../data';

import { FurnitureStyle } from '../furniture-style/furniture-style';
import { Loader } from '../loader/loader';
import { AiResults } from '../ai-results/ai-results';

export const AiDesigner = ({ isOpenAiDesigner, setIsOpenAiDesigner }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [aiResults, setAiResults] = useState(null);
    const [designerFurnitureStyle, setDesignerFurnitureStyle] = useState('modern');
    const configuratorContext = useContext(ConfiguratorContext);

    const handleCancelClick = () => {
        setIsOpenAiDesigner(false);
        setAiResults(null);
        document.body.classList.remove('is-lock');
    }

    const handleGetAiResults = async () => {
        setIsLoading(true);

        const body = new FormData();
        const imageBlob = await fetch(configuratorContext.image)
            .then(res => res.blob())
            .then(blob => blob);
        const maskBlob = await fetch(configuratorContext.image)
            .then(res => res.blob())
            .then(blob => blob);
        const meta = {
            style: designerFurnitureStyle,
            room: "generic",
            count: 4,
            tags: ["furniture"]
        }

        body.append('image', imageBlob, 'image');
        body.append('mask', maskBlob, 'mask');
        body.append('meta', JSON.stringify(meta));

        await fetch('http://ai.moebelita.com/v1/ai_designer', {
            method: "POST",
            headers: {
                "Authorization": 'Bearer sk-5C9gj05A6DKFZEL60iFG4IBsokKQ8gcQHHZBNuTluCS2gerBymreo6Qm7a3Bs'
            },
            body: body
        })
            .then(res => res.json())
            .then(data => setAiResults(data.results))
    }

    useEffect(() => {
        setAiResults(null)
    }, [])

    return (
        <div className={classNames(styles['ai-designer'], { [styles['is-open']]: isOpenAiDesigner })}>
            <div className={styles['ai-designer__panel']}>
                <div className={styles["ai-designer__styles"]}>
                    <span className={styles["ai-designer__styles-caption"]}>
                        Styles
                    </span>
                    <ul className={styles['ai-designer__styles-list']}>
                        {
                            FURNITURE_STYLES.map((furnitureStyle, i) => {
                                return <FurnitureStyle key={i} currentStyle={designerFurnitureStyle} setStyle={setDesignerFurnitureStyle} {...furnitureStyle}></FurnitureStyle>;
                            })
                        }
                    </ul>
                </div>
                <div className={styles['ai-designer__btns']}>
                    <button onClick={handleCancelClick} type='button' className={classNames(styles['ai-designer__btn'], 'btn', 'btn--black')}>Cancel</button>
                    <button onClick={handleGetAiResults} type='button' className={classNames(styles['ai-designer__btn'], 'btn')}>
                        Magic
                        <div className="btn__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <path d="M11.8711 21.742L12.2125 21.6728C12.663 21.5815 12.663 20.9375 12.2125 20.8462L11.8711 20.7769C11.0111 20.6026 10.3389 19.9304 10.1645 19.0703L10.0953 18.729C10.0039 18.2784 9.35999 18.2784 9.26864 18.729L9.19944 19.0703C9.02507 19.9304 8.35288 20.6026 7.49283 20.7769L7.15145 20.8462C6.70091 20.9375 6.70091 21.5815 7.15145 21.6728L7.49283 21.742C8.35288 21.9164 9.02507 22.5886 9.19944 23.4486L9.26864 23.79C9.35999 24.2405 10.0039 24.2405 10.0953 23.79L10.1645 23.4486C10.3389 22.5886 11.0111 21.9164 11.8711 21.742Z" fill="currentColor" />
                                <path d="M10.6813 8.43809L12.3154 8.1068C13.0868 7.95036 13.0868 6.84786 12.3154 6.69142L10.6813 6.36012C9.07095 6.03364 7.81243 4.77512 7.48595 3.16482L7.15466 1.53072C6.99821 0.759291 5.89571 0.759291 5.73927 1.53072L5.40798 3.16482C5.08149 4.77512 3.82297 6.03364 2.21267 6.36012L0.578571 6.69142C-0.192857 6.84786 -0.192857 7.95036 0.578571 8.1068L2.21267 8.43809C3.82297 8.76458 5.08149 10.0231 5.40798 11.6334L5.73927 13.2675C5.89571 14.0389 6.99821 14.0389 7.15466 13.2675L7.48595 11.6334C7.81238 10.0231 9.07095 8.76464 10.6813 8.43809Z" fill="currentColor" />
                                <path d="M22.3007 14.1239L23.5556 13.8695C24.1481 13.7494 24.1481 12.9026 23.5556 12.7825L22.3007 12.528C21.064 12.2773 20.0975 11.3108 19.8468 10.0741L19.5923 8.81917C19.4722 8.2267 18.6255 8.2267 18.5054 8.81917L18.2509 10.0741C18.0002 11.3108 17.0337 12.2773 15.797 12.528L14.5421 12.7825C13.9496 12.9026 13.9496 13.7494 14.5421 13.8695L15.797 14.1239C17.0337 14.3747 18.0002 15.3411 18.2509 16.5778L18.5054 17.8328C18.6255 18.4253 19.4723 18.4253 19.5923 17.8328L19.8468 16.5778C20.0976 15.3412 21.0641 14.3746 22.3007 14.1239Z" fill="currentColor" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
            <div className={styles['ai-designer__body']}>
                {!isLoading && !aiResults && (
                    <div className={styles['ai-designer__image']}>
                        <img src={configuratorContext.image} alt="sofa" title='sofa' />
                    </div>
                )}
                {isLoading && <Loader setIsLoading={setIsLoading} />}
                {aiResults && !isLoading && <AiResults results={aiResults} />}
            </div>
        </div>
    );
}