const express = require('express');
const connectToMongo = require('./db'); // Use the correct path
var cors = require('cors')
const app = express();
const port = 5000;

app.use(cors())
connectToMongo();

app.use(express.json())
// app.get('/', (req, res) => {
//   res.send('Hello Priya!');
// }); 

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {    
  console.log(`iNoteBook backend listening at  http://localhost:3000:${port}`);   
});   