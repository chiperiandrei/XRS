import styled from 'styled-components';

export const LayOut = styled.div`
display: grid;
grid-template-columns: 0.3fr 1fr;
grid-template-rows: 1fr;
grid-column-gap: 0px;
grid-row-gap: 0px;
height: 83.2vh;
font-family:cursive;`;
export const CommandMenu = styled.div`
text-align:center;
grid-area: 1 / 1 / 6 / 2;
    & h1{
        margin-top:4%;
    };
    & div{
        display:flex;
        flex-flow: column;
        justify-content: space-around;
        align-items: center;
        margin-top:15%;
        & button{
            width:40%;
            color:white;
            border-color: black;
        }
        & #remove{
            background-color:red;
            border-color: black;
            }
        & #add{
            background-color:green;
        }
        border-color: black;
        & #edit{
            background-color:#45a1ff;
            border-color: black;
        }
        & #confirm{
        background-color:green;
        color:white;
        border-color: black;
    }
    }
`;
export const AddComponent = styled.div`
grid-area: 1 / 2 / 2 / 3;
overflow-y:auto;
& form{
    margin:5% 0 0 10%;
    & span{
        font-weight:bold;
    }
    & #name{
        margin-left:5%;
    }
    & input{
        margin-left:8%;
        border-color: black;
    }
    & #property{
        display: flex;
        flex-direction: column;
        align-items: baseline;
    }
    & #remove{
        margin-left:8%;
        background-color:red;
        color:white;
        border-color: black;
    }
    & #add{
        background-color:green;
        color:white;
        border-color: black;
    }
    & button{
        background-color:#45a1ff;
        color:white;
        border-color: black;
    }
    & #main-info{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: stretch;
        align-items: flex-start;
        & input{
            margin-left:8%;
        }
    }
    
} `;

export const EditComponent = styled.div`
grid-area: 1 / 2 / 2 / 3;
overflow-y:auto;
color:#45a1ff;
& h1{
    color:white;
    -webkit-text-stroke: 1px black;
}
& #loading{
    margin:2% 0 0 32%;
    & h1{
        color:white;
        -webkit-text-stroke: 1px black;
        margin-bottom:6%;
    }
}
`