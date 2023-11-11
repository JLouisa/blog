import gitHubIcon from "../assets/github-original.svg";

function Footer() {
  return (
    <footer className="links">
      <a href="https://github.com/JLouisa/blog-api" target="__blank">
        <img src={gitHubIcon} alt="gitHubIcon" width="40" height="40" />
      </a>
      <span className="copyright">©2023 | Jonathan Louisa</span>
    </footer>
  );
}

export default Footer;
