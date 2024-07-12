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
    key RegID : String;
    Country : String;
    CompanyName : String;
    ListofDirectors : String;
    Admin : String;
    Comments : String;
    User : String;
    Status : String;
    Status_val : Integer;
    toCompliance: Composition of many Compliance on toCompliance.RegID = RegID;
}

entity Compliance {
  key year: String;
  key RegID: String;
}

entity Files : cuid, managed {
    file_id           : UUID;
    user              : String;
    @Core.MediaType  : mediaType
    content          : LargeBinary;

    @Core.IsMediaType: true
    mediaType        : String;
    fileName         : String;
    // size: Integer;
    Folder           : String;
    url              : String;
}