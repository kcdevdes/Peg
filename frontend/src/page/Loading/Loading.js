import logo from '../../logo.svg';
import '../../App.css';

function Loading() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>Loading.js</code> and save to reload.
                </p>
                <a
                    className="App-link"a
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default Loading;
