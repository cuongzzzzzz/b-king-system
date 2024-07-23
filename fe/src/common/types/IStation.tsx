export interface IStation {
  _id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  latitude?: string;
  longitude?: string;
  type?: string;

  facilities?: string[];
  isActive: boolean;
}
