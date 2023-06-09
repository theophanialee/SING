export default function ArtistVotes({ votes }) {
  const sortedVotes = votes.sort((a, b) => {
    const timeVotedA = new Date(a.createdTime).getTime();
    const timeVotedB = new Date(b.createdTime).getTime();
    return timeVotedB - timeVotedA;
  });

  return (
    <>
      <h1>Voting history</h1>
      <table>
        <thead>
          <tr>
            <th>Artist</th>
            {/* <th>Votes</th> */}
            <th>Time Voted</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {votes.length > 0 && (
            <>
              {votes.map((liked, id) => (
                <tr key={id}>
                  <td>{liked.fields.ArtistName}</td>
                  {/* <td>{liked.fields.ArtistLikes}</td> */}
                  <td>
                    {new Date(liked.createdTime).toLocaleTimeString()}{" "}
                    {new Date(liked.createdTime).toLocaleDateString()}
                  </td>
                  <td>{liked.fields.VotedBy}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </>
  );
}
