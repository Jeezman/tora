import { getReceived } from "./cronfunctions";

export const cron = () => {
    // Check for receive transactions every 10 minutes
    setInterval(() => {
        getReceived();
    }, 1000 * 60 * 10);
}