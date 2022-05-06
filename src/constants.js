const courses = ["CSE", "ISE", "MECH", "ECE", "EEE", "CIVIL"];
const status = ["Awaiting", "Cold", "Hot", "Closed" , "Not Contacted"];
const roles = ["caller", "admin", "super-admin"];
const sources = ["Siksha", "Career 360", "Test123"];
const predef = ["name", "phonenumber", "email", "city", "course"];

const preloadedMaps = {
    siksha: [{old: "phone", new: "phonenumber", "course selected" :  "course", }],
    career360: [],
    test123: [],
}


export  {courses , status, roles , sources , predef , preloadedMaps};