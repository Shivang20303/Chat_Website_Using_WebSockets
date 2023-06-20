const host =
    process.env.NODE_ENV === "production"
        ? window.location.host
        : "localhost:8080";

export let send;

export const startWebsocketConnection = () => {

    // New WebSocket connection initialized
    const ws = new window.WebSocket("ws://" + host + "/chat") || {};
    ws.onopen = () => {
        console.log("opened ws connection");
    };

    ws.onclose = (e) => {
        console.log("close ws connection: ", e.code, e.reason);
    };

    // Whenever a message is received
    ws.onmessage = (e) => {
        onMessageCallback && onMessageCallback(e.data);
    };

    // Allows sending messages
    send = ws.send.bind(ws);
};

let onMessageCallback;
// Called Whenever new message received
export const registerOnMessageCallback = (fn) => {
    onMessageCallback = fn;
};
