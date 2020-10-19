const pm2 = require('pm2')
const fs = require('fs')
const csv = require('csv-parser')
const mongoose = require('mongoose')

const dirData = "/Users/jks/Documents/DEV/PRO/BigData/src/data"

const host = `mongodb://127.0.0.1:27017/sirret`
const connect = mongoose.createConnection(host, { useNewUrlParser: true, useUnifiedTopology: true })
const db = connect.collection('sirret');


console.log("hello my number is "+process.argv[2]+ " / and my name is ", process.argv[2])

if(!process.argv[2]) {
    console.log("ficher non trouvé")
    return false
}

const id = process.argv[2]

const results = []
fs.createReadStream(dirData+"/"+process.argv[2]+'.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        db.insertMany(results, function(err,result) {
            if (err) {
                console.log("echec de l'ajout");
            }else{
                process.send({
                    type: 'worker:end',
                    data: {
                        id : id
                    }
                })
            }
        })
    })