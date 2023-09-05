const express = require('express');
const connectToMongo = require('./db'); // Use the correct path

const app = express();
const port = 5000;

connectToMongo();

app.use(express.json())
// app.get('/', (req, res) => {
//   res.send('Hello Priya!');
// });

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {    
  console.log(`Example app listening on port ${port}`);   
});   