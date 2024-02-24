export enum TransportationTime {
  Morning = 'Morning',
  Afternoon = 'Afternoon',
  Both = 'Both',
}
export enum StartTime {
  Auto = 'now',
  NextMonth = 'nextMonth',
  NextYear = 'nextYear',
  HaveNotDecided = 'haveNotDecided',
}
export enum Gender {
  Male = 'male',
  Female = 'female',
}
export enum ContactMethod {
  Phone = 'phone',
  Telegram = 'telegram',
  SMS = 'sms',
  InPerson = 'inPerson',
}
export enum CredentialType {
  Employee = 'employee',
  Driver = 'driver',
  Passenger = 'passenger',
  Corporate = 'corporate',
  TransporterUser = 'transporterUser',
}
export enum PaymentMethod {
  Manual = 'Kabba',
  Telebirr = 'Telebirr',
  Chapa = 'Chapa',
  Bank = 'Bank',
  InternetBanking = 'Internet Banking',
  WalletTransfer = 'Wallet Transfer',
  BookingWithdraw = 'Booking Withdraw',
  CommissionWithdraw = 'Commission Withdraw',
  WalletTransferToEmployee = 'Wallet Transfer To Employee',
  WalletTransferFromCorporate = 'Wallet Transfer from Corporate',
  RefundFromEmployee = 'RefundFromEmployee',
}
export enum PaymentStatus {
  Pending = '1',
  Success = '2',
  Timeout = '3',
  Cancelled = '4',
  Failed = '5',
  Error = '-1',
}
export enum ChapaPaymentStatus {
  Pending = 'pending',
  Success = 'success',
  Timeout = 'timeout',
  Cancelled = 'cancelled',
  Failed = 'failed',
  Error = 'error',
}
export enum WalletType {
  IndividualWallet = 'IndividualWallet',
  CorporateWallet = 'CorporateWallet',
}

export enum DateOfWeek {
  MONDAY = 'Mon',
  TUESDAY = 'Tue',
  WEDNESDAY = 'Wed',
  THURSDAY = 'Thu',
  FRIDAY = 'Fri',
  SATURDAY = 'Sat',
  SUNDAY = 'Sun',
}

export enum ParentStatus {
  New = 'New',
  Agreed = 'Agreed',
  Declined = 'Declined',
  WaitingToBeAssigned = 'Waiting_To_Be_Assigned',
  ContractSigned = 'Contract_Signed',
  Assigned = 'Assigned',
  PartiallyAssigned = 'Partially_Assigned',
}
export enum DriverStatus {
  OnTheWay = 'On_The_Way',
  Arrived = 'Arrived',
  ArrivedAtHome = 'Arrived_At_Home',
}
export enum DriverAssignmentStatus {
  Active = 'Active',
  Pending = 'Pending',
  Started = 'Started',
  Completed = 'Completed',
  OnTheWay = 'On_The_Way',
}
export enum RequestStatus {
  Pending = 'pending',
  Started = 'started',
  Completed = 'completed',
}
export enum UserTypes {
  Transporter = 'transporter',
  Driver = 'driver',
  Passenger = 'passenger',
  Corporate = 'corporate',
  TransporterUser = 'Transporter User',
  Employee = 'employee',
}
