sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'entitytest/test/integration/FirstJourney',
		'entitytest/test/integration/pages/MasterDataList',
		'entitytest/test/integration/pages/MasterDataObjectPage'
    ],
    function(JourneyRunner, opaJourney, MasterDataList, MasterDataObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('entitytest') + '/index.html'
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