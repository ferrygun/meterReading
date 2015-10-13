sap.ui.controller("sap.ui.demo.myFiori.view.Homepage", {

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
    
	onNavButtonToSubmitMeter: function(evt, data) {
		var bindingContext = evt.getSource().getBindingContext(); 
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", { 
			id : "submitmeter",
			data : {
				context: data
			}
		});

	},
	
	onNavButtonToChart: function(evt, data) {
		var bindingContext = evt.getSource().getBindingContext(); 

		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", { 
			id : "chart",
			data : {
				context : data 
			}
		});
	},

	
});
