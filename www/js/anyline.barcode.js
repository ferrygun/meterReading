/*
 * Anyline Cordova Plugin
 * anyline.barcode.js
 *
 * Copyright (c) 2015 9yards GmbH
 */

if (anyline === undefined) {
    var anyline = {};
}
anyline.barcode = {

    onResult: function(result) {
        //this is called with result of the barcode module
        //the result is a string containing the barcode

        var div = document.getElementById('results');
        console.log("Barcode result: " + JSON.stringify(result));


        div.innerHTML = "<p>"  + "<img src=\"" + result.imagePath + "\" width=\"100%\" height=\"auto\"/><br/>"
            + "<b>Barcode:</b> " + result.value + "</p>" + div.innerHTML;
    },

    onError: function(errorMessage) {
        //called if an error occurred or the user canceled the scanning
        if (errorMessage == "Canceled") {
          //when user has canceled
          // this can be used as an indicator that the user finished the scanning if canclelOnResult is false
          console.log("Barcode scanning canceled");
          return;
        }

        alert(error);
    },

    scan: function() {
        // start the barcode scanning
        // pass the success and error callbacks, as well as the license key and the config to the plugin
        // see http://documentation.anyline.io/#anyline-config for config details
        // and http://documentation.anyline.io/#barcode for barcode module details

        cordova.exec(this.onResult, this.onError, "AnylineSDK", "scanBarcode", ["f16bd60a02efe73fa247033061977375", {
          "captureResolution": "720p",

          "cutout": {
            "style": "rect",
            "maxWidthPercent": "80%",
            "maxHeightPercent": "80%",
            "alignment": "center",
            "ratioFromSize": {
              "width": 100,
              "height": 80
            },
            "strokeWidth": 4,
            "cornerRadius": 10,
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
          "cancelOnResult": false
        }]);
    }
};
