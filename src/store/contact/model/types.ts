export type ContactState = {
  contact: ContactType | null;
};

export type ContactType = {
  id: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type GetContactParams = {
  id: string;
  auth: string | null;
};
