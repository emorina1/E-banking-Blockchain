"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth - 0.5) * 20,
        y: (event.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="home">
      <section className="hero">
        <div className="heroGlow heroGlowOne" />
        <div className="heroGlow heroGlowTwo" />

        <div className="heroContainer">
          <div className="heroText">
            

            <h1>
              Build your <span>financial future</span> with smarter banking.
            </h1>

          

            

            <div className="trustRow">
              <div className="trustItem">
                <div className="trustIcon">✓</div>

                <div>
                  <strong>Secure payments</strong>
                  <span>Protected banking operations</span>
                </div>
              </div>

              <div className="trustItem">
                <div className="trustIcon">⌁</div>

                <div>
                  <strong>Blockchain verified</strong>
                  <span>Immutable transaction records</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="visual"
            style={{
              transform: `translate3d(${mouse.x / 3}px, ${
                mouse.y / 3
              }px, 0)`,
            }}
          >
            <div className="star starOne">✦</div>
            <div className="star starTwo">✦</div>

            <div
              className="backCard purpleCard"
              style={{
                transform: `translate3d(${-mouse.x / 2}px, ${
                  -mouse.y / 3
                }px, 0) rotate(-8deg)`,
              }}
            >
              <div className="cardChip" />

              <div className="cardNumber">4821&nbsp;&nbsp;9074</div>

              <div className="cardBottom">
                <span>SECUREBANK</span>
                <span>08/30</span>
              </div>
            </div>

            <div
              className="backCard greenCard"
              style={{
                transform: `translate3d(${mouse.x / 2}px, ${
                  mouse.y / 3
                }px, 0) rotate(7deg)`,
              }}
            >
              <div className="contactless">)))</div>

              <div className="greenCardNumber">0000&nbsp;&nbsp;0000</div>

              <div className="masterLogo">
                <span />
                <span />
              </div>
            </div>

            <div className="handShape" />

            <div
              className="phone"
              style={{
                transform: `
                  translate3d(${mouse.x / 5}px, ${mouse.y / 5}px, 0)
                  rotateY(${mouse.x / 2}deg)
                  rotateX(${-mouse.y / 3}deg)
                `,
              }}
            >
              <div className="phoneFrame">
                <div className="phoneTop">
                  <span>9:41</span>

                  <div className="phoneNotch" />

                  <span>•••</span>
                </div>

                <div className="phoneHeader">
                  <div>
                    <small>Welcome back</small>
                    <strong>Elsa Morina</strong>
                  </div>

                  <div className="avatar">EM</div>
                </div>

                <div className="balanceCard">
                  <span>Available Balance</span>
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

                <div className="transactionsHeader">
                  <strong>Recent transactions</strong>
                  <span>See all</span>
                </div>

                <div className="transaction">
                  <div className="transactionIcon purple">N</div>

                  <div className="transactionInfo">
                    <strong>Netflix</strong>
                    <span>Subscription</span>
                  </div>

                  <strong className="negative">-€12.99</strong>
                </div>

                <div className="transaction">
                  <div className="transactionIcon green">↗</div>

                  <div className="transactionInfo">
                    <strong>Transfer received</strong>
                    <span>Verified by blockchain</span>
                  </div>

                  <strong className="positive">+€320.00</strong>
                </div>

                <div className="phoneNavigation">
                  <span className="active">⌂</span>
                  <span>▥</span>
                  <span>↔</span>
                  <span>◉</span>
                </div>
              </div>
            </div>

            <div className="floatingBalance">
              <div className="miniChart">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div>
                <small>Income</small>
                <strong>€2,450</strong>
              </div>
            </div>

            <div className="floatingVerified">
              <span>✓</span>

              <div>
                <small>Transaction</small>
                <strong>Verified</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <span>01</span>
          <h2>Digital accounts</h2>
          <p>
            Manage balances, accounts and banking activity from one secure
            dashboard.
          </p>
        </div>

        <div className="feature">
          <span>02</span>
          <h2>Fast transfers</h2>
          <p>
            Send and receive money with simple, transparent and secure
            financial operations.
          </p>
        </div>

        <div className="feature">
          <span>03</span>
          <h2>Blockchain verification</h2>
          <p>
            Each completed transaction receives a cryptographic hash for data
            integrity.
          </p>
        </div>
      </section>

      <style jsx>{`
        .home {
          min-height: 100vh;
          overflow: hidden;
          color: white;
          background: #030303;
        }

        .hero {
          position: relative;
          min-height: 820px;
          display: flex;
          align-items: center;
          padding: 70px 7% 80px;
          isolation: isolate;
        }

        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -3;
          opacity: 0.13;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.04) 1px,
              transparent 1px
            );
          background-size: 80px 80px;
          mask-image: linear-gradient(to bottom, black, transparent);
        }

        .heroGlow {
          position: absolute;
          z-index: -2;
          border-radius: 50%;
          filter: blur(90px);
        }

        .heroGlowOne {
          width: 420px;
          height: 420px;
          top: 15%;
          right: 5%;
          background: rgba(185, 255, 0, 0.13);
        }

        .heroGlowTwo {
          width: 330px;
          height: 330px;
          bottom: 0;
          right: 32%;
          background: rgba(124, 61, 255, 0.16);
        }

        .heroContainer {
          width: 100%;
          max-width: 1450px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          align-items: center;
          gap: 60px;
        }

        .heroText {
          position: relative;
          z-index: 10;
        }

        .eyebrow {
          display: inline-block;
          margin-bottom: 24px;
          color: #c7ff16;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 3px;
        }

        h1 {
          max-width: 680px;
          margin-bottom: 26px;
          font-size: clamp(48px, 5.8vw, 82px);
          line-height: 1.03;
          letter-spacing: -3.5px;
          font-weight: 600;
        }

        h1 span {
          color: #c7ff16;
        }

        .heroText > p {
          max-width: 590px;
          margin-bottom: 35px;
          color: #a4a4a4;
          font-size: 18px;
          line-height: 1.8;
        }

        .heroActions {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 55px;
        }

        .primaryButton,
        .secondaryButton {
          min-height: 58px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          padding: 0 27px;
          border-radius: 18px;
          text-decoration: none;
          font-weight: 600;
          transition:
            transform 0.3s ease,
            border-color 0.3s ease;
        }

        .primaryButton {
          color: #090909;
          background: linear-gradient(135deg, #ab63ff, #7c39ff);
          box-shadow: 0 20px 55px rgba(126, 55, 255, 0.28);
        }

        .primaryButton:hover,
        .secondaryButton:hover {
          transform: translateY(-4px);
        }

        .secondaryButton {
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.025);
        }

        .trustRow {
          display: flex;
          gap: 35px;
          flex-wrap: wrap;
        }

        .trustItem {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .trustIcon {
          width: 37px;
          height: 37px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(199, 255, 22, 0.28);
          border-radius: 50%;
          color: #c7ff16;
        }

        .trustItem div:last-child {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .trustItem strong {
          font-size: 12px;
          font-weight: 500;
        }

        .trustItem span {
          color: #747474;
          font-size: 10px;
        }

        .visual {
          position: relative;
          min-height: 650px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1500px;
          transition: transform 0.15s ease-out;
        }

        .phone {
          position: relative;
          z-index: 7;
          width: 275px;
          height: 570px;
          perspective: 1400px;
          transform-style: preserve-3d;
          transition: transform 0.18s ease-out;
          animation: phoneFloat 5s ease-in-out infinite;
        }

        .phoneFrame {
          width: 100%;
          height: 100%;
          padding: 12px 15px 18px;
          overflow: hidden;
          border: 6px solid #151515;
          border-radius: 42px;
          color: #181818;
          background: #f5f5f5;
          box-shadow:
            0 45px 100px rgba(0, 0, 0, 0.65),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .phoneTop {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 3px 12px;
          font-size: 9px;
        }

        .phoneNotch {
          position: absolute;
          width: 92px;
          height: 23px;
          top: -9px;
          left: 50%;
          border-radius: 0 0 15px 15px;
          background: #101010;
          transform: translateX(-50%);
        }

        .phoneHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 13px 3px 18px;
        }

        .phoneHeader div:first-child {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .phoneHeader small {
          color: #8b8b8b;
          font-size: 9px;
        }

        .phoneHeader strong {
          font-size: 13px;
        }

        .avatar {
          width: 33px;
          height: 33px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          color: white;
          background: #111;
          font-size: 9px;
        }

        .balanceCard {
          padding: 20px;
          border-radius: 21px;
          color: white;
          background: linear-gradient(135deg, #8a49ff, #6a2be5);
          box-shadow: 0 16px 28px rgba(96, 35, 224, 0.24);
        }

        .balanceCard span {
          display: block;
          margin-bottom: 10px;
          font-size: 9px;
          opacity: 0.75;
        }

        .balanceCard strong {
          display: block;
          margin-bottom: 6px;
          font-size: 24px;
        }

        .balanceCard small {
          color: #d4ff63;
          font-size: 9px;
        }

        .phoneActions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 9px;
          margin: 17px 0 21px;
        }

        .phoneActions div {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .phoneActions span {
          width: 35px;
          height: 35px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          color: #6c2dea;
          background: #eee7ff;
          font-size: 14px;
        }

        .phoneActions small {
          color: #5d5d5d;
          font-size: 8px;
        }

        .transactionsHeader {
          display: flex;
          justify-content: space-between;
          margin-bottom: 13px;
        }

        .transactionsHeader strong {
          font-size: 11px;
        }

        .transactionsHeader span {
          color: #7438eb;
          font-size: 8px;
        }

        .transaction {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 0;
          border-bottom: 1px solid #e9e9e9;
        }

        .transactionIcon {
          width: 31px;
          height: 31px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          color: white;
          font-size: 10px;
        }

        .transactionIcon.purple {
          background: #7f3cec;
        }

        .transactionIcon.green {
          color: #182000;
          background: #c7ff16;
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
          color: #909090;
          font-size: 7px;
        }

        .negative {
          color: #dc3c4b;
        }

        .positive {
          color: #5aa600;
        }

        .phoneNavigation {
          position: absolute;
          right: 22px;
          bottom: 18px;
          left: 22px;
          display: flex;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid #e7e7e7;
          color: #8f8f8f;
          font-size: 13px;
        }

        .phoneNavigation .active {
          color: #7132e7;
        }

        .backCard {
          position: absolute;
          width: 335px;
          height: 215px;
          padding: 25px;
          border-radius: 25px;
          transition: transform 0.18s ease-out;
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.45);
        }

        .purpleCard {
          z-index: 3;
          bottom: 65px;
          left: 44px;
          color: white;
          background:
            radial-gradient(
              circle at 80% 20%,
              rgba(255, 255, 255, 0.22),
              transparent 30%
            ),
            linear-gradient(145deg, #261445, #6f31e7);
        }

        .greenCard {
          z-index: 4;
          top: 140px;
          right: 0;
          color: #111;
          background:
            radial-gradient(
              circle at 15% 80%,
              rgba(130, 64, 255, 0.45),
              transparent 35%
            ),
            linear-gradient(135deg, #d8ff38, #a9e900);
        }

        .cardChip {
          width: 43px;
          height: 32px;
          margin-bottom: 75px;
          border-radius: 8px;
          background: #e8dfb8;
        }

        .cardNumber,
        .greenCardNumber {
          font-size: 22px;
          letter-spacing: 4px;
        }

        .cardBottom {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          font-size: 10px;
        }

        .contactless {
          position: absolute;
          top: 32px;
          right: 35px;
          font-size: 24px;
          letter-spacing: -6px;
          transform: rotate(90deg);
        }

        .greenCardNumber {
          margin-top: 120px;
        }

        .masterLogo {
          position: absolute;
          right: 28px;
          bottom: 26px;
          width: 61px;
          height: 37px;
        }

        .masterLogo span {
          position: absolute;
          width: 37px;
          height: 37px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.75);
        }

        .masterLogo span:last-child {
          right: 0;
          background: rgba(255, 255, 255, 0.45);
        }

        .handShape {
          position: absolute;
          z-index: 5;
          width: 240px;
          height: 310px;
          right: 160px;
          bottom: 3px;
          border-radius: 45% 45% 18% 18%;
          background: linear-gradient(130deg, #2c2c2c, #080808);
          transform: rotate(-10deg);
          filter: drop-shadow(0 25px 40px rgba(0, 0, 0, 0.6));
        }

        .floatingBalance,
        .floatingVerified {
          position: absolute;
          z-index: 9;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 13px 15px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 15px;
          background: rgba(23, 23, 23, 0.78);
          backdrop-filter: blur(17px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          animation: miniFloat 4s ease-in-out infinite;
        }

        .floatingBalance {
          top: 180px;
          left: 28px;
        }

        .floatingVerified {
          right: 40px;
          bottom: 110px;
          animation-delay: -2s;
        }

        .floatingBalance div:last-child,
        .floatingVerified div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .floatingBalance small,
        .floatingVerified small {
          color: #858585;
          font-size: 8px;
        }

        .floatingBalance strong,
        .floatingVerified strong {
          font-size: 10px;
        }

        .miniChart {
          height: 30px;
          display: flex;
          align-items: flex-end;
          gap: 3px;
        }

        .miniChart span {
          width: 4px;
          border-radius: 4px;
          background: #c7ff16;
        }

        .miniChart span:nth-child(1) {
          height: 10px;
        }

        .miniChart span:nth-child(2) {
          height: 18px;
        }

        .miniChart span:nth-child(3) {
          height: 13px;
        }

        .miniChart span:nth-child(4) {
          height: 24px;
        }

        .miniChart span:nth-child(5) {
          height: 28px;
        }

        .floatingVerified > span {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          color: #151b00;
          background: #c7ff16;
        }

        .star {
          position: absolute;
          z-index: 10;
          color: white;
          text-shadow: 0 0 28px white;
          animation: starPulse 3s ease-in-out infinite;
        }

        .starOne {
          top: 85px;
          right: 100px;
          font-size: 64px;
        }

        .starTwo {
          bottom: 30px;
          left: 90px;
          color: #c7ff16;
          font-size: 33px;
          animation-delay: -1.5s;
        }

        .features {
          max-width: 1450px;
          margin: 0 auto;
          padding: 80px 7% 120px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .feature {
          min-height: 260px;
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 21px;
          background: rgba(255, 255, 255, 0.025);
          transition:
            transform 0.3s ease,
            border-color 0.3s ease;
        }

        .feature:hover {
          transform: translateY(-8px);
          border-color: rgba(199, 255, 22, 0.35);
        }

        .feature > span {
          color: #c7ff16;
          font-size: 12px;
        }

        .feature h2 {
          margin: 80px 0 15px;
          font-size: 25px;
          font-weight: 500;
        }

        .feature p {
          color: #8a8a8a;
          line-height: 1.7;
        }

        @keyframes phoneFloat {
          0%,
          100% {
            translate: 0 0;
          }

          50% {
            translate: 0 -14px;
          }
        }

        @keyframes miniFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes starPulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(0.8) rotate(0deg);
          }

          50% {
            opacity: 1;
            transform: scale(1.1) rotate(15deg);
          }
        }

        @media (max-width: 1100px) {
          .hero {
            padding-top: 110px;
          }

          .heroContainer {
            grid-template-columns: 1fr;
          }

          .heroText {
            text-align: center;
          }

          .heroText > p {
            margin-right: auto;
            margin-left: auto;
          }

          .heroActions,
          .trustRow {
            justify-content: center;
          }

          .visual {
            min-height: 680px;
          }
        }

        @media (max-width: 760px) {
          .hero {
            min-height: auto;
            padding-right: 20px;
            padding-left: 20px;
          }

          h1 {
            font-size: 50px;
            letter-spacing: -2px;
          }

          .visual {
            min-height: 550px;
            transform: scale(0.8) !important;
          }

          .features {
            grid-template-columns: 1fr;
            padding-right: 20px;
            padding-left: 20px;
          }
        }

        @media (max-width: 500px) {
          h1 {
            font-size: 42px;
          }

          .heroActions {
            flex-direction: column;
          }

          .primaryButton,
          .secondaryButton {
            width: 100%;
          }

          .trustRow {
            align-items: flex-start;
            flex-direction: column;
          }

          .visual {
            width: 600px;
            min-height: 470px;
            margin-left: 50%;
            transform: translateX(-50%) scale(0.62) !important;
          }
        }
      `}</style>
    </main>
  );
}