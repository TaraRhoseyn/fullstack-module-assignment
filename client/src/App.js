import './styles/App.css';
import React from 'react';
// routes:
import About from './routes/About';
import Add from './routes/Add';
import Edit from './routes/Edit';
import Home from './routes/Home';
import LogIn from './routes/LogIn';
import SignUp from './routes/SignUp';
import View from './routes/View';
// components:
import Navbar from './components/Navbar';
// browser router:
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
			<>
				<Navbar />
				<main>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route path="/add" element={<Add />} />
						<Route path="/edit" element={<Edit />} />
						<Route path="/about" element={<About />} />
						<Route path="/login" element={<LogIn />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/view" element={<View />} />
					</Routes>
				</main>
			</>
		</Router>
  );
}

export default App;
