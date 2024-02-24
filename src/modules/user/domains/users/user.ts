export class User {
  id: string;
  jobTitle?: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  isAdmin?: boolean;
  isActive?: boolean;
  password: string;
  archiveReason: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
}
