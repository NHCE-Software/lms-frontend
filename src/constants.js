const courses = ["CSE", "ISE", "MECH", "ECE", "EEE", "CIVIL"];
const status = ["Hot","Warm", "Cold", "Admitted", "Visited" , "Wrong No","Not Answering","Not Interested"];
const roles = ["caller", "admin", "super-admin"];
const sources = ["Siksha", "Career 360", "College Dunia"];
const predef = ["name", "phonenumber", "email", "city", "course"];
const references = ["Relatives", "Friends staying in Bangalore", "Staff","Student","Shiksha", "Careers 360", "College Dunia","Alumini", "Social Media", "Website"]

const preloadedMaps = {
    siksha: {"mobile":"phonenumber" , "response to course program" : "course","first name":"name","last name":"name","email":"email","city":"city"},
    career360: {"user_email":"email","user_phone_number":"phonenumber","user_city":"city","course":"course","user_name":"name"},
    college_dunia: {"name":"name","email":"email","contact":"phonenumber","city":"city","course":"course"},
}
const preloadedMapsCourses = {
    siksha: { "MECHANICAL" : "MECH"},
    career360: [],
    college_dunia: [],
}

const availableColumns = ["name", "loadedbyname", "email", "city", "phonenumber", "status", "course", "source", "callquantity", "followup", "lastremark"]



export  {courses , status, roles , sources , predef , preloadedMaps , preloadedMapsCourses, references, availableColumns};