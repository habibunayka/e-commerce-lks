import React from 'react'
import { Link } from 'react-router-dom'

const CategoriesComp = ({name, id}) => {
  return (
    <Link to={`/products?category=${id}`} className="w-full bg-primary flex justify-center font-semibold text-lg text-white py-12">
        {name}
    </Link>
  )
}

export default CategoriesComp