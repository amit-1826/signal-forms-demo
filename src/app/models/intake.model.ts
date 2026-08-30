export interface IntakeModel {
    projectName: string;
    description: string;
    projectCode: string;
    isRemote: boolean;
    travelBudget: number; // Optional property for travel budget
    contactAddress: AddressModel; // Optional property for contact address
}

export interface AddressModel {
    street: string;
    city: string;
    zipCode: string;
}