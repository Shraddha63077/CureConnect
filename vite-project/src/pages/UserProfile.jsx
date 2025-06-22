import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { backendUrl } = useContext(AppContext);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    image: null,
  });

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        const userData = data.userData;
        setProfile({
          name: userData.name || "",
          phone: userData.phone || "",
          address: userData.address ? JSON.stringify(userData.address) : "",
          dob: userData.dob || "",
          gender: userData.gender || "",
          image: null,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile.name || !profile.phone || !profile.dob || !profile.gender) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("phone", profile.phone);
      formData.append("address", profile.address);
      formData.append("dob", profile.dob);
      formData.append("gender", profile.gender);
      if (profile.image) {
        formData.append("image", profile.image);
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully");
        fetchProfile();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-2">
          <label className="block mb-1">Name*</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Phone*</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Address (JSON format)</label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            rows={3}
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Date of Birth*</label>
          <input
            type="date"
            name="dob"
            value={profile.dob}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Gender*</label>
          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Profile Image</label>
          <input type="file" name="image" onChange={handleFileChange} />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
