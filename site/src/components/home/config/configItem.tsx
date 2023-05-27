import { Checkbox, ClickAwayListener, FormControlLabel, ListItem, ListItemText, TextField } from "@mui/material";
import { useState } from "react";
import { useSiteConfig } from "./SiteConfigProvider";

interface IConfigItemProps {
    configKey: string;
}

interface IConfigItemEntryProps {
    name: string;
    value: any;
    onChange: (value: any) => void;
}

function convertConfigValue(value: any, type: string) {
    switch (type) {
        case "int":
            return parseInt(value);
        case "float":
            return parseFloat(value);
        default:
            return value;
    }
}

export function ConfigItem({ configKey }: IConfigItemProps) {
    const [editing, setEditing] = useState(false);
    const { siteConfig: { [configKey]: { name, type, value } }, siteConfigSetter } = useSiteConfig();

    const handleConfigChange = (value: any) => {
        siteConfigSetter(configKey, convertConfigValue(value, type));
    };

    if (type === "boolean") {
        return <BooleanConfigEntry name={name} value={value} onChange={value => handleConfigChange(value)} />;
    }

    return <ClickAwayListener onClickAway={() => setEditing(false)}>
        <ListItem onClick={() => !editing && setEditing(!editing)}>
            {!editing && <TextConfigValue name={name} value={value} />}
            {editing && <TextConfigEntry {...{ name, type, value }} onChange={value => handleConfigChange(value)} />}
        </ListItem>
    </ClickAwayListener>;
};

function TextConfigEntry({ name, type, value, onChange }: { name: string, type: string, value: any, onChange: (value: any) => void }) {
    return <TextField label={name}
        variant="outlined"
        type={["int", "float"].includes(type) ? "number" : "text"}
        value={value}
        onChange={event => onChange(event.target.value)} />;
}

function TextConfigValue({ name, value }: { name: string, value: any }) {
    return <ListItemText sx={{
        display: "flex",
        columngap: "10px",
        flexdirection: "column",
        flexwrap: "nowrap",
        justifycontent: "flex-start",
        alignitems: "center",
    }}
        primary={name}
        secondary={value} />;
}

function BooleanConfigEntry({ name, value, onChange }: IConfigItemEntryProps) {
    return <ListItem>
        <FormControlLabel
            sx={{ marginLeft: "initial" }}
            label={name}
            labelPlacement="top"
            control={<Checkbox
                checked={value}
                value={value}
                onChange={event => {
                    onChange(event.target.checked);
                }} />} />
    </ListItem>;
}