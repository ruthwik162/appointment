// src/assets/assets.js

// Image imports
import mainbanner from '../assets/Mainbanner.jpeg';
import appointment from '../assets/appoinitment.png.jpg';
import teacherimage1 from '../assets/TeacherImage1.jpg';
import yourappointment from '../assets/YourAppoinments.png';
import white_arrow_icon from './white_arrow_icon.svg';
import black_arrow_icon from './black_arrow_icon.svg';
import mainbanner_sm from './Mainbanner_sm.png';
import aiml from './aiml.png';
import cse from './cse.png';
import ds from './Data_Science.png';
import ece from './Electronics_Communication_Engineering.png';
import it from './Information_Technology.png';
import cs from './Cyber_Security.png';
import search_icon from './search_icon.svg';
import logo from './logo.png';
import appointment_sm from './appointment_sm.png';
import mainbanner1 from './Mainbanner1.png';
import appointment1 from './appoinitment.png.png'
// Asset map
export const assets = {
  mainbanner,
  appointment,
  teacherimage1,
  yourappointment,
  white_arrow_icon,
  black_arrow_icon,
  mainbanner_sm,
  aiml,
  cse,
  ds,
  ece,
  it,
  cs,
  search_icon,
  logo,
  appointment_sm,
  mainbanner1,
  appointment1
};

// Department List (used in DeptCat + Routing)
export const deptDetails = [
  {
    name: "C S E",
    department:"Computer-Science-Engineering",
    path: "Computer-Science-Engineering",
    image: cse,
    bgColor: "#06d6a0",
  },
  {
    name: "AI & ML",
    department:"Artificial and Machine Learning",
    path: "Artificial-&-Machine-Learning",
    image: aiml,
    bgColor: "#f87060",
  },
  {
    name: "D S",
    department:"Data Science",
    path: "Data-Science",
    image: ds,
    bgColor: "#102542",
  },
  {
    name: "C S",
    department:"Cyber Security",
    path: "Cyber-Security",
    image: cs,
    bgColor: "#f8ffe5",
  },
  {
    name: "I T",
    department:"Information-Technology",
    path: "Information-Technology",
    image: it,
    bgColor: "#2bc0e4",
  },
  {
    name: "E C E",
    department:"Electronics-Communication-Engineering",
    path: "Electronics-Communication-Engineering",
    image: ece,
    bgColor: "#f8ffe5",
  },
];

// Dummy teacher list (used in Faculty page)
export const dummyTeacher = [
  {
    id: "1",
    name: "Shaik Meeravali",
    dept: "Computer-Science-Engineering",
    occupation: "HOD",
    experience: 7,
    image: cs,
    gender: "male",
  },
  {
    id: "2",
    name: "Shilpa",
    department: "Artificial-&-Machine-Learning",
    occupation: "Professor",
    experience: 4,
    image: "",
    gender: "female",
  },
  {
    id: "3",
    name: "Srinivas",
    dept: "Data-Science",
    occupation: "Professor",
    experience: 5,
    image: "",
    gender: "male",
  },
  {
    id: "4",
    name: "Ravi Kumar",
    dept: "Computer-Science-Engineering",
    occupation: "Professor",
    experience: 6,
    image: "",
    gender: "male",
  },
  {
    id: "5",
    name: "Anjali",
    dept: "Artificial-&-Machine-Learning",
    occupation: "Professor",
    experience: 3,
    image: "",
    gender: "female",
  },
  {
    id: "6",
    name: "Ramesh",
    dept: "Data-Science",
    occupation: "Professor",
    experience: 8,
    image: "",
    gender: "male",
  },
  {
    id: "7",
    name: "Priya",
    dept: "Computer-Science-Engineering",
    occupation: "Professor",
    experience: 2,
    image: "",
    gender: "female",
  },
  {
    id: "8",
    name: "Karthik",
    dept: "Artificial-&-Machine-Learning",
    occupation: "Professor",
    experience: 1,
    image: "",
    gender: "male",
  },
  {
    id: "9",
    name: "Suresh",
    dept: "Data-Science",
    occupation: "Professor",
    experience: 9,
    image: "",
    gender: "male",
  },
];
