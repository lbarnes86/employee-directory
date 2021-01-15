import React from "react";
import Table from "react-bootstrap/Table";
import "./style.css";

function SearchResults(props) {
  return (
    <div className="table-body">
      {props.children}
      <Table striped bordered hover>
        <thead>
          {}
          <tr>
            <th>Photo</th>
            <th className="test" onClick={props.handleSortClick}>
              Full Name
            </th>
            <th>Age</th>
            <th>Location</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {}
          {props.filteredUsers.map((person) => (
            <tr>
              <td>
                <img alt={person.name.first} src={person.picture.medium} />
              </td>
              <td>
                {person.name.first} {person.name.last}
              </td>
              <td>{person.dob.age}</td>
              <td>
                {person.location.city}, {person.location.state}
              </td>
              <td>{person.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SearchResults;
