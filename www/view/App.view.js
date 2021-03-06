sap.ui.jsview("sap.ui.demo.myFiori.view.App", {

	getControllerName: function () {
		return "sap.ui.demo.myFiori.view.App";
	},
	
	createContent: function (oController) {

		jQuery.sap.declare("app.ref.AppView"); 
		app.ref.AppView = this;
		
		
		 // set i18n model
        var oI18nModel = new sap.ui.model.resource.ResourceModel({
            bundleUrl: "res/i18n.properties"
        });
        sap.ui.getCore().setModel(oI18nModel, "i18n");
        this.setModel(oI18nModel, "i18n");

        // set device model
        var oDeviceModel = new sap.ui.model.json.JSONModel({
            isTouch: sap.ui.Device.support.touch,
            isNoTouch: !sap.ui.Device.support.touch,
            isPhone: sap.ui.Device.system.phone,
            isNoPhone: !sap.ui.Device.system.phone,
            listMode: (sap.ui.Device.system.phone) ? "None" : "SingleSelectMaster",
            listItemType: (sap.ui.Device.system.phone) ? "Active" : "Inactive"
        });
        oDeviceModel.setDefaultBindingMode("OneWay");
        sap.ui.getCore().setModel(oDeviceModel, "device");
        this.setModel(oDeviceModel, "device");

        // to avoid scrollbars on desktop the root view must be set to block display
        this.setDisplayBlock(true);
        
		
        this.app = new sap.m.App({
        });

        // set model
        oModel = new sap.ui.model.json.JSONModel("model/mock.json");
        oModel.setSizeLimit(300);
				        
        //this.app.addPage(page, true);
		this.app.addPage(sap.ui.jsview("homepage", "sap.ui.demo.myFiori.view.Homepage"), true);
		this.app.addPage(sap.ui.jsview("submitmeter", "sap.ui.demo.myFiori.view.SubmitMeter"), false);
		this.app.addPage(sap.ui.jsview("chart", "sap.ui.demo.myFiori.view.Chart"), false);

        
		return this.app;
	}

});


