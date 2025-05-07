import { EmailAuthCredential } from "firebase/auth";

export interface AdminInterface {
    about: AboutData;
    profile: profileData;
    service: serviceData;
    experience: ExperienceData;
    contact: contactData;
}

// src/app/feature/user/components/about/about.model.ts

export interface AboutData {
    heading: string;
    paragraphs: string[];
    socialLinks: { icon: string, url: string }[];
    profileImageUrl: string;
    cvFileUrl: string;
  }
  
  




export interface profileData {
    name: string;
    email: String;
    contactNumber: number;
    description: string;
    linkdIn: string;
    fiverr: string;
    github: string;
    instagram: string;
    facebook: string;
    CV: null;
    image: '';
}

export interface serviceData {
    id: any
    title: string;
    description: string;
}

export interface ExperienceData {
    id?: any;
    title: string;
    description: string;
    startDate: Date | string;
    endDate: Date | string;
    createdAt?: Date;
}

export interface contactData{
    id?: any;
    name: string;
    email: EmailAuthCredential;
    subject: string;
    message: string;
}
// export interface heroData{
//     id?: any;
//     title: string;
//     description: string;
//     years: number;
//     client: number;
//     projectcompleted: number;
//     image:'';


// }
export interface Project {
    id: string;
    title: string;
    category: string;
    shortDescription: string;
    fullDescription: string;
    imageUrl: string;
    technologies?: string[];
  }
  