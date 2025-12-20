import api from "@/lib/api";

const userService = {
  getUserInfo: () => {
    return api.get("/users/me");
  },
};

export default userService;
