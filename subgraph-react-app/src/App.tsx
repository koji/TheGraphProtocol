import "./App.css";
import { useState, useEffect } from "react";
import { createClient } from "urql";
import { TokenType, ContentData } from "./types";

const APIURL = "https://api.thegraph.com/subgraphs/name/koji/fndsubgraph";
const query = `{
  tokens(first: 5) {
    id
    tokenID
    contentURI
    tokenIPFSPath
  }
  users(first: 5) {
    id
    tokens {
      id
    }
    created {
      id
    }
  }
}`;

const client = createClient({
  url: APIURL,
});

const targetExt = ".mp4";

const App = () => {
  const [tokens, setTokens] = useState<TokenType[]>([]);
  const [data, setData] = useState<ContentData[]>([]);

  const fetchTokenData = async () => {
    console.log("tokens", tokens);
    const nfts = await Promise.all(
      tokens.map(async (token) => {
        const resp = await fetch(token.contentURI);
        return resp.json();
      })
    );
    console.log("json data: ", nfts);
    setData(nfts);
  };

  const fetchData = async () => {
    const response = await client.query(query).toPromise();
    // console.log("response", response);
    console.log("called");
    setTokens(response.data.tokens);
    await fetchTokenData();
    // console.log(tokens);
    // fetchTokenData(tokens[0].contentURI);
  };

  useEffect(() => {
    fetchData();
    // fetchTokenData();
  }, []);

  return (
    <div className="App">
      {/* {tokens.map((token: TokenType, _index: number) => (
        <div key={_index}>
          <a href={token.contentURI} target="_blank" rel="noreferrer">
            Content URI
          </a>
          <p>{token.tokenID}</p>
        </div>
      ))} */}
      {data.map((nft: ContentData, _index: number) => (
        <div key={_index}>
          {nft.image.includes(targetExt) ? (
            <video
              src={nft.image.replace("ipfs://", "https://ipfs.io/")}
              height="300px"
              width="auto"
              controls
            ></video>
          ) : (
            <img
              src={nft.image.replace("ipfs://", "https://ipfs.io/")}
              alt="nft"
              height="300px"
              width="auto"
            />
          )}
          <br />
          nft info
          <p>{nft.name}</p>
          <p>{nft.description}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
