import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setprofileData } from "../redux/usrSlice";
import axios from "axios";
import { setuserData } from "../redux/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.user);

  // Initialize form with empty/default values
  const [form, setForm] = useState({
    name: "",
    userName: "",
    bio: "",
    profession: "",
    gender: "",
    photo: null,
    preview:
      "https://images.pexels.com/photos/32703420/pexels-photo-32703420.jpeg",
  });

  // Fetch profile from API and store in Redux
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/user/profile`,
          { withCredentials: true }
        );
        dispatch(setuserData(res.data));
      } catch (err) {
        console.error(err);
      }
    };

    // if (userName) fetchProfile();
  }, []);

  // Update form state when Redux profileData changes
  useEffect(() => {
    if (profileData) {
      setForm((prev) => ({
        ...prev,
        name: profileData.name || "",
        userName: profileData.userName || "",
        bio: profileData.bio || "",
        profession: profileData.profession || "",
        gender: profileData.gender || "",
        preview: profileData.photo || prev.preview,
      }));
    }
  }, [profileData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        photo: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  // Handle form submit
  const handleSubmit =async (e) => {
    e.preventDefault();
    
    const datafromform = await axios.post("http://localhost:8000/api/user/editProfile",form,{withCredentials:true});
    console.log("Updated Profile:", datafromform);    // TODO: dispatch update profile API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-slate-100 p-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">
          Update Profile
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={form.preview}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-md"
          />
          <label className="mt-3 cursor-pointer text-sm text-indigo-600 hover:underline">
            Change Photo
            <input
              type="file"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter username"
              required
            />
          </div>

          {/* Bio */}
          {/* <div>
            <label className="block text-sm font-medium text-slate-700">
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Write bio for your profile"
              required
            />
          </div> */}

          {/* Profession */}
          {/* <div>
            <label className="block text-sm font-medium text-slate-700">
              Profession
            </label>
            <input
              type="text"
              name="profession"
              value={form.profession}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter your profession"
              required
            />
          </div> */}

          {/* Gender */}
          {/* <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Gender
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={form.gender === "male"}
                  onChange={handleChange}
                  className="accent-indigo-600"
                />
                <span className="text-slate-700">Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={form.gender === "female"}
                  onChange={handleChange}
                  className="accent-pink-500"
                />
                <span className="text-slate-700">Female</span>
              </label>
            </div>
          </div> */}

          {/* submit button */}
          <div className="flex justify-between gap-3 pt-4">
            <button
              type="button"
              className="w-1/2 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;