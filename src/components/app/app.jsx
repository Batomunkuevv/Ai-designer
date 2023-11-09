import { createContext, useState } from "react";

import { Configurator } from "../configurator/configurator";
import { AiDesigner } from "../ai-designer/ai-designer";

const defaultConfiguratorContext = {
    image: "",
    imageMask: ""
};

export const ConfiguratorContext = createContext(defaultConfiguratorContext);

export const App = () => {
    const [isOpenAiDesigner, setIsOpenAiDesigner] = useState(false);

    return (
        <ConfiguratorContext.Provider value={defaultConfiguratorContext}>
            <div className="site-wrapper">
                <Configurator isOpenAiDesigner={isOpenAiDesigner} setIsOpenAiDesigner={setIsOpenAiDesigner} />
                <AiDesigner isOpenAiDesigner={isOpenAiDesigner} setIsOpenAiDesigner={setIsOpenAiDesigner} />
            </div>
        </ConfiguratorContext.Provider>
    );
};
