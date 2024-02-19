import {
  Box,
  CircularProgress,
  Flex,
  Image,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import {
  useEffect,
  useState,
} from "react";
import axios from "axios";

function Wallet({ address }) {
  const [
    loadingTicket,
    setLoadingTicket,
  ] = useState(false);
  const [nftTicket, setNftTicket] =
    useState(null);

  const createTicketDisplay = () => {
    const ticket = {
      token_id: 1,
      permalink:
        "https://rinkeby.rarible.com/token/0x8f510afccb7a50181dfe95b803443070ded8ba1d:1?tab=history",
      image_url:
        "https://lh3.googleusercontent.com/jy3b2SYSfxRwoffQ6QmWvzo4NsmpzRqX5v4MD7MfYzuVLXkYRYHraHnM_sJMBu3bW1mvIBUtAhq_tTuBcjjQahHADjvF4iYC7OCj=w600",
    };
    return (
      <Link
        href={ticket.permalink}
        key={ticket.token_id}
        isExternal
        // width="100%"
        margin="16px 8px"
      >
        <Text
          fontSize="xl"
          textAlign="center"
          mb={2}
        >
          NFTix #{ticket.token_id}
        </Text>
        <Box
          padding="12px"
          border="1px solid black"
          borderRadius="15px"
        >
          <Image
            width={600}
            height={250}
            src={ticket.image_url}
            alt={`NFTix #${ticket.token_id}`}
          />
        </Box>
      </Link>
    );
  };

  useEffect(() => {
    if (!address) return;
    
    axios
      .get(
        `https://rinkeby-api.opensea.io/api/v1/assets?owner=${address}&asset_contract_address=${process.env.REACT_APP_CONTRACT_ID}`
      )
      .then((res) => {
        setLoadingTicket(true);
        
        if (
          res.status === 200 &&
          res?.data?.assets &&
          res?.data?.assets.length
        ) {
          setNftTicket(res.data.assets[0]);
          
        }
        setLoadingTicket(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingTicket(false);
      });
  }, [address]);
  return (
    <>
      <Heading mb={2}>
        Your ticket
      </Heading>
      <Flex
        justifyContent="center"
        margin="0 auto 16px"
        width="66%"
      >
        {loadingTicket && (
          <CircularProgress
            capIsRound
            isIndeterminate
            color="green.300"
            size="120px"
          />
        )}
        {!loadingTicket &&
          createTicketDisplay()}
        
        {!loadingTicket && !nftTicket && (
          
          <Text
            fontSize="xl"
            mb={2}
            width="100%"
          >
            
          </Text>
        )}
      </Flex>
    </>
  );
}

export default Wallet;