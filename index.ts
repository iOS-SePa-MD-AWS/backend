import { app } from "./src/app"

(async () => {
    const port = process.env.APP_PORT || 3000
    const server = await app()

    server.listen(port, () => {
        console.log(`Server is running at port: ${port}`)
    })
})()