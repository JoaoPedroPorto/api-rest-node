const STATUS = {
    ACTIVE: "ACTIVE", 
    INACTIVE: "INACTIVE", 
    PENDING: "PENDING"
};

const SEX = {
    MALE: "MALE",
    FEMALE: "FEMALE"
};

class Enum {
    static get STATUS() {
        return STATUS;
     }

     static get SEX() {
         return SEX;
     }
}

module.exports = Enum