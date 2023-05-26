import { Box, Icon, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { httpPrefix } from "../../../espaddr";
import { StaticStatsPanel } from "./static/static";
import { ISiteConfig } from "../config/config";
import { AreaStat } from "./areachart/areachart";
import { BarStat } from "./barchart/barchart";

interface IStatsPanelProps {
    siteConfig: ISiteConfig;
    open: boolean;
    addNotification: (level: string, type: string, target: string, notification: string) => void; // TODO move type declaration to a separate file
}

export function StatsPanel({ siteConfig, open, addNotification }: IStatsPanelProps) {
    type StatsPayload = Awaited<ReturnType<typeof getStats>>; // TODO Move getStats and type declaration to a separate file or function
    const { statsRefreshRate, statsAnimateChange, maxSamples } = siteConfig;
    const [statistics, setStatistics] = useState<StatsPayload>();
    const [timer, setTimer] = useState<number | undefined>(undefined);
    const [lastRefreshDate, setLastRefreshDate] = useState<number | undefined>(undefined);
    const [abortControler, setAbortControler] = useState<AbortController | undefined>(undefined);
    const [openedCategories, setOpenedCategories] = useState({
        Package: false,
        CPU: false,
        Memory: false,
        NightDriver: false
    });


    const getStats = (aborter: AbortController) => fetch(`${httpPrefix !== undefined ? httpPrefix : ""}/statistics`, { signal: aborter.signal })
        .then(resp => resp.json())
        .then(stats => {
            setAbortControler(undefined);
            return {
                CPU: {
                    CPU: {
                        stat: {
                            CORE0: stats.CPU_USED_CORE0,
                            CORE1: stats.CPU_USED_CORE1,
                            IDLE: ((200.0 - stats.CPU_USED_CORE0 - stats.CPU_USED_CORE1) / 200) * 100.0,
                            USED: stats.CPU_USED
                        },
                        idleField: "IDLE",
                        ignored: ["USED"],
                        headerFields: ["USED"]
                    }
                },
                Memory: {
                    HEAP: {
                        stat: {
                            USED: stats.HEAP_SIZE - stats.HEAP_FREE,
                            FREE: stats.HEAP_FREE,
                            MIN: stats.HEAP_MIN,
                            SIZE: stats.HEAP_SIZE
                        },
                        idleField: "FREE",
                        headerFields: ["SIZE", "MIN"],
                        ignored: ["SIZE", "MIN"]
                    },
                    DMA: {
                        stat: {
                            USED: stats.DMA_SIZE - stats.DMA_FREE,
                            FREE: stats.DMA_FREE,
                            MIN: stats.DMA_MIN,
                            SIZE: stats.DMA_SIZE
                        },
                        idleField: "FREE",
                        headerFields: ["SIZE", "MIN"],
                        ignored: ["SIZE", "MIN"]
                    },
                    PSRAM: {
                        stat: {
                            USED: stats.PSRAM_SIZE - stats.PSRAM_FREE,
                            FREE: stats.PSRAM_FREE,
                            MIN: stats.PSRAM_MIN,
                            SIZE: stats.PSRAM_SIZE
                        },
                        idleField: "FREE",
                        headerFields: ["SIZE", "MIN"],
                        ignored: ["SIZE", "MIN"]
                    },
                },
                NightDriver: {
                    FPS: {
                        stat: {
                            LED: stats.LED_FPS,
                            SERIAL: stats.SERIAL_FPS,
                            AUDIO: stats.AUDIO_FPS
                        }
                    },
                },
                Package: {
                    CHIP: {
                        stat: {
                            MODEL: stats.CHIP_MODEL,
                            CORES: stats.CHIP_CORES,
                            SPEED: stats.CHIP_SPEED,
                            PROG_SIZE: stats.PROG_SIZE
                        },
                        static: true,
                        headerFields: ["MODEL"]
                    },
                    CODE: {
                        stat: {
                            SIZE: stats.CODE_SIZE,
                            FREE: stats.CODE_FREE,
                            FLASH_SIZE: stats.FLASH_SIZE
                        },
                        static: true,
                        headerFields: ["SIZE"]
                    },
                },
            };
        });

    useEffect(() => {
        if (abortControler) {
            abortControler.abort();
        }

        if (open) {
            const aborter = new AbortController();
            setAbortControler(aborter);

            getStats(aborter)
                .then(value => setStatistics(value))
                .catch(err => addNotification("Error", "Service", "Get Statistics", err));

            if (timer) {
                clearTimeout(timer);
                setTimer(undefined);
            }

            if (statsRefreshRate.value && open) {
                setTimer(setTimeout(() => setLastRefreshDate(Date.now()), statsRefreshRate.value * 1000));
            }

            return () => {
                timer && clearTimeout(timer);
                abortControler && abortControler.abort();
            }
        }
    }, [statsRefreshRate.value, lastRefreshDate, open]);

    if (!statistics && open) {
        return <Box>Loading...</Box>
    }

    if (!statistics) {
        return null;
    }

    return <Box sx={{
        display: "flex",
        flexdirection: "row",
        flexwrap: "wrap",
        aligncontent: "flex-start",
        justifycontent: "flex-start",
        alignitems: "stretch",
        columnGap: "10px",
        rowGap: "10px",
        ...(!open && { display: "none" })
    }}>
        {Object.entries(statistics).map(category =>
            <Box sx={{
                ...(!openedCategories[category[0]] && { display: "none" })
            }} key={category[0]}>
                {openedCategories[category[0]] ?
                    <Box sx={{
                        display: "flex",
                        flexdirection: "row",
                        flexwrap: "wrap",
                        aligncontent: "flex-start",
                        justifycontent: "space-between",
                        alignitems: "center",
                        borderbottom: "solid 1px",
                    }} key="header">
                        <Typography variant="h5">{category[0]}</Typography>
                        <IconButton onClick={() => setOpenedCategories(prev => { return { ...prev, [category[0]]: !openedCategories[category[0]] } })}>
                            <Icon>minimize</Icon>
                        </IconButton>
                    </Box> :
                    <Box>
                        <Typography color="textPrimary">{category[0]}</Typography>
                    </Box>}
                <Box sx={{
                    display: "flex",
                    flexdirection: "row",
                    flexwrap: "wrap",
                    aligncontent: "flex-start",
                    justifycontent: "space-between",
                    alignitems: "flex-start",
                    columngap: "5px",
                }}>
                    {Object.entries(category[1])
                        .filter(entry => entry[1].static)
                        .map(entry =>
                            <Box
                                key={`entry-${entry[0]}`}
                                sx={{
                                    ...(!openedCategories[category[0]] && { cursor: "pointer" })
                                }}
                                onClick={() => !openedCategories[category[0]] && setOpenedCategories(prev => { return { ...prev, [category[0]]: !openedCategories[category[0]] } })}>
                                <StaticStatsPanel
                                    key={`static-${entry[0]}`}
                                    detail={openedCategories[category[0]]}
                                    name={entry[0]}
                                    stat={entry[1]} />
                            </Box>)}
                    <Box sx={{
                        display: "flex",
                        flexdirection: "row",
                        flexwrap: "wrap",
                        aligncontent: "flex-start",
                        justifycontent: "space-between",
                        alignitems: "flex-start",
                        columngap: "5px",
                    }} key="charts">
                        {Object.entries(category[1])
                            .filter(entry => !entry[1].static)
                            .map((entry) =>
                                <Box key={`chart-${entry[0]}`}
                                    onClick={() => !openedCategories[category[0]] && setOpenedCategories(prev => { return { ...prev, [category[0]]: !openedCategories[category[0]] } })}
                                    sx={{
                                        display: "flex",
                                        flexdirection: "row",
                                        flexwrap: "wrap",
                                        aligncontent: "flex-start",
                                        justifycontent: "flex-start",
                                        alignitems: "flex-start",
                                        ...(openedCategories[category[0]] && { cursor: "pointer" })
                                    }}>
                                    {category[1][entry[0]].idleField && <BarStat
                                        key={`Bar-${entry[0]}`}
                                        name={entry[0]}
                                        category={category[0]}
                                        detail={openedCategories[category[0]]}
                                        rawvalue={entry[1].stat}
                                        idleField={category[1][entry[0]].idleField}
                                        statsAnimateChange={statsAnimateChange.value}
                                        ignored={category[1][entry[0]].ignored || []} />}
                                    <AreaStat
                                        key={`Area-${entry[0]}`}
                                        name={entry[0]}
                                        category={category[0]}
                                        detail={openedCategories[category[0]]}
                                        statsAnimateChange={statsAnimateChange.value}
                                        rawvalue={entry[1].stat}
                                        maxSamples={maxSamples.value}
                                        idleField={category[1][entry[0]].idleField}
                                        headerFields={category[1][entry[0]].headerFields}
                                        ignored={category[1][entry[0]].ignored || []} />
                                </Box>)}
                    </Box>
                </Box>
            </Box>)}
    </Box>
};

