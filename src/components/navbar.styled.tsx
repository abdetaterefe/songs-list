import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Header = styled.header`
  position: sticky;
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: hsl(var(--primary));
  border-bottom: 1px hsl(var(--border)) solid;
`;

export const Container = styled.div`
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: hsl(var(--secondary));
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  color: hsl(var(--secondary));
  &:hover {
    color: hsl(var(--secondary) / 0.6);
  }
`;
