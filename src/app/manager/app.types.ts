export interface UserData{
    id: number,
    name : string,
    group_id: number,
    country_id : number,
    active : string,
    seen : string,
    email : string,
    username : string, 
    phone : string,
    lang : string,
    address_title : string,
    from_where : string
}

export interface UserCity{
    id: number,
    name : string,
 
}

export interface Order{

    id : number,
    image : string,
    title : string,
    count : number,
    price : number,
    restName : string,
    restId : number
}

export interface UserLang{
    
    name : string,
 
}