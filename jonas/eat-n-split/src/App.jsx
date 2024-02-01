const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <Friends />
        <FormAddFriend />
        <Button>Add Friend</Button>
      </div>
        <SplitSection />
    </div>
  );
}

function Friends() {
  const friends = initialFriends;
  
  return(
    <ul>
      {
        friends.map(friend => <Member friend={friend} key={friend.id}/>)
      }
    </ul>

  );
}

function Member({friend}) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && <p style={{color: 'red'}}>You owe {friend.name} ${Math.abs(friend.balance)}!</p>}
      {friend.balance > 0 && <p style={{color: 'green'}}>{friend.name} owes you ${Math.abs(friend.balance)}!</p>}
      {friend.balance === 0 && <p style={{color: 'black'}}>You are even!</p>}
      <Button>Select</Button>

    </li>
  );
}

function SplitSection() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>Bill Value</label>
      <input type="text" />

      <label>Your Expense</label>
      <input type="text" />
      
      <label>X Expense</label>
      <input type="text" />

      <label>Who is Paying the Bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );

}

function Button({children}) {
  return(
    <button className="button">{children}</button>
  );
}

function FormAddFriend() {
  return(
    <form className="form-add-friend">
      <label>Friend Name</label>
      <input type="text" />

      <label>Image URL</label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  );
}

export default App;