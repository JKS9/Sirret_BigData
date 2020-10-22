const csvSplitStream = require('csv-split-stream')
const fs = require('fs')
let file = []
const dir = 'src/data/';
let nbFile = {}
console.time("time parse")
csvSplitStream.split(
	fs.createReadStream('dataMain.csv'),
	{
	lineLimit: 280000
	},
	(index) => fs.createWriteStream(`src/data/${index}.csv`)
)
.then(csvSplitResponse => {
	console.log('csvSplitStream succeeded.', csvSplitResponse)

	const length = fs.readdirSync('src/data').length

	for (i=0; i <= length-1; i++) {
		filesInfo = {
				"id": i,
				"status":null,
				"ligne":0,
				"end":0
			}
		file.push(filesInfo)
	}
	const json = JSON.stringify(file)

	fs.writeFile('queu.json', json, function (err) {
		if (err) return console.log(err)
	});
	console.timeEnd("time parse")
	
}).catch(csvSplitError => {
	console.log('csvSplitStream failed!', csvSplitError)
})

