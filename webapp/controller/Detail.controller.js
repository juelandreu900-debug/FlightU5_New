sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("flightui5jn.controller.Detail", {
      onInit() {
          var oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("Detail").attachPatternMatched(this._onRouteMatched, this);
/*            var oFlightJSONModel = new sap.ui.model.json.JSONModel();
            var that = this;
            //read the data from Back End (READ_GET_ENTITYSET)
            var oDataModel = this.getOwnerComponent().getModel();
            var sPath = "/zr_flight_det_jn";
            oDataModel.read(sPath, {
                success: function (oresponse) {
                    console.log(oresponse);
                    //attach the data to the model
                    oFlightJSONModel.setData(oresponse.results);
                    //attach the Model to the View
                    that.getView().setModel(oFlightJSONModel, "flightDataModel");
                },
                error: function (oerror) { },
                  });
*/                
          
           
      },
      _onRouteMatched: function (oEvent) {
      var oArgs = oEvent.getParameter("arguments");
      var oView = this.getView();

      console.log("Detail route matched with ID:", oArgs.DetailId);

      var sPath = `/zr_flight_det_jn(Carrid='${oArgs.DetailId}',Connid='${oArgs.Connid}')`;

      // ✅ Correct OData binding path syntax with quotes around key
      oView.bindElement({
        path: sPath,
        events: {
          change: this._onBindingChange ? this._onBindingChange.bind(this) : null,
          dataRequested: function () {
            oView.setBusy(true);
          },
          dataReceived: function () {
            oView.setBusy(false);
          }
        }
      });
    },

      _onBindingChange: function() {
    var oView = this.getView();
    var oElementBinding = oView.getElementBinding();

    if (!oElementBinding.getBoundContext()) {
        // No data found
        oView.setBusy(false);
      
    }
},

      onNavBack: function () {
    var oHistory = sap.ui.core.routing.History.getInstance();
    var sPreviousHash = oHistory.getPreviousHash();

    if (sPreviousHash !== undefined) {
        // Go one step back in browser history
        window.history.go(-1);
    } else {
        // If no history, go back to main route explicitly
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("RouteMain", {}, true); // true = replace history
    }
}

  });
});