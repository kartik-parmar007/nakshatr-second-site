
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Philosophy', href: '/philosophy' },
  { label: 'Programs', href: '/programs' },
  { label: 'The Center', href: '/center' },
  { label: 'For Universities', href: '/universities' },
  { label: 'About', href: '/about' },
  { label: 'Connect', href: '/connect' },
];

export const footerLinks = [
  { label: 'Philosophy', href: '/philosophy' },
  { label: 'Programs', href: '/programs' },
  { label: 'The Center', href: '/center' },
  { label: 'For Universities', href: '/universities' },
  { label: 'About', href: '/about' },
  { label: 'Connect', href: '/connect' },
];

export const droneComponents = [
  { id:'motor', name:'Motor', number:'01', industry:'Agriculture', simpleTruth:'Rotation creates lift.', industryFact:'Agriculture drones depend on controlled thrust for spraying and field coverage.', skill:'Students learn motor selection, load, thrust, and efficiency.' },
  { id:'esc', name:'ESC', number:'02', industry:'Infrastructure', simpleTruth:'Speed creates control.', industryFact:'Inspection drones need precise motor control near bridges, towers, and structures.', skill:'Students learn how electronic speed control affects stability.' },
  { id:'fc', name:'Flight Controller', number:'03', industry:'Disaster Management', simpleTruth:'The brain balances the machine.', industryFact:'Rescue drones need stable flight in unpredictable environments.', skill:'Students learn sensors, stabilization, and flight logic.' },
  { id:'gps', name:'GPS', number:'04', industry:'Logistics', simpleTruth:'Position creates direction.', industryFact:'Delivery drones depend on navigation and location awareness.', skill:'Students learn positioning, route logic, and mission planning.' },
  { id:'propeller', name:'Propeller', number:'05', industry:'Mapping', simpleTruth:'Air movement becomes motion.', industryFact:'Mapping drones need smooth, predictable flight paths.', skill:'Students learn lift, airflow, pitch, and efficiency.' },
  { id:'battery', name:'Battery', number:'06', industry:'Surveillance', simpleTruth:'Energy decides endurance.', industryFact:'Surveillance missions depend on flight time and power management.', skill:'Students learn battery safety, endurance, and energy planning.' },
];

export const philosophyRhythmBlocks = [
  { id:'encounter', step:'01', title:'Encounter', desc:'Meet the object before the theory.' },
  { id:'investigation', step:'02', title:'Investigation', desc:'Observe, touch, compare, ask.' },
  { id:'root', step:'03', title:'Root Finding', desc:'Find the principle underneath.' },
  { id:'branch', step:'04', title:'Branch Building', desc:'Connect the root to real systems.' },
  { id:'team', step:'05', title:'Team Question', desc:'Think together before answering.' },
  { id:'exploration', step:'06', title:'Free Exploration', desc:'No task. No instruction. Just curiosity.' },
];

export const rootChain = [
  { label:'Battery' }, { label:'ESC' }, { label:'Motor' }, { label:'Propeller' }, { label:'Lift' },
];

export const programCards = [
  { id:'hardware', title:'Hardware Mastery', duration:'90 hours', fee:'₹15,000', badge:'Foundation', focus:'Drone components, assembly, repair, electronics, troubleshooting', outcome:'Understand, assemble, diagnose, and repair drone hardware.', highlight:false },
  { id:'software', title:'Software Mastery', duration:'60 hours', fee:'₹12,000', badge:'Digital', focus:'Mission planning, mapping basics, flight software, data workflows', outcome:'Understand drone software workflow and execute real missions.', highlight:false },
  { id:'combo', title:'Integrated Combo', duration:'150 hours', fee:'₹25,000', badge:'Most Complete', focus:'Hardware + Software combined — the full system', outcome:'Complete foundation in drone systems.', highlight:true },
  { id:'industry', title:'Industry Ready', duration:'Flexible', fee:'₹22,000', badge:'Professional', focus:'Job readiness, pilot licence pathway, field operations, industry workflow', outcome:'Ready for real-world drone industry roles.', highlight:false },
];

export const programComparisonTable = [
  { program:'Hardware Mastery', bestFor:'Students who want to build and repair', duration:'90 hours', fee:'₹15,000', outcome:'Drone hardware expert' },
  { program:'Software Mastery', bestFor:'Students interested in mission planning', duration:'60 hours', fee:'₹12,000', outcome:'Drone software operator' },
  { program:'Integrated Combo', bestFor:'Students who want full system knowledge', duration:'150 hours', fee:'₹25,000', outcome:'Complete drone specialist' },
  { program:'Industry Ready', bestFor:'Students aiming for industry jobs', duration:'Flexible', fee:'₹22,000', outcome:'Industry-ready professional' },
];

export const centerWalkthrough = [
  { id:'entrance', number:'01', title:'Entrance & First Look', desc:'The first encounter with a complete drone. No explanation yet. Just curiosity.' },
  { id:'workbench', number:'02', title:'Workbench Zone', desc:'Every student gets a bench. Tools, components, and real hardware within reach.' },
  { id:'assembly', number:'03', title:'Drone Assembly Zone', desc:'Where students move from theory to physical build — step by step.' },
  { id:'electronics', number:'04', title:'Electronics & Testing', desc:'Measure, test, diagnose. Real circuits, real meters, real problems.' },
  { id:'software', number:'05', title:'Software & Mission Planning', desc:'Flight planning, mapping, and mission execution on screen.' },
  { id:'team', number:'06', title:'Team Discussion Area', desc:'Collaborative questions, shared problems, collective answers.' },
  { id:'flight', number:'07', title:'Flight Practice Zone', desc:'First flights, live testing, and real feedback from the air.' },
];

export const centerHappenings = [
  { text:'Students work in teams' },
  { text:'Components are handled physically' },
  { text:'Questions come before answers' },
  { text:'Instructors guide, not spoon-feed' },
  { text:'Drones are built, tested, repaired, and understood' },
];

export const universityProvides = [
  'Classroom / lab space', 'Student access', 'Academic coordination', 'Local support',
];

export const nakshatrProvides = [
  'Curriculum', 'Instructors', 'Drone kits', 'Lab setup guidance',
  'Hands-on delivery', 'Student engagement model', 'Industry orientation',
];

export const whyUniversities = [
  { title:'Emerging Industry Demand', desc:'Drone jobs are growing faster than qualified candidates.' },
  { title:'Skill-Based Learning', desc:'Students learn by doing, not just reading.' },
  { title:'Interdisciplinary Applications', desc:'Drones connect engineering, agriculture, logistics, and more.' },
  { title:'Student Startup Potential', desc:'Understanding drones enables entrepreneurship.' },
  { title:'Employability', desc:'Practical drone skills translate directly to jobs.' },
  { title:'Research Foundation', desc:'Drone technology opens new research domains.' },
];

export const collaborationFormats = [
  { number:'01', title:'SEC Credit-Linked Courses' },
  { number:'02', title:'Certification Programs' },
  { number:'03', title:'Drone Lab / Center of Excellence' },
  { number:'04', title:'Workshops and Bootcamps' },
  { number:'05', title:'Industry-Ready Training Pathway' },
];

export const partnershipTimeline = [
  { step:1, title:'Introductory Discussion' },
  { step:2, title:'Course Mapping' },
  { step:3, title:'Space & Resource Planning' },
  { step:4, title:'Student Onboarding' },
  { step:5, title:'Program Launch' },
  { step:6, title:'Review & Scale' },
];

export const aboutValues = [
  { title:'Root-Level Understanding', desc:'We start from the principle, not the product.' },
  { title:'Hands-On Learning', desc:'Every session involves real hardware and real questions.' },
  { title:'Curiosity-First Classrooms', desc:'The question is more important than the answer.' },
  { title:'Technical Confidence', desc:'Students leave knowing they can figure things out.' },
  { title:'Industry Relevance', desc:'Everything taught connects to real drone industry work.' },
  { title:'Student Transformation', desc:'From curious to capable — that is the goal.' },
];

export const connectFormDropdowns = {
  userType: ['Student', 'Parent', 'University', 'Industry', 'Other'],
  interestedProgram: ['Hardware Mastery', 'Software Mastery', 'Integrated Combo', 'Industry Ready', 'Not Sure'],
  contactPurpose: ['University Partnership', 'Student Inquiry', 'Industry Collaboration', 'Media', 'Other'],
};
