import { Box, List, ListItem, Typography } from "@mui/material";

interface IStaticStatsPanelProps {
    detail: boolean;
    name: string;
    stat: {
        stat: {
            [key: string]: string;
        };
        headerFields: string[];
    };
};

export function StaticStatsPanel({ detail, name, stat }: IStaticStatsPanelProps) {

    return <Box sx={{
        display: "flex",
        flexdirection: "column",
        flexwrap: "wrap",
        aligncontent: "flex-start",
        justifycontent: "space-between",
        alignitems: "flex-start",
        marginleft: "5px",
        marginright: "5px"
    }}>
        <Typography variant={detail ? "h5" : "h6"}>{name}</Typography>
        {detail ? <List>
            {Object.entries(stat.stat)
                .map(entry =>
                    <ListItem key={entry[0]}>
                        <Typography variant="h5" color="textPrimary">{entry[0]}</Typography>:
                        <Typography variant="h5" color="textSecondary">{entry[1]}</Typography>
                    </ListItem>)}
        </List> :
            <List>
                {Object.entries(stat.stat)
                    .filter(entry => stat.headerFields.includes(entry[0]))
                    .map(entry => <Typography key={entry[0]} variant="h5" color="textSecondary" >{entry[1]}</Typography>)}
            </List>}
    </Box>
};