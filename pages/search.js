import React, { useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box,Flex,Text,Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import SearchFilters from '../components/SearchFilters';
import Property from '../components/Property';
import { baseUrl,homeApi } from "../utils/homeApi";

import noresult from '../assets/images/noresult.svg';

export default function search({properties}) {
    const [searchFilters,setSearchFilters]=useState(false);
    const router=useRouter();
  
    return (
     <Box>
            <Flex cursor={'pointer'}
            bg='gray.200'
            borderBottom='20px'
            borderColor='gray.200'
            p='2'
            fontWeight='black'
            fontSize='lg'
            justifyContent='center'
            alignItems='center'
            onClick={()=>setSearchFilters((prevFilters)=>!prevFilters)}
            >
                <Text>Search Property by Filters </Text>
                <Icon paddingLeft={1} w='7' as={BsFilter}/>
            </Flex>
            
                {searchFilters && <SearchFilters/>}
                <Text fontSize='2xl' p='4' fontWeight='bold'>Properties {router.query.purpose}</Text>

               <Flex flexWrap='wrap'>
                    {
                        properties.map((property)=> <Property property={property} key={property.id}/>)
                    }
                </Flex> 
                {
                    properties.length===0 && (
                        <Flex justifyContent='center' alignItems='center' flexDirection='column' m='5'>
                                <Image alt='no result' src={noresult} width='300' height='250'/>
                                <Text fontSize='3xl' marginTop='3'>No Results Found</Text>
                        </Flex>
                    )
                }
     </Box>
  )
}

// Nao utilizamos getStaticProps pois isto quando a pagina é estatica, getServerSideProps corre a cada request
export async function getServerSideProps({ query }) {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await homeApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

  return {
    props: {
      properties: data?.hits,
    },
  };
}





/*export async function getStaticProps({query}){
    
    const purpose=query.purpose || 'for-rent';
    const rentFrequency=query.rentFrequency || 'yearly';
    const minPrice= query.minPrice || '0';
    const maxPrice=query.maxPrice || '1000000';
    const roomsMin=query.roomsMin || '0';
    const bathsMin=query.bathsMin || '0';
    const sort= query.sort || 'price-desc';
    const areaMax=query.areaMax || '3500';
    const locationExternalIDs= query.locationExternalIDs || '5002';
    const categoryExternalID= query.categoryExternalID|| '4';
    
    const data= await homeApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&categoryExternalID=${categoryExternalID}&purpose=${purpose}&hitsPerPage=12&lang=en&rentFrequency=${rentFrequency}&minPrice=${minPrice}&maxPrice=${maxPrice}&roomsMin=${roomsMin}&bathMin=${bathsMin}&areaMax=${areaMax}&sort=${sort}`);
  
    //const propertyForSale= await homeApi(`${baseUrl}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-sale&hitsPerPage=12&lang=en`);
  
    return {
      props: {
        properties: data?.hits
      },
    };
  }*/

 