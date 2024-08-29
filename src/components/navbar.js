import react from 'react';
import './navbar.css'

export default function NavBar() {
    return (
        <div id='navbar'>
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link" href="/">&laquo;</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="/">1</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="/">2</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="/">&raquo;</a>
                </li>
            </ul>
        </div>
    );
}
