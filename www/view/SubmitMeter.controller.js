sap.ui.controller("sap.ui.demo.myFiori.view.SubmitMeter", {

	onInit : function() {
		var oBus = new sap.ui.getCore().getEventBus();
        oBus.subscribe("nav", "to", this.handleFetchDetails, this);
    },
    
    handleFetchDetails : function(sCannelID, sEvtId, oData) {
        var oContext = oData.data.context;

        if (oContext) {
            this.getView().setBindingContext(oContext);
        }
    },

   
	doNavBack: function(event) {
		app.ref.AppView.app.back();
    }, 
		
	onError: function(error) {
        //called if an error occurred or the user canceled the scanning
        if (error == "Canceled") {
          //do stuff when user has canceled
          // this can be used as an indicator that the user finished the scanning if canclelOnResult is false
          console.log("Energy scanning canceled");
          return;
        }

        sap.ui.commons.MessageBox.alert(error);
    },

	 energyConfig: [
        "eyJzY29wZSI6WyJFTkVSR1kiXSwicGxhdGZvcm0iOlsiQW5kcm9pZCJdLCJ2YWxpZCI6" +
        "IjIwMTYtMDktMjMiLCJtYWpvclZlcnNpb24iOiIzIiwiaXNDb21tZXJjaWFsIjpmYWxz" +
        "ZSwidG9sZXJhbmNlRGF5cyI6NjAsImlvc0lkZW50aWZpZXIiOlsiY29tLmVudGVycHJp" +
        "c2Vtb2JpbGl0eS5tZXRlclJlYWRpbmciXSwiYW5kcm9pZElkZW50aWZpZXIiOlsiY29t" +
        "LmVudGVycHJpc2Vtb2JpbGl0eS5tZXRlclJlYWRpbmciXSwid2luZG93c0lkZW50aWZp" +
        "ZXIiOlsiY29tLmVudGVycHJpc2Vtb2JpbGl0eS5tZXRlclJlYWRpbmciXX0KbDhCZUZ6" +
        "NDRsQmxBNjN6ZWhGbmhkUE5SeUJDOVVnWnZzVW9lQ2p5bDZ2T0RVSGFZbkZHa2xsaThX" +
        "cng0bzZDdjV4V0VlbjlIZExwdlA2emdiZFFLdjY2ZnUyR2dULy8zYkpDZzRyVW9lOTdz" +
        "ekZDNVppNDJjRVlGTVRaYmJvajZkNTVTUW5vd0dVTk02eUE1bzNqdnRKRGNSZkpFS2o0" +
        "bC9CMHBSd1FucTQ0YXgzazJuUEFWU21waFJRVkVpSzduTDBqbmFXVXZYOWJGMWtSMVVa" +
        "YnMyNmtLNDVJSk5EQUhtcnJwZzZuYzViUTNibWloZXlpejhOK3RRSFhqbE5BbDl0ZG8v" +
        "dXJFMmx2U3FHV0F1MVdQbmY2eHFDcHExOFU0Qmh2L3dLbEJLNFZyV1FXZ0dWU2ZuVnky" +
        "UW1laXVyMDVMMG9pUVV2QUIyYkhIWnNhL3IrdGVnPT0=",

        {
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
        }
    ],
    
    scanElectricMeter: function() {
		// start the Energy scanning for electric-meters
		// pass the success and error callbacks, as well as the license key and the config to the plugin
		// see http://documentation.anyline.io/#anyline-config for config details
		// and http://documentation.anyline.io/#energy for energy-module details
		cordova.exec(function(result){
			if(result.meterType=="Electric Meter") {
				electricity = result.reading;
				sap.ui.getCore().byId("oElectricity").setValue(electricity);
				
			}
		}, this.onError, "AnylineSDK", "scanElectricMeter", this.energyConfig);
		

    },

	scanGasMeter: function() {
		// start the Energy scanning for electric-meters
		// pass the success and error callbacks, as well as the license key and the config to the plugin
		// see http://documentation.anyline.io/#anyline-config for config details
		// and http://documentation.anyline.io/#energy for energy-module details
		cordova.exec(function(result){
			if(result.meterType=="Gas Meter") {
				gas = result.reading;
				sap.ui.getCore().byId("oGas").setValue(gas);
			}
		}, this.onError, "AnylineSDK", "scanGasMeter", this.energyConfig);
		
    },

	submitMeterReading: function(electricity, gas) {

		if (electricity=="" || gas=="")	{
			sap.ui.commons.MessageBox.alert("Please enter the Electricity & Gas meter reading");
		} else if((parseInt(electricity) <= 0) || (parseInt(gas) <= 0)) {
			sap.ui.commons.MessageBox.alert("Please enter a valid value");
		} else {
			electricity = electricity.replace(/\b0+/g, "");
			electricity = electricity.toString();

			gas = gas.replace(/\b0+/g, "");
			gas = gas.toString();

			var sUrl = "https://powerwebappp057134trial.hanatrial.ondemand.com:443/PowerWebApp/PowerOData.svc/Powers";  
			var sUrl_ = "?$format=json";

			var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
			var d = new Date();
			var month = monthNames[d.getMonth()];
			var year = d.getFullYear();
			var month = month + " " + year;
			var errorf = 0;

			$.ajax({
				type: 'GET',
				async: true,
				cache: false,
				url: sUrl + sUrl_,
				success: function (data) {
					for (z=0; z<data.d.results.length; z++){
						if(data.d.results[z].Month == month) {
							errorf = 1;
						}
					}

					if(errorf == 0) {
						var formData = {Id:"0", Month:month, Electricity:electricity, Gas:gas};

						var aData = jQuery.ajax({
							type : "POST",
							beforeSend: function (xhr) {
								xhr.setRequestHeader("Content-Type","application/json");
							},
							url : sUrl,
							data: JSON.stringify(formData),
							dataType: "json",
							async: false, 
							success : function(data,textStatus, jqXHR) {
								sap.ui.commons.MessageBox.alert("Meter reading has been submitted successfully");
							},
							error : function(data,textStatus, jqXHR) {
								sap.ui.commons.MessageBox.alert("Error. Meter reading cannot be submitted");
							}
						});
					
					} else {
						sap.ui.commons.MessageBox.alert("You have already submitted the meter reading for " + month);
					}
					
				},
				error: function(jqXHR, textStatus, errorThrown) { 
					sap.ui.commons.MessageBox.alert("Error: " + textStatus);		
				},
			});
		
		}

    },

});
