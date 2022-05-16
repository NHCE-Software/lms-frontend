const programs = ["MCA", "BE/B.Tech", "MBA", "B.Com", "BBA", "BCA", "PhD"]
const courses = ["CSE","CSE in Data Science","AI/ML","CE", "ISE", "MECH","BCA","BBA","MCA","B.Com","ME/M.Tech","MBA", "ECE", "EEE", "CIVIL","BE/B.Tech Courses","Others"];
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
    siksha: { "B. E in Computer Science & Engineering (Data Science)" : "CSE in Data Science",
              "B.E. in Artificial Intelligence and Machine Learning" : "AI/ML",
              "B.E. in Civil Engineering" : "CIVIL",
              "B.E. in Computer Engineering" : "CE",
              "B.E. in Computer Science and Engineering" :"CSE",
              "B.E. in Electronics and Communication Engineering" : "ECE",
              "B.E. in Mechanical Engineering" : "MECH",
              "B.E. in Information Science and Engineering" : "ISE",
              "B.E. in Information Technology" : "ISE",
              "Bachelor of Business Administration (BBA)" : "BBA",
              "Bachelor of Commerce (B.Com.)" : "B.Com",
              "Bachelor of Computer Application (BCA)" : "BCA",
              "Master of Business Administration (MBA)" : "MBA",
              "Master of Computer Applications (MCA)" : "MCA",
              "Student interested in B.Com courses" : "B.Com",
              "Student interested in B.E. / B.Tech courses" : "BE/B.Tech Courses",
              "Student interested in BBA courses" : "BBA",
              "Student interested in BCA courses" : "BCA",
              "Student interested in M.E./M.Tech courses" : "ME/M.Tech",
              "Student interested in MBA/PGDM courses" : "MBA",
              "Student interested in MCA courses" : "MCA"

},
    career360: {},
    college_dunia:  {"BBA/BBM" : "BBA", "MBA/PGDM": "MBA" },
}

const availableColumns = ["name", "loadedbyname", "email", "city", "phonenumber", "status", "course", "source", "callquantity", "followup", "lastremark", "program"]

function noauth() {
    window.location.replace("/#/noauth")
}


export  {courses , status, roles, noauth, programs , sources , predef , preloadedMaps , preloadedMapsCourses, references, availableColumns};