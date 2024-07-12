sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'entitytest',
            componentId: 'MasterDataList',
            contextPath: '/MasterData'
        },
        CustomPageDefinitions
    );
});