package main

import (
        "context"
        "fmt"
        "math/big"
		"encoding/hex"

        "github.com/ethereum/go-ethereum/common"
        "github.com/ethereum/go-ethereum/crypto"
        "github.com/ethereum/go-ethereum/core/types"
        "github.com/ethereum/go-ethereum/ethclient"
)

func main() {
        // Connect to Ethereum network
        client, err := ethclient.Dial("http://3.145.87.221:8545")
        if err != nil {
                fmt.Println("Error connecting to Ethereum network:", err)
                return
        }

		
        // Load wallet  
        privateKeyBytes, _ := hex.DecodeString("DC84C4FC68B190056B9D6D697DA2417089426D2E2F90E3C61417DAE06D48434A")
        privateKey, _ := crypto.ToECDSA(privateKeyBytes)
        // privateKey, _ := x509.ParseECPrivateKey(privateKeyBytes)
        // privateKey := "0xDC84C4FC68B190056B9D6D697DA2417089426D2E2F90E3C61417DAE06D48434A" // Replace with actual private key
        walletAddress := common.HexToAddress("0x044204e7E8d4F8F18E3164B7dFC1f8D0Ac550337") // Replace with actual wallet address

        // Get nonce
        nonce, err := client.PendingNonceAt(context.Background(), walletAddress)
        if err != nil {
                fmt.Println("Error getting nonce:", err)
                return
        }
		
        // Create transaction
        destinationAddress := common.HexToAddress("0x6b5b568C6a1bB0aD0F785602a6F624214AAf80dD") // Replace with actual destination address
        value := big.NewInt(1000000000000000000) // 1 ETH
        gasLimit := uint64(210000)
        gasPrice, err := client.SuggestGasPrice(context.Background())
        if err != nil {
			fmt.Println("Error getting gas price:", err)
			return
        }
        tx := types.NewTransaction(nonce, destinationAddress, value, gasLimit, gasPrice, nil)
		
		chainID := big.NewInt(1)
        // Sign transaction
        signedTx, err := types.SignTx(tx, types.NewEIP155Signer(chainID), privateKey)
        if err != nil {
			fmt.Println("Error signing transaction:", err)
			return
        }

		fmt.Println("----Sign Tx finished-----")
		fmt.Println("---- Now sending transaction -----")
        // Send transaction
        err = client.SendTransaction(context.Background(), signedTx)
        if err != nil {
                fmt.Println("Error sending transaction:", err)
                return
        }

        fmt.Println("Transaction sent:", signedTx.Hash().Hex())
}
