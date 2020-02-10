import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.scss';

export const TableRows = ({website, number,city,country,country_full,latitude,longitude,timezone,postalcode,per_dif,dif,soundex}) =>{
    return(
            <tbody>
                <tr>
                <th scope="row">{number}</th>
                <td> {city} </td>
                <td> {country} </td>
                <td> {country_full} </td>
                <td> {latitude} </td>
                <td> {longitude} </td>
                <td> {timezone} </td>
                <td> {postalcode} </td>
                <td> {per_dif} </td>
                <td> {dif} </td>
                <td> {soundex} </td>
                <td> <a href={`http://www.google.com/search?q=${website}`}> Website &rarr; </a></td>
                </tr>
            </tbody>
    )
}
export default TableRows;
