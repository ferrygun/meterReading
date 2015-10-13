/*
 * Anyline Cordova Plugin
 * anyline.energy.js
 *
 * Copyright (c) 2015 9yards GmbH
 */

if (anyline === undefined) {
    var anyline = {};
}
anyline.energy = {
    onResult: function(result) {
        //this is called for every energy scan result
        //the result is a json-object containing the reading the meter type and a path to a cropped and a full image.

        console.log("MRZ result: " + JSON.stringify(result));
        var div = document.getElementById('results');

        div.innerHTML = "<p>"
          + "<img src=\"" + result.imagePath + "\" width=\"100%\" height=\"auto\"/><br/>"
          + "<b>" + result.meterType + ":</b> " + result.reading
          + "</p>"
          + div.innerHTML;
    },

    onError: function(error) {
        //called if an error occurred or the user canceled the scanning
        if (error == "Canceled") {
          //do stuff when user has canceled
          // this can be used as an indicator that the user finished the scanning if canclelOnResult is false
          console.log("Energy scanning canceled");
          return;
        }

        alert(error);
    },

    energyConfig: ["7Ra31x6m0abV8F7A9B0Gdl2j5A813Z47be2GaJbUcV2Ab573ae275fa", {
      "captureResolution": "720p",

      "cutout": {
        "style": "rect",
        "alignment": "top",
        "offset": {
            "x": 0,
            "y": 120
        },
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
    }],

    scanElectricMeter: function() {
      // start the Energy scanning for electric-meters
      // pass the success and error callbacks, as well as the license key and the config to the plugin
      // see http://documentation.anyline.io/#anyline-config for config details
      // and http://documentation.anyline.io/#energy for energy-module details

      cordova.exec(this.onResult, this.onError, "AnylineSDK", "scanElectricMeter", this.energyConfig);
    },

    scanGasMeter: function() {
      // start the Energy scanning for gas-meters
      // pass the success and error callbacks, as well as the license key and the config to the plugin
      // see http://documentation.anyline.io/#anyline-config for config details
      // and http://documentation.anyline.io/#energy for energy-module details

      cordova.exec(this.onResult, this.onError, "AnylineSDK", "scanGasMeter", this.energyConfig);
    }
};
