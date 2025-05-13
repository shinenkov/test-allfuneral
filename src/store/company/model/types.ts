export type CompaniesState = {
  company: CompanyType | null;
};

export type CompanyType = {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: string;
  contract: ContractType;
  type: string[];
  status: string;
  photos: PhotoType[];
  createdAt: string;
  updatedAt: string;
};

export type PhotoType = {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string;
};

export type ContractType = {
  no: string;
  issue_date: string;
};

export type AuthParams = {
  auth: string | null;
};

export type GetCompanyParams = {
  id: string;
} & AuthParams;

export type AddImageParams = {
  file: FormData;
} & GetCompanyParams;

export type DeleteImageParams = {
  name: string;
} & GetCompanyParams;
