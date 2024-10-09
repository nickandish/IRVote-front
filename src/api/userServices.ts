import axios from "./axios";
import apiClient from "./axios";
import { API_URLS } from "./urls";

export const sendOtp = async (mobileNumber: string) => {
  try {
    const response = await apiClient.post(API_URLS.SEND_OTP, {
      mobile: mobileNumber,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

export const sendOtpVerification = async (
  mobileNumber: string,
  otp: string
) => {
  try {
    const payload = {
      mobile: mobileNumber,
      otp: otp,
    };
    const response = await axios.post(API_URLS.LOGIN_BY_OTP, payload);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP verification:", error);
    throw error;
  }
};

export interface DurationItem {
  id: number;
  fa_title: string;
  en_title: string;
  disabled: boolean;
  start_at: string;
  end_at: string;
  duration_order_code: number;
  logo: string;
  background: string;
  status: number;
  license: any; // Adjust type based on actual data
  license_desc: string;
  election: number;
  duration_manager: number;
  duration_observer: number;
  duration_operators: number[];
  allowed_voters: number[];
  candidate: number[];
}
