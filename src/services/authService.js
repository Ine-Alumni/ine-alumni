import api from "@/lib/api";

export const authService = {
  // Register a new user
  register: async (
    fullName,
    email,
    password,
    major,
    graduationYear,
    phoneNumber,
    gender,
    country,
    city,
  ) => {
    const response = await api.post(
      "/auth/signup",
      {
        fullName,
        email,
        password,
        major,
        graduationYear,
        phoneNumber,
        gender,
        country,
        city,
      },
      {
        validateStatus: function (status) {
          return status < 400;
        },
      },
    );
    return response.data;
  },

  // Login user
  login: async (email, password) => {
    const response = await api.post(
      "/auth/signin",
      {
        email,
        password,
      },
      {
        validateStatus: function (status) {
          return status < 400;
        },
      },
    );
    if (response.data) {
      localStorage.setItem("auth", JSON.stringify(response.data));
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("auth");
    window.location.href = "/";
  },

  // Get authentication state
  getAuthenticationState: async () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));

      if (!auth || !auth.token) return null;

      const response = await api.get("/auth/validate", {
        validateStatus: function (status) {
          return status < 400;
        },
      });

      const token = auth.token;
      return { ...response.data, token };
    } catch {
      localStorage.removeItem("auth");
      return null;
    }
  },

  // Verify email with OTP
  verifyEmail: async (otp) => {
    const response = await api.get("/email/verify", {
      params: { token: otp },
    });
    return response.data;
  },

  // Resend verification email
  resendVerificationEmail: async () => {
    const response = await api.get("/email/resend-verification");
    return response.data;
  },
};
