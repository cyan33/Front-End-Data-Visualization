const http = require('http');

module.exports = (url) => {
    return new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
            console.log(res)
            res.setEncoding('utf8');
            const chunkDataList = [];
            res.on('data', (chunk) => {
                chunkDataList.push(chunk);
            });
            res.on('end', () => {

                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(JSON.parse(chunkDataList.join('')));
                } else {
                    reject(`[ ${res.statusCode} ] with ${postData.action} `);
                }
            });
        });

        req.on('error', (e) => {
            reject(`Catch error with ${e.message}`);
        });

        req.end();
    });
};
