/*
 * Anyline Cordova Plugin
 * anyline.mrz.js
 *
 * Copyright (c) 2015 9yards GmbH
 */

if (anyline === undefined) {
    var anyline = {};
}
anyline.mrz = {
    onResult: function(result) {
        //this is called for every mrz scan result
        //the result is a json-object containing all the scaned values and check-digits

        console.log("MRZ result: " + JSON.stringify(result));
        var div = document.getElementById('results');

        div.innerHTML = "<p>"
          + "<img src=\"" + result.imagePath + "\" width=\"100%\" height=\"auto\"/><br/>"
          + "<b>Name:</b> " + result.surNames + " " + result.givenNames + "<br/>"
          + "<b>Type:</b> " + result.documentType + " <b>Number:</b> " + result.documentNumber
            + " <b>Country:</b> " + result.countryCode + "<br/>"
          + "<b>Day of Birth:</b> " + result.dayOfBirth + " <b>Expiration:</b> " + result.expirationDate
          + "</p>"
          + div.innerHTML;
    },

    onError: function(error) {
        //called if an error occurred or the user canceled the scanning
        if (error == "Canceled") {
          //do stuff when user has canceled
          // this can be used as an indicator that the user finished the scanning if canclelOnResult is false
          console.log("MRZ scanning canceled");
          return;
        }

        alert(error);
    },

    scan: function() {
        // start the MRZ scanning
        // pass the success and error callbacks, as well as the license key and the config to the plugin
        // see http://documentation.anyline.io/#anyline-config for config details
        // and http://documentation.anyline.io/#barcode for barcode module details

        cordova.exec(this.onResult, this.onError, "AnylineSDK", "scanMRZ", ["f16bd60a02efe73fa247033061977375", {
          "captureResolution": "1080p",

          "cutout": {
            "style": "rect",
            "maxWidthPercent": "90%",
            "maxHeightPercent": "90%",
            "alignment": "top_half",
            "strokeWidth": 2,
            "cornerRadius": 4,
            "strokeColor": "FFFFFF",
            "outerColor": "000000",
            "outerAlpha": 0.3
          },
          "flash": {
            "mode": "manual",
            "alignment": "bottom_right"
          },
          "beepOnResult": true,
          "vibrateOnResult": true,
          "blinkAnimationOnResult": true,
          "cancelOnResult": true
        }]);
    }
};
