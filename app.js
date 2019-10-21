const met = require ('./met.js')
const express = require ('express')

const app = express ()
const port = process.env.PORT || 3000

app.get ('/students/:id', function (req, res) {
    res.setHeader ('Acces-Control-Allow-Origin', '*')
    
	if (req.params.id != 'A00817562') {
		return res.send ({
			error: 'Matricula Incorrecta! Verifica la matricula.'
		})
    }
    
    const response ={
        "id": "A00817562",
        "fullname": "Diego Ivan Valadez Lozano",
        "nickname": "Vala19",
        "age": 23,
        "hobbies": ["Leer", "Jugar videojuegos", "Programar"],
        "ciudad": "Monterrey"
    }

    return res.send ({
        students: response
    })
})

app.get ('/met', function (req, res) {
    res.setHeader ('Acces-Control-Allow-Origin', '*')
    
	if (!req.query.search) {
		return res.send({
			error: 'Tienes que dar un objeto valido'
		})
    }
    
	met.getObjectID (req.query.search, function (error, response) {
		if (error) {
			return res.send ({
				error: error
			})
        } else {
            met.getObjectInfo (response.objectID, function (error, info) {
                if (error) {
                    return res.send ({
                        error: error
                    })
                } else {
                    info.searchTerm = req.query.search
                    
                    return res.send(info)
                }
            })
        }
	})
})

app.get ('/', function (req, res) {
    res.send ('Bienvenido al proyecto del segundo parcial!')
})

app.get ('*', function (req, res) {
    res.send( {
        error: 'Error 500: Esta ruta no existe'
    })
}) 

app.listen (port, function () {
    console.log ('Up and running')
})