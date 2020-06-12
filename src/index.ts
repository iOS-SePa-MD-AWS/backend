import * as http from "http"
import { app } from "./app/app"

(async ()=>{
    const port = process.env.APP_PORT || 3000
    const server = http.createServer(app)
    server.listen(port, () => {
        console.log(`Server is running at port: ${port}`)
    })
})()