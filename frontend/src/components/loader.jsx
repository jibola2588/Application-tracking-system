import styled, { keyframes } from 'styled-components'

const long = keyframes`
  0% {left: -35%;right: 100%}
  60% {left: 100%;right: -90%}
  100% {left: 100%;right: -90%}
`

const short = keyframes`
  0% {left: -200%;right: 100%}
  60% {left: 107%;right: -8%}
  100% {left: 107%;right: -8%}
`

const Wrapper = styled.div`
  left: 0;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  top: 0;
  width: 100%;
  z-index: 10000;
`

const LoaderWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 4px;
  overflow: hidden;
  background-color:rgba(247, 250, 252);
  background-clip: padding-box;
`

const LoaderBottom = styled.div`
  position: absolute;
  height: 4px;
  overflow: hidden;
  background-color:rgba(213, 233, 247);
  // background-color:rgba(221, 228, 237);
  background-clip: padding-box;
  display: block;
  border-radius: 2px;
  will-change: left, right;
  animation-fill-mode: forwards;
  animation: ${short} 2.1s 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
`

const LoaderTop = styled.div`
  position: absolute;
  height: 4px;
  overflow: hidden;
  // background-color:#3068AE;
  background-color:rgba(48,104,174);
  background-clip: padding-box;
  display: block;
  border-radius: 2px;
  will-change: left, right;
  animation-fill-mode: forwards;
  animation: ${long} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
`

export const PageLoader = () => {
  return (
    <Wrapper>
      <LoaderWrapper>
        <LoaderTop />
        <LoaderBottom />
      </LoaderWrapper>
    </Wrapper>
  )
}
