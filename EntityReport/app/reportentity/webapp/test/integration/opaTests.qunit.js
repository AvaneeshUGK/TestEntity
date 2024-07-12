sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'reportentity/test/integration/FirstJourney',
		'reportentity/test/integration/pages/MasterDataList',
		'reportentity/test/integration/pages/MasterDataObjectPage'
    ],
    function(JourneyRunner, opaJourney, MasterDataList, MasterDataObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('reportentity') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheMasterDataList: MasterDataList,
					onTheMasterDataObjectPage: MasterDataObjectPage
                }
            },
            opaJourney.run
        );
    }
);