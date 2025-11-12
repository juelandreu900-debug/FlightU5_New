sap.ui.define([
    "sap/ui/model/type/Time",
    "sap/ui/core/format/DateFormat",
], function (Time, DateFormat) {
    "use strict";
    return {
        formatTableDates: function (oDate) {
            if (!oDate) {
                return "";
            }

            // Convert to JS Date if needed
            var date = new Date(oDate);

            // Format to DD.MM.YYYY (or whatever you prefer)
            var day = String(date.getDate()).padStart(2, "0");
            var month = String(date.getMonth() + 1).padStart(2, "0");
            var year = date.getFullYear();

            return day + "." + month + "." + year;
        },
getCarrierUrl: function (sUrl, sCarrname) {
    if (!sCarrname) {
        return "";
    }
    if (sUrl && sUrl.trim() !== "") {
        return sUrl;
    }
    var cleanName = sCarrname
        .toLowerCase()
        .replace(/\s+/g, "")      
        .replace(/[^a-z0-9]/g, ""); 
    return "https://www." + cleanName + ".com";
},

    
    getCarrierLogo: function (sCarrid) {
        debugger
    switch (sCarrid) {
        case "AZ":
            return "/img/Logo_airberlin.svg.png";
        case "LH":
            return "/img/lufthansa.png";
        case "AA":
            return "/img/default_logo (1).png";
        default:
            return "/img/default_logo (1).png";
    }
}


    };
});