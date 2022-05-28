import { Link } from 'react-router-dom';

import './directory-item.styles.scss';

const DirectoryItem = ({ category }) => {
    const { imageUrl, title, route } = category;

    console.log(route);

    return (
        <Link className="directory-item-container" to={route}>
            <div 
                className="background-image" 
                style={{ backgroundImage: `url(${imageUrl})`}}>
            </div>
            <div className="directory-body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </Link>
    )
}

export default DirectoryItem;