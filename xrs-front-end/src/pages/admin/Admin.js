//React section
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//Pages section
import ProductAdd from './ProductAdd';
import ProductSearch from "../ProductSearch";

//Components section
import Header from '../../components/Header';
import Footer from '../../components/Footer';

//Redux section
import { useSelector } from "react-redux";



const Admin = props => {
    const handleAddProduct = () => {
        setAction('productadd')
    }
    const handleSearchProduct = () => {
        setAction('productsearch')
    }
    const [action, setAction] = useState('altceva');
    const company_info = useSelector(state => state.company_info);
    const history = useHistory();

    if (action === 'productadd')
        return <div><button>sal</button><ProductAdd/></div>
    else if (action === 'productsearch')
        return <ProductSearch />
    else
        return (
            <React.Fragment>
                <Header companyname={company_info !== null ? company_info.company_name : "X"} />
                <div><button onClick={handleAddProduct} >Hai la produse</button><button onClick={handleSearchProduct} >Cauta produse</button>
                </div>
                <Footer datecreated={company_info !== null ? company_info.date_created : "2020"} authorname={company_info !== null ? `${company_info.operatorFname} ${company_info.operatorLname}` : "Andrei Chiperi"} />
            </React.Fragment>
        )

};
export default Admin;
