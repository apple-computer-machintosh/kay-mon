export const USER_SETUP_STORAGE_KEY = "user-initial-setup";

export interface UserSetup {
  name: string;
  allergies: string;
  memo: string;
  completedAt: string;
}
