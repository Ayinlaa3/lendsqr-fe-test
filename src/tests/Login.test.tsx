// src/tests/Login.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { Login } from "../pages/Login";
import * as mockApi from "../utils/mockApi";
import type { Mock } from "vitest";

// Mock toast hook
vi.mock("../hooks/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe("Login Page", () => {
  beforeEach(() => {
    vi.spyOn(mockApi, "loginUser").mockResolvedValue(false); // default
  });

  const setup = () =>
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

  it("renders login form correctly", () => {
    setup();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    setup();
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const toggleButton = screen.getByRole("button", { name: /show/i });

    // Default type
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click SHOW → should change type
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click HIDE
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("calls loginUser and navigates on success", async () => {
    (mockApi.loginUser as Mock).mockResolvedValueOnce(true);

    setup();

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() =>
      expect(mockApi.loginUser).toHaveBeenCalledWith("test@example.com", "password123")
    );
  });

  it("shows error toast on failed login", async () => {
    (mockApi.loginUser as Mock).mockResolvedValueOnce(false);

    setup();

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(mockApi.loginUser).toHaveBeenCalled();
    });
  });
});
