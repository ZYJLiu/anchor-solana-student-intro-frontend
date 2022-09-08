import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  FormControl,
} from "@chakra-ui/react"
import { FC, useState } from "react"
import * as anchor from "@project-serum/anchor"
import { getAssociatedTokenAddress } from "@solana/spl-token"
import { ReplyList } from "./ReplyList"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useWorkspace } from "../context/Anchor"

interface ReplyDetailProps {
  isOpen: boolean
  onClose: any
  studentIntro: any
}

export const ReplyDetail: FC<ReplyDetailProps> = ({
  isOpen,
  onClose,
  studentIntro,
}: ReplyDetailProps) => {
  console.log(studentIntro.publicKey.toString())
  const [comment, setComment] = useState("")
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const { program } = useWorkspace()

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!publicKey || !program) {
      alert("Please connect your wallet!")
      return
    }

    const studentIntroPda = new anchor.web3.PublicKey(studentIntro.publicKey)
    // const [studentIntroPda] = await anchor.web3.PublicKey.findProgramAddress(
    //   [publicKey.toBuffer()],
    //   program.programId
    // )

    const [replyCounterPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("counter"), studentIntroPda.toBuffer()],
      program.programId
    )

    const [mintPDA] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("mint")],
      program.programId
    )

    // const account = await program.account.replyCounter.fetch(replyCounterPda)
    // console.log(account)

    const tokenAddress = await getAssociatedTokenAddress(mintPDA, publicKey)

    const transaction = new anchor.web3.Transaction()

    const instruction = await program.methods
      .addReply(comment)
      .accounts({
        studentIntro: studentIntroPda,
        replyCounter: replyCounterPda,
        tokenAccount: tokenAddress,
      })
      .instruction()

    transaction.add(instruction)

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
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            textTransform="uppercase"
            textAlign={{ base: "center", md: "center" }}
          >
            {studentIntro.account.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack textAlign={{ base: "center", md: "center" }}>
              <p>{studentIntro.account.description}</p>
              <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                  <Input
                    id="title"
                    color="black"
                    onChange={(event) => setComment(event.currentTarget.value)}
                    placeholder="Submit a comment..."
                  />
                </FormControl>
                <Button width="full" mt={4} type="submit">
                  Send
                </Button>
              </form>
              <ReplyList studentIntro={studentIntro} />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
