import { getCookie } from "cookies-next";
import jwt_decode from "jwt-decode";
import { H } from "highlight.run";

export const TokenManager = {
  getToken() {
    const token = getCookie("auth");
    return token;
  },

  isTokenValid(token) {
    if (!token) {
      H.error(new Error("Token validation failed: No token present"), {
        tags: { type: "token_validation" },
        severity: "warning",
      });
      return false;
    }

    try {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      const tokenState = {
        tokenExists: !!token,
        expirationTime: decoded.exp,
        currentTime,
        timeUntilExpiry: decoded.exp - currentTime,
        isExpired: decoded.exp < currentTime,
      };

      if (tokenState.isExpired) {
        H.error(new Error("Token is expired"), {
          tags: { type: "token_validation" },
          severity: "warning",
          ...tokenState,
        });
      } else {
        H.track("token_validation", {
          tags: { type: "token_validation" },
          ...tokenState,
        });
      }

      return decoded.exp > currentTime;
    } catch (error) {
      H.error(error, {
        tags: { type: "token_validation" },
        severity: "error",
        token: token ? "exists" : "missing",
      });
      return false;
    }
  },

  getTokenExpiryTime(token) {
    try {
      const decoded = jwt_decode(token);
      return decoded.exp * 1000; // Convert to milliseconds
    } catch (error) {
      H.error(error, {
        tags: { type: "token_expiry" },
        severity: "error",
      });
      return null;
    }
  },
};
