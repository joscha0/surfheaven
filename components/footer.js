import GitHubIcon from "@mui/icons-material/GitHub";
import { Button } from "@mui/material";
import styles from "../styles/Home.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Button
        href="https://github.com/joscha0/surfheaven"
        target="_blank"
        rel="noopener noreferrer"
        startIcon={<GitHubIcon />}
      >
        Github
      </Button>
    </footer>
  );
};

export default Footer;
