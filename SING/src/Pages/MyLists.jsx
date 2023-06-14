import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OneList from "../Components/OneList";

const airtableURL = `https://api.airtable.com/v0/appKdsyRVyAZYTgt2/MyLists`;

export default function MyLists({ airTable, musixmatchAPI }) {
  const [myLists, setMyLists] = useState([]);

  useEffect(() => {
    async function fetchMyListsAT() {
      const response = await fetch(airtableURL, {
        method: "GET",
        headers: airTable.header,
      });
      const jsonData = await response.json();
      setMyLists(jsonData.records);
      console.log("lists: ", jsonData);
    }
    fetchMyListsAT();
  }, []);

  return (
    <>
      <h1>My Lists</h1>
      <h5>
        <i>------ Create a new memory ------</i>
      </h5>
      <table>
        <thead>
          <tr>
            <th>List Name</th>
            <th>Total Songs</th>
            {/* <th>Add/Edit</th> */}
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>
          {myLists.length > 0 && (
            <>
              {myLists.map((lists) => (
                <tr key={lists.id}>
                  <td>
                    {" "}
                    <Link to={`/mylists/${lists.id}`}>
                      {" "}
                      {lists.fields.ListName}{" "}
                    </Link>
                  </td>
                  <td>{lists.fields.TracksIdsArr.split(",").length}</td>
                  {/* <th>
                    <Link to={`/mylists/addtracks/${lists.id}`}>
                      <button id={lists.id}>♬</button>
                    </Link>
                  </th> */}
                  {/* <th>
                    <Link to={`/mylists/edit/${lists.id}`}>
                      <button id={lists.id}>✎</button>
                    </Link>
                  </th> */}
                  <td>
                    {new Date(lists.createdTime).toLocaleDateString()}{" "}
                    {new Date(lists.createdTime).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </>
          )}
          <tr className="newList">
            <td></td>
            {/* <td></td> */}
            {/* <td></td> */}
            <td>
              <Link to={`/mylists/addnewlist`}>
                <button className="newListButton">+</button>
              </Link>
            </td>
            <td>Create New</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
