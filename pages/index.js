 import Link from "next/link";
 import Image from "next/image";
 import {Flex,Box,Text,Button} from '@chakra-ui/react';

 import { baseUrl,homeApi } from "../utils/homeApi";
import Property from "../components/Property";

 
 const Banner=({purpose,title1,title2,desc1,desc2,buttonText,linkName,imageUrl })=>(
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
      <Image src={imageUrl} width={500} height={300}/>
      <Box p='5'>

        <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
        <Text color='3xl' fontSize='sm'>{title1} <br/> {title2}</Text>
        <Text color='gray.700' fontSize='lg' paddingTop='3' paddingBottom='3'>{desc1} <br/> {desc2}</Text>
          
          <Button fontSize='xl'> 
              <Link href={linkName}>
                    <a> {buttonText} </a>
              </Link> 
          </Button>
      </Box>
  </Flex>
 );


 export default function Home({propertiesForSale,propertiesForRent}) {
  
  
  return (
    <Box> 
        <Banner
          purpose='Rent a Home'
          title1='Rental Homes for'
          title2='Everyone'
          desc1=' Explore from Apartments, builder floors, villas'
          desc2='and more'
          buttonText='Explore Renting'
          linkName='/search?purpose=for-rent'
          imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
        />

        <Flex flexWrap='wrap'> 

        {
          propertiesForRent.map( (property)=>
              <Property property={property} key={property.id}/>
          )
        }
        </Flex>

        <Banner
          purpose='Buy a Home'
          title1='Find, Buy & Own Your'
          title2='Dream Home'
          desc1='Explore Apartements, Villas, Homes'
          desc2='and more'
          buttonText='Explore Buying'
          linkName='/search?purpose=for-sale'
          imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
        />
        
        <Flex flexWrap='wrap'> 
        {
          propertiesForSale.map((property)=>
            <Property property={property} key={property.id}/>
          )
        }
        </Flex>

    </Box>
  )

};

// Fun??ao que vai buscar informa????o e ddevolve como props

export async function getStaticProps(){
  const propertyForSale= await homeApi(`${baseUrl}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-sale&hitsPerPage=12&lang=en`);
  const propertyForRent= await homeApi(`${baseUrl}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=12&lang=en`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}


