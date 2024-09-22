// types.ts
export interface Content {
  'pt-BR': LanguageContent;
  'en-US': LanguageContent;
}

export interface LanguageContent {
  name: string;
  title: string;
  dob: string;
  address: string;
  phone: string;
  email: string;
  education: Education;
  experience: Experience;
  courses: Courses;
  skills: Skills;
  softSkills: SoftSkills;
  projects: Projects;
}

export interface Education {
  title: string;
  degree: string;
  university: string;
  graduationDate: string;
}

export interface Experience {
  title: string;
  jobs: Job[];
}

export interface Job {
  company: string;
  role: string;
  period: string;
  activities: string;
}

export interface Courses {
  title: string;
  list: Course[];
}

export interface Course {
  name: string;
  provider: string;
  duration: string;
  content: string;
}

export interface Skills {
  title: string;
  list: string[];
}

export interface SoftSkills {
  title: string;
  list: string[];
}

export interface Projects {
  title: string;
  list: Project[];
}

export interface Project {
  name: string;
  description: string;
}

export interface Styles {
  sectionStyle: string;
  titleStyle: string;
  subtitleStyle: string;
  textStyle: string;
  badgeStyle: string;
  buttonStyle: string;
}
