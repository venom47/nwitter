import { useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
  };
  const onChange = (event) => {
    setNweet(event.target.value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Waht's on your mind?"
          maxLength={120}
          required
          onChange={onChange}
          value={nweet}
        />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};

export default Home;
