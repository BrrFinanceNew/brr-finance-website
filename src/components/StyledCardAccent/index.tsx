import styled, { keyframes } from 'styled-components';

const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const StyledCardAccent = styled.div`
  background: linear-gradient(45deg,
  rgba(255, 0, 0, 0.5) 0%,
  rgba(255, 154, 0, 0.5) 10%,
  rgba(208, 222, 33, 0.5) 20%,
  rgba(79, 220, 74, 0.5) 30%,
  rgba(63, 218, 216, 0.5) 40%,
  rgba(47, 201, 226, 0.5) 50%,
  rgba(28, 127, 238, 0.5) 60%,
  rgba(95, 21, 242, 0.5) 70%,
  rgba(186, 12, 248, 0.5) 80%,
  rgba(251, 7, 217, 0.5) 90%,
  rgba(255, 0, 0, 0.5) 100%);
  background-size: 300% 300%;
  animation: ${RainbowLight} 4s linear infinite;
  border-radius: 16px;
  filter: blur(5px);
  position: absolute;
  top: -5px;
  right: -5px;
  bottom: -5px;
  left: -5px;
  z-index: -1;
`

export default StyledCardAccent;