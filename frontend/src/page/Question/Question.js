import logo from '../../logo.svg';
import '../../App.css';

function Question() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>Question.js</code> and save to reload.
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

export default Question;
