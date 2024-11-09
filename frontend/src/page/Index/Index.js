import logo from '../../logo.svg';
import '../../App.css';
import {Link} from "react-router-dom";

function Index() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>Index.js</code> and save to reload.
                </p>
                <a
                    className="App-link"a
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                {/*Test Buttons Below*/}
                <div>
                    <Link to={'/loading'}>Loading</Link>
                    <Link to={'/question'}>Question</Link>
                    <Link to={'/feedback'}>feedback</Link>
                </div>
            </header>
        </div>
    );
}

export default Index;
