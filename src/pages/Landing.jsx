import React from "react";
import main from "../assets/images/main.svg";
import styled from "styled-components";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      {" "}
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Kitsch chartreuse bespoke poke actually fanny pack trust fund.
            Taiyaki blog hammock same neutra four dollar toast tofu taxidermy
            lomo poke post-ironic selvage ascot echo park. Hella woke readymade
            tonx synth food truck four dollar toast literally church-key fashion
            axe green juice tofu, trust fund coloring book paleo. Offal portland
            glossier artisan affogato, poke hell of
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="jobster" className="img main-img" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-item: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-item: center;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;
