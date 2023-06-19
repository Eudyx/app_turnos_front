import { Link } from "react-router-dom";

const SelectSection = () => {
  return (
    <section>
      <div>
        <Link to='/shiftTable'>Client</Link>
      </div>
      <div>
        <Link to='/shiftForm'>Admin</Link>
      </div>
    </section>
  )
}

export default SelectSection
