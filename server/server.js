const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const path = require('path')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/thanks', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'thanks.html'))
})

app.post('/submit', (req, res) => {
	const dataObject = req.body
	const dataString = `{\n name: ${dataObject.name},\n telegram: ${dataObject.telegram},\n email: ${dataObject.email}\n}\n`

	fs.appendFile(path.join(__dirname, '/data.txt'), dataString, err => {
		if (err) {
			console.error("Couldn't write to file: ", err)
			return res.status(500).send('Server Error')
		}
		res.redirect('/thanks')
	})
})

app.get('/download', function (req, res) {
	const filePath = path.join(__dirname, '/data.txt')
	res.download(filePath)
})

app.listen(3000, () => {
	console.log('App listening on port 3000')
})
