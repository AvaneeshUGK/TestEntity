const cds = require('@sap/cds');
const { nextTick } = require('process');

module.exports = cds.service.impl(async  function(){
    let {Files} = this.entities;
    this.before('CREATE', Files, req => {
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `https://f6623a50trial-dev-entityreport-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/catalog/Files(${req.data.ID})/content`
    })
})
