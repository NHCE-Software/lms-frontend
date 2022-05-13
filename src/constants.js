const programs = ["MCA", "BE", "MBA", "BCOM", "BBA"]
const courses = ["CSE", "ISE", "MECH", "ECE", "EEE", "CIVIL"];
const status = ["Hot","Warm", "Cold", "Admitted", "Visited" , "Wrong No.","Not Answering","Not Interested"];
const roles = ["caller", "admin"];
const sources = ["Siksha", "Career 360", "College Dunia","NHCM Application","NHCM Enquiry","NHCE Application","NHCE Enquiry","Facebook","Google Adwords","Landline","Incoming"];
const predef = ["name", "phonenumber", "email", "city", "course","program"]; // for manual map
const references = ["Relatives", "Friends staying in Bangalore", "Staff","Student","Shiksha", "Careers 360", "College Dunia","Alumini", "Social Media", "Website"]

const preloadedMaps = {
    siksha: {"mobile":"phonenumber" , "response to course program" : "course","first name":"name","last name":"name","email":"email","city":"city"},
    career360: {"user_email":"email","user_phone_number":"phonenumber","user_city":"city","course":"course","user_name":"name"},
    college_dunia: {"name":"name","email":"email","contact":"phonenumber","city":"city","course":"course"},
    nhcmapp:{"student name":"name","tel student": "phonenumber","email father":"email","email mother":"email"}
}   
const preloadedMapsCourses = {
    siksha: { "MECHANICAL" : "MECH"},
    career360: [],
    college_dunia: [],
}

const availableColumns = ["name", "loadedbyname", "email", "city", "phonenumber", "status", "course", "source", "callquantity", "followup", "lastremark", "program"]



export  {courses , status, roles, programs , sources , predef , preloadedMaps , preloadedMapsCourses, references, availableColumns};