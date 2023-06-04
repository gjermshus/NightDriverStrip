import type { Config } from "jest";

const config: Config = {
    verbose: false,
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
    ],
    coverageDirectory: "coverage",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
}

export default config;