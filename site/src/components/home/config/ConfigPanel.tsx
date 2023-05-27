import { List } from "@mui/material";
import { ConfigItem } from "./configItem";
import { useSiteConfig } from "./SiteConfigProvider";


export function ConfigPanel() {
  const { siteConfig } = useSiteConfig();
  return (
    <List>
      {Object.keys(siteConfig).map(configKey => <ConfigItem
        configKey={configKey}
        key={configKey}
      />)}
    </List>
  );
}
