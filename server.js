const express = require('express')
const cors = require('cors')
require('dotenv').config()

const multer = require('multer')
const upload = multer()

const app = express()

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {

  if (!req.file) return res.status(400).json({ msg: 'Please choose a file to upload' })

  const { originalname, mimetype, size } = req.file

  res.status(200).json({ 
    name: originalname,
    type: mimetype,
    size
   })
})

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html')
})




const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
})
