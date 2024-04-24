export interface PasswordResetRequest{
    previousPassword: string;
    newPassword: string;
    confirmPassword: string; 
}