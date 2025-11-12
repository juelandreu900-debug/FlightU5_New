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

    var oContext = oItem.getBindingContext("flightDataModel");
    var sCarrid = oContext.getProperty("Carrid");

    this.getOwnerComponent().getRouter().navTo("Detail", {
        Carrid: sCarrid
     });
        }
    });
});