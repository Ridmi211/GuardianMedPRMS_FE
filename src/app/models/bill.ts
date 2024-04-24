export interface Bill{
    id:string;
    adminId:string;
    patientNIC:string;
    patientName:string;
    date:Date;
    medications:Medication[];
    doctorsMedication:String[];
    instructions:string;
    totalAmount: string;
    customerBillId:string;
  }

  export interface Medication {
   
    name: string;
    quantity: string;
    price:string;
  
  }
  