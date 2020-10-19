const pm2 = require('pm2');
const fs = require('fs');
const { exec } = require("child_process");

const length = fs.readdirSync('src/data').length
const dirData = "/Users/jks/Documents/DEV/PRO/BigData/src/data"
let nb
let FileList = []

fs.readdir(dirData,(err, files) => {
    if(err) throw err;

    files.map(file => {
        const numbers = file.split('.');
        FileList.push(numbers[0])
    })
})

pm2.connect(function(err) {
    if (err) {
      console.error(err)
      process.exit(2)
    } 

    FileList.sort(function(a, b) {
        return a - b
    })

    for (i = 0; i < 5; i++) {
        const config = {
            name: i+'.csv',
            script    : 'script.js',
            exec_mode : 'cluster',
            instances : "1", 
            args: String(i)
        }
        pm2.start(config, (err,apps) => {
            if (err) {
                console.log(err)
            }
        })
				console.log('prosses : '+ i +' started')
				nb = i
			}

    pm2.launchBus(function(err, bus) {
        bus.on('worker:end', function(packet) {
          const id = packet.data.id
          const worker = packet.process.pm_id

					pm2.delete(worker)
					console.log("porcess "+worker+" FINISHED")

					nb = nb +1
					if (nb <= 9-1 ) {
						const config = {
							name: nb+'.csv',
							script    : 'script.js',
							exec_mode : 'cluster',
							instances : "1", 
							args: String(nb)
						}
						pm2.start(config, (err,apps) => {
								if (err) {
										console.log(err)
								}
						})
						console.log('prosses : '+ nb +' started')
					} else {
						exec("pm2 kill", (error, stdout, stderr) => {
							if (error) {
									console.log(`error: ${error.message}`)
									return
							}
							if (stderr) {
									console.log(`stderr: ${stderr}`)
									return
							}
							console.log(`stdout: ${stdout}`)
						})
						process.exit()
					}
					
        })
    })
})
