import styled from 'styled-components';
export const MainModal = styled.div`
display: block; 
  width: 30%;
`;
export const MainModalClose = styled.div`
display: none; 
`;
export const ModalContent = styled.div`
position: relative;
background-color: #fefefe;
margin: auto;
padding: 0;
border: 1px solid #888;
width: 80%;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
-webkit-animation-name: animatetop;
-webkit-animation-duration: 0.4s;
animation-name: animatetop;
animation-duration: 0.4s
`;
export const ModalHeader = styled.div`
  padding: 2px 16px;
  background-color: #45a1ff;
  color: white;
`;
export const ModalFooter = styled.div`
padding: 2px 16px;
  background-color: #45a1ff;
  color: white;
`;
export const ModalBody = styled.div`
padding: 2px 16px;
`;
export const ModalClose = styled.span`
color: white;
  float: right;
  margin:-10px;
  font-size: 28px;
  font-weight: bold;
&:hover{
    color: #000;
  text-decoration: none;
  cursor: pointer;
}`;

