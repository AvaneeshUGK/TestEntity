sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onPress: async function(oEvent) {
            var hrefNav = (sap.ushell && sap.ushell.Container && await sap.ushell.Container.getServiceAsync("Navigation")) || "";
            if(hrefNav != ""){
                await hrefNav.navigate({
                    target: {semanticObject:"insurancesemobj", action:"display"}
                })
            }
        }
    };
});
