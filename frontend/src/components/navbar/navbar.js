import './navbar.scss';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="Navbar">
      <div className="flex justify-between items-center w-full pl-5 pr-5 m-2">
        <div className="">
          <h3>LPG</h3>
        </div>
        <div>
          <div className="flex justify-between items-center w-full">
            <div className="m-1">
              <Button variant="text" onClick={() => navigate("/generator")}>
                <span className="ml-2">Generator</span>
              </Button>
            </div>
            <div className="m-1">
              <Button variant="text" onClick={() => navigate("/page-components")}>
                <span className="ml-2">Page components</span>
              </Button>
            </div>
            <div className="m-1">
              <Button variant="text" onClick={() => navigate("/")}>
                <span className="ml-2">Test</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="">
          <div>
            <span>User Profile</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
