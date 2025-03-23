export interface IRouteProps {
  component: React.ComponentType;
  redirectTo?: string;
}

export interface IState {
  isLoading: boolean;
  error: string | null;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  access_token?: string;
  created_at?: string;
}

export interface IContacts {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birthdate: string;
  description?: string;
  created_at?: string;
}
