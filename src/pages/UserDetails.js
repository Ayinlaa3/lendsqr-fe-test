import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, StarIcon } from "lucide-react";
import { getUserById } from "../utils/mockApi";
import { useToast } from "../hooks/use-toast";
import "./UserDetails.scss";
export const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    useEffect(() => {
        if (!id)
            return;
        const loadUser = async () => {
            try {
                const storedUser = localStorage.getItem(`user_${id}`);
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
                else {
                    const userData = await getUserById(id);
                    if (userData) {
                        setUser(userData);
                    }
                    else {
                        toast({
                            title: "User not found",
                            description: "The requested user could not be found.",
                            variant: "destructive",
                        });
                    }
                }
            }
            catch {
                toast({
                    title: "Error loading user",
                    description: "Failed to load user details. Please try again.",
                    variant: "destructive",
                });
            }
            finally {
                setLoading(false);
            }
        };
        loadUser();
    }, [id, toast]);
    const handleStatusChange = (newStatus) => {
        if (!user)
            return;
        const updatedUser = { ...user, status: newStatus };
        setUser(updatedUser);
        localStorage.setItem(`user_${user.id}`, JSON.stringify(updatedUser));
        toast({
            title: "User status updated",
            description: `User has been ${newStatus.toLowerCase()}.`,
        });
    };
    if (loading) {
        return (_jsx("div", { className: "user-details", children: _jsxs("div", { className: "user-details__loading", children: [_jsx("div", { className: "user-details__spinner" }), _jsx("p", { children: "Loading user details..." })] }) }));
    }
    if (!user) {
        return (_jsx("div", { className: "user-details", children: _jsxs("div", { className: "user-details__error", children: [_jsx("h2", { children: "User not found" }), _jsx("p", { children: "The requested user could not be found." }), _jsx("button", { onClick: () => navigate("/users"), className: "btn", children: "Back to Users" })] }) }));
    }
    return (_jsxs("div", { className: "user-details", children: [_jsxs("div", { className: "user-details__header", children: [_jsxs("button", { onClick: () => navigate("/users"), className: "back-button", children: [_jsx(ArrowLeft, { size: 16 }), " Back to Users"] }), _jsxs("div", { className: "user-details__header-actions", children: [_jsx("h1", { children: "User Details" }), _jsxs("div", { className: "user-details__actions", children: [_jsx("button", { onClick: () => handleStatusChange("Blacklisted"), className: "btn btn-outline-danger", children: "Blacklist User" }), _jsx("button", { onClick: () => handleStatusChange("Active"), className: "btn btn-outline-success", children: "Activate User" })] })] })] }), _jsxs("div", { className: "user-details__profile", children: [_jsxs("div", { className: "user-details__profile-header", children: [_jsxs("div", { className: "user-details__profile-info", children: [_jsx("div", { className: "user-details__avatar", children: _jsx("img", { src: "/lendr_avatar.png", alt: user.fullName }) }), _jsxs("div", { className: "user-details__basic-info", children: [_jsx("h2", { children: user.fullName }), _jsx("p", { className: "user-details__username", children: user.userName })] })] }), _jsxs("div", { className: "user-details__tier", children: [_jsx("p", { children: "User's Tier" }), _jsxs("div", { className: "user-details__stars", children: [_jsx(Star, { fill: "#E9B200", color: "#E9B200", size: 16 }), _jsx(StarIcon, { color: "#E6ECF2", size: 16 }), _jsx(StarIcon, { color: "#E6ECF2", size: 16 })] })] }), _jsxs("div", { className: "user-details__account-balance", children: [_jsxs("h3", { children: [user.accountBalance, ".00"] }), _jsxs("p", { children: [user.accountNumber, "/", user.bank] })] })] }), _jsxs("div", { className: "user-details__tabs", children: [_jsx("div", { className: "user-details__tab user-details__tab--active", children: "General Details" }), _jsx("div", { className: "user-details__tab", children: "Documents" }), _jsx("div", { className: "user-details__tab", children: "Bank Details" }), _jsx("div", { className: "user-details__tab", children: "Loans" }), _jsx("div", { className: "user-details__tab", children: "Savings" }), _jsx("div", { className: "user-details__tab", children: "App and System" })] })] }), _jsxs("div", { className: "user-details__content", children: [_jsxs("div", { className: "user-details__section", children: [_jsx("h3", { children: "Personal Information" }), _jsxs("div", { className: "user-details__grid", children: [_jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Full Name" }), _jsx("p", { children: user.fullName })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Phone Number" }), _jsx("p", { children: user.phoneNumber })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Email Address" }), _jsx("p", { children: user.email })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "BVN" }), _jsx("p", { children: user.bvn })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Gender" }), _jsx("p", { children: user.gender })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Marital Status" }), _jsx("p", { children: user.maritalStatus })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Children" }), _jsx("p", { children: user.children })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Type of Residence" }), _jsx("p", { children: user.typeOfResidence })] })] })] }), _jsxs("div", { className: "user-details__section", children: [_jsx("h3", { children: "Education and Employment" }), _jsxs("div", { className: "user-details__grid", children: [_jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Level of Education" }), _jsx("p", { children: user.levelOfEducation })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Employment Status" }), _jsx("p", { children: user.employmentStatus })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Sector of Employment" }), _jsx("p", { children: user.sectorOfEmployment })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Duration of Employment" }), _jsx("p", { children: user.durationOfEmployment })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Office Email" }), _jsx("p", { children: user.officeEmail })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Monthly Income" }), _jsxs("p", { children: [user.monthlyIncome[0], ".00 - ", user.monthlyIncome[1], ".00"] })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Loan Repayment" }), _jsxs("p", { children: [user.loanRepayment, ".00"] })] })] })] }), _jsxs("div", { className: "user-details__section", children: [_jsx("h3", { children: "Socials" }), _jsxs("div", { className: "user-details__grid", children: [_jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Twitter" }), _jsx("p", { children: user.twitter })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Facebook" }), _jsx("p", { children: user.facebook })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Instagram" }), _jsx("p", { children: user.instagram })] })] })] }), _jsxs("div", { className: "user-details__section", children: [_jsx("h3", { children: "Guarantor" }), _jsxs("div", { className: "user-details__grid", children: [_jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Full Name" }), _jsx("p", { children: "Debby Ogana" })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Phone Number" }), _jsx("p", { children: "07060780922" })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Email Address" }), _jsx("p", { children: "debby@gmail.com" })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Relationship" }), _jsx("p", { children: "Sister" })] })] }), _jsxs("div", { className: "user-details__grid user-details__grid--spaced", children: [_jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Full Name" }), _jsx("p", { children: "Debby Ogana" })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Phone Number" }), _jsx("p", { children: "07060780922" })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Email Address" }), _jsx("p", { children: "debby@gmail.com" })] }), _jsxs("div", { className: "user-details__item", children: [_jsx("label", { children: "Relationship" }), _jsx("p", { children: "Sister" })] })] })] })] })] }));
};
