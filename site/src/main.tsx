const rootNode = document.getElementById("root");
if (rootNode == null) {
        throw new Error("Could not find root element");
}

// Use React and ReactDOM from UMD bundle instead of from node_modules
ReactDOM.createRoot(rootNode).render(<React.StrictMode>TEST</React.StrictMode>);