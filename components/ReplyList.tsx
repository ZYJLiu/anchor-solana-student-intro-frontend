import {
  Button,
  Center,
  HStack,
  Spacer,
  Stack,
  Box,
  Heading,
} from "@chakra-ui/react"
import { FC, useState, useEffect } from "react"
import { useWorkspace } from "../context/Anchor"

interface ReplyListProps {
  studentIntro: any
}

export const ReplyList: FC<ReplyListProps> = ({
  studentIntro,
}: ReplyListProps) => {
  const [page, setPage] = useState(1)
  const [replys, setReplys] = useState<any[]>([])
  const [result, setResult] = useState<any[]>([])
  const { program } = useWorkspace()

  useEffect(() => {
    const fetch = async () => {
      if (program) {
        const replys = await program.account.reply.all([
          {
            memcmp: {
              offset: 8,
              bytes: studentIntro.publicKey.toBase58(),
            },
          },
        ])

        console.log(replys)

        // const sort = [...replys].sort((a, b) =>
        //   a.account.count > b.account.count ? 1 : -1
        // )
        setReplys(replys)
        const filtered = replys.slice((page - 1) * 3, page * 3)
        console.log(filtered)
        setResult(filtered)
      }
    }
    fetch()
  }, [page])

  return (
    <div>
      <Heading as="h1" size="l" ml={4} mt={2}>
        Existing Replys
      </Heading>
      {result.map((reply, index) => (
        <Box
          p={4}
          textAlign={{ base: "left", md: "left" }}
          display={{ md: "flex" }}
          maxWidth="32rem"
          borderWidth={1}
          margin={2}
          key={index}
        >
          <div>{reply.account.reply}</div>
        </Box>
      ))}
      <Stack>
        <Center>
          <HStack w="full" mt={2} mb={8} ml={4} mr={4}>
            {page > 1 && (
              <Button onClick={() => setPage(page - 1)}>Previous</Button>
            )}
            <Spacer />
            {replys.length > page * 3 && (
              <Button onClick={() => setPage(page + 1)}>Next</Button>
            )}
          </HStack>
        </Center>
      </Stack>
    </div>
  )
}
