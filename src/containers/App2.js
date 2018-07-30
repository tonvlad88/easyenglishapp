import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

class App2 extends Component {
	
	render() {
		return (
			<div className="fl w-100 ba">
				<Header />	
					<Card />
				<Footer />
			</div>
		);
	}

}

export default App2;