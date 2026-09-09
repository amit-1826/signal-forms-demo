export interface IntakeModel {
    projectName: string;
    description: string;
    projectCode: string;
    isRemote: boolean;
    travelBudget: number; // Optional property for travel budget
    contactAddress: AddressModel; // Optional property for contact address
    members: TeamMemberModel[]; // Optional property for team members
}

export interface AddressModel {
    street: string;
    city: string;
    zipCode: string;
}

export interface TeamMemberModel {
    name: string;
    role: string;
    email: string;
}