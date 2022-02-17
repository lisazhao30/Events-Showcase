import BannerImage from '../images/BannerImage.svg';
import "../css/hero.css";

const Hero = () => {
    return (
        <div className="hero">
            <img className="banner_image" src={BannerImage} alt="Banner Image"></img>
        </div>
    )
}

export default Hero