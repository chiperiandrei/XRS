import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Home = props =>{
    function check_if_is_uploaded() {
        //TODO : api to check if config already exists
    }
    function upload_config_to_server(){
        //TODO : upload cfg to server
    }
    return [<Header companyname="X"/>,<form>
        Text1 <input type="text"/><br/>
        Text1 <input type="text"/><br/>
        Text1 <input type="email"/><br/>
        Text1 <input type="text"/><br/>
        <input type="submit" value="Go"/>
    </form>,<Footer datecreated='2020' authorname='Andrei Chiperi'/>]
};
export default Home;