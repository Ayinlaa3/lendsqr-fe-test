import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, StarIcon } from "lucide-react";
import { User } from "../types";
import { getUserById } from "../utils/mockApi";
import { useToast } from "../hooks/use-toast";
import "./UserDetails.scss";

export const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;

    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem(`user_${id}`);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          const userData = await getUserById(id);
          if (userData) {
            setUser(userData);
          } else {
            toast({
              title: "User not found",
              description: "The requested user could not be found.",
              variant: "destructive",
            });
          }
        }
      } catch {
        toast({
          title: "Error loading user",
          description: "Failed to load user details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, toast]);

  const handleStatusChange = (newStatus: User["status"]) => {
    if (!user) return;

    const updatedUser = { ...user, status: newStatus };
    setUser(updatedUser);
    localStorage.setItem(`user_${user.id}`, JSON.stringify(updatedUser));

    toast({
      title: "User status updated",
      description: `User has been ${newStatus.toLowerCase()}.`,
    });
  };

  if (loading) {
    return (
      <div className="user-details">
        <div className="user-details__loading">
          <div className="user-details__spinner" />
          <p>Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-details">
        <div className="user-details__error">
          <h2>User not found</h2>
          <p>The requested user could not be found.</p>
          <button onClick={() => navigate("/users")} className="btn">
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-details">
      <div className="user-details__header">
        <button
          onClick={() => navigate("/users")}
          className="user-details__back-btn"
        >
          <ArrowLeft size={16} /> Back to Users
        </button>

        <div className="user-details__header-actions">
          <h1>User Details</h1>
          <div className="user-details__actions">
            <button
              onClick={() => handleStatusChange("Blacklisted")}
              className="btn btn-outline-danger"
            >
              Blacklist User
            </button>
            <button
              onClick={() => handleStatusChange("Active")}
              className="btn btn-outline-success"
            >
              Activate User
            </button>
          </div>
        </div>
      </div>

      <div className="user-details__profile">
        <div className="user-details__profile-header">
          <div className="user-details__profile-info">
            <div className="user-details__avatar">
              <img
                src={`https://ui-avatars.com/api/?name=${user.fullName}&background=39CDCC&color=fff&size=100`}
                alt={user.fullName}
              />
            </div>
            <div className="user-details__basic-info">
              <h2>{user.fullName}</h2>
              <p className="user-details__username">{user.userName}</p>
            </div>
          </div>

          <div className="user-details__tier">
            <p>User's Tier</p>
            <div className="user-details__stars">
              <Star fill="#E9B200" color="#E9B200" size={16} />
              <StarIcon color="#E6ECF2" size={16} />
              <StarIcon color="#E6ECF2" size={16} />
            </div>
          </div>

          <div className="user-details__account-balance">
            <h3>{user.accountBalance}</h3>
            <p>
              {user.accountNumber}/{user.bank}
            </p>
          </div>
        </div>

        <div className="user-details__tabs">
          <div className="user-details__tab user-details__tab--active">
            General Details
          </div>
          <div className="user-details__tab">Documents</div>
          <div className="user-details__tab">Bank Details</div>
          <div className="user-details__tab">Loans</div>
          <div className="user-details__tab">Savings</div>
          <div className="user-details__tab">App and System</div>
        </div>
      </div>

      <div className="user-details__content">
        {/* Personal Information */}
        <div className="user-details__section">
          <h3>Personal Information</h3>
          <div className="user-details__grid">
            <div className="user-details__item">
              <label>Full Name</label>
              <p>{user.fullName}</p>
            </div>
            <div className="user-details__item">
              <label>Phone Number</label>
              <p>{user.phoneNumber}</p>
            </div>
            <div className="user-details__item">
              <label>Email Address</label>
              <p>{user.email}</p>
            </div>
            <div className="user-details__item">
              <label>BVN</label>
              <p>{user.bvn}</p>
            </div>
            <div className="user-details__item">
              <label>Gender</label>
              <p>{user.gender}</p>
            </div>
            <div className="user-details__item">
              <label>Marital Status</label>
              <p>{user.maritalStatus}</p>
            </div>
            <div className="user-details__item">
              <label>Children</label>
              <p>{user.children}</p>
            </div>
            <div className="user-details__item">
              <label>Type of Residence</label>
              <p>{user.typeOfResidence}</p>
            </div>
          </div>
        </div>

        {/* Education and Employment */}
        <div className="user-details__section">
          <h3>Education and Employment</h3>
          <div className="user-details__grid">
            <div className="user-details__item">
              <label>Level of Education</label>
              <p>{user.levelOfEducation}</p>
            </div>
            <div className="user-details__item">
              <label>Employment Status</label>
              <p>{user.employmentStatus}</p>
            </div>
            <div className="user-details__item">
              <label>Sector of Employment</label>
              <p>{user.sectorOfEmployment}</p>
            </div>
            <div className="user-details__item">
              <label>Duration of Employment</label>
              <p>{user.durationOfEmployment}</p>
            </div>
            <div className="user-details__item">
              <label>Office Email</label>
              <p>{user.officeEmail}</p>
            </div>
            <div className="user-details__item">
              <label>Monthly Income</label>
              <p>
                {user.monthlyIncome[0]} - {user.monthlyIncome[1]}
              </p>
            </div>
            <div className="user-details__item">
              <label>Loan Repayment</label>
              <p>{user.loanRepayment}</p>
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="user-details__section">
          <h3>Socials</h3>
          <div className="user-details__grid">
            <div className="user-details__item">
              <label>Twitter</label>
              <p>{user.twitter}</p>
            </div>
            <div className="user-details__item">
              <label>Facebook</label>
              <p>{user.facebook}</p>
            </div>
            <div className="user-details__item">
              <label>Instagram</label>
              <p>{user.instagram}</p>
            </div>
          </div>
        </div>

        {/* Guarantor */}
        <div className="user-details__section">
          <h3>Guarantor</h3>
          <div className="user-details__grid">
            <div className="user-details__item">
              <label>Full Name</label>
              <p>Debby Ogana</p>
            </div>
            <div className="user-details__item">
              <label>Phone Number</label>
              <p>07060780922</p>
            </div>
            <div className="user-details__item">
              <label>Email Address</label>
              <p>debby@gmail.com</p>
            </div>
            <div className="user-details__item">
              <label>Relationship</label>
              <p>Sister</p>
            </div>
          </div>

          <div className="user-details__grid user-details__grid--spaced">
            <div className="user-details__item">
              <label>Full Name</label>
              <p>Debby Ogana</p>
            </div>
            <div className="user-details__item">
              <label>Phone Number</label>
              <p>07060780922</p>
            </div>
            <div className="user-details__item">
              <label>Email Address</label>
              <p>debby@gmail.com</p>
            </div>
            <div className="user-details__item">
              <label>Relationship</label>
              <p>Sister</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
