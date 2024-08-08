import React, {useEffect, useState} from 'react';
import * as style from './Filter.module.scss'
import axios from "axios";
import {Link} from "react-router-dom";

export default function Filter(props) {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [modification, setModification] = useState([]);
  const [currentBrand, setCurrentBrand] = useState('')
  const [currentModel, setCurrentModel] = useState('')
  const [currentModification, setCurrentModification] = useState('')
  const [params, setParams] = useState({})
  const [paramsString, setParamsString] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://9aaca2b44dbb58a9.mokky.dev/brands');
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching:', error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(()=>{
    if (currentBrand === '') return;
    async function fetchData() {
      try {
        const response = await axios.get(`https://9aaca2b44dbb58a9.mokky.dev/models/${currentBrand}`);
        setModels(response.data?.models ?? []);
      } catch (error) {
        console.error('Error fetching:', error.message);
      }
    };

    fetchData();
  }, [currentBrand])

  useEffect(()=>{
    if (currentModel === '' || currentBrand === '') return;
    async function fetchData() {
      try {
        const response = await axios.get(`https://9aaca2b44dbb58a9.mokky.dev/modification?brand=${currentBrand}&model=${currentModel}`);
        setModification(response.data[0]?.modification ?? []);
      } catch (error) {
        console.error('Error fetching:', error.message);
      }
    };

    fetchData();
  }, [currentModel])

  useEffect(()=>{
    const filteredEntries = Object.entries(params).filter(([key, value]) => value !== 'null');
    return setParamsString(filteredEntries.map(([key, value]) => `${key}=${value}`).join('&'))
  }, [params])
  console.log(paramsString)
  const handler = (e)=>{
    const value = e.target.value
    const state = e.target.getAttribute('id')

    switch (state) {
      case 'brand':
        setCurrentModel('')
        setCurrentModification('')
        setModels([])
        setModification([])
        setParams({})
        setParams(prevParams => ({
          ...prevParams,
          ['brand']: value,
        }))
        return setCurrentBrand(value)
      case 'model':
        setCurrentModification('')
        setModification([])
        setParams(prevParams => {
          const { modification, ...rest } = prevParams;
          return {
            ...rest,
            model: value,
          };
        });
        return setCurrentModel(value)
      default:
        setParams(prevParams => ({
          ...prevParams,
          ['modification']: value,
        }))
        return setCurrentModification(value)
    }
  }

  const button = (e) =>{
    e.preventDefault()
  }
  return (
    <section className={style.section}>
      <div className={style.title}>Car parts search</div>
      <div>
        <select name="brand" id="brand" onChange={handler}>
          <option value="null">Select</option>
          {brands.map((item) => (
            <option value={item.id} key={item.id}>{item.brand}</option>
          ))}
        </select>
        <select name="model" id="model" onChange={handler}>
          <option value="null">Select</option>
          {models.map((item) => (
            <option value={item.id} key={item.id}>{item.title}</option>
          ))}
        </select>
        <select name="modification" id="modification" onChange={handler}>
          <option value="null">Select</option>
          {modification.sort((a, b) => a.yearStart - b.yearStart).map((item) => (
            <option value={item.id} key={item.id}>{item.name} ({item.yearStart} - {item.yearEnd})</option>
          ))}
        </select>
        <button onClick={button}>
          <Link
            to={`/parts${paramsString.length > 0 ? '?'+paramsString : ''}`}
          >Search</Link>
        </button>
      </div>
    </section>
  );
}