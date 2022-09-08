import { FC } from "react"
import { useState } from "react"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
} from "@chakra-ui/react"
import * as anchor from "@project-serum/anchor"
import { getAssociatedTokenAddress } from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useWorkspace } from "../context/Anchor"

export const Form: FC = () => {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [toggle, setToggle] = useState(true)

  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const { program } = useWorkspace()

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!publicKey || !program) {
      alert("Please connect your wallet!")
      return
    }

    const [mintPDA] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("mint")],
      program.programId
    )

    const tokenAddress = await getAssociatedTokenAddress(mintPDA, publicKey)

    const transaction = new anchor.web3.Transaction()
    if (toggle) {
      const instruction = await program.methods
        .addStudentIntro(name, message)
        .accounts({
          tokenAccount: tokenAddress,
        })
        .instruction()

      transaction.add(instruction)
    } else {
      const instruction = await program.methods
        .updateStudentIntro(name, message)
        .instruction()

      transaction.add(instruction)
    }
    try {
      let txid = await sendTransaction(transaction, connection)
      alert(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      )
      console.log(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      )
    } catch (e) {
      console.log(JSON.stringify(e))
      alert(JSON.stringify(e))
    }
  }

  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={1}
      margin={2}
      justifyContent="center"
    >
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel color="gray.200">What do we call you?</FormLabel>
          <Input
            id="name"
            color="gray.400"
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.200">
            What brings you to Solana, friend?
          </FormLabel>
          <Textarea
            id="message"
            color="gray.400"
            onChange={(event) => setMessage(event.currentTarget.value)}
          />
        </FormControl>
        <FormControl display="center" alignItems="center">
          <FormLabel color="gray.100" mt={2}>
            Update
          </FormLabel>
          <Switch
            id="update"
            onChange={(event) => setToggle((prevCheck) => !prevCheck)}
          />
        </FormControl>
        <Button width="full" mt={4} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  )
}
