import styled from 'styled-components';

export const WelcomeContainer = styled.div`
display:flex;`;
export const WelcomeLeftSide = styled.div`
flex:0.3;`;
export const WelcomeRightSide = styled.div`
flex:1;`;

export const ImageSetupGrid = styled.div`
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-template-rows: repeat(4, 1fr);
grid-column-gap: 9px;
grid-row-gap: 9px;
text-align:center;`;
export const TitleImageEvent = styled.div`
font-family: cursive;
font-size: x-large;
width:100%;
margin-top:2%;
grid-area: 1 / 2 / 2 / 5;`;
export const BoxLeft = styled.div`
grid-area: 2 / 2 / 3 / 5;
font-family: cursive;
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
place-content: space-evenly;
font-size:larger;
`;
export const BoxCenter = styled.div`
grid-area: 3 / 3 / 4 / 4;
display: flex;
align-items: center;
justify-content: center;
font-family: cursive;
font-size:xx-large;
`;
export const BoxRight = styled.div`
grid-area: 4 / 2 / 5 / 5; 
height:18vh;
font-family: cursive;
`;
export const Lately=styled.button`
background-color:#45a1ff;`;
export const Submit=styled.button`
background-color:#45a1ff;`;