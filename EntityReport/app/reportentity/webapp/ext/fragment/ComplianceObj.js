sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onPress: async function(oEvent) {
            debugger
            var year = oEvent.oSource.oParent.getCells()[0].getContent().getContentDisplay().getProperty("text");
            var hrefNav = (sap.ushell && sap.ushell.Container && await sap.ushell.Container.getServiceAsync("Navigation")) || "";
            if(hrefNav != ""){
                await hrefNav.navigate({
                    target: {semanticObject:"complaince33semobj", action:"display"},
                    params: {"year":year}
                })
            }
        }
    };
});
