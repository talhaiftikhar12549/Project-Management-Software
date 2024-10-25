import './App.css'
import Header from "./Components/Header";
import MainBoard from "./Components/MainBoard"

function App() {

    return (
        // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{
                transform: 'rotate(0deg)',
                // // transformOrigin: 'top left',
                //  height: '100%',
                // width: '100%'
            }}>
                <Header />
                <MainBoard />
            </div>
        // </div>
    )
}

export default App
