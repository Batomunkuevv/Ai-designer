import { useEffect, useState } from 'react';
import styles from './loader.module.scss';

export const Loader = ({ setIsLoading }) => {
    const [percents, setPercents] = useState(0);

    useEffect(() => {
        const goLastLoading = setTimeout(() => {
            const lastLoadingInterval = setInterval(() => {
                setPercents(prev => {
                    const value = prev + 1;

                    if (value === 100) {
                        clearInterval(lastLoadingInterval);

                        setTimeout(() => {
                            setIsLoading(false);
                        }, 1000)

                        return value;
                    }

                    return value;
                });
            }, 3000)
        }, 10000)

        const speedLoadingInterval = setInterval(() => {
            setPercents(prev => {
                if (prev === 95) {
                    clearInterval(speedLoadingInterval);

                    return prev;
                } else {
                    return prev + 1;
                }
            });
        }, 200);


        return () => {
            clearTimeout(goLastLoading);
        }
    }, [])

    return (
        <div className={styles['loader']}>
            <div className={styles['loader__caption']}>interior generation {percents}%</div>
            <div className={styles['loader__line']}>
                <span style={{ width: `${percents}%` }} className={styles['loader__progress']}></span>
            </div>
        </div>
    )
}