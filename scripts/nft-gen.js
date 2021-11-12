const { createCanvas } = require("canvas");
require("dotenv").config();
const {Readable} = require("stream")
const pinataSDK = require("@pinata/sdk");
const pinataKeys = JSON.parse(process.env.PINATA);
const pinata = pinataSDK(pinataKeys["api_key"], pinataKeys["api_secret"]);

module.exports.image_gen = function (name) {
	const fs = require("fs");

	const width = 500;
	const height = 500;

	const canvas = createCanvas(width, height);
	const context = canvas.getContext("2d");

	context.fillStyle = "yellow";
	context.fillRect(0, 0, width, height);

	context.fillStyle = "#000";
	context.font = "72px Arial";
	context.textAlign = "center";
	context.fillText(name, 250, 250);

	const buffer = canvas.toBuffer("image/png");
    return buffer
	//fs.writeFileSync("./image.png", buffer);
};

//module.exports.image_gen("ethr.me");
const axios = require("axios");
module.exports.uploadImage = (image) => {
    image = Readable.from(image.toString())
    image.path = "image.png"
    console.log(image)
	const options = {
        pinataMetadata: {
            name: "domain",

        },
        pinataOptions: {
            cidVersion: 0,
            
        }
    };
    pinata.pinFileToIPFS(image, options).then((result) => {
        //handle results here
        console.log(result);
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
};
module.exports.uploadImage(module.exports.image_gen("ethrx.me"));
