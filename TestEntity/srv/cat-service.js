const cds = require('@sap/cds');

module.exports = cds.service.impl(async function(){

    var {MasterData,Compliance,Files,EntityAuditLogs,insurance} = this.entities;

    this.on('UPDATE',Compliance, async function(req,next){
        debugger
        return next()

    })

    this.on('UPDATE',insurance,async function(req,next){

        return next();
    })

    this.on('UPDATE',MasterData,async function(req,next) {
        debugger
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