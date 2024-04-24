export interface Prescription{
    id:string;
    patientNIC:string;
    doctorID:string;
    doctorName:string;
    patientName:string;
    date:Date;
    diagnosis:string;
    medications:String[];
    instructions:string;
    state: State; 
    patient: Patient;
  }
  
  export enum State {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
  }
  
  export interface Patient {
    patientNIC: string;
    patientName: string;
    gender: string;
    age: string;
    address: string;
    email: string;
    contactNumber: string;
  }