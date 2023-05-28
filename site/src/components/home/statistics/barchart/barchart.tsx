import { Box, Typography, useTheme } from "@mui/material";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useCustomTheme } from "../../ThemeSwitcherProvider";

interface IBarStatProps {
    name: string;
    rawvalue: {
        [key: string]: number;
    };
    ignored: string[];
    statsAnimateChange: boolean;
    idleField: string;
    category: string;
    detail: boolean;
};

export function BarStat(props: IBarStatProps) {
    const { theme } = useCustomTheme();

    const getFillColor = ({ step, isIdle }) => {
        if (isIdle) {
            return theme.palette.taskManager.idleColor;
        }
        return (theme.palette.taskManager[`${props.category === "Memory" ? "b" : ""}color${step + 1}`]);
    };

    const sortStats = (a, b) => {
        return a === props.idleField && b !== props.idleField ? 1 : (a !== props.idleField && b === props.idleField ? -1 : a.localeCompare(b));
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexdirection: "column",
                flexwrap: "wrap",
                aligncontent: "flex-start",
                justifycontent: "flex-start",
                alignitems: "center"
            }}>
            <BarChart
                height={props.detail ? 300 : 70}
                width={props.detail ? 150 : 75}
                data={[Object.entries(props.rawvalue)
                    .filter(entry => !["name", ...props.ignored].includes(entry[0]))
                    .reduce((ret, entry) => { ret[entry[0]] = entry[1]; return ret }, { name: name })]}>
                <XAxis hide={true} dataKey="name" />
                <YAxis hide={true} />
                {Object.keys(props.rawvalue)
                    .filter(field => !props.ignored.includes(field))
                    .sort(sortStats)
                    .map((field, idx) => <Bar dataKey={field}
                        key={field}
                        stackId="a"
                        fill={getFillColor({ step: idx, isIdle: field === props.idleField })}
                        isAnimationActive={props.statsAnimateChange}
                        type="monotone"
                        fillOpacity={1} />)
                }
            </BarChart>
            <Typography variant="caption">{(Object.entries(props.rawvalue)
                .filter(entry => ![props.idleField, ...props.ignored].includes(entry[0]))
                .reduce((ret, stat) => ret + stat[1], 0.0) /
                Object.entries(props.rawvalue)
                    .filter(entry => !props.ignored.includes(entry[0]))
                    .reduce((ret, stat) => ret + stat[1], 0.0) * 100).toFixed(0)}%</Typography>
        </Box >);
};
