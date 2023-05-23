import { useNavigate } from "react-router"

import { utilService } from "../services/util.service.js"
import { userService } from "../services/user.service.js"

export function ToyPreview({ toy }) {
    const navigate = useNavigate()

    return (
        <article className="toy-article">
            <h1>{toy.name}</h1>
            <h4>price: {toy.price}</h4>
            <img src={toy.imgURL} alt="toy" />
            <ul>
                {toy.labels.map(label =>
                    <li key={toy.name + '/' + label}>{label}</li>
                )}
            </ul>
            {/* <p>{utilService.getCreatedTime(toy.createdAt)}</p> */}
        </article>
    )
}