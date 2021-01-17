const path = require("path");
const fs = require("fs");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "log",
    "log.json"
);
exports.webHookGet = (req, res, next) => {
    console.log(req.body);
    fs.writeFile('log.json', JSON.stringify(req.body), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      res.send("s");
};
