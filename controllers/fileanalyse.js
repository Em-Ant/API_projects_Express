'use strict';

module.exports = function (req, res) {
  // return file metadata
  res.json({
    'name' : req.file.originalname,
    'type' : req.file.mimetype,
    'size' : req.file.size
  });
}


