import { useRef, useEffect, useState, useContext } from "react";
import { Host } from "@intelligentgraphics/openconfiguration.host";
import { ConfiguratorContext } from "../app";
import classNames from 'classnames';
import styles from './configurator.module.scss';

export const Configurator = ({setIsOpenAiDesigner}) => {
    const [configuratorHost, setConfiguratorHost] = useState(null);
    const configuratorRef = useRef(null);
    const [isConfigurationStarted, setConfigurationStarted] = useState(false);
    const configuratorContext = useContext(ConfiguratorContext);

    const initConfigurator = async (configurator) => {
        let plannings = new Map();

        const host = new Host(configurator, {
            save: async (params) => {
                const id = Date.now().toString();
                plannings.set(id, params.data);

                return {
                    pin: id,
                };
            },
            restore: async (pin) => {
                const planning = plannings.get(pin);

                if (planning) {
                    return {
                        data: planning,
                    };
                }

                throw new Error("unknown planning");
            },
        });

        host.on('Started', () => {
            setConfigurationStarted(true);
        })

        host.on('Exit', () => {
            setConfigurationStarted(false);
        })

        await host.openConfigurator({
            url: "https://showcase.intelligentgraphics.ag/",
            lang: 'en',
            data: {
                type: "none",
            },
        });

        setConfiguratorHost(host);
    };

    const handleViewBtnClick = async () => {
        const result = await configuratorHost.exportConfigurationAsImage({
            type: "perspective",
        });

        configuratorContext.image = `data:${result.mimeType};base64,${result.content}`;
        setIsOpenAiDesigner(true);
        document.body.classList.add('is-lock');
    }

    useEffect(() => {
        initConfigurator(configuratorRef.current);
    }, []);

    return (
        <div className={styles['configurator']}>
            <iframe ref={configuratorRef} className={styles['configurator__frame']}></iframe>
            {isConfigurationStarted && <button type="button" onClick={handleViewBtnClick} className={classNames(styles['configurator__btn'], 'btn')}>View in the room</button>}
        </div>
    );
};
