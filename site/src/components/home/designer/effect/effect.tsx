import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Collapse, Icon, IconButton, LinearProgress, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";

interface IEffect {
    name: string;
    enabled: boolean;
}

interface IEffectProps {
    effect: IEffect;
    effectInterval: number;
    effectIndex: number;
    millisecondsRemaining: number;
    selected: boolean;
    effectEnable: (effectIndex: number, enable: boolean) => void;
    navigateTo: (effectIndex: number) => void;
    requestRunning: boolean;
}

export const Effect: FC<IEffectProps> = ({ effect, effectInterval, effectIndex, millisecondsRemaining, selected, effectEnable, navigateTo, requestRunning }) => {
    const [progress, setProgress] = useState<number>(0);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (millisecondsRemaining && selected) {
            const timeReference = Date.now() + millisecondsRemaining;
            var timeRemaining = timeReference - Date.now();
            const interval = setInterval(() => {
                const remaining = timeReference - Date.now();
                if (remaining >= 0) {
                    timeRemaining = remaining;
                    setProgress((timeRemaining / effectInterval) * 100.0);
                }
            }, 300);
            return () => clearInterval(interval);
        }
        if (!selected) {
            setProgress(0);
        }
    }, [millisecondsRemaining, selected]);

    return <Card variant="outlined" sx={{
        display: "flex",
        flexDirection: "column",
        padding: "10px"
    }}>
        <CardHeader
            avatar={
                <Avatar aria-label={effect.name}>
                    {effect.name[0]}
                </Avatar>
            }
            title={effect.name}
            subheader={effect.enabled ? (selected ? "Active" : "Waiting") : "Disabled"}
            sx={{

            }}
        />
        <CardContent>
            {selected && <LinearProgress variant="determinate" sx={{ transition: 'none' }} value={progress} />}
            {!selected && <Button disabled={requestRunning} onClick={() => effectEnable(effectIndex, !effect.enabled)} variant="outlined" startIcon={<Icon >{effect.enabled ? "stop" : "circle"}</Icon>}>{effect.enabled ? "Disable" : "Enable"}</Button>}
            {!selected && effect.enabled && <Button disabled={requestRunning} onClick={() => navigateTo(effectIndex)} variant="outlined" startIcon={<Icon >start</Icon>}>Trigger</Button>}
        </CardContent>
        <CardActions disableSpacing>
            <IconButton
                onClick={() => setExpanded(!expanded)}
                aria-label="show more">
                <Icon>settings</Icon>
            </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <TextField label="Option" />
            </CardContent>
        </Collapse>
    </Card>
};