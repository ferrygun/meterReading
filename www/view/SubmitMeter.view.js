sap.ui.jsview("sap.ui.demo.myFiori.view.SubmitMeter", {

	getControllerName : function() {
		return "sap.ui.demo.myFiori.view.SubmitMeter";
	},


	createContent : function(oController) {
				
		var app = new sap.m.App("SubmitMeter");

		var page = new sap.m.Page({
				enableScrolling : false,
				showHeader : true,
				showNavButton: true,
				navButtonPress : [ oController.doNavBack, oController ],
				backgroundDesign: sap.m.PageBackgroundDesign.Standard,
				customHeader : new sap.m.Bar({
					contentLeft : [ new sap.m.Button("BackButton2",{
						icon : "sap-icon://nav-back",
				        tooltip:"Back",
						tap : function() {  oController.doNavBack();}
				    }) ],
					contentMiddle : [ new sap.m.Label("title2", { text : "{i18n>appTitle}", design : "Bold"
					}) ]
				})
		});
		
		
		var oElectricity = new sap.m.Input("oElectricity",{
					type : "Number",
		})
		
		var oGas = new sap.m.Input("oGas",{
					type : "Number",
		})

		var SubmitForm = new sap.ui.layout.form.SimpleForm({
			minWidth : 1024,
			maxContainerCols : 3,
			editable: true,
			content : [
				new sap.ui.core.Title({ 
					text: "{i18n>submitmeter}"
				}),
				new sap.m.Label({
					text: '{i18n>electricityreading}'
				}),
				oElectricity,
				new sap.m.Button({
					text: "{i18n>scanelectricity}", 
					type: sap.m.ButtonType.Emphasized,						
					press: function () {oController.scanElectricMeter();}
				}),
				new sap.m.Label({
					text: '{i18n>gasreading}'
				}),
				oGas,
				new sap.m.Button({
					text: "{i18n>scangas}", 
					type: sap.m.ButtonType.Emphasized,						
					press: function () {oController.scanGasMeter();}
				}),

				new sap.m.Label({
					text: ''
				}),
				
				new sap.m.Button({
					text: "{i18n>submit}", 
					press: function () {oController.submitMeterReading(oElectricity.getValue(), oGas.getValue());}
				}),

				new sap.m.Button({
					text: "{i18n>reset}", 
					press: function () {oElectricity.setValue(''); oGas.setValue('');}
				}),
			]
		});



		page.addContent(SubmitForm);
		page.setEnableScrolling(false); 
		app.addPage(page);
		
	
		return app;
	}

});


