import axios from "axios"

  export const baseUrl='https://bayut.p.rapidapi.com';

  export  const homeApi=async(url)=>{
    const {data}=await axios.get((url),{
        headers: {
          'X-RapidAPI-Key': 'a6157937fcmsh27302894111a0c2p1503adjsn49557816bd02',
          'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          },                 
    });

    return data;    
  }