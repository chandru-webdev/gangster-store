import { Link } from "react-router-dom";

const AnnouncementBar = () => {
  return (
    <div className="announcement-bar flex items-center justify-center gap-2">
      <span>Special Offer: Enjoy 40% OFF on Two Hot-Selling Products!</span>
      <Link 
        to="/best-offers" 
        className="underline font-semibold hover:no-underline transition-all"
      >
        SHOP NOW
      </Link>
    </div>
  );
};

export default AnnouncementBar;
