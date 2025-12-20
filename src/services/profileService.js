import api from "@/lib/api";

export const profileService = {
  // Get current user profile
  getProfile: async () => {
    const response = await api.get("/profile");
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put("/profile", profileData);
    return response.data;
  },

  // Upload avatar
  uploadAvatar: async (avatarData) => {
    const response = await api.post("/profile/avatar", avatarData);
    return response.data;
  },
};
