const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// create MySql Connectuin
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "perpustakaan"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

// ------------------------------ data siswa ------------------------------ //

app.get("/siswa", (req,res) => {
    let sql = "select * from siswa" 

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                siswa: result
            }
        }
        res.json(response)
    })
})

app.get("/siswa/:id_siswa", (req, res) => {
    let data = {
        id_siswa: req.params.id
    }
    let sql = "select * from siswa where id_siswa"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message 
            }
        } else { 
            response = {
                count: result.length, 
                siswa: result 
            }
        }
        res.json(response)
    })
})

app.post("/siswa", (req,res) => { 
    // prepare data
    let data = {
        nama_siswa: req.body.nama_siswa,
        kelas: req.body.kelas,
        absen: Number(req.body.absen)
    }

    // create sql query insert
    let sql = "insert into siswa set ?"

    // run query
    db.query(sql, data, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) 
    })
})

app.put("/siswa/:id_siswa", (req,res) => {

    let data = [
        {
            nama_siswa: req.body.nama_siswa,
            kelas: req.body.kelas,
            absen: Number(req.body.absen)
        },

        // parameter (primary key)
        {
            id_siswa: req.body.id_siswa
        }
    ]
    // create sql query update
    let sql = "update siswa set ? where ?"

    // run query 
    db.query(sql, data, (error, result) => {
        let response = null
        if(error) {
            response = {
                message: error.message
            }
        } else {
            response = {
            message: result.affectedRows + " data updated"
            }   
        }
        res.json(response) // send response
    })
})

app.delete("/siswa/:id_siswa", (req, res) => {
    let data = {
        id_siswa: req.params.id_siswa
    }

    let sql = "delete from siswa where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if(error){
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

// ------------------------------ data buku ------------------------------ //

app.get("/buku", (req,res) => {
    let sql = "select * from buku" 

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                jumlah_buku: result
            }
        }
        res.json(response)
    })
})

app.get("/buku/:id_buku", (req, res) => {
    let data = {
        id_buku: req.params.id
    }
    let sql = "select * from buku where id_buku"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message 
            }
        } else { 
            response = {
                count: result.length, 
                jumlah_buku: result 
            }
        }
        res.json(response)
    })
})

app.post("/buku", (req,res) => { 
    // prepare data
    let data = {
        judul_buku: req.body.judul_buku,
        jumlah_halaman: Number(req.body.jumlah_halaman),
        keterangan_kondisi: req.body.keterangan_kondisi
    }

    // create sql query insert
    let sql = "insert into buku set ?"

    // run query
    db.query(sql, data, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) 
    })
})

app.put("/buku/:id_buku", (req,res) => {

    let data = [
        {
            judul_buku: req.body.judul_buku,
            jumlah_halaman: Number(req.body.jumlah_halaman),
            keterangan_kondisi: req.body.keterangan_kondisi
        },

        // parameter (primary key)
        {
            id_buku: req.body.id_buku
        }
    ]
    // create sql query update
    let sql = "update buku set ? where ?"

    // run query 
    db.query(sql, data, (error, result) => {
        let response = null
        if(error) {
            response = {
                message: error.message
            }
        } else {
            response = {
            message: result.affectedRows + " data updated"
            }   
        }
        res.json(response) // send response
    })
})

app.delete("/buku/:id_buku", (req, res) => {
    let data = {
        id_buku: req.params.id_buku
    }

    let sql = "delete from buku where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if(error){
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

app.listen(1000, () => {
    console.log("Run on port 1000")
})
