import React from 'react'

import Wrapper from '../../hoc/Wrapper'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import './Layout.css'

const Layout = (props) => {
	return (
		<Wrapper>
			<Header />
			<main>{props.children}</main>
			<Footer />
		</Wrapper>
	)
}

export default Layout;