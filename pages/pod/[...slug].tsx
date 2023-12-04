import React from "react";
import { useRouter } from "next/router";

const FilterPods: React.FC = (props) => {
  const router = useRouter();
  const filterData = router.query.slug;
  console.log(filterData)
  return (
    <h2>{filterData?.map(item => item+'/')}</h2>
  )
}

export default FilterPods;
