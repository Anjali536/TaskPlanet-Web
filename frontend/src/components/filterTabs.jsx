function FilterTabs({ activeFilter, onFilter }) {
    return (
        <div className="filter-tabs">

            <button
                type="button"
                className={
                    activeFilter === "all"
                        ? "filter-tab active"
                        : "filter-tab"
                }
                onClick={() => onFilter("all")}
            >
                All Posts
            </button>

            <button
                type="button"
                className={
                    activeFilter === "liked"
                        ? "filter-tab active"
                        : "filter-tab"
                }
                onClick={() => onFilter("liked")}
            >
                Most Liked
            </button>

            <button
                type="button"
                className={
                    activeFilter === "commented"
                        ? "filter-tab active"
                        : "filter-tab"
                }
                onClick={() => onFilter("commented")}
            >
                Most Commented
            </button>

        </div>
    );
}

export default FilterTabs;