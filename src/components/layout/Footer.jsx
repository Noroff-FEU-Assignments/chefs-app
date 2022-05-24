import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro';

function Footer() {

  
  return (
    <footer>
      <div id="social-media-group">
        <a href="#">
          <FontAwesomeIcon icon={brands('twitter')} className="social-media-icon" />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={brands('facebook')} className="social-media-icon" />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={brands('instagram')} className="social-media-icon" />
        </a>
      </div>
      <span id="copyrights">©️ {new Date().getFullYear()} - Georgios Fragkias, Døgnvill Bar & Burger</span>
    </footer>
  )
}

export default Footer


