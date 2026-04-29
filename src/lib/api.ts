import { supabase } from "./supabase";
import type { User } from "@/store/authStore";

// ---- Types ----

export interface AuthResponse {
  token: string;
  user: User;
}

export interface MessageResponse {
  message: string;
}

// ---- Error translation ----

function translateError(msg: string): string {
  const map: Record<string, string> = {
    "Invalid login credentials": "Email hoặc mật khẩu không chính xác.",
    "Email not confirmed": "Vui lòng xác nhận email trước khi đăng nhập.",
    "User already registered": "Email này đã được đăng ký.",
    "Password should be at least 6 characters": "Mật khẩu phải có ít nhất 6 ký tự.",
    "For security purposes, you can only request this once every 60 seconds":
      "Vui lòng chờ 60 giây trước khi gửi lại.",
    "Unable to validate email address: invalid format": "Địa chỉ email không hợp lệ.",
    "Signup requires a valid password": "Mật khẩu không hợp lệ.",
  };
  return map[msg] ?? msg;
}

// ---- Auth API ----

export const authApi = {
  /**
   * Đăng nhập bằng email + password.
   * Supabase trả về session chứa JWT token.
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(translateError(error.message));
    return {
      token: data.session.access_token,
      user: {
        id: data.user.id,
        name: data.user.user_metadata?.name ?? "",
        email: data.user.email!,
        phone: data.user.user_metadata?.phone,
        avatar: data.user.user_metadata?.avatar_url,
      },
    };
  },

  /**
   * Đăng ký tài khoản mới.
   * Nếu Supabase yêu cầu xác nhận email, session sẽ là null
   * → ném lỗi yêu cầu user kiểm tra email.
   */
  async register(payload: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: { name: payload.name, phone: payload.phone ?? "" },
      },
    });
    if (error) throw new Error(translateError(error.message));
    if (!data.session) {
      throw new Error(
        "Tài khoản đã được tạo! Vui lòng kiểm tra email để xác nhận trước khi đăng nhập."
      );
    }
    return {
      token: data.session.access_token,
      user: {
        id: data.user!.id,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
      },
    };
  },

  /**
   * Gửi email đặt lại mật khẩu.
   * Link trong email sẽ redirect về /auth/reset-password#access_token=...&type=recovery
   */
  async forgotPassword(email: string): Promise<MessageResponse> {
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/reset-password`
        : "/auth/reset-password";
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw new Error(translateError(error.message));
    return { message: "Email đặt lại mật khẩu đã được gửi." };
  },

  /**
   * Đặt lại mật khẩu mới.
   * Supabase tự thiết lập session từ URL hash (#type=recovery) khi user click link email.
   * Chỉ cần gọi updateUser sau khi session đã được thiết lập.
   */
  async resetPassword(password: string): Promise<MessageResponse> {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw new Error(translateError(error.message));
    await supabase.auth.signOut();
    return { message: "Mật khẩu đã được cập nhật thành công." };
  },
};
