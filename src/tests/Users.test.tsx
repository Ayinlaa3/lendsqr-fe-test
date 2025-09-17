// src/tests/Users.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { Users } from "../pages/Users";
import * as mockApi from "../utils/mockApi";
import { User } from "../types";

// Mock toast
vi.mock("../hooks/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe("Users Page", () => {
  beforeEach(() => {
    vi.spyOn(mockApi, "getUsers").mockResolvedValue({
      users: [
        {
          id: "1",
          orgName: "Lendsqr",
          fullName: "John Doe",
          officeEmail: "john@lendsqr.com",
          phoneNumber: "1234567890",
          dateJoined: new Date().toISOString(),
          status: "Active",
        } as User,
      ],
      total: 1,
    });
  });

  const setup = () =>
    render(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );

  it("renders table with users", async () => {
    setup();

    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Lendsqr")).toBeInTheDocument();
  });

  it("shows user status badge correctly", async () => {
    setup();
    const badge = await screen.findByText(/Active/i);
    expect(badge).toHaveClass("status-active");
  });

  it("opens dropdown and triggers blacklist action", async () => {
    setup();

    const menuBtn = await screen.findByRole("button", { name: "" }); // MoreVertical button
    fireEvent.click(menuBtn);

    const blacklistBtn = await screen.findByText(/Blacklist User/i);
    fireEvent.click(blacklistBtn);

    await waitFor(() => {
      expect(screen.getByText(/Blacklisted/i)).toBeInTheDocument();
    });
  });

  it("opens filter panel when header is clicked", async () => {
    setup();

    const orgHeader = await screen.findByText(/ORGANIZATION/i);
    fireEvent.click(orgHeader);

    expect(await screen.findByText(/Organization/i)).toBeInTheDocument();
  });
});
