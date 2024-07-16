sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('entitytest.ext.controller.ObjectPageController', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf entitytest.ext.controller.ObjectPageController
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing:{
				onAfterBinding: async function(oBindingContext){
					debugger
					var oUploadSet = sap.ui.getCore().byId("entitytest::MasterDataObjectPage--fe::CustomSubSection::Attachments--uploadSet");
					oUploadSet.bindAggregation("items",{
						path:oBindingContext.getPath() + "/toFiles",
						template:oUploadSet.getBindingInfo("items").template,
						parameters: {
							$orderby: 'createdAt desc'
						}
					})
					// oUploadSet.bindElement(oBindingContext.getPath());
					oUploadSet.getBinding("items").refresh();

				}
			}
		}
	});
});
