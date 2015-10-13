sap.ui.controller("sap.ui.demo.myFiori.view.Chart", {

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

	
	RefreshData: function() {
		var sUrl = "https://powerwebappp057134trial.hanatrial.ondemand.com/PowerWebApp/PowerOData.svc/Powers?$format=json";
		oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(1000);
		var electricity = [];
		var gas = [];
		var lastMonthE = [];
		var lastMonthG = [];
		var diffE;
		var diffG;
		var Data = [];
		$.ajax({
			type: 'GET',
			async: true,
			cache: false,
			url: sUrl,
			success: function (data) {
				for (z=0; z<data.d.results.length; z++){
					diffE = parseInt(data.d.results[z].Electricity) - parseInt(lastMonthE[z-1]);
					diffG = parseInt(data.d.results[z].Gas) - parseInt(lastMonthG[z-1]);
					electricity[z]= diffE;
					gas[z]= diffG;
					if(z>0) {
						Data.push({id: data.d.results[z].Id, month: data.d.results[z].Month, electricity: diffE, gas: diffG});
					}
					lastMonthE[z] = data.d.results[z].Electricity;
					lastMonthG[z] = data.d.results[z].Gas;
				}
				oModel.setData({
					modelData1 : Data
				});
				oModel.refresh();
			},
			error: function(jqXHR, textStatus, errorThrown) { 
			},
		});
		
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({    
			dimensions : [     
			  {axis : 1,name : 'Month',value : "{month}"}     
			],    
			measures : [     
			  {name : 'Electricity',value : '{electricity}'},
			  {name : 'Gas',value : '{gas}'}  
			],    
			data : {path : "/modelData1"}
		});  

		var legendPosition = new sap.viz.ui5.types.Legend({layout: {  
			position: "bottom"  
		}}); 
	
		var oBarChart = new sap.viz.ui5.Column({
			width : "100%",
			height : "600px",
			title : {
				visible : true,
				text : '{i18n>appChart}'
			},
			dataset : oDataset,
			legendGroup: legendPosition  
		});
		oBarChart.setModel(oModel);
		return oBarChart;
	}

});
