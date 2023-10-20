const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const path = require('path')

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/submit', (req, res) => {
	const data = JSON.stringify(req.body)
	console.log(data)
	fs.open('/usr/src/app/data.txt', 'a', (err, fd) => {
		if (err) {
			console.error("Couldn't open the file: ", err)
			return res.status(500).send('Server Error1')
		}
		fs.write(fd, data, err => {
			if (err) {
				console.error("Couldn't write to the file: ", err)
				return res.status(500).send('Server Error2')
			}
			fs.close(fd, err => {
				if (err) {
					console.error("Couldn't close the file: ", err)
					return res.status(500).send('Server Error3')
				}
				res.send('Data written')
			})
		})
	})
})

app.listen(3000, () => {
	console.log('App listening on port 3000')
})
