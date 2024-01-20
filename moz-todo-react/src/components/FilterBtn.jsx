function FilterBtn (props) {

    return (
        <button type="button" className="btn toggle-btn" aria-pressed={props.pressed}>
          <span className="visually-hidden">Show </span>
          <span>{props.view}</span>
          <span className="visually-hidden"> tasks</span>
        </button>
    );
}

export default FilterBtn;