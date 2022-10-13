import '../../css/main.css'
import { Outlet, Link, useParams } from 'react-router-dom'

function Main() {
    const serial = useParams();
    
    return (
        <div>
            <div className="container">
                <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                    <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <Link to={'/main/control/' + serial.id + '/' + serial.serial}><label className="fs-4 text-black" style={{ cursor: 'pointer' }}>Smart Window</label></Link>
                        {
                            window.location.pathname === `/main/option/${serial.id}/${serial.serial}` ?
                                <label className="C-navinfo" disabled>기준치 조절</label> :
                                window.location.pathname === `/main/log/${serial.id}/${serial.serial}` ?
                                    <label className="C-navinfo" disabled>기록</label> :
                                    null
                        }
                    </div>
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <div className="menuimg"><Link to={'/main/option/' + serial.id + '/' + serial.serial}><img style={{ cursor: 'pointer' }} src="/setting.png" width="40" alt='option' /></Link></div>
                        </li>
                        <li className="nav-item">
                            <div className="menuimg"><Link to={'/main/log/' + serial.id + '/' + serial.serial}><img style={{ cursor: 'pointer' }} src="/menu-bar.png" width="40" alt='log' /></Link></div>
                        </li>
                    </ul>
                </header>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default Main