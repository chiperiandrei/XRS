import React from "react";

const Home = props =>{
    function check_if_is_uploaded() {
        //TODO : api to check if config already exists
    }
    function upload_config_to_server(){
        //TODO : upload cfg to server
    }
    return <form>
        Text1 <input type="text"/><br/>
        Text1 <input type="text"/><br/>
        Text1 <input type="email"/><br/>
        Text1 <input type="text"/><br/>
        <input type="submit" value="Go"/>
    </form>;
};
export default Home;