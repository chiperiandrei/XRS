import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker';
import { FormControl } from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";
import { Avalaible, ContainerButtonAvalaible, ContainerProduct, ImgProduct, PriceProduct } from '../assets/styles/Product';



const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const Product = props => {
    console.log(props.infos)
    console.log(props.user)
    const token = localStorage.getItem("user_info")
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const classes = useStyles();
    const [modalStyle] = useState({
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    });
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let specs = []
    for (const property in props.infos.specs) {
        specs.push(<li>{property}: {props.infos.specs[property]}</li>)
    }
    let now = new Date();
    let start_var = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 0, 0));
    let end_var = moment(start_var).add(2, "hours");
    let ranges = {
        "Today Only": [moment(start_var), moment(end_var)]
    }
    let local = {
        "format": "DD-MM-YYYY HH:mm",
        "sundayFirst": false
    }
    let maxDate = moment(start_var).add(24, "hour")

    const handleSubmitReserve = () => {
        Axios.post('http://localhost:4002/api/borrows/', {
            product_id: props.infos._id,
            person_id: props.user.id,
            end: end.toDate(),
            start: start.toDate()
        }, {
            headers: {
                "auth-token": token.substr(1, token.length - 2)
            }
        })
            .then(response => {
                toast.success(`${props.infos.name} borrowed successfully until ${moment(end).format("dddd, MMMM Do YYYY, h:mm:ss a")}`)
                toast.warn("For take it go with your access card to the operator")
            })
            .catch(err =>  toast.error(err.response.data))
        console.log(start)
        console.log(start)
        console.log(props.infos._id)
    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Select hour range</h2>
            {start && end ? <div>Start<li>{moment(start).format("dddd, MMMM Do YYYY, h:mm:ss a")}</li>End<li>{moment(end).format("dddd, MMMM Do YYYY, h:mm:ss a")}</li></div> : null}
            <DateTimeRangeContainer
                ranges={ranges}
                start={start_var}
                end={end_var}
                local={local}
                maxDate={maxDate}
                applyCallback={(startDate, endDate) => {
                    setStart(startDate)
                    setEnd(endDate)
                }}
            >
                <FormControl
                    id="formControlsTextB"
                    type="text"
                    placeholder="Select date"
                />
            </DateTimeRangeContainer>
            {start && end ? <button onClick={() => handleSubmitReserve()}>Reserve</button> : null}
        </div>
    );

    return <ContainerProduct>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
        >
            {body}

        </Modal>

        <ImgProduct src={`http://localhost:4001/${props.infos.images[0]}`} alt='example of product' ></ImgProduct><h1>{props.infos.name}</h1><PriceProduct>Status:<Avalaible> Avalaible</Avalaible></PriceProduct><ul>{specs}</ul><ContainerButtonAvalaible onClick={handleOpen}>Reserve</ContainerButtonAvalaible>
        <ToastContainer /></ContainerProduct>

};
export default Product;