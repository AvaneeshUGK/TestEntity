const cds = require('@sap/cds');

module.exports = cds.service.impl(async function(){

    var {MasterData,Compliance,Files,EntityAuditLogs} = this.entities;

    this.on('UPDATE',MasterData,async function(req,next) {
        debugger
        var diff = await req.diff();
        if(diff._old){
        var date = new Date();
        var DateTime = date.toLocaleString('en-GB', { timeZone: 'UTC' });
        var OperationType = req.event;
        var User = req?.headers['x-username']
        var Changes = [];
        var Entity = req.path;
        var keys = Object.keys(diff._old);
        keys.forEach((key)=>{
            Changes.push({
                Field:key,
                OldValue: diff._old[`${key}`],
                NewValue:diff[`${key}`]
            })
        })

        var StrChanges = JSON.stringify(Changes);

        var update = await INSERT.into(EntityAuditLogs).entries([{
            DateTime:DateTime,
            User:User,
            OperationType:OperationType,
            Entity:Entity,
            Changes:StrChanges,
            toChanges: Changes
        }])
    }
        return next()
    })

})