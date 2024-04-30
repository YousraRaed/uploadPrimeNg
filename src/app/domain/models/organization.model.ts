import { StatusEnum } from './status.enum';

export interface Organization {
  id: number;
  name: string;
  logo: string;
  owner: string;
  industry: string;
  contactName: string;
  contactEmail: string;
  phoneCountryCode: number;
  phone: string;
  status: StatusEnum;
  creationDate: Date;
  logoBase64: string;
  logoContentType: string;
}
