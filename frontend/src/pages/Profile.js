import React, { useEffect, useState, useContext } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { token, backendURL } = useContext(ShopContext);
  const [profile, setProfile] = useState({ name: '', email: '' });

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${backendURL}/api/user/profile`, {
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      });

      const data = await res.json();

      if (data.success) {
        setProfile(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch profile");
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  return (
    <div className="p-6 max-w-xl font-prata text-gray-800">
      <Title text1="My" text2="Profile" />
      <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </div>
    </div>
  );
};

export default Profile;
