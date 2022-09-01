import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { Box, Center, Flex, Badge, Text, Avatar } from "@chakra-ui/react";
import {FaBed,FaBath} from 'react-icons/fa';
import {BsGridFill} from 'react-icons/bs';
import {GoVerified} from 'react-icons/go';
import millify from 'millify';

 import defaultImage from '../assets/images/house.jpg'

function Property({property}) {
        
    return (
        
      <Link href={`/property/${property?.externalID}`}>        
        <Flex flexWrap='wrap' w='420px' p='5' paddingTop='0' justify='flex-start'>      
                <Box>
                    <Image height={300} width={400} objectFit='fill'  src={property?.coverPhoto?.url ? property?.coverPhoto?.url : defaultImage } alt='House'/>
                </Box> 
             
             <Box w='full'>
                <Flex paddingTop={2} alignItems='center' justifyContent='space-between'>
                    <Flex alignItems='center'>
                        <Box paddingRight='3' color='green.400'>{property?.isVerified && <GoVerified />}</Box>
                        <Text fontWeight='bold' fontSize='lg'> AED {millify(property?.price) }/{property?.rentFrequency}</Text>      
                    </Flex> 
                    <Box>
                        <Avatar name='Agencia' size='xl' src={property?.agency?.logo?.url}/> 
                    </Box>
                
                </Flex>

                <Flex alignItems='center' p={1} justifyContent='space-between' w='250px' color='blue.400'>
                        {property?.rooms} <FaBed/> | {property?.baths} <FaBath/> | {millify(property?.area)} sqft <BsGridFill/>
                </Flex>     

                <Text fontSize={'lg'}> {property?.title.lenght>20 ? `${property?.title.substring(0,30)}...` : property?.title } </Text>

             </Box>
        </Flex>
      </Link>
    )
}

export default Property