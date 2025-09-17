// src/tests/UserDetails.test.tsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import { UserDetails } from "../pages/UserDetails";
import { User } from "../types";
import * as mockApi from "../utils/mockApi";

// Mock toast
vi.mock("../hooks/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Mock navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("UserDetails Page", () => {
  const mockUser = {
    id: "1",
    fullName: "John Doe",
    userName: "johndoe",
    phoneNumber: "1234567890",
    email: "john@example.com",
    bvn: "12345678901",
    gender: "Male",
    maritalStatus: "Single",
    children: "None",
    typeOfResidence: "Apartment",
    levelOfEducation: "B.Sc",
    employmentStatus: "Employed",
    sectorOfEmployment: "Tech",
    durationOfEmployment: "2 years",
    officeEmail: "john@company.com",
    monthlyIncome: ["2000", "4000"],
    loanRepayment: "500",
    accountBalance: "5000",
    accountNumber: "1234567890",
    bank: "LendBank",
    twitter: "@johndoe",
    facebook: "fb.com/johndoe",
    instagram: "@johndoe",
    status: "Active",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const setup = () =>
    render(
      <MemoryRouter initialEntries={["/users/1"]}>
        <Routes>
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

  it("renders loading state", async () => {
    vi.spyOn(mockApi, "getUserById").mockResolvedValueOnce(mockUser as User);

    setup();

    expect(screen.getByText(/Loading user details/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("renders user details when user is found", async () => {
    vi.spyOn(mockApi, "getUserById").mockResolvedValueOnce(mockUser as User);

    setup();

    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("johndoe")).toBeInTheDocument();
    expect(screen.getByText("5000.00")).toBeInTheDocument();
  });

  it("shows error UI if user not found", async () => {
    vi.spyOn(mockApi, "getUserById").mockResolvedValueOnce(null);

    setup();

    expect(await screen.findByText(/User not found/i)).toBeInTheDocument();
  });

  it("updates status to Blacklisted", async () => {
    vi.spyOn(mockApi, "getUserById").mockResolvedValueOnce(mockUser as User);

    setup();

    const blacklistBtn = await screen.findByText(/Blacklist User/i);
    fireEvent.click(blacklistBtn);

    expect(localStorage.getItem("user_1")).toContain("Blacklisted");
  });

  it("navigates back when back button is clicked", async () => {
    vi.spyOn(mockApi, "getUserById").mockResolvedValueOnce(mockUser as User);

    setup();

    const backBtn = await screen.findByText(/Back to Users/i);
    fireEvent.click(backBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/users");
  });
});
