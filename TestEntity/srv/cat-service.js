const cds = require('@sap/cds');

module.exports = cds.service.impl(async function(){

    var {MasterData,Compliance,Files,EntityAuditLogs,insurance} = this.entities;

    this.on('CREATE',MasterData, async function(req,next){
        var date = new Date();
        var DateTime = date.toLocaleString('en-GB', { timeZone: 'UTC' });
        var User = req?.headers['x-username']
        var Update = await INSERT.into(EntityAuditLogs).entries([{
            DateTime:DateTime,
            User:User,
            OperationType:"CREATE",
            Entity:"MasterData"
        }])

        return next()
    })

    this.before('CREATE', Files.drafts, async req => {
        debugger
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        // var draftAdmin =  await SELECT.from('DRAFT_DRAFTADMINISTRATIVEDATA')
        // req.data.DraftAdministrativeData_DraftUUID = draftAdmin[draftAdmin.length - 1].DRAFTUUID;
        // req.data.HasActiveEntity = true;
        // req.data.IsActiveEntity = false;
        req.data.url = `/odata/v4/catalog/Files(ID=${req.data.ID},IsActiveEntity=false)/content`;
    })
    // this.before('CREATE', Files, async req => {
    //     debugger
    //     console.log('Create called')
    //     console.log(JSON.stringify(req.data))
    //     // req.data.IsActiveEntity = false;
    //     req.data.url = `/odata/v4/catalog/Files(ID=${req.data.ID},IsActiveEntity=true)/content`;
    // })

    this.on('UPDATE',Compliance, async function(req,next){
        debugger
        return next()

    })

    this.on('UPDATE',insurance,async function(req,next){

        return next();
    })

    this.on('UPDATE',MasterData,async function(req,next) {
        debugger
        req.data.toFiles.forEach(file =>{
            var filePosition = file.url.indexOf('false');
            if (filePosition > 0){
                var firstPart = file.url.substring(0,filePosition);
                var secondPart = file.url.substring(filePosition);
                var newurl = firstPart + 'true' + secondPart.substring(5);
                file.url = newurl;
            }
        })
        var diff = await req.diff();
        var date = new Date();
        var DateTime = date.toLocaleString('en-GB', { timeZone: 'UTC' });
        var User = req?.headers['x-username']

        /////////////////////// Master Update ///////////////////////////
        if(diff._old){
        
        var OperationType = req.event;
        var Changes = [];
        var Entity = "MasterData";
        var keys = Object.keys(diff._old);
        keys.forEach((key)=>{
            Changes.push({
                Field:key,
                OldValue: diff._old[`${key}`],
                NewValue:diff[`${key}`]
            })
        })

        var StrChanges = JSON.stringify(Changes);

        var Update = await INSERT.into(EntityAuditLogs).entries([{
            DateTime:DateTime,
            User:User,
            OperationType:OperationType,
            Entity:Entity,
            Changes:StrChanges,
            toChanges: Changes
        }])
    }

    ////////////////////////// Compliance //////////////////////
    if(diff?.toCompliance){
        diff.toCompliance.forEach(async (compliance)=>{
            if(compliance?._op){
                var cOperationType = compliance._op;
                var cEntity = "Compliance (" + compliance.year + ")";

                ///////////// Compliance UPDATE /////////////////////

                if(compliance?._old){
                    var cChanges = [];
                    var ckeys = Object.keys(compliance._old);
                    ckeys.forEach((key)=>{
                        cChanges.push({
                            Field:key,
                            OldValue: compliance._old[`${key}`],
                            NewValue:compliance[`${key}`]
                        })
                    })
                }

                var cChangeString = JSON.stringify(cChanges);

                ///////////////////////////////////////////////////////
                if(cOperationType == 'create' || cOperationType == 'delete'){
                    var cUpdate = await INSERT.into(EntityAuditLogs).entries([{
                        DateTime:DateTime,
                        User:User,
                        OperationType:cOperationType.toUpperCase(),
                        Entity:cEntity
                    }])
                } else if(cOperationType == 'update' ) {
                    var cUpdate = await INSERT.into(EntityAuditLogs).entries([{
                        DateTime:DateTime,
                        User:User,
                        OperationType:cOperationType.toUpperCase(),
                        Entity:cEntity,
                        Changes: cChangeString,
                        toChanges:cChanges
                    }])   
                }
                
            }
        })
    }

        ////////////////////////// insurance //////////////////////
        if(diff?.toInsurance){
            diff.toInsurance.forEach(async (insurance)=>{
                if(insurance?._op){
                    var iOperationType = insurance._op;
                    var iEntity = "Insurance ( " + insurance.id +" )";
    
                    ///////////// Compliance UPDATE /////////////////////
    
                    if(insurance?._old){
                        var iChanges = [];
                        var ikeys = Object.keys(insurance._old);
                        ikeys.forEach((key)=>{
                            iChanges.push({
                                Field:key,
                                OldValue: insurance._old[`${key}`],
                                NewValue:insurance[`${key}`]
                            })
                        })
                    }
    
                    var iChangeString = JSON.stringify(iChanges);
    
                    ///////////////////////////////////////////////////////
                    if(iOperationType == 'create' || iOperationType == 'delete'){
                        var iUpdate = await INSERT.into(EntityAuditLogs).entries([{
                            DateTime:DateTime,
                            User:User,
                            OperationType:iOperationType.toUpperCase(),
                            Entity:iEntity
                        }])
                    } else if(iOperationType == 'update' ) {
                        var iUpdate = await INSERT.into(EntityAuditLogs).entries([{
                            DateTime:DateTime,
                            User:User,
                            OperationType:iOperationType.toUpperCase(),
                            Entity:iEntity,
                            Changes: iChangeString,
                            toChanges:iChanges
                        }])   
                    }
                    
                }
            })
        }
        return next()
    })

})