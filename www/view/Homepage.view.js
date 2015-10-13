sap.ui.jsview("sap.ui.demo.myFiori.view.Homepage", {

	getControllerName : function() {
		return "sap.ui.demo.myFiori.view.Homepage";
	},


	createContent : function(oController) {
				
		var app = new sap.m.App("Homepage");

		var page = new sap.m.Page({
				enableScrolling : false,
				showHeader : true,
				showNavButton: true,
				backgroundDesign: sap.m.PageBackgroundDesign.Standard,
				customHeader : new sap.m.Bar({
					contentMiddle : [ new sap.m.Label("L1Title", { text : "{i18n>appTitle}", design : "Bold"
					}) ]
				}),				
				
		});
		
		

		function createTilesFromModel( oTileContainer, modelPath) {
			if (oTileContainer.hasModel() == false) {
				console.log("Error:" + oTileContainer);
				return;
			}
			
			var filter =  new sap.ui.model.Filter("PARENT_ID", sap.ui.model.FilterOperator.EQ, "1");
			var template = new sap.m.StandardTile({
				title: '{TEXT}',
				info: '{ME}',
				icon: '{ICON}',
				activeIcon: 'task',
				customData : [{
					  Type:"sap.ui.core.CustomData",
					    key:"OBJECT_ID",
					    value:"{OBJECT_ID}" 
					  },{
					  Type:"sap.ui.core.CustomData",
					    key:"TEXT",
					    value:"{TEXT}" 
					  }
				],
				tooltip: "{URL}",
				press: function (evt) {
					var sO = evt.getSource().data("OBJECT_ID");

					if(sO==1) {
						oController.onNavButtonToSubmitMeter(evt, sO);
					}
					if(sO==2) {
						oController.onNavButtonToChart(evt, sO);
					}
				}
			});
			
			oTileContainer.bindAggregation("tiles", {
				path: modelPath, filters: [filter], template: template   
			});
		

		}

		var MyTileContainer = new sap.m.TileContainer("L1Container");
		MyTileContainer.setModel(oModel);

		createTilesFromModel(MyTileContainer, "/modelData");

		
		page.addContent(MyTileContainer);
		page.setEnableScrolling(false); 
		app.addPage(page);
		return app;
	}

});
