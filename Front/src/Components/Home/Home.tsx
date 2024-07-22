import { useEffect, useState, useRef,useLayoutEffect, } from "react";
import { useAppSelector } from "../../Redux/Hooks";
import { useAppDispatch } from "../../Redux/Hooks";
import { setData } from "../../Redux/Slice/contactSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Styles from "./Home.module.css";

interface DataInfo {
  id: number;
  aboutText: string;
  phone: number;
  whatsapp: number;
  email: string;
  videos: string[];
  photos: string[];
  socialLinks: string[];
}

export default function Home() {
  const BACK_URL = process.env.REACT_APP_BACK_URL;
  const dataAbout = useAppSelector<DataInfo>((state) => state.data);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement[]>([]);
  const intervalRef = useRef<NodeJS.Timeout>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const years_passed = currentYear - 2017;

  useEffect(() => {
    if (dataAbout.videos?.length > 0) {
      const randomIndex = Math.floor(Math.random() * dataAbout.videos.length);
      setCurrentVideoIndex(randomIndex);
    }
  }, [dataAbout]);

  useEffect(() => {
    const hasInfo = Object.values(dataAbout).some(
      (data) => data === ("" || 0 || [])
    );
    if (!hasInfo) {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${BACK_URL}/data`);
      dispatch(setData(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCarousel = () => {
    carouselRef.current.forEach((carousel) => {
      const images = Array.from(
        carousel.querySelectorAll("img")
      ) as HTMLImageElement[];
      let currentIndex = 0;

      function updateSlider() {
        images.forEach((image, imgIndex) => {
          if (imgIndex === currentIndex) {
            image.style.display = "block";
            image.style.transform = "translateX(0)";
          } else {
            image.style.display = "none";
            image.style.transform = "translateX(100%)";
          }
        });
      }

      function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
      }

      updateSlider();
      intervalRef.current = setInterval(nextImage, 3000);
    });
  };
  useEffect(() => {
    if (carouselRef.current.length > 0) {
      handleCarousel();
    }
  }, [carouselRef.current]);

  useLayoutEffect(() => {
    carouselRef.current = Array.from(
      document.querySelectorAll(`.${Styles.carousel}`)
    ) as HTMLDivElement[];
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [carouselRef.current]);

  return (
    <div className={Styles.divMayor}>
      <div className={Styles.divContainer}>
        {dataAbout && dataAbout.photos.length > 0 && (
          <div className={Styles.carousel}>
            {dataAbout.photos.map((photo, index) => (
              <img
                key={index}
                className={Styles.Showimg}
                src={photo}
                alt="image"
              />
            ))}
          </div>
        )}
        {dataAbout && dataAbout.videos.length > 0 && (
          <div className={Styles.videoContainer}>
            <video controls>
              <source
                src={dataAbout.videos[currentVideoIndex]}
                type="video/mp4"
              />
              Tu navegador no admite la reproducción de videos.
            </video>
          </div>
        )}
        <div className={Styles.AboutContainer}>
          <div className={Styles.contentData}>
            <h1> Sobre Nosotros </h1>
            <p>
              En VSA, nos dedicamos a proporcionar soluciones integrales en
              seguridad y bienestar laboral. Con más de {years_passed} años de experiencia
              en el sector, nos hemos consolidado como líderes en el mercado,
              brindando servicios de alta calidad y confiabilidad a nuestros
              clientes.
            </p>
            <h2>Nuestros Servicios</h2>
            <p>
              Ofrecemos una amplia gama de servicios especializados diseñados
              para satisfacer las necesidades específicas de cada cliente. Desde
              la higiene y seguridad industrial hasta el control de plagas y la
              seguridad contra incendios, nuestros expertos están capacitados
              para proporcionar soluciones efectivas y personalizadas.
            </p>
            <p>
              Ya sea que necesite evaluar y mitigar riesgos en su lugar de
              trabajo, proteger su propiedad contra plagas invasoras o
              implementar sistemas de seguridad contra incendios de vanguardia,
              estamos aquí para ayudarlo en cada paso del camino.
            </p>
            <h2>Promoviendo un Entorno Seguro</h2>
            <p>
              En VSA, nos comprometemos a promover una cultura de seguridad en
              la que la protección de la salud y el bienestar de nuestros
              clientes y sus empleados sea nuestra máxima prioridad. Trabajamos
              incansablemente para garantizar que cada proyecto se complete con
              los más altos estándares de calidad y seguridad.
            </p>
            <p>
              ¿Está listo para mejorar la seguridad y el bienestar en su lugar
              de trabajo o en su hogar? ¡Contáctenos hoy mismo para obtener más
              información sobre cómo podemos ayudarlo! Nuestro equipo de
              expertos está aquí para responder a todas sus preguntas y ayudarlo
              a encontrar la solución perfecta para sus necesidades.
            </p>
          </div>
          <div className={Styles.ubicacionContainer}>
            <h1> ¿Dónde estamos?</h1>
            <div className={Styles.ubicacionDiv}>
              
            <p>Oficina Hig.Y Seg. </p>
              <p> Cordoba Capital</p>
              <div className={Styles.whatsapp}>
                <img src="/assets/icons/whatsapp.svg" alt="whatsapp icon" />
                <a
                  href={`https://api.whatsapp.com/send?phone=543515118943&text=%C2%A1Hola!%20Vengo%20de%20la%20p%C3%A1gina%20de%20VSA.%20Queria%20hacerte%20una%20consulta.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +543515118943
                </a>
              </div>
              
            </div>
            <div className={Styles.ubicacionDiv}>
            <p>Oficina Tecnica Traslasierras</p>
              <p> Villa Dolores, Cordoba</p>
              <div className={Styles.whatsapp}>
                <img src="/assets/icons/whatsapp.svg" alt="whatsapp icon" />
                <a
                  href={`https://api.whatsapp.com/send?phone=5435446630993&text=%C2%A1Hola!%20Vengo%20de%20la%20p%C3%A1gina%20de%20VSA.%20Queria%20hacerte%20una%20consulta.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +543544663099
                </a>
              </div>
              <button
                className={Styles.defaultButton}
                onClick={() => navigate("/Portfolio")}
              >
                {" "}
                Portfolio
              </button>
              <img
                src="/assets/imagenes/img-Home.jpg"
                alt="home-img"
                className={Styles.showImg}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
