let formidable = require('formidable');
let fs = require('fs');
module.exports = {
    UploadAnh: function (req, res) {
        var form = new formidable.IncomingForm();
        form.uploadDir = './uploads';
        form.keepExtensions = true;
        form.maxFieldsSize = 10 * 1024 * 1024 //10 MB
        form.multiples = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.status(200).json({
                    status: 'fail',
                    data: {},
                    message: 'Không upload được ảnh . Lỗi là : ' + err
                });
            }
            var arrayOfFiles = [];
            if (files[""] instanceof Array) {
                arrayOfFiles = files[""];
            } else {
                arrayOfFiles.push(files[""]);
            }
            if (arrayOfFiles.length > 0) {
                var fileNames = [];
                arrayOfFiles.forEach(element => {
                    fileNames.push(element.path.split('\\')[1]);
                });
                res.status(200).json({
                    status: 'success',
                    data: fileNames,
                    numberOfImages: fileNames.length,
                    message: 'Upload ảnh thành công'
                });
            } else {
                res.status(200).json({
                    status: 'fail',
                    data: {},
                    numberOfImages: 0,
                    message: 'Không có ảnh nào được upload !'
                });
            }

        })
    },

    OpenImage: function (req, res) {
        let imgName = 'uploads/' + req.query.imgName;
        fs.readFile(imgName, (err, imgData) => {
            if (err) {
                res.status(200).json({
                    status: 'fail',
                    message: `Không đọc được ảnh . Lỗi là :  + ${err}`
                })
            }
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(imgData);
        })
    }
}