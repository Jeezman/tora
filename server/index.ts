import app from "./app";

const PORT = process.env.PORT || 8005;

app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
});