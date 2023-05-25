import { Checkbox, ClickAwayListener, FormControlLabel, ListItem, ListItemText, TextField } from "@mui/material";
import { useState } from "react";

interface IConfigItem {
    name: string;
    value: any;
    datatype: string;
    configItemUpdated: (value: any) => void;
}

export function ConfigItem({ name, value, datatype, configItemUpdated }: IConfigItem) {
    const [editing, setEditing] = useState(false);
    const [configValue, setConfigValue] = useState(value);

    const getConfigValue = (value: any, type: string) => {
        switch (type) {
            case "int":
                return parseInt(value);
            case "float":
                return parseFloat(value);
            default:
                return value;
        }
    };

    if (datatype === "boolean") {
        return <ListItem onClick={_evt => !editing && setEditing(!editing)}>
            <FormControlLabel
                sx={{ marginLeft: "initial" }}
                label={name}
                labelPlacement="top"
                control={<Checkbox
                    value={value}
                    onChange={event => {
                        setConfigValue(event.target.checked);
                        configItemUpdated(event.target.checked);
                    }} />} />
        </ListItem>;
    }

    return <ClickAwayListener onClickAway={() => { configItemUpdated(configValue); setEditing(false); }}><ListItem button onClick={_evt => !editing && setEditing(!editing)}>
        {!editing && <ListItemText sx={{
            display: "flex",
            columngap: "10px",
            flexdirection: "column",
            flexwrap: "nowrap",
            justifycontent: "flex-start",
            alignitems: "center",
        }}
            primary={name}
            secondary={configValue} />}
        {editing && <TextField label={name}
            variant="outlined"
            type={["int", "float"].includes(datatype) ? "number" : "text"}
            // pattern={datatype === "int" ? "^[0-9]+$" : (datatype === "float" ? "^[0-9]+[.0-9]*$" : ".*")}
            defaultValue={value}
            onChange={event => setConfigValue(getConfigValue(event.target.value, datatype))} />}
    </ListItem>
    </ClickAwayListener>;
};
