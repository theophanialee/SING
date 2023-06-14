import Airtable from "airtable";
import { Link } from "react-router-dom";

const airtableURL = `https://api.airtable.com/v0/appKdsyRVyAZYTgt2/MyLists`;

export default function OneList({ myLists, airTable }) {
  console.log(myLists);
  return (
    <>
      {/* {myLists.map((lists) => (
        <tr key={lists.id}>
          <td>{lists.fields.ListName}</td>
          <td>{lists.fields.TotalSongs}</td> */}
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
      {/* <td>
            {new Date(lists.createdTime).toLocaleDateString()}{" "}
            {new Date(lists.createdTime).toLocaleTimeString()}
          </td>
        </tr>
      ))} */}
    </>
  );
}
