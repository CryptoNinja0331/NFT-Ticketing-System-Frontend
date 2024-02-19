import {useState, useEffect} from "react"

import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ethers } from "ethers";
import logo from "./images/devdao.svg";
import NFTx from "./contracts/NFTx.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import {
  faQrcode,
  faTools,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";

import Connect from "./components/Connect";
import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

import {
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";

import Admin from "./pages/Admin";
import Buy from "./pages/Buy";
import CheckIn from "./pages/CheckIn";
import Page from "./layouts/Page";
import Wallet from "./pages/Wallet";

function App() {
  const navigate = useNavigate();

  const [address, setAddress] =
    useState(null);
  const [connectedContract, setConnectedContract] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  
  console.log("address:", address);
  console.log("connectedContract:", connectedContract);
  console.log("isOwner:", isOwner);


  useEffect(() => {
    checkIsContractOwner();
  }, [address, connectedContract]);


  useEffect(() => {
    if (!address) {
      const previousAddress =
        window.localStorage.getItem(
          "nftx-address"
        );

      if (previousAddress) {
        setAddress(previousAddress);
      }
    }
  }, [address]);

  useEffect(() => {
    getConnectedContract();
  }, []);

  const getConnectedContract =
    async () => {
      const { ethereum } = window;
      if (!ethereum) return;

      const provider =
        new ethers.providers.Web3Provider(
          ethereum
        );
      
      const signer = provider.getSigner();

      const connectedContract =
        new ethers.Contract(
          "0xa55Df6C0F21671f93D72526a2B49d858Ef2e6c39",
          NFTx.abi,
          signer
        );

      setConnectedContract(connectedContract);

    };

  

  const checkIsContractOwner =
    async () => {
      
      if (!address || !connectedContract) return;

      const ownerAddress = await connectedContract.owner();

      if (address.toLowerCase() === ownerAddress.toLowerCase()) {
        setIsOwner(true);
      }
      else {
        setIsOwner(false);
      }

    };

  



  return (
    <>
      <Connect 
      
        address={address}
        
        onConnect={(address) => {
          setAddress(address);

          window.localStorage.setItem(
            "nftx-address",
            address
          );
        }}

        onDisconnect={() => {
          setAddress(null);

          window.localStorage.removeItem(
            "nftx-address"
          );
        }}

      />
      <Page>
        <Menu
          left="0"
          _hover={{
            bg: "purple.500",
            fontWeight: "bold",
          }}
        >
          {({ isOpen }) => (
            <>
              <MenuButton
                position="absolute"
                top="12px"
                right="16px"
                as={Button}
                colorScheme="purple"
                rightIcon={
                  isOpen ? (
                    <ChevronUpIcon />
                  ) : (
                    <ChevronDownIcon />
                  )
                }
              >
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() =>
                    navigate("/")
                  }
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Buy
                    <FontAwesomeIcon
                      icon={faEthereum}
                      size="lg"
                    />
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() =>
                    navigate("/wallet")
                  }
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Your Tickets
                    <FontAwesomeIcon
                      icon={faTicketAlt}
                      size="lg"
                    />
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  isDisabled={!isOwner}
                  onClick={() =>
                    navigate(
                      "/check-in"
                    )
                  }
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Check In
                    <FontAwesomeIcon
                      icon={faQrcode}
                      size="lg"
                    />
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  isDisabled={!isOwner}
                  onClick={() =>
                    navigate("/admin")
                  }
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Settings
                    <FontAwesomeIcon
                      icon={faTools}
                      size="lg"
                    />
                  </Flex>
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
        <Flex
          alignItems="flex-start"
          flex="1 1 auto"
          flexDirection="column"
          justifyContent="center"
          width="100%"
        >
          <Image
            src={logo}
            alt="DevDAO logo"
            margin="36px auto 12px"
            width="15%"
          />
          <Routes>
            <Route
              path="/"
              element={<Buy 
                connectedContract={connectedContract}
              />}
            />

            <Route
              path="/check-in"
              element={<CheckIn 
              connectedContract={connectedContract}
              />}
            />

            <Route
              path="/admin"
              element={<Admin 
              isOwner={isOwner}
              connectedContract={connectedContract}
              />}
            />

            <Route
              path="/wallet"
              element={<Wallet />}
            />
          </Routes>
        </Flex>
      </Page>
    </>
  );
}

export default App;
