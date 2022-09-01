import React from 'react'
import Head from 'next/head';
import { Box,Divider  } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Layout({children}) {
  return (
    <>
        <Head>Real Estate</Head>
        <Box maxWidth={1380} m='auto'>
            <header>
                <Navbar/>            
            </header>
        <Divider orientation='horizontal' />
            <main>
                {children}
            </main>
        
            <footer>
                <Footer/>
            </footer>
        </Box>
    </>
  )
}

export default Layout