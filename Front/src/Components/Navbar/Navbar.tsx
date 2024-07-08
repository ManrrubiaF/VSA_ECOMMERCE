import Styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../Redux/Hooks";
import { useNavigate } from "react-router-dom";
import { resetPagination } from "../../Redux/Slice/PaginationSlice";
import { useAppSelector} from '../../Redux/Hooks'

export default function NavBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<Boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const data = useAppSelector((state) => state.data)
  const facebook = data.socialLinks?.find((link) => link.includes('facebook')) || null;
  const instagram = data.socialLinks?.find((link) => link.includes('instagram')) || null;   
    

  useEffect(() => {
    const checkIsMobile = () => {
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      console.log(width);
      if (width <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }

      console.log("ismobile", isMobile);
    };

    checkIsMobile();

    const handleResize = () => {
      checkIsMobile();
      setIsMobileMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleProductsClick = () => {
    dispatch(resetPagination());
    navigate("/products");
    setIsMobileMenuOpen(false)
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav>
      {isMobile ? (
        <div>
          <div className={Styles.mobileNav}>
            <img
              className={Styles.MenuIcon}
              src="/assets/icons/menu-icon.svg"
              alt="Menu icon"
              onClick={toggleMobileMenu}
            />
            <h1>Menu</h1>
            <img
              src="/assets/icons/vsaLOGO.jpg"
              alt="logo"
              className={Styles.MobileLogo}
            />
          </div>
          {isMobileMenuOpen && (
            <div className={Styles.mobileMenu}>
              <ul>
                <li onClick={() => {navigate("/"); setIsMobileMenuOpen(false)}}>Inicio</li>
                <li onClick={() => {navigate("/HySLaboral"); setIsMobileMenuOpen(false)}}>
                  Higiene y Seguridad laboral
                </li>
                <li onClick={() => {navigate("/HySIndustrial"); setIsMobileMenuOpen(false)}}>
                  Higiene y Seguridad industrial
                </li>
                <li onClick={() => {navigate("/HySAmbiental"); setIsMobileMenuOpen(false)}}>
                  Higiene y Seguridad ambiental
                </li>
                <li onClick={() => { navigate("/SeguridadIncendios"); setIsMobileMenuOpen(false)} }>
                  Seguridad contra incendios
                </li>
                <li onClick={() => {navigate("/ControlPlagas"); setIsMobileMenuOpen(false)}}>
                  Control de Plagas
                </li>                
                <li onClick={handleProductsClick}>
                  Tu tienda online.  Productos | Insumos</li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className={Styles.divMayor}>
          <div className={Styles.divImg}>
            <img alt="Logo" src="/assets/icons/vsaLOGO.jpg" />
          </div>
          <div className={Styles.buttonContainer}>
            <button
              className={Styles.defaultButton}
              onClick={() => navigate("/")}
            >
              {" "}
              Inicio
            </button>
            <button
              className={Styles.defaultButton}
              onClick={() => navigate("/HySLaboral")}
            >
              {" "}
              Higiene y Seguridad laboral
            </button>
            <button
              className={Styles.defaultButton}
              onClick={() => navigate("/HySIndustrial")}
            >
              {" "}
              Higiene y Seguridad industrial
            </button>
            <button
              className={Styles.defaultButton}
              onClick={() => navigate("/HySAmbiental")}
            >
              {" "}
              Higiene y Seguridad ambiental
            </button>
            <button
              className={Styles.defaultButton}
              onClick={() => navigate("/ControlPlagas")}
            >
              {" "}
              Control de Plagas
            </button>
            <button
              className={Styles.defaultButton}
              onClick={() => navigate("/SeguridadIncendios")}
            >
              {" "}
              Seguridad contra incendios
            </button>
            <button
              className={Styles.defaultButton}
              onClick={handleProductsClick}
            >
              {" "}
              Tu tienda online
              Productos | Insumos{" "}
            </button>
            {facebook && (
                <div className={Styles.socialContainer}>
                    <img src='/assets/icons/facebook.svg' alt='Facebook icon' />
                    <a href={facebook} target="_blank" rel="noopener noreferrer"> VSA Estudios </a>
                </div>
            )
            }
            {instagram ? (
                <div className={Styles.socialContainer}>
                    <img src='/assets/icons/instagram.svg' alt='Instagram icon' />
                    <a href={instagram} target="_blank" rel="noopener noreferrer"> VSA Estudios </a>
                </div>
            ):(
              <div className="display:none"></div>
            )
            }
          </div>
        </div>
      )}
    </nav>
    
  );
}
