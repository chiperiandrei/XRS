//React section
import React, { useState } from "react";

//Pages section
import ProductAdd from '../../components/ProductAdd';
import ProductEdit from '../../components/ProductEdit';

//Components section
import Header from '../../components/Header';
import Footer from '../../components/Footer';

//Redux section
import { useSelector } from "react-redux";

//Styles section
import { LayOut, CommandMenu, AddComponent, EditComponent } from '../../assets/styles/Admin';


const Admin = props => {
    const handleAddProduct = () => {
        setAction('productadd')
    }
    const handleEditProduct = () => {
        setAction('productedit')
    }
    const [action, setAction] = useState('productadd');
    const company_info = useSelector(state => state.company_info);
    let command = <CommandMenu>
        <h1>What do you want to do ?</h1>
        <div>
            <button id="add" onClick={handleAddProduct}>
                Add product
        </button>
            <button id="edit" onClick={handleEditProduct}>
                Edit product
        </button>
        </div>
    </CommandMenu>
    const render = (component) => {
        let forRender = <> <Header companyname={company_info !== null ? company_info.company_name : "X"} />
            <LayOut>
                {command}
                {component}
            </LayOut>
            <Footer datecreated={company_info !== null ? company_info.date_created : "2020"} authorname={company_info !== null ? `${company_info.operatorFname} ${company_info.operatorLname}` : "Andrei Chiperi"} /></>
        return forRender
    }
    if (action === 'productadd') {
        let component = <AddComponent><ProductAdd /></AddComponent>
        return render(component)
    } else if (action === 'productedit') {
        let component = <EditComponent><ProductEdit /></EditComponent>
        return render(component)
    }

};
export default Admin;
