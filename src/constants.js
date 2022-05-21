const programs = ["MCA", "BE/B.Tech", "MBA", "B.Com", "BBA", "BCA", "PhD"]
const courses = ["CSE","CSE in Data Science","AI/ML","CE", "ISE", "MECH","BCA","BBA","MCA","B.Com","ME/M.Tech","MBA", "ECE", "EEE", "CIVIL","BE/B.Tech Courses","Others"];
const status = ["Hot","Warm", "Cold", "Admitted", "Visited" , "Wrong No.","Not Answering","Not Interested"];
const statusColor = ["bg-red-100","bg-yellow-100", "bg-slate-100", "bg-green-100", "bg-green-100" , "bg-slate-100","bg-slate-100","bg-slate-100"];
const roles = ["caller", "admin"];
const sources = ["Siksha", "Careers 360", "College Dunia","NHCM Website Application","NHCM Website Enquiry","NHCE Website Application","NHCE Website Enquiry","Facebook","Google Adwords","Landline","Incoming"];
const predef = ["name", "phonenumber", "email", "city", "course","program"]; // for manual map
const references = ["Relatives", "Friends staying in Bangalore", "Staff","Student","Shiksha", "Careers 360", "College Dunia","Alumini", "Social Media", "Website"]

const preloadedMaps = {
    siksha: {"mobile":"phonenumber" , "responsetocourse" : "course","firstname":"name","lastname":"name","email":"email","city":"city"},
    "careers 360": {"useremail":"email","userphonenumber":"phonenumber","usercity":"city","username":"name"},
    "college dunia": {"name":"name","email":"email","contact":"phonenumber","city":"city","course":"program","branch":"course"},
    // nhcmapp:{"studentname":"name","telstudent": "phonenumber","emailfather":"email","emailmother":"email"},
    "nhcm website application": {"studentname":"name","studentmobile": "phonenumber","course":"course","fatherscontactnumber":"phonenumber","motherscontactnumber":"phonenumber","city":"city"},
    "nhcm website enquiry": {"from":"name","email":"email","phone":"phonenumber","selectedcity":"city","course":"course"},
    "nhce website application": {"studentname":"name","studentmobile": "phonenumber","course":"course","fatherscontactnumber":"phonenumber","motherscontactnumber":"phonenumber","city":"city"},
    "nhce website enquiry": {"from":"name","email":"email","phone":"phonenumber","selectedcity":"city","course":"course"}

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
    "career 360": {},
    "college dunia":  {"BBA/BBM" : "BBA", "MBA/PGDM": "MBA" },
    "nhcm website application" :{
        "Civil Engineering (CIV)" : "CIVIL",
        "Computer Science & Engineering (CSE)" : "CSE",
        "Computer Science & Engineering (Data Science)" : "CSE in Data Science",
        "Electronics & Communication Engineering (ECE)": "ECE",
        "Electrical & Electronics Engineering (EEE)" : "EEE",
        "Information Science & Engineering (ISE)" : "ISE",
        "Mechanical Engineering (ME)" : "MECH" ,
        "Computer Engineering(CO)": "CE",
        "Artificial Intelligence and Machine Learning(AIML)" : "AI/ML",
        "Master of Business Administration(MBA)" : "MBA",
        "Master of Computer Applications(MCA)" : "MCA",
        "MTech- Computer Science & Engg" : "ME/M.Tech"
    },
    "nhcm website enquiry" :{
        "Civil Engineering (CIV)" : "CIVIL",
        "Computer Science & Engineering (CSE)" : "CSE",
        "Computer Science & Engineering (Data Science)" : "CSE in Data Science",
        "Electronics & Communication Engineering (ECE)": "ECE",
        "Electrical & Electronics Engineering (EEE)" : "EEE",
        "Information Science & Engineering (ISE)" : "ISE",
        "Mechanical Engineering (ME)" : "MECH" ,
        "Computer Engineering(CO)": "CE",
        "Artificial Intelligence and Machine Learning(AIML)" : "AI/ML",
        "Master of Business Administration(MBA)" : "MBA",
        "Master of Computer Applications(MCA)" : "MCA",
        "MTech- Computer Science & Engg" : "ME/M.Tech"
    },
    "nhce website application" :{
        "Civil Engineering (CIV)" : "CIVIL",
        "Computer Science & Engineering (CSE)" : "CSE",
        "Computer Science & Engineering (Data Science)" : "CSE in Data Science",
        "Electronics & Communication Engineering (ECE)": "ECE",
        "Electrical & Electronics Engineering (EEE)" : "EEE",
        "Information Science & Engineering (ISE)" : "ISE",
        "Mechanical Engineering (ME)" : "MECH" ,
        "Computer Engineering(CO)": "CE",
        "Artificial Intelligence and Machine Learning(AIML)" : "AI/ML",
        "Master of Business Administration(MBA)" : "MBA",
        "Master of Computer Applications(MCA)" : "MCA",
        "MTech- Computer Science & Engg" : "ME/M.Tech"
    },
    "nhce website enquiry" :{
        "Civil Engineering (CIV)" : "CIVIL",
        "Computer Science & Engineering (CSE)" : "CSE",
        "Computer Science & Engineering (Data Science)" : "CSE in Data Science",
        "Electronics & Communication Engineering (ECE)": "ECE",
        "Electrical & Electronics Engineering (EEE)" : "EEE",
        "Information Science & Engineering (ISE)" : "ISE",
        "Mechanical Engineering (ME)" : "MECH" ,
        "Computer Engineering(CO)": "CE",
        "Artificial Intelligence and Machine Learning(AIML)" : "AI/ML",
        "Master of Business Administration(MBA)" : "MBA",
        "Master of Computer Applications(MCA)" : "MCA",
        "MTech- Computer Science & Engg" : "ME/M.Tech"
    },
}

const availableColumns = ["name", "createdAt",  "loadedbyname", "email", "city", "phonenumber", "status", "course", "source", "callquantity", "followup", "lastremark", "program"]
const availableColors = ["bg-green-100", "bg-green-200", "bg-blue-100", "bg-blue-200", "bg-yellow-100", "bg-yellow-200", "bg-red-100", "bg-red-200"]
function noauth() {
    window.location.replace("/#/noauth")
}


export  {courses ,statusColor, status, roles, noauth, programs , sources , predef , preloadedMaps , preloadedMapsCourses, references, availableColumns, availableColors};