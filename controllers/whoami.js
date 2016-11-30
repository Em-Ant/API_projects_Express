module.exports = function (req, res) {

    // Match IPv4
    var ipMatch = req.ip.match(/::ffff:([\d.]+)/);

    var ip;

    if (ipMatch) {
      // IPv4
      ip = ipMatch[1];
    } else {
      // IPv6
      ip = req.ip;
    }

    // Match the first lang-code before ';'
    var langMatch = req.headers['accept-language'].match(/([\w-]+),?.*;/);
    var language;

    if (langMatch) {
      language = langMatch[1];
    } else {
      language = "unknown";
    }


    // Match the first string between parentheses, it is the OS related part
    var swMatch = req.headers['user-agent'].match(/\(([^\)]*)\)/);
    var software;

    if (swMatch) {
      software = swMatch[1];
    } else {
      software = 'unknown';
    }

    console.log(req.headers['user-agent'], swMatch);
    var answer = {
      "ipaddress": ip,
      "language": language,
      "software": software
    };

    res.json(answer);
  }