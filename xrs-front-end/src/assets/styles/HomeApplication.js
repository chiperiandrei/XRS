import styled from 'styled-components';
export const WelcomeInfo = styled.div`
display:flex;
flex-direction:column;
      & #title{
      font-family:'Arial';
      font-weight: 800;
      align-self: center;
      margin-top: 24px;
        & span{
          color: #45a1ff;
        }
    }
& #nfc{
    margin-left: 28em;
    width:13%;
  }
& #infos{
  margin-top:7em;
  display: flex;
  & div {
      & h1{
      color: #45a1ff;
      margin-left: 25%;
      font-size: xxx-large;
      font-family: cursive;
    }
    & ul{
      list-style: none;
      margin-left: 13%;
        & li::before{
          
          font-size: x-large;
          font-family: monospace;
          color: #45a1ff;
          content:'•';
        }
        & li{
          
          font-size: x-large;
          font-family: monospace;
        }
    }
  }
}
  `;