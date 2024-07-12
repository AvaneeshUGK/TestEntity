sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('reportentity.ext.controller.Object_Controller', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf reportentity.ext.controller.Object_Controller
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing:{
				onAfterBinding: async function(oBindingContext){
					debugger
					this.base.getView().getContent()[0].getSections()[3].getSubSections()[0].removeAllBlocks();
					this.base.getView().getContent()[0].getSections()[3].getSubSections()[0].addBlock(
						new sap.m.Text("ContactId",{
							text:`Contact us if you have any problems:
							Email: support@support.com
							Phone: 9877654367 `
						})
					);
				}
			}
			
		}
	});
});
