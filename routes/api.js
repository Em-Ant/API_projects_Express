var router = require('express').Router();

var multer = require('multer');
// here on HyperDev the fs is read only,
// You have to upload the file to memory
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var timestampController = require('../controllers/timestamp');
var whoamiController = require('../controllers/whoami');
var shurlAdd = require('../controllers/shorturl').addUrl;
var shurlRedirect = require('../controllers/shorturl').redirect;
var searchImages = require('../controllers/imgsearch').searchImages;
var getLatestSearches = require('../controllers/imgsearch').getLatestSearches;
var fileanalyse = require('../controllers/fileanalyse');

router.get("/timestamp/:date?", timestampController);

router.get("/whoami", whoamiController);

router.post("/shurl/new", shurlAdd);
router.get("/shurl/:id", shurlRedirect);

router.get("/imgsearch/latest", getLatestSearches);
router.get("/imgsearch/:what", searchImages);

router.post('/fileanalyse',upload.single('upfile'),fileanalyse);

router.use(function(req, res, next){
  res.status(404).json({error: 'Not Found'});
})
module.exports = router;
