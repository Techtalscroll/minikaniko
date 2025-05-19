import { UserProfile } from "@clerk/nextjs";
import AddressForm from "../components/AddressForm";

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Your Profile</h1>

      <div className="bg-white shadow-md p-4 rounded">
        <h2 className="text-xl mb-2 font-semibold">Update Address</h2>
        <AddressForm />
      </div>

      <div className="bg-white shadow-md p-4 rounded">
        <h2 className="text-xl mb-2 font-semibold">Account Settings</h2>
        <UserProfile />
      </div>
    </div>
  );
}
