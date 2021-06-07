import React, { useState, useEffect } from "react";
import axiosRequest from "../api/axiosRequest";
import Table from '../components/Table'
import filterRow from '../util/filterRows'

const Destiny = () => {
  const [destinies, setDestinies] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axiosRequest.get("/destiny");
      setDestinies(data);
    };

    fetch();
  }, []);

  const tableConfig = {
    columns: ["tipo", "desde", "hasta", "comentario"],
    rows: filterRow(destinies)
  }

  return (
    <div>
      <Table tableConfig={tableConfig} />
    </div>)
};


export default Destiny