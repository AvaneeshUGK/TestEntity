sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onSubmitApproval: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
