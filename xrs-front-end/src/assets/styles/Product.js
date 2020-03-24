import styled from 'styled-components';
export const ContainerProduct=styled.div`
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
  `;
export const PriceProduct=styled.p`
color: grey;
  font-size: 22px;`;
export const ContainerButtonAvalaible=styled.button`
border: none;
outline: 0;
padding: 0px;
color: white;
background-color: green;
text-align: center;
cursor: pointer;
width: 100%;
font-size: 18px;
&:hover{
    opacity: 0.7;
}`;
export const ContainerButtonNotAvalaible=styled.button`
border: none;
outline: 0;
padding: 0px;
color: white;
background-color: red;
text-align: center;
cursor: pointer;
width: 100%;
font-size: 18px;`;
export const ImgProduct=styled.img`width:80%`;
export const ReservedDate=styled.h1`font-size:x-large`;
