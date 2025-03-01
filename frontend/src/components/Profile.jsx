import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { User, MapPin, Mail, Lock, Save, AlertTriangle, ArrowLeft } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        navigate("/login");
        return;
      }
      
      // Get email from localStorage
      const email = localStorage.getItem("email");
      if (!email) {
        navigate("/login");
        return;
      }
      
      setCurrentEmail(email);
      fetchUserProfile(email);
    };

    checkAuth();
  }, [navigate]);

  const fetchUserProfile = async (email) => {
    try {
      setLoading(true);
      console.log("Fetching profile for email:", email);
      
      const response = await fetch("https://myifoodb.onrender.com/api/getUserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error:", response.status, errorText);
        throw new Error(`API error: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      console.log("Profile data received:", data);
      
      if (data.success) {
        setUserData({
          name: data.user.name,
          email: data.user.email,
          location: data.user.location || "",
          password: "",
        });
      } else {
        toast.error(data.message || "Error fetching profile");
        setError(data.message || "Failed to load profile data");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (userData.name.length < 3) {
      setError("Name should be at least 3 characters");
      return;
    }
    
    if (userData.password && userData.password.length < 5) {
      setError("Password should be at least 5 characters");
      return;
    }
    
    try {
      setSaving(true);
      setError("");
      
      const response = await fetch("https://myifoodb.onrender.com/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userData,
          currentEmail, // Send the current email for identification
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success("Profile updated successfully");
        
        // Update localStorage if email was changed
        if (data.user.email !== currentEmail) {
          localStorage.setItem("email", data.user.email);
          setCurrentEmail(data.user.email);
        }
        
        // Update name in localStorage
        localStorage.setItem("name", data.user.name);
        
        // Refresh user data
        setUserData({
          ...userData,
          password: "",  // Clear password field after update
        });
      } else {
        toast.error(data.message || "Failed to update profile");
        setError(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
      setError("Network error. Please try again later.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    
    if (!deletePassword) {
      setError("Please enter your password to confirm account deletion");
      return;
    }
    
    try {
      setDeleting(true);
      setError("");
      
      const response = await fetch("https://myifoodb.onrender.com/api/deleteAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: currentEmail,
          password: deletePassword
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success("Account deleted successfully");
        
        // Clear local storage
        localStorage.removeItem("authToken");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        
        // Redirect to login page
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to delete account");
        setError(data.message || "Failed to delete account. Please check your password.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
      setError("Network error. Please try again later.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-6 pb-12">
      <div className="max-w-md mx-auto">
        <button 
          onClick={() => navigate("/")} 
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Home
        </button>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
            <h1 className="text-2xl font-bold mb-2">Profile Settings</h1>
            <p className="text-gray-300">Update your personal information</p>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mx-6 mt-4">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="relative">
              <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
              <div className="flex items-center border rounded-md overflow-hidden">
                <div className="bg-gray-100 p-3 border-r">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 focus:outline-none"
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
              <div className="flex items-center border rounded-md overflow-hidden">
                <div className="bg-gray-100 p-3 border-r">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 focus:outline-none"
                  placeholder="Your email address"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-700 mb-2 font-medium">Location</label>
              <div className="flex items-center border rounded-md overflow-hidden">
                <div className="bg-gray-100 p-3 border-r">
                  <MapPin className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  name="location"
                  value={userData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 focus:outline-none"
                  placeholder="Your location"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-700 mb-2 font-medium">
                Password <span className="text-gray-500 text-sm">(Leave blank to keep current)</span>
              </label>
              <div className="flex items-center border rounded-md overflow-hidden">
                <div className="bg-gray-100 p-3 border-r">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 focus:outline-none"
                  placeholder="New password (optional)"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className={`w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 px-4 rounded-md font-medium flex justify-center items-center gap-2 hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 ${
                saving ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Save Changes
                </>
              )}
            </button>
          </form>
          
          <div className="px-6 pb-6 pt-2">
            <div className="border-t border-gray-200 pt-4">
              {!showDeleteConfirm ? (
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full bg-red-100 text-red-600 py-3 px-4 rounded-md font-medium flex justify-center items-center gap-2 hover:bg-red-200 transition-all duration-200"
                >
                  <AlertTriangle className="h-5 w-5" />
                  Delete My Account
                </button>
              ) : (
                <div className="bg-red-50 p-4 rounded-md border border-red-200">
                  <h3 className="text-red-600 font-medium mb-3">Confirm Account Deletion</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    This action cannot be undone. All your data will be permanently deleted.
                  </p>
                  
                  <form onSubmit={handleDeleteAccount}>
                    <div className="mb-3">
                      <label className="block text-gray-700 text-sm mb-1">
                        Enter your password to confirm
                      </label>
                      <input
                        type="password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 text-sm"
                        placeholder="Your current password"
                        required
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowDeleteConfirm(false);
                          setDeletePassword("");
                        }}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={deleting}
                        className={`flex-1 bg-red-600 text-white py-2 rounded text-sm flex justify-center items-center ${
                          deleting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {deleting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                            Deleting...
                          </>
                        ) : (
                          "Delete Account"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;