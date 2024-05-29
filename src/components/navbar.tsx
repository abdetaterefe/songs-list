import appLogo from "@/assets/react.svg";
import {
  Container,
  Header,
  LogoLink,
  Nav,
  NavLink,
} from "@/components/navbar.styled";

export default function Navbar() {
  return (
    <Header>
      <Container>
        <LogoLink to="/">
          <img src={appLogo} alt="Songs List" />
          <h2>Songs List</h2>
        </LogoLink>

        <Nav>
          <NavLink to="/add">Add Song</NavLink>
          <NavLink
            to="https://github.com/abdetaterefe/songs-list"
            target="_blank"
          >
            Github
          </NavLink>
        </Nav>
      </Container>
    </Header>
  );
}
