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
        </section>
    )

}