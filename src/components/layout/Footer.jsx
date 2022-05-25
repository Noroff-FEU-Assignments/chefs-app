import {FaTwitter, FaFacebookF, FaInstagram} from "react-icons/fa"

function Footer() {

  return (
    <footer>
      <div id="social-media-group">
        <a href="#">
          <FaTwitter className="social-media-icon" />
        </a>
        <a href="#">
          <FaFacebookF className="social-media-icon" />
        </a>
        <a href="#">
          <FaInstagram className="social-media-icon" />
        </a>
      </div>
      <span id="copyrights">©️ {new Date().getFullYear()} - Georgios Fragkias, Døgnvill Bar & Burger</span>
    </footer>
  )
}

export default Footer


