import { useState } from "react"
import { useSelector } from "react-redux"

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { MultipleSelectCheckmarks } from "./label-filter"

export function ToyFilter({ filterBy, onFilterBy }) {
    const labels = useSelector(storeState => storeState.labels)

    function handleChange({ target }) {
        const field = target.name
        const value = target.value

        onFilterBy({ [field]: value })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
    }

    function cancelSearch() {
        handleChange({ target: { name: 'txt', value: '' } })
    }

    function handleSort(item) {
        let desc = filterBy.sort.desc * (-1)
        onFilterBy({ sort: { item, desc } })
    }

    const { txt } = ''
    return (
        <section className="toy-filter">
            <form className="search-box" onSubmit={onSubmitFilter}>
                <label htmlFor="txt"></label>
                <img
                    onClick={onSubmitFilter}
                    src="assets/img/magnifying-glass.svg" alt="" />
                <input
                    value={txt}
                    onChange={handleChange}
                    name="txt" id="txt" type="text"
                    placeholder="search toys" />
                <button onClick={cancelSearch}>X</button>
            </form>
            <div className="max-price-range">
                <label htmlFor="maxPrice">
                    Max Price: {filterBy.maxPrice}</label>
                <input
                    onChange={handleChange}
                    name="maxPrice" id="maxPrice" type="range"
                    min="10" max="300" value={filterBy.maxPrice || "150"} step="1"
                />
            </div>

            <MultipleSelectCheckmarks />
            
            {/* <BasicSelect filterBy={filterBy} onFilterBy={onFilterBy} /> */}
            {/* <div className="label-selector">
                {labels.map(label => (
                    <div key={label}>
                        <input
                            type="checkbox"
                            name={label} id={label}
                            onChange={handleLabelFilter}
                        />
                        {label}
                    </div>
                ))}
            </div> */}
            <div className="sort-container">
                <button onClick={() => handleSort('name')}>sort by Name</button>
                <button onClick={() => handleSort('price')}>sort by Price</button>
                <button onClick={() => handleSort('createdAt')}>sort by Date</button>
            </div>
        </section>
    )

}


// export function BasicSelect({ filterBy, onFilterBy }) {
//     const labels = useSelector(storeState => storeState.labels)
//     const [item, setItem] = useState('')

//     const handleChange = (event) => {
//         handleLabelFilter(event.target)
//         setItem(event.target.value)
//     }

//     function handleLabelFilter(target) {
//         const currLabel = target.name
//         const labelsToFilter = filterBy.labels ? filterBy.labels : []

//         if (target.checked) {
//             onFilterBy({ labels: [...labelsToFilter, currLabel] })
//         } else {
//             const idx = labels.indexOf(currLabel)
//             labelsToFilter.splice(idx, 1)
//             onFilterBy({ labelsToFilter })
//         }
//     }

//     return (
//         <Box sx={{ minWidth: 120 }}>
//             <FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">Labels</InputLabel>
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={item}
//                     label="labels"
//                     onChange={handleChange}
//                 >
//                     {labels.map(label =>
//                         <MenuItem value={`${label}`}>{label}</MenuItem>
//                     )}
//                 </Select>
//             </FormControl>
//         </Box>
//     )
// }