function encodeBIGIP(ip) {
    var encodedIP = 0;
    var ipSegments = ip.split('.');

    // Ensure the 'ip' is a valid IP address format
    if (ipSegments.length !== 4) {
        throw 'IP address is invalid. It must be formatted like "x.x.x.x"';
        return;
    }

    /*
    * Where the format of the IP is a.b.c.d, the calculation is:
    * (a + (b * 256) + (c * 256 * 256) + (d * 256 * 256 * 256))
    */
    for (var i = 0; i < ipSegments.length; i++) {
        var n = (ipSegments[i] * Math.pow(256, i));
        encodedIP += n;
    }

    return encodedIP;
}

function decodeBIGIP(cookieValue) {
    var ipSegments = [];
    var sumOfIPSegments = 0;
    var encodedIP;

    if (typeof cookieValue === 'number') {
        cookieValue += '';
    }

    encodedIP = new Number(cookieValue.split('.')[0]);

    /*
    * Where the format of the IP is a.b.c.d, the calculation is:
    * a = (cookieValue % 256)
    * b = ((cookieValue - a) / 256) % 256
    * c = (((cookieValue - a - b) / 256) / 256) % 256
    * d = ((((cookieValue - a - b - c) / 256) / 256) / 256) % 256
    */
    for (var i = 0; i < 4; i++) {
        var ip = encodedIP;
        var n = Math.pow(256, i);

        ip -= sumOfIPSegments;
        ip = (ip / n);
        ip = (ip % 256);
        ip = Math.floor(ip);
        sumOfIPSegments += ip;
        ipSegments.push(ip);
    }

    return ipSegments.join('.');
}
