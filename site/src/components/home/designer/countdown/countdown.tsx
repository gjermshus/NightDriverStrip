import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

interface ICountdownProps {
    label: string;
    millisecondsRemaining: number;
    requestRefresh: () => void;
}

export const Countdown: FC<ICountdownProps> = ({ label, millisecondsRemaining, requestRefresh }) => {
    const [timeRemaining, setTimeRemaining] = useState<number>(0);

    useEffect(() => {
        if (millisecondsRemaining) {
            const timeReference = Date.now() + millisecondsRemaining;
            setTimeRemaining(timeReference - Date.now());
            var requestSent = false;
            const interval = setInterval(() => {
                const remaining = timeReference - Date.now();
                if (remaining >= 0) {
                    setTimeRemaining(remaining);
                }
                if ((remaining <= 100) && !requestSent) {
                    requestSent = true;
                    requestRefresh();
                }
            }, 50);
            return () => clearInterval(interval);
        }
    }, [millisecondsRemaining]);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: "3px",
            alignItems: "center"
        }}>
            <Typography variant="h3" color="textPrimary">{label}</Typography>:
            <Typography color="textSecondary" sx={{ width: "50px" }} width="100px" variant="h3">{timeRemaining}</Typography>
        </Box>)
};