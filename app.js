const childProcess = require('child_process');

exports.ps_all = () => {
    return new Promise((resolve, reject) => {
        childProcess.exec('docker ps -a --format "{{.ID}}{blank}{{.Ports}}{blank}{{.Image}}{blank}{{.CreatedAt}}{blank}{{.Status}}"', (err, stdout) => {
            if (err) {
                reject(err);
            } else {
                var output = [];
                var test = stdout.split('\n');
                test.forEach(result => {
                    result = result.split('{blank}');
                    if (result[0]) {
                        output.push({
                            id: result[0],
                            port: result[1],
                            image: result[2],
                            created: result[3],
                            status: result[4]
                        });
                    }
                });
                resolve(output);
            }
        });
    });
}

exports.stats = container_id => {
    return new Promise((resolve, reject) => {
        childProcess.exec('docker stats --no-stream --format "{{.Container}}{blank}{{.CPUPerc}}{blank}{{.MemUsage}}{blank}{{.MemPerc}}{blank}{{.NetIO}}{blank}{{.BlockIO}}" | grep ' + container_id, (err, stdout) => {
            if (err) {
                reject(err);
            } else {
                let result = stdout.split('{blank}');
                resolve({
                    container_id: result[0],
                    cpu_perc: result[1],
                    mem_usage: {
                        used: result[2].split('/')[0].trim(),
                        limit: result[2].split('/')[1].trim()
                    },
                    mem_perc: result[3],
                    net_io: {
                        in: result[4].split('/')[0].trim(),
                        out: result[4].split('/')[1].trim()
                    },
                    block_io: {
                        in: result[5].split('/')[0].trim(),
                        out: result[5].split('/')[1].trim()
                    }
                });
            }
        });
    });
}

exports.images = () => {
    return new Promise((resolve, reject) => {
        childProcess.exec('docker images -a --format "{{.ID}}{blank}{{.Repository}}{blank}{{.Tag}}{blank}{{.Size}}{blank}{{.CreatedAt}}"', (err, stdout) => {
            if (err) {
                reject(err);
            } else {
                var output = [];
                var images = stdout.split('\n');
                images.forEach(image => {
                    image = image.split('{blank}');
                    if (image[0]) {
                        output.push({
                            id: image[0],
                            repository: image[1],
                            tag: image[2],
                            size: image[3],
                            created: image[4]
                        });
                    }
                });
                resolve(output);
            }
        });
    });
}

exports.rm = container_id => {
    return new Promise((resolve, reject) => {
        childProcess.exec('docker rm ' + container_id, (err, stdout) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.rmi = image_id => {
    return new Promise((resolve, reject) => {
        childProcess.exec('docker rmi ' + image_id, (err, stdout) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.start = container_id => {
    return new Promise((resolve, reject) => {
        childProcess.exec('docker start ' + container_id, (err, stdout) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
    });
}

exports.stop = container_id => {
    return new Promise((resolve, reject) => {
        childProcess.exec('docker stop ' + container_id, (err, stdout) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
    });
}
