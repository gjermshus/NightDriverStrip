import { createContext, useContext, useState } from "react";
import { ISiteConfig } from "./config";

type siteConfigSetter = (setting: keyof ISiteConfig, value: number | boolean) => void;
type siteConfigContext = { siteConfig: ISiteConfig, siteConfigSetter: siteConfigSetter }

const defaultSiteConfig: ISiteConfig = {
    statsRefreshRate: {
        name: "Refresh rate",
        value: 3,
        type: "int"
    },
    statsAnimateChange: {
        name: "Animate chart",
        value: false,
        type: "boolean"
    },
    maxSamples: {
        name: "Chart points",
        value: 50,
        type: "int"
    },
    theme: {
        name: "Dark mode",
        value: true,
        type: "boolean"
    }
};

const SiteConfigContext = createContext<siteConfigContext>({ siteConfig: defaultSiteConfig, siteConfigSetter: () => { } });

export function SiteConfigProvider({ children }: { children: React.ReactNode; }) {
    const [siteConfig, setSiteConfig] = useState<ISiteConfig>(defaultSiteConfig);
    const siteConfigSetter: siteConfigSetter = (setting, value) => {
        setSiteConfig(prevConfig => ({ ...prevConfig, [setting]: { ...prevConfig[setting], value } }));
    };

    return <SiteConfigContext.Provider value={{ siteConfig, siteConfigSetter }} >
        {children}
    </ SiteConfigContext.Provider>;
}

export function useSiteConfig() {
    if (SiteConfigContext === null) {
        throw new Error('useSiteConfig must be used within a SiteConfigProvider');
    }

    return useContext(SiteConfigContext);
}