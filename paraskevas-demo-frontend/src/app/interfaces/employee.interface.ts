import { Company } from "./company.interface";

export interface Employee {
  id: number;
  name: string;
  surname: string;
  address: string;
  email: string;
  salary: number;
  company: Company;
}
