app.get('/api/productos', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query('SELECT * FROM productos', (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})

app.post('/api/eliminar', (req, res) => {
	const { id } = req.body
	var connection = mysql.createConnection(credentials)
	connection.query('DELETE FROM productos WHERE id = ?', id, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Usuario Eliminado" })
		}
	})
	connection.end()
})

app.post('/api/guardar', (req, res) => {
	const { avatar, nombre, tipo } = req.body
	const params = [[avatar, nombre, tipo]]
	var connection = mysql.createConnection(credentials)
	connection.query('INSERT INTO productos (avatar, nombre, tipo) VALUES ?', [params], (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "producto creado" })
		}
	})
	connection.end()
})

app.post('/api/editar', (req, res) => {
	const { id, avatar, nombre, tipo } = req.body
	const params = [avatar, nombre, tipo, id]
	var connection = mysql.createConnection(credentials)
	connection.query('UPDATE productos set avatar = ?, nombre = ?, tipo = ? WHERE id = ?', params, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "USuario editado" })
		}
	})
	connection.end()
})

app.listen(4000, async () => {
	const ascified = await asciify('helmet.png', { fit: 'box', width: 10, height: 10 })
	console.log(ascified)
	console.log(figlet.textSync('Samus Server v. 1.0.0'))
})
