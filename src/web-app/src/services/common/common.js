export function httpRequest(method, url, headers, body) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };

        if (Object.keys(headers).length > 0) {
            for (var key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }

        xhr.send(body);
    });
} 