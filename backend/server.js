import dotenv from 'dotenv';
import connectDB from './DB/connectDB.js';
import {app} from './app.js'
import chalk from 'chalk';

dotenv.config({ path: './backend/.env' });

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello from the backend');
})

connectDB()
.then(()=>{
    const server = app.listen(PORT,()=>{
        console.log(chalk.green(`Server is Running at PORT : ${process.env.PORT} `))
    })
    server.on('error',error=>{
        console.log(chalk.red('ERROR: ',error))
    })
})
