import express from 'express';

const PORT = process.env.PORT || 8000;
const app = express();

app.get("/test", (req, res) => {
    res.json({message: "Hello World!"})
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});