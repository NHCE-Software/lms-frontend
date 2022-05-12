const courses = ["CSE", "ISE", "MECH", "ECE", "EEE", "CIVIL"];
const status = ["Awaiting", "Cold", "Hot", "Closed" , "Not Contacted"];
const roles = ["caller", "admin", "super-admin"];
const sources = ["Siksha", "Career 360", "Test123"];
const predef = ["name", "phonenumber", "email", "city", "course"];
const references = ["Relatives", "Friends staying in Bangalore", "Staff","Student","Shiksha", "Careers 360", "College Dunia","Alumini", "Social Media", "Website"]

const preloadedMaps = {
    siksha: {phone:"phonenumber" , "courses selected" : "course"},
    career360: [],
    test123: [],
}
const preloadedMapsCourses = {
    siksha: { "MECHANICAL" : "MECH"},
    career360: [],
    test123: [],
}

const availableColumns = ["name", "loadedbyname", "email", "city", "phonenumber", "status", "course", "source", "callquantity", "followup", "lastremark"]



export  {courses , status, roles , sources , predef , preloadedMaps , preloadedMapsCourses, references, availableColumns};