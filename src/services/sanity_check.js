
//creation data checker
function creation_data_checker(data){
    if(data.name && data.name != "" && data.group && data.group != ""){
        return true
    }else{
        return false
    }
}
//update data checker
function edition_data_checker_and_formatter(data){
    if (!data.name && !data.group){
        return {success:false,data:None ,msg:"malformed data"}
    }
    if (data.name==""){
        delete data.name
    }
    if (data.group==""){
        delete data.group
    }
    return {success:true,data:data, msg:"good to go"}
}

module.exports={creation_data_checker,edition_data_checker_and_formatter}