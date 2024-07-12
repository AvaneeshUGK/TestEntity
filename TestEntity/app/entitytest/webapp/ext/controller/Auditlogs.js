sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/Table",
    "sap/m/Column",
    "sap/m/Text",
    "sap/m/ColumnListItem"
], function(MessageToast,Dialog,Button,Library,Table,Column,Text,ColumnListItem) {
    'use strict';
    var ButtonType = Library.ButtonType;

    return {
        onAuditButtonPress: function(oEvent) {
            debugger
            if(!this.oEntityAuditDialog){
                this.oEntityAuditDialog = new Dialog({
                    title:"Entity Audit Logs",
                    verticalScrolling: true,
                    contentHeight:"70vh",
                    contentWidth:"70vw",
                    beginButton: new Button({
						type: ButtonType.Emphasized,
						text: "OK",
						press: function (oEvent) {
                            debugger
							oEvent.getSource().getParent().close()
                            oEvent.getSource().getParent().destroy();
						}
					}),
                    endButton: new Button({
						text: "Close",
						press: function (oEvent) {
                            debugger
							oEvent.getSource().getParent().close()
						}
					})
                })

                ///////////////////////////// Audit Table //////////////////////////////////

                var oTable = new Table({
                    fixedLayout:"Strict",
                    // showOverlay:true
                })
                var oColumn1 = new Column({
                    header: new Text({
                        text:"DateTime",
                        textAlign:"Center"
                    }),
                    width:"20%",
                    hAlign:"Center"
                })
                var oColumn2 = new Column({
                    header: new Text({
                        text:"User",
                        textAlign:"Center"
                    }),
                    width:"15%",
                    hAlign:"Center"
                })
                var oColumn3 = new Column({
                    header: new Text({
                        text:"Operation Type",
                        textAlign:"Center"
                    }),
                    width:"15%",
                    hAlign:"Center"
                })
                var oColumn4 = new Column({
                    header: new Text({
                        text:"Entity",
                        textAlign:"Center"
                    }),
                    width:"20%",
                    hAlign:"Center"
                })
                var oColumn5 = new Column({
                    header: new Text({
                        text:"Changes",
                        textAlign:"Center"
                    }),
                    width:"30%",
                    hAlign:"Center"
                })

                oTable.addColumn(oColumn1);
                oTable.addColumn(oColumn2);
                oTable.addColumn(oColumn3);
                oTable.addColumn(oColumn4);
                oTable.addColumn(oColumn5);

                let oCells = [];
                var oCell1 = new Text({
                    text:"{DateTime}"
                    
                })
                var oCell2 = new Text({
                    text:"{User}"
                })
                var oCell3 = new Text({
                    text:"{OperationType}"
                })
                var oCell4 = new Text({
                    text:"{Entity}"
                })


                var oCell5 = new Table({
                    // fixedLayout:true
                    // width:"500px"
                })

                var oColumn11 = new Column({
                    header: new Text({
                        text:"Field"
                    })
                })
                var oColumn12 = new Column({
                    header: new Text({
                        text:"OldValue"
                    })
                })
                var oColumn13 = new Column({
                    header: new Text({
                        text:"NewValue"
                    })
                })

                oCell5.addColumn(oColumn11);
                oCell5.addColumn(oColumn12);
                oCell5.addColumn(oColumn13);

                let oCellss = [];
                var oCell11 = new Text({
                    text:"{Field}"
                })
                var oCell12 = new Text({
                    text:"{OldValue}"
                })
                var oCell13 = new Text({
                    text:"{NewValue}"
                })

                oCellss.push(oCell11)
                oCellss.push(oCell12)
                oCellss.push(oCell13)

                // var p1 = {
                //     path:"toChanges",
                //     template: oCell11
                // }
                // var p2 = {
                //     path:"toChanges",
                //     template: oCell12
                // }
                // var p3 = {
                //     path:"toChanges",
                //     template: oCell13
                // }

                var oChangesColumnListItem = new ColumnListItem({
                    cells:oCellss
                })

                oCell5.bindAggregation("items","toChanges",oChangesColumnListItem)
                // oCell5.bindItems("/EntityAuditLogs",oChangesColumnListItem);
                // oCell5.bindRows("/EntityAuditLogs")

                // oCell5.bindElement("/EntityAuditLogs")


                oCells.push(oCell1)
                oCells.push(oCell2)
                oCells.push(oCell3)
                oCells.push(oCell4)
                oCells.push(oCell5)

                var oColumnListItem = new ColumnListItem({
                    cells:oCells
                })

                oTable.bindItems("/EntityAuditLogs",oColumnListItem);

                this.oEntityAuditDialog.addContent(oTable);
                this._view.addDependent(this.oEntityAuditDialog);
            }
            this.oEntityAuditDialog.open();
        }
    };
});
