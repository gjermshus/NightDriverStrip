import { List } from "@mui/material";
import { ConfigItem } from "./configItem";

export interface ISiteConfig {
  [key: string]: {
    name: string;
    value: any;
    type: string;
    setter: (value: any) => void;
  };
}

export function ConfigPanel({ siteConfig }: { siteConfig: ISiteConfig }) {
  return (
    <List>
      {Object.entries(siteConfig).map(entry => <ConfigItem
        name={entry[1].name}
        key={entry[1].name}
        datatype={entry[1].type}
        value={entry[1].value}
        configItemUpdated={value => entry[1].setter(value)}
      />)}
    </List>
  );
};