using my.bookshop as my from '../db/data-model';

service CatalogService {
   entity Books as projection on my.Books;
   @odata.draft.enabled
   entity MasterData as projection on my.MasterData;
   entity Compliance as projection on my.Compliance;
   entity FilesCompliance as projection on my.FilesCompliance;
   entity insurance as projection on my.insurance;
   entity Files as projection on my.Files;
   entity attach_policy_letter as projection on my.attach_policy_letter;
   entity EntityAuditLogs as projection on my.EntityAuditLogs;
   entity Changes as projection on my.Changes;
}
