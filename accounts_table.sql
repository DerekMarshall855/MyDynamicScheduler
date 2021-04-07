CREATE TABLE Accounts (
    UserId int(11) NOT NULL auto_increment,
    Username varchar(200) NOT NULL default '',
    Password varchar (250) NOT NULL default '',
    PRIMARY KEY (UserId)
);