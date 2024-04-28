export interface UserDTO{

    id: number
    customerId : string;
    name: string;
    address:string;
    phone: string;
    idCard: string;
}

export interface CarrentalTransferDTO{
    id: number;
    amount: number;
    timestamp: string;
    source: UserDTO | null;
    destination: UserDTO | null;
}