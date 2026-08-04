"use client";

import Link from "next/link";
import { MouseEvent, useState } from "react";

export default function Home() {
  const [rotation, setRotation] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = event.currentTarget.getBoundingClientRect();

    const centerX = element.left + element.width / 2;
    const centerY = element.top + element.height / 2;

    setRotation({
      x: -(event.clientY - centerY) / 25,
      y: (event.clientX - centerX) / 25,
    });
  };

  const resetRotation = () => {
    setRotation({
      x: 0,
      y: 0,
    });
  };

  return (
    <main className="home">
      <section className="hero">
        <div className="backgroundGrid" />
        <div className="glow glowPurple" />
        <div className="glow glowGreen" />

        <div className="heroContainer">
          <div className="heroText">
            <div className="securityBadge">
              <span>◆</span>
              Secure digital banking
            </div>

            <h1>
              Smarter banking for a{" "}
              <span className="highlight">digital future.</span>
            </h1>

            <p>
              Manage accounts, transfer money and verify transactions with
              blockchain security.
            </p>

            <div className="buttons">
              <Link href="/register" className="primaryButton">
                Open Account
                <span>↗</span>
              </Link>

              <Link href="/services" className="secondaryButton">
                Explore Services
              </Link>
            </div>

            <div className="statistics">
              <div>
                <strong>10K+</strong>
                <span>Clients</span>
              </div>

              <div className="statLine" />

              <div>
                <strong>100%</strong>
                <span>Secure</span>
              </div>

              <div className="statLine" />

              <div>
                <strong>24/7</strong>
                <span>Access</span>
              </div>
            </div>
          </div>

          <div
            className="visual"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetRotation}
          >
            <div className="orbit orbitOne" />
            <div className="orbit orbitTwo" />

            <div className="star starOne">✦</div>
            <div className="star starTwo">✦</div>

            <div
              className="bankCard darkCard"
              style={{
                transform: `
                  translate(-160px, 65px)
                  rotate(-10deg)
                  translateZ(-50px)
                `,
              }}
            >
              <div className="cardLogo">eBankin</div>

              <div className="chip" />

              <div className="cardNumber">1234 5678 9012</div>

              <div className="cardFooter">
                <span>ELSA MORINA</span>
                <span>08/30</span>
              </div>
            </div>

            <div
              className="bankCard greenCard"
              style={{
                transform: `
                  translate(165px, 20px)
                  rotate(9deg)
                  translateZ(-30px)
                `,
              }}
            >
              <div className="cardLogo darkLogo">eBankin</div>

              <div className="contactless">)))</div>

              <div className="cardNumber darkNumber">5412 8654 4073</div>

              <div className="mastercard">
                <span />
                <span />
              </div>
            </div>

            <div
              className="phone"
              style={{
                transform: `
                  rotateX(${rotation.x}deg)
                  rotateY(${rotation.y}deg)
                `,
              }}
            >
              <div className="phoneScreen">
                <div className="phoneTop">
                  <span>9:41</span>
                  <div className="notch" />
                  <span>●●●</span>
                </div>

                <div className="welcome">
                  <div>
                    <span>Welcome back</span>
                    <strong>Elsa Morina</strong>
                  </div>

                  <div className="avatar">EM</div>
                </div>

                <div className="balance">
                  <span>Available balance</span>
                  <strong>€12,480.50</strong>
                  <small>+8.4% this month</small>
                </div>

                <div className="phoneActions">
                  <div>
                    <span>↗</span>
                    <small>Send</small>
                  </div>

                  <div>
                    <span>↙</span>
                    <small>Receive</small>
                  </div>

                  <div>
                    <span>＋</span>
                    <small>Top up</small>
                  </div>
                </div>

                <div className="transactionsTitle">
                  <strong>Recent transactions</strong>
                  <span>See all</span>
                </div>

                <div className="transaction">
                  <div className="transactionIcon purpleIcon">N</div>

                  <div className="transactionInfo">
                    <strong>Netflix</strong>
                    <span>Subscription</span>
                  </div>

                  <strong className="expense">-€12.99</strong>
                </div>

                <div className="transaction">
                  <div className="transactionIcon greenIcon">€</div>

                  <div className="transactionInfo">
                    <strong>Salary received</strong>
                    <span>Blockchain verified</span>
                  </div>

                  <strong className="income">+€2,450</strong>
                </div>

                <div className="phoneMenu">
                  <span className="active">⌂</span>
                  <span>▣</span>
                  <span>↔</span>
                  <span>○</span>
                </div>
              </div>
            </div>

            <div className="verifiedBox">
              <div className="verifiedIcon">✓</div>

              <div>
                <span>Transaction verified</span>
                <strong>8F2A...91BC</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .home {
          min-height: 100vh;
          overflow: hidden;
          color: #ffffff;
          background: #020303;
        }

        .hero {
          position: relative;
          min-height: calc(100vh - 76px);
          display: flex;
          align-items: center;
          padding: 65px 7%;
          isolation: isolate;
        }

        .backgroundGrid {
          position: absolute;
          inset: 0;
          z-index: -4;
          opacity: 0.13;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.04) 1px,
              transparent 1px
            );
          background-size: 70px 70px;
          mask-image: linear-gradient(to bottom, black, transparent);
        }

        .glow {
          position: absolute;
          z-index: -3;
          border-radius: 50%;
          filter: blur(100px);
          animation: glowMove 7s ease-in-out infinite;
        }

        .glowPurple {
          width: 430px;
          height: 430px;
          top: 20%;
          right: 20%;
          background: rgba(116, 35, 255, 0.25);
        }

        .glowGreen {
          width: 360px;
          height: 360px;
          right: 2%;
          bottom: 7%;
          background: rgba(190, 255, 0, 0.17);
          animation-delay: -3s;
        }

        .heroContainer {
          width: 100%;
          max-width: 1450px;
          margin: auto;
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          align-items: center;
          gap: 60px;
        }

        .heroText {
          position: relative;
          z-index: 10;
        }

        .securityBadge {
          width: fit-content;
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 25px;
          padding: 9px 14px;
          border: 1px solid rgba(198, 255, 0, 0.3);
          border-radius: 100px;
          color: #c6ff00;
          background: rgba(198, 255, 0, 0.05);
          font-size: 12px;
        }

        h1 {
          max-width: 680px;
          margin-bottom: 25px;
          font-size: clamp(55px, 6vw, 88px);
          line-height: 1;
          letter-spacing: -4px;
          font-weight: 600;
        }

        .highlight {
          color: #c6ff00;
        }

        .heroText > p {
          max-width: 590px;
          margin-bottom: 35px;
          color: #9b9b9b;
          font-size: 18px;
          line-height: 1.75;
        }

        .buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 50px;
        }

        .primaryButton,
        .secondaryButton {
          min-height: 57px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          padding: 0 26px;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 600;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .primaryButton {
          color: #080808;
          background: #c6ff00;
          box-shadow: 0 18px 50px rgba(198, 255, 0, 0.18);
        }

        .secondaryButton {
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.025);
        }

        .primaryButton:hover,
        .secondaryButton:hover {
          transform: translateY(-5px);
        }

        .statistics {
          display: flex;
          align-items: center;
          gap: 27px;
        }

        .statistics div:not(.statLine) {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .statistics strong {
          font-size: 22px;
        }

        .statistics span {
          color: #757575;
          font-size: 11px;
        }

        .statLine {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.13);
        }

        .visual {
          position: relative;
          min-height: 680px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1500px;
          transform-style: preserve-3d;
        }

        .orbit {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(198, 255, 0, 0.35);
          transform: rotate(-20deg);
        }

        .orbitOne {
          width: 650px;
          height: 330px;
          animation: orbitMove 12s linear infinite;
        }

        .orbitTwo {
          width: 540px;
          height: 270px;
          border-color: rgba(132, 49, 255, 0.4);
          animation: orbitMoveReverse 14s linear infinite;
        }

        .phone {
          position: relative;
          z-index: 8;
          width: 300px;
          height: 610px;
          padding: 7px;
          border-radius: 48px;
          background: linear-gradient(145deg, #606060, #111111);
          box-shadow:
            0 50px 100px rgba(0, 0, 0, 0.75),
            0 0 60px rgba(113, 40, 255, 0.24);
          transform-style: preserve-3d;
          transition: transform 0.16s ease-out;
          animation: phoneEntrance 1.2s ease forwards;
        }

        .phoneScreen {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 15px 16px 20px;
          overflow: hidden;
          border-radius: 41px;
          color: #ffffff;
          background: #090a0d;
        }

        .phoneTop {
          position: relative;
          display: flex;
          justify-content: space-between;
          padding: 2px 3px 20px;
          font-size: 9px;
        }

        .notch {
          position: absolute;
          width: 95px;
          height: 27px;
          top: -12px;
          left: 50%;
          border-radius: 0 0 18px 18px;
          background: #000000;
          transform: translateX(-50%);
        }

        .welcome {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .welcome div:first-child {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .welcome span {
          color: #747474;
          font-size: 9px;
        }

        .welcome strong {
          font-size: 13px;
        }

        .avatar {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border: 1px solid #c6ff00;
          border-radius: 50%;
          color: #c6ff00;
          font-size: 9px;
        }

        .balance {
          padding: 21px;
          border: 1px solid rgba(158, 82, 255, 0.6);
          border-radius: 22px;
          background: linear-gradient(135deg, #6021c9, #23103d);
          box-shadow: 0 18px 40px rgba(98, 28, 219, 0.25);
        }

        .balance span {
          display: block;
          margin-bottom: 10px;
          color: #d3c8e6;
          font-size: 9px;
        }

        .balance strong {
          display: block;
          margin-bottom: 7px;
          font-size: 25px;
        }

        .balance small {
          color: #c6ff00;
          font-size: 9px;
        }

        .phoneActions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin: 20px 0;
        }

        .phoneActions div {
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 7px;
        }

        .phoneActions span {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #19191f;
          font-size: 16px;
        }

        .phoneActions small {
          color: #9a9a9a;
          font-size: 8px;
        }

        .transactionsTitle {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .transactionsTitle strong {
          font-size: 11px;
        }

        .transactionsTitle span {
          color: #c6ff00;
          font-size: 8px;
        }

        .transaction {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 11px 0;
          border-bottom: 1px solid #1c1c20;
        }

        .transactionIcon {
          width: 33px;
          height: 33px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          font-size: 11px;
        }

        .purpleIcon {
          background: #6b2bd6;
        }

        .greenIcon {
          color: #101500;
          background: #c6ff00;
        }

        .transactionInfo {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .transactionInfo strong,
        .transaction > strong {
          font-size: 9px;
        }

        .transactionInfo span {
          color: #777777;
          font-size: 7px;
        }

        .expense {
          color: #ff6472;
        }

        .income {
          color: #c6ff00;
        }

        .phoneMenu {
          position: absolute;
          right: 18px;
          bottom: 16px;
          left: 18px;
          display: flex;
          justify-content: space-between;
          padding-top: 13px;
          border-top: 1px solid #1f1f23;
          color: #777777;
        }

        .phoneMenu .active {
          color: #c6ff00;
        }

        .bankCard {
          position: absolute;
          width: 355px;
          height: 225px;
          padding: 27px;
          border-radius: 28px;
          box-shadow: 0 35px 85px rgba(0, 0, 0, 0.6);
          animation: cardEntrance 1.3s ease forwards;
        }

        .darkCard {
          z-index: 3;
          border: 1px solid rgba(126, 59, 255, 0.55);
          background: linear-gradient(135deg, #191120, #040405);
        }

        .greenCard {
          z-index: 4;
          color: #111111;
          background:
            radial-gradient(
              circle at 10% 90%,
              rgba(105, 26, 214, 0.5),
              transparent 35%
            ),
            linear-gradient(135deg, #d1ff25, #99d800);
          box-shadow: 0 35px 90px rgba(173, 255, 0, 0.14);
        }

        .cardLogo {
          font-size: 17px;
          font-weight: 700;
        }

        .darkLogo {
          color: #334100;
        }

        .chip {
          width: 47px;
          height: 35px;
          margin: 55px 0 22px;
          border-radius: 8px;
          background: linear-gradient(135deg, #eee4bd, #a8954a);
        }

        .cardNumber {
          font-size: 20px;
          letter-spacing: 4px;
        }

        .darkNumber {
          margin-top: 118px;
        }

        .cardFooter {
          display: flex;
          justify-content: space-between;
          margin-top: 19px;
          color: #a3a3a3;
          font-size: 9px;
        }

        .contactless {
          position: absolute;
          top: 30px;
          right: 30px;
          font-size: 23px;
          letter-spacing: -6px;
          transform: rotate(90deg);
        }

        .mastercard {
          position: absolute;
          right: 27px;
          bottom: 23px;
          width: 62px;
          height: 38px;
        }

        .mastercard span {
          position: absolute;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.76);
        }

        .mastercard span:last-child {
          right: 0;
          background: rgba(255, 255, 255, 0.43);
        }

        .verifiedBox {
          position: absolute;
          z-index: 10;
          right: 5px;
          bottom: 74px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 18px;
          border: 1px solid rgba(198, 255, 0, 0.4);
          border-radius: 17px;
          background: rgba(12, 18, 5, 0.78);
          backdrop-filter: blur(15px);
          animation: floatingBox 4s ease-in-out infinite;
        }

        .verifiedIcon {
          width: 35px;
          height: 35px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          color: #151c00;
          background: #c6ff00;
        }

        .verifiedBox div:last-child {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .verifiedBox span {
          color: #a0a0a0;
          font-size: 9px;
        }

        .verifiedBox strong {
          color: #c6ff00;
          font-family: monospace;
          font-size: 12px;
        }

        .star {
          position: absolute;
          z-index: 11;
          text-shadow: 0 0 25px currentColor;
          animation: starPulse 3s ease-in-out infinite;
        }

        .starOne {
          top: 90px;
          right: 45px;
          color: #ffffff;
          font-size: 55px;
        }

        .starTwo {
          bottom: 40px;
          left: 35px;
          color: #c6ff00;
          font-size: 29px;
          animation-delay: -1.5s;
        }

        @keyframes phoneEntrance {
          from {
            opacity: 0;
            transform: translateY(70px) rotate(-8deg) scale(0.85);
          }

          to {
            opacity: 1;
            transform: translateY(0) rotate(0) scale(1);
          }
        }

        @keyframes cardEntrance {
          from {
            opacity: 0;
            scale: 0.7;
          }

          to {
            opacity: 1;
            scale: 1;
          }
        }

        @keyframes floatingBox {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-13px);
          }
        }

        @keyframes orbitMove {
          to {
            transform: rotate(340deg);
          }
        }

        @keyframes orbitMoveReverse {
          to {
            transform: rotate(-380deg);
          }
        }

        @keyframes starPulse {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.8);
          }

          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes glowMove {
          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(25px, -20px);
          }
        }

        @media (max-width: 1100px) {
          .heroContainer {
            grid-template-columns: 1fr;
          }

          .heroText {
            padding-top: 50px;
            text-align: center;
          }

          .securityBadge,
          .heroText > p {
            margin-right: auto;
            margin-left: auto;
          }

          .buttons,
          .statistics {
            justify-content: center;
          }
        }

        @media (max-width: 720px) {
          .hero {
            padding-right: 20px;
            padding-left: 20px;
          }

          h1 {
            font-size: 50px;
            letter-spacing: -2px;
          }

          .visual {
            min-height: 520px;
            transform: scale(0.75);
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 42px;
          }

          .buttons {
            flex-direction: column;
          }

          .primaryButton,
          .secondaryButton {
            width: 100%;
          }

          .visual {
            width: 650px;
            margin-left: 50%;
            transform: translateX(-50%) scale(0.58);
          }
        }
      `}</style>
    </main>
  );
}