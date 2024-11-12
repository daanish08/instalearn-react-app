import './App.css'
import Header from './components/shared/header';
import Footer from './components/shared/footer';
import MenuList from './components/shared/menulist'; // If you have a menu list to include

const App = () => {
  return (
    <div className="hero-container">
      <Header />
      <main className="content">
        <h2>Welcome to my website!</h2>
        <p>Here is some main content...</p>
        <MenuList /> {/* Include your menu list if needed */}
      </main>
      <Footer />
    </div>
  );
};

export default App;
