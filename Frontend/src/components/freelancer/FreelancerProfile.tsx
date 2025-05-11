import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Profile {
  name: string;
  email: string;
  address?: string;
}

const FreelancerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/userauth/profile/${id}`
        );
        if (!res.ok) throw new Error("Profile not found");

        const data: Profile = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{profile.name}'s Profile</h2>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Address:</strong> {profile.address || "No address provided"}
      </p>
      {/* More profile info */}
    </div>
  );
};

export default FreelancerProfile;
