sap.ui.jsview("sap.ui.demo.myFiori.view.Chart", {

	getControllerName : function() {
		return "sap.ui.demo.myFiori.view.Chart";
	},


	createContent : function(oController) {
				
		var app = new sap.m.App("Chart");
		
		var oPage = new sap.m.Page({
			title:"{i18n>appTitle}",
			showNavButton:true,
			enableScrolling: true,
			customHeader : new sap.m.Bar({
				contentLeft : [ new sap.m.Button("BackButton",{
					icon : "sap-icon://nav-back",
				    tooltip:"Back",
					tap : function() {  oController.doNavBack();}
				   }) ],
				contentRight : [ new sap.m.Button("RefreshButton",{
				    icon : "sap-icon://refresh",
					tooltip: "Refresh Data",
					tap : function() {  
						oPage.removeAllContent();
						oPage.addContent(oController.RefreshData());
					}
				}) ],
				contentMiddle : [ new sap.m.Label("title", { text : "{i18n>appTitle}", design : "Bold"
					}) ]
				}),
		});

		oPage.addContent(oController.RefreshData());
		app.addPage(oPage);
		return app;
	}

});


