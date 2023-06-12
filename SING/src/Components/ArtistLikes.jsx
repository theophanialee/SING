export default function ArtistLikes({ myLikes }) {
  return (
    <>
      <h1>Voting history</h1>
      <table>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Votes</th>
            <th>Date</th>
            <th>Time</th>

            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {myLikes.length > 0 && (
            <>
              {myLikes.map((liked, id) => (
                <tr key={id}>
                  <td>{liked.fields.ArtistName}</td>
                  <td>{liked.fields.ArtistLikes}</td>
                  <td>{new Date(liked.createdTime).toLocaleDateString()}</td>
                  <td>{new Date(liked.createdTime).toLocaleTimeString()}</td>
                  <td>FAN</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </>
  );
}
