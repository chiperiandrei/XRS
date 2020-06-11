import styled from 'styled-components';
export const ContactFormStyle = styled.div`
display: flex;
margin-top: 4%;
flex-direction:column;
align-items: center;
font-family: monospace;
font-size: x-large;
    & #title{
        color: #45a1ff;
        font-weight:800;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
    }
    & form{
        
        display: grid;
        grid-template-columns: 1fr 2fr;
    }
`;