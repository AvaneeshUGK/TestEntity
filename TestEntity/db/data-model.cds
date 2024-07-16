namespace my.bookshop;

using {
  cuid,
  managed
} from '@sap/cds/common';

entity Books {
  key ID : Integer;
  title  : String;
  stock  : Integer;
}

entity MasterData{
    key Entity : String;
    key Country : String;
    CompanyName : String;
    ListofDirectors : String;
    Admin : String;
    Comments : String;
    User : String;
    Status : String;
    Status_val : Integer;
    toCompliance: Composition of many Compliance on toCompliance.toMaster = $self;
    toInsurance: Composition of many insurance on toInsurance.toMaster = $self;
    toFiles: Composition of many Files on toFiles.toMaster = $self;
}

entity insurance{
    key id:UUID;
    Entity:String;
    Country:String;
    name_of_subsidiary:String;
    select_division:String;
    select_country:String;
    select_type_of_insurance:String;
    others: String;
    select_coverage:String;
    select_currencey:String;
    enter_sum:String;
    convert_Sum:String;
    enter_premium:String;
    convert_premium_in_usd:String;
    policy_date:Date;
    policy_expiry_date:Date;
    insurance_to_policy_letter : Association to many attach_policy_letter on insurance_to_policy_letter.ID = id;
    toMaster: Association to one MasterData on toMaster.Entity = Entity and toMaster.Country = Country;
}

    entity attach_policy_letter : cuid, managed {
    @Core.MediaType  : mediaType
    content     : LargeBinary;
    @Core.IsMediaType: true
    mediaType   : String;
    fileName    : String;
    size        : Integer;
    url         : String;
    policy_letter_to_insurance   : Association to one insurance on policy_letter_to_insurance.id = ID
                     
}

entity coverage {
    coverage:String;

}

entity currencey{
    currencey:String;
}

entity type_of_insurance{
    type_of_insurance: String;
}

entity Compliance {
  key year: String;
  Entity: String;
  Country: String;
  FinancialYear : String;
  EffectiveDate  : String;
  DueDate : String;
  Status         : String;
  ExtensionDate  : String;
  toMaster: Association to one MasterData on toMaster.Entity = Entity and toMaster.Country = Country;
  compfile : Composition of many FilesCompliance on compfile.fileComp = $self;
}

entity FilesCompliance: cuid, managed{
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
    fileComp : Association to one Compliance;
}

entity Files : cuid, managed {
    file_id           : UUID;
    Entity:String;
    user              : String;
    @Core.MediaType  : mediaType
    content          : LargeBinary;

    @Core.IsMediaType: true
    mediaType        : String;
    fileName         : String;
    // size: Integer;
    Folder           : String;
    url              : String;
    toMaster: Association to one MasterData on toMaster.Entity = Entity;
}

entity EntityAuditLogs {
    key id: UUID;
    DateTime:String;
    User:String;
    OperationType:String;
    Entity:String;
    Changes:String;
    toChanges: Composition of many Changes on toChanges.toEntityAuditLogs = $self;
}

entity Changes {
    key Field:String;
    key id:UUID;
    OldValue:String;
    NewValue:String;
    toEntityAuditLogs: Association to one EntityAuditLogs on toEntityAuditLogs.id = id;
}
