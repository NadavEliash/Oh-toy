import { useSelector } from "react-redux"

export function ToyFilter({ filterBy, onFilterBy }) {
    const labels = useSelector(storeState => storeState.labels)

    function handleChange({ target }) {
        const field = target.name
        const value = target.value

        onFilterBy({ [field]: value })
    }

    function handleLabelFilter({ target }) {
        const label = target.name
        const labels = filterBy.labels ? filterBy.labels : []

        if (target.checked) {
            onFilterBy({ labels: [...labels, label] })
        } else {
            const idx = labels.indexOf(label)
            labels.splice(idx, 1)
            onFilterBy({ labels })
        }
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
            <div className="label-selector">
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
            </div>
            <div className="sort-container">
                <h2 onClick={() => handleSort('name')}>Sort by Name</h2>
                <h2 onClick={() => handleSort('price')}>Sort by Price</h2>
                <h2 onClick={() => handleSort('createdAt')}>Sort by Date</h2>
            </div>
        </section>
    )

}