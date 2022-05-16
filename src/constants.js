const programs = ["MCA", "BE/B.Tech", "MBA", "B.Com", "BBA", "BCA", "PhD"]
const courses = ["CSE","CSE in Data Science","AI/ML","CE", "ISE", "MECH","BCA","BBA","MCA","B.Com","ME/M.Tech", "Others","MBA", "ECE", "EEE", "CIVIL"];
const status = ["Hot","Warm", "Cold", "Admitted", "Visited" , "Wrong No.","Not Answering","Not Interested"];
const roles = ["caller", "admin"];
const sources = ["Siksha", "Career 360", "College Dunia","NHCM Application","NHCM Enquiry","NHCE Application","NHCE Enquiry","Facebook","Google Adwords","Landline","Incoming"];
const predef = ["name", "phonenumber", "email", "city", "course","program"]; // for manual map
const references = ["Relatives", "Friends staying in Bangalore", "Staff","Student","Shiksha", "Careers 360", "College Dunia","Alumini", "Social Media", "Website"]

const preloadedMaps = {
    siksha: {"mobile":"phonenumber" , "responsetocourse" : "course","firstname":"name","lastname":"name","email":"email","city":"city"},
    career360: {"useremail":"email","userphonenumber":"phonenumber","usercity":"city","username":"name"},
    college_dunia: {"name":"name","email":"email","contact":"phonenumber","city":"city","course":"program","branch":"course"},
    nhcmapp:{"studentname":"name","telstudent": "phonenumber","emailfather":"email","emailmother":"email"}
}   
const preloadedMapsCourses = {
    siksha: { "B. E in Computer Science & Engineering (Data Science)" : "CSE in Data Science"},
    career360: {},
    college_dunia:  {"BBA/BBM" : "BBA", "MBA/PGDM": "MBA" },
}

const availableColumns = ["name", "loadedbyname", "email", "city", "phonenumber", "status", "course", "source", "callquantity", "followup", "lastremark", "program"]

function noauth() {
    window.location.replace("/#/noauth")
}


export  {courses , status, roles, noauth, programs , sources , predef , preloadedMaps , preloadedMapsCourses, references, availableColumns};