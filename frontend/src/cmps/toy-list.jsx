import { Link } from 'react-router-dom'

import { ToyPreview } from '../cmps/toy-preview.jsx'

export function ToyList({ toys, onRemoveToy }) {

    if(!toys || !toys.length) return <div>Loading...</div>
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div className="toy-preview-option">
                        <Link to={`/edit/${toy._id}`}>Edit</Link>
                        <Link to={`/toy/${toy._id}`}>Details</Link>
                        <button onClick={() => onRemoveToy(toy._id)}>
                            <img src="assets/img/delete.svg" alt="delete" />
                        </button>
                    </div>
                </li>)}
        </ul>)

}