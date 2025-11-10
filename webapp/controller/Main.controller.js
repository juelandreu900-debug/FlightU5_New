sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("flightui5jn.controller.Main", {
        onInit() {
           
            var oFlightJSONModel = new sap.ui.model.json.JSONModel();
            var that = this;
            //read the data from Back End (READ_GET_ENTITYSET)
            var oDataModel = this.getOwnerComponent().getModel();
            var sPath = "/FlightJN";
            oDataModel.read(sPath, {
                sorters: [new sap.ui.model.Sorter("Carrname", false)],
                success: function (oresponse) {
                    console.log(oresponse);
                    //attach the data to the model
                    oFlightJSONModel.setData(oresponse.results);
                    //attach the Model to the View
                    that.getView().setModel(oFlightJSONModel, "flightDataModel");
                },
                error: function (oerror) { },
            });
           
        },
        onNavToEmpl: function (oEvent) {
    var oItem = oEvent.getSource();
    var oContext = oItem.getBindingContext(); // default OData model

    if (!oContext) {
        sap.m.MessageToast.show("No context");
        return;
    }

    // Use EXACT property names from metadata: Carrid and Connid
    var sCarrid = oContext.getProperty("Carrid");
    var sConnid = oContext.getProperty("Connid");  // ← This was your bug!

    // Debug (remove later)
    console.log("Carrid:", sCarrid, "Connid:", sConnid);

    if (!sCarrid || !sConnid) {
        sap.m.MessageToast.show("Missing Carrid or Connid");
        return;
    }
    

    var oRouter = this.getOwnerComponent().getRouter();
    oRouter.navTo("Detail", {
        DetailId: sCarrid,
        Connid: sConnid          // ← Must match route pattern exactly
    });
},

    });
});